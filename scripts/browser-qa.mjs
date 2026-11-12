import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const origin = process.env.SMOKE_ORIGIN || 'http://127.0.0.1:3100'
const browserPath = process.env.BROWSER_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const port = 9333
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'oft-browser-qa-'))
const browser = spawn(browserPath, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--disable-default-apps',
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore', windowsHide: true })

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function getDebuggerUrl() {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json())
      const page = targets.find((target) => target.type === 'page')
      if (page) return page.webSocketDebuggerUrl
    } catch {}
    await delay(250)
  }
  throw new Error('Headless browser debugging endpoint did not start')
}

let sequence = 0
const pending = new Map()
const browserErrors = []

try {
  const socket = new WebSocket(await getDebuggerUrl())
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true })
    socket.addEventListener('error', reject, { once: true })
  })
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data)
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id)
      pending.delete(message.id)
      return message.error ? reject(new Error(message.error.message)) : resolve(message.result)
    }
    if (message.method === 'Runtime.exceptionThrown') browserErrors.push(message.params.exceptionDetails.text)
  })

  const command = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence
    pending.set(id, { resolve, reject })
    socket.send(JSON.stringify({ id, method, params }))
  })
  const evaluate = async (expression) => {
    const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text)
    return result.result.value
  }

  await command('Runtime.enable')
  await command('Page.enable')

  const pages = ['/', '/tools', '/blog', '/tools/bmi-calculator', '/blog/bmi-chart-men-women', '/privacy', '/contact']
  const viewports = [390, 768, 1280]
  for (const width of viewports) {
    await command('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width === 390 })
    for (const route of pages) {
      await command('Page.navigate', { url: `${origin}${route}` })
      for (let attempt = 0; attempt < 40; attempt++) {
        if (await evaluate('document.readyState') === 'complete') break
        await delay(100)
      }
      await delay(150)
      const result = await evaluate(`({
        title: document.title,
        h1: document.querySelector('h1')?.textContent?.trim() || '',
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        links: document.querySelectorAll('a[href]').length
      })`)
      assert.ok(result.title, `${route} at ${width}px must have a title`)
      assert.ok(result.h1, `${route} at ${width}px must have an H1`)
      assert.ok(result.links > 3, `${route} at ${width}px must expose crawlable navigation`)
      assert.ok(result.overflow <= 1, `${route} at ${width}px overflows horizontally by ${result.overflow}px`)
    }
  }

  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 1, mobile: true })
  await command('Page.navigate', { url: `${origin}/tools/bmi-calculator` })
  await delay(500)
  const bmiResult = await evaluate(`(() => { const button=[...document.querySelectorAll('button')].find(el=>el.textContent.includes('Calculate BMI')); button?.click(); return true })()`)
  assert.equal(bmiResult, true)
  await delay(100)
  assert.match(await evaluate(`document.body.innerText`), /Your BMI\s+24\.2/i, 'BMI default calculation should render 24.2')

  await command('Page.navigate', { url: `${origin}/` })
  await delay(700)
  assert.ok(await evaluate(`Boolean([...document.querySelectorAll('button')].find(el=>el.textContent.includes('Open menu')))`) , 'Mobile menu trigger must be accessible')

  await evaluate(`localStorage.removeItem('cookie-consent-v1')`)
  await command('Page.navigate', { url: `${origin}/` })
  await delay(1200)
  const consentBeforeOptIn = await evaluate(`({
    googleScripts: [...document.scripts].filter(script => /googletagmanager|googlesyndication/.test(script.src)).length,
    ads: document.querySelectorAll('.adsbygoogle').length,
    banner: document.body.innerText.includes('Accept All') && document.body.innerText.includes('Reject')
  })`)
  assert.equal(consentBeforeOptIn.googleScripts, 0, 'Google scripts must not load before consent')
  assert.equal(consentBeforeOptIn.ads, 0, 'Ad slots must not render before consent')
  assert.equal(consentBeforeOptIn.banner, true, 'Consent banner must be visible without a saved choice')

  assert.equal(await evaluate(`(() => {
    const button = [...document.querySelectorAll('button')].find(el => el.textContent.includes('Accept All'))
    button?.click()
    return Boolean(button)
  })()`), true, 'Consent banner must offer an Accept All action')
  await delay(500)
  assert.equal(await evaluate(`localStorage.getItem('cookie-consent-v1')`), 'accepted', 'Consent choice must persist')
  assert.ok(await evaluate(`[...document.scripts].some(script => /googletagmanager/.test(script.src))`), 'Analytics script must load after opt-in')
  assert.ok(await evaluate(`[...document.scripts].some(script => /googlesyndication/.test(script.src))`), 'Advertising script must load after opt-in')

  await evaluate(`localStorage.setItem('cookie-consent-v1', 'rejected')`)
  await command('Page.navigate', { url: `${origin}/` })
  await delay(800)
  assert.equal(await evaluate(`[...document.scripts].filter(script => /googletagmanager|googlesyndication/.test(script.src)).length`), 0, 'Google scripts must remain absent after rejection and reload')
  assert.equal(await evaluate(`document.querySelectorAll('.adsbygoogle').length`), 0, 'Ad slots must remain absent after rejection and reload')
  assert.deepEqual(browserErrors, [], `Browser runtime exceptions: ${browserErrors.join('; ')}`)
  socket.close()
  console.log(`Browser QA passed: ${pages.length} pages × ${viewports.length} viewports, mobile BMI interaction, navigation, overflow, and runtime exceptions.`)
} finally {
  browser.kill()
  await delay(300)
  fs.rmSync(profile, { recursive: true, force: true })
}
