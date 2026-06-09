'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
  useTheme as useNextTheme,
} from 'next-themes'

function ThemeSync() {
  const { theme, setTheme } = useNextTheme()

  React.useEffect(() => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return

    const channel = new BroadcastChannel('online-free-tools-theme')
    const handleMessage = (event: MessageEvent<string>) => {
      const nextTheme = event.data
      if (!nextTheme || nextTheme === theme) return
      setTheme(nextTheme)
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== 'theme') return
      const nextTheme = event.newValue
      if (!nextTheme || nextTheme === theme) return
      setTheme(nextTheme)
    }

    channel.addEventListener('message', handleMessage)
    window.addEventListener('storage', handleStorage)

    return () => {
      channel.removeEventListener('message', handleMessage)
      channel.close()
      window.removeEventListener('storage', handleStorage)
    }
  }, [theme, setTheme])

  React.useEffect(() => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return
    if (!theme) return

    const channel = new BroadcastChannel('online-free-tools-theme')
    channel.postMessage(theme)
    channel.close()
  }, [theme])

  return null
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      enableSystem
      storageKey="theme"
      disableTransitionOnChange
      {...props}
    >
      <ThemeSync />
      {children}
    </NextThemesProvider>
  )
}
