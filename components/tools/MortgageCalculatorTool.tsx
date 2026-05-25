'use client'
import { useState, useCallback, useMemo } from 'react'

interface MortgageResult {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  principal: number
  downPaymentPercent: number
  loanToValue: number
  schedule: AmortizationRow[]
}

interface AmortizationRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

interface Currency {
  code: string
  symbol: string
  name: string
  locale: string
}

// Complete list of world currencies
const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'United States Dollar', locale: 'en-US' },
  { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
  { code: 'GBP', symbol: '£', name: 'British Pound Sterling', locale: 'en-GB' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', locale: 'ja-JP' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', locale: 'zh-CN' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', locale: 'de-CH' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', locale: 'ar-AE' },
  { code: 'AFN', symbol: '؋', name: 'Afghan Afghani', locale: 'fa-AF' },
  { code: 'ALL', symbol: 'L', name: 'Albanian Lek', locale: 'sq-AL' },
  { code: 'AMD', symbol: '֏', name: 'Armenian Dram', locale: 'hy-AM' },
  { code: 'ANG', symbol: 'ƒ', name: 'Netherlands Antillean Guilder', locale: 'nl-CW' },
  { code: 'AOA', symbol: 'Kz', name: 'Angolan Kwanza', locale: 'pt-AO' },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso', locale: 'es-AR' },
  { code: 'AWG', symbol: 'ƒ', name: 'Aruban Florin', locale: 'nl-AW' },
  { code: 'AZN', symbol: '₼', name: 'Azerbaijani Manat', locale: 'az-AZ' },
  { code: 'BAM', symbol: 'KM', name: 'Bosnia-Herzegovina Convertible Mark', locale: 'bs-BA' },
  { code: 'BBD', symbol: '$', name: 'Barbadian Dollar', locale: 'en-BB' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', locale: 'bn-BD' },
  { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev', locale: 'bg-BG' },
  { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar', locale: 'ar-BH' },
  { code: 'BIF', symbol: 'FBu', name: 'Burundian Franc', locale: 'fr-BI' },
  { code: 'BMD', symbol: '$', name: 'Bermudian Dollar', locale: 'en-BM' },
  { code: 'BND', symbol: '$', name: 'Brunei Dollar', locale: 'ms-BN' },
  { code: 'BOB', symbol: 'Bs.', name: 'Bolivian Boliviano', locale: 'es-BO' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', locale: 'pt-BR' },
  { code: 'BSD', symbol: '$', name: 'Bahamian Dollar', locale: 'en-BS' },
  { code: 'BTN', symbol: 'Nu.', name: 'Bhutanese Ngultrum', locale: 'dz-BT' },
  { code: 'BWP', symbol: 'P', name: 'Botswanan Pula', locale: 'en-BW' },
  { code: 'BYN', symbol: 'Br', name: 'Belarusian Ruble', locale: 'be-BY' },
  { code: 'BZD', symbol: '$', name: 'Belize Dollar', locale: 'en-BZ' },
  { code: 'CDF', symbol: 'FC', name: 'Congolese Franc', locale: 'fr-CD' },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso', locale: 'es-CL' },
  { code: 'COP', symbol: '$', name: 'Colombian Peso', locale: 'es-CO' },
  { code: 'CRC', symbol: '₡', name: 'Costa Rican Colón', locale: 'es-CR' },
  { code: 'CUP', symbol: '$', name: 'Cuban Peso', locale: 'es-CU' },
  { code: 'CVE', symbol: '$', name: 'Cape Verdean Escudo', locale: 'pt-CV' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', locale: 'cs-CZ' },
  { code: 'DJF', symbol: 'Fdj', name: 'Djiboutian Franc', locale: 'fr-DJ' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone', locale: 'da-DK' },
  { code: 'DOP', symbol: '$', name: 'Dominican Peso', locale: 'es-DO' },
  { code: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar', locale: 'ar-DZ' },
  { code: 'EGP', symbol: '£', name: 'Egyptian Pound', locale: 'ar-EG' },
  { code: 'ERN', symbol: 'Nfk', name: 'Eritrean Nakfa', locale: 'ti-ER' },
  { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr', locale: 'am-ET' },
  { code: 'FJD', symbol: '$', name: 'Fijian Dollar', locale: 'en-FJ' },
  { code: 'FKP', symbol: '£', name: 'Falkland Islands Pound', locale: 'en-FK' },
  { code: 'GEL', symbol: '₾', name: 'Georgian Lari', locale: 'ka-GE' },
  { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi', locale: 'en-GH' },
  { code: 'GIP', symbol: '£', name: 'Gibraltar Pound', locale: 'en-GI' },
  { code: 'GMD', symbol: 'D', name: 'Gambian Dalasi', locale: 'en-GM' },
  { code: 'GNF', symbol: 'FG', name: 'Guinean Franc', locale: 'fr-GN' },
  { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal', locale: 'es-GT' },
  { code: 'GYD', symbol: '$', name: 'Guyanese Dollar', locale: 'en-GY' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', locale: 'zh-HK' },
  { code: 'HNL', symbol: 'L', name: 'Honduran Lempira', locale: 'es-HN' },
  { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna', locale: 'hr-HR' },
  { code: 'HTG', symbol: 'G', name: 'Haitian Gourde', locale: 'fr-HT' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', locale: 'hu-HU' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', locale: 'id-ID' },
  { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel', locale: 'he-IL' },
  { code: 'IQD', symbol: 'ع.د', name: 'Iraqi Dinar', locale: 'ar-IQ' },
  { code: 'IRR', symbol: '﷼', name: 'Iranian Rial', locale: 'fa-IR' },
  { code: 'ISK', symbol: 'kr', name: 'Icelandic Króna', locale: 'is-IS' },
  { code: 'JMD', symbol: '$', name: 'Jamaican Dollar', locale: 'en-JM' },
  { code: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinar', locale: 'ar-JO' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', locale: 'sw-KE' },
  { code: 'KGS', symbol: 'с', name: 'Kyrgyzstani Som', locale: 'ky-KG' },
  { code: 'KHR', symbol: '៛', name: 'Cambodian Riel', locale: 'km-KH' },
  { code: 'KMF', symbol: 'CF', name: 'Comorian Franc', locale: 'fr-KM' },
  { code: 'KPW', symbol: '₩', name: 'North Korean Won', locale: 'ko-KP' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', locale: 'ko-KR' },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', locale: 'ar-KW' },
  { code: 'KYD', symbol: '$', name: 'Cayman Islands Dollar', locale: 'en-KY' },
  { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge', locale: 'ru-KZ' },
  { code: 'LAK', symbol: '₭', name: 'Laotian Kip', locale: 'lo-LA' },
  { code: 'LBP', symbol: 'ل.ل', name: 'Lebanese Pound', locale: 'ar-LB' },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', locale: 'si-LK' },
  { code: 'LRD', symbol: '$', name: 'Liberian Dollar', locale: 'en-LR' },
  { code: 'LSL', symbol: 'L', name: 'Lesotho Loti', locale: 'en-LS' },
  { code: 'LYD', symbol: 'ل.د', name: 'Libyan Dinar', locale: 'ar-LY' },
  { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham', locale: 'ar-MA' },
  { code: 'MDL', symbol: 'L', name: 'Moldovan Leu', locale: 'ro-MD' },
  { code: 'MGA', symbol: 'Ar', name: 'Malagasy Ariary', locale: 'mg-MG' },
  { code: 'MKD', symbol: 'ден', name: 'Macedonian Denar', locale: 'mk-MK' },
  { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat', locale: 'my-MM' },
  { code: 'MNT', symbol: '₮', name: 'Mongolian Tugrik', locale: 'mn-MN' },
  { code: 'MOP', symbol: 'MOP$', name: 'Macanese Pataca', locale: 'zh-MO' },
  { code: 'MRU', symbol: 'UM', name: 'Mauritanian Ouguiya', locale: 'ar-MR' },
  { code: 'MUR', symbol: 'Rs', name: 'Mauritian Rupee', locale: 'en-MU' },
  { code: 'MVR', symbol: 'Rf', name: 'Maldivian Rufiyaa', locale: 'dv-MV' },
  { code: 'MWK', symbol: 'MK', name: 'Malawian Kwacha', locale: 'en-MW' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', locale: 'es-MX' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', locale: 'ms-MY' },
  { code: 'MZN', symbol: 'MT', name: 'Mozambican Metical', locale: 'pt-MZ' },
  { code: 'NAD', symbol: '$', name: 'Namibian Dollar', locale: 'en-NA' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', locale: 'en-NG' },
  { code: 'NIO', symbol: 'C$', name: 'Nicaraguan Córdoba', locale: 'es-NI' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', locale: 'nb-NO' },
  { code: 'NPR', symbol: 'Rs', name: 'Nepalese Rupee', locale: 'ne-NP' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', locale: 'en-NZ' },
  { code: 'OMR', symbol: 'ر.ع.', name: 'Omani Rial', locale: 'ar-OM' },
  { code: 'PAB', symbol: 'B/.', name: 'Panamanian Balboa', locale: 'es-PA' },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', locale: 'es-PE' },
  { code: 'PGK', symbol: 'K', name: 'Papua New Guinean Kina', locale: 'en-PG' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', locale: 'en-PH' },
  { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee', locale: 'en-PK' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', locale: 'pl-PL' },
  { code: 'PYG', symbol: '₲', name: 'Paraguayan Guarani', locale: 'es-PY' },
  { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal', locale: 'ar-QA' },
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu', locale: 'ro-RO' },
  { code: 'RSD', symbol: 'дин', name: 'Serbian Dinar', locale: 'sr-RS' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', locale: 'ru-RU' },
  { code: 'RWF', symbol: 'RF', name: 'Rwandan Franc', locale: 'rw-RW' },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', locale: 'ar-SA' },
  { code: 'SBD', symbol: '$', name: 'Solomon Islands Dollar', locale: 'en-SB' },
  { code: 'SCR', symbol: 'Rs', name: 'Seychellois Rupee', locale: 'en-SC' },
  { code: 'SDG', symbol: 'ج.س.', name: 'Sudanese Pound', locale: 'ar-SD' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', locale: 'sv-SE' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', locale: 'en-SG' },
  { code: 'SHP', symbol: '£', name: 'Saint Helena Pound', locale: 'en-SH' },
  { code: 'SLE', symbol: 'Le', name: 'Sierra Leonean Leone', locale: 'en-SL' },
  { code: 'SOS', symbol: 'Sh', name: 'Somali Shilling', locale: 'so-SO' },
  { code: 'SRD', symbol: '$', name: 'Surinamese Dollar', locale: 'nl-SR' },
  { code: 'SSP', symbol: '£', name: 'South Sudanese Pound', locale: 'en-SS' },
  { code: 'STN', symbol: 'Db', name: 'São Tomé & Príncipe Dobra', locale: 'pt-ST' },
  { code: 'SYP', symbol: '£', name: 'Syrian Pound', locale: 'ar-SY' },
  { code: 'SZL', symbol: 'E', name: 'Swazi Lilangeni', locale: 'en-SZ' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', locale: 'th-TH' },
  { code: 'TJS', symbol: 'ЅМ', name: 'Tajikistani Somoni', locale: 'tg-TJ' },
  { code: 'TMT', symbol: 'm', name: 'Turkmenistani Manat', locale: 'tk-TM' },
  { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar', locale: 'ar-TN' },
  { code: 'TOP', symbol: 'T$', name: 'Tongan Paʻanga', locale: 'to-TO' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', locale: 'tr-TR' },
  { code: 'TTD', symbol: '$', name: 'Trinidad & Tobago Dollar', locale: 'en-TT' },
  { code: 'TWD', symbol: 'NT$', name: 'New Taiwan Dollar', locale: 'zh-TW' },
  { code: 'TZS', symbol: 'Sh', name: 'Tanzanian Shilling', locale: 'sw-TZ' },
  { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia', locale: 'uk-UA' },
  { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling', locale: 'en-UG' },
  { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso', locale: 'es-UY' },
  { code: 'UZS', symbol: 'сўм', name: 'Uzbekistani Som', locale: 'uz-UZ' },
  { code: 'VES', symbol: 'Bs.', name: 'Venezuelan Bolívar', locale: 'es-VE' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', locale: 'vi-VN' },
  { code: 'VUV', symbol: 'VT', name: 'Vanuatu Vatu', locale: 'en-VU' },
  { code: 'WST', symbol: 'WS$', name: 'Samoan Tala', locale: 'sm-WS' },
  { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', locale: 'fr-CM' },
  { code: 'XCD', symbol: '$', name: 'East Caribbean Dollar', locale: 'en-GD' },
  { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', locale: 'fr-SN' },
  { code: 'XPF', symbol: '₣', name: 'CFP Franc', locale: 'fr-PF' },
  { code: 'YER', symbol: '﷼', name: 'Yemeni Rial', locale: 'ar-YE' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', locale: 'en-ZA' },
  { code: 'ZMW', symbol: 'ZK', name: 'Zambian Kwacha', locale: 'en-ZM' },
  { code: 'ZWL', symbol: '$', name: 'Zimbabwean Dollar', locale: 'en-ZW' },
]

const TERM_OPTIONS = [
  { label: '10 yr', months: 120 },
  { label: '15 yr', months: 180 },
  { label: '20 yr', months: 240 },
  { label: '30 yr', months: 360 },
]

function computeMortgage(
  homePrice: number,
  downPayment: number,
  annualRate: number,
  termMonths: number
): MortgageResult {
  const principal = homePrice - downPayment
  const monthlyRate = annualRate / 100 / 12
  const monthlyPayment =
    monthlyRate === 0
      ? principal / termMonths
      : (principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
      (Math.pow(1 + monthlyRate, termMonths) - 1)

  const totalPayment = monthlyPayment * termMonths
  const totalInterest = totalPayment - principal

  const schedule: AmortizationRow[] = []
  let balance = principal
  for (let month = 1; month <= termMonths; month++) {
    const interestPaid = balance * monthlyRate
    const principalPaid = monthlyPayment - interestPaid
    balance = Math.max(0, balance - principalPaid)
    if (month % 12 === 0 || month === termMonths) {
      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPaid,
        interest: interestPaid,
        balance,
      })
    }
  }

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    principal,
    downPaymentPercent: (downPayment / homePrice) * 100,
    loanToValue: (principal / homePrice) * 100,
    schedule,
  }
}

function fmt(n: number, currency: Currency): string {
  return n.toLocaleString(currency.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function fmtInt(n: number, currency: Currency): string {
  return n.toLocaleString(currency.locale, { maximumFractionDigits: 0 })
}

export function MortgageCalculatorTool() {
  const [homePrice, setHomePrice] = useState(300000)
  const [downPayment, setDownPayment] = useState(60000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm] = useState(360)
  const [extraPayment, setExtraPayment] = useState(0)
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0])

  const [result, setResult] = useState<MortgageResult | null>(null)
  const [showSchedule, setShowSchedule] = useState(false)
  const [copied, setCopied] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Searchable Dropdown State
  const [currencySearch, setCurrencySearch] = useState('')
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false)

  const filteredCurrencies = useMemo(() => {
    const search = currencySearch.toLowerCase().trim()
    return CURRENCIES.filter(curr =>
      curr.code.toLowerCase().includes(search) ||
      curr.name.toLowerCase().includes(search) ||
      curr.symbol.toLowerCase().includes(search)
    )
  }, [currencySearch])

  const downPaymentPercent = homePrice > 0 ? ((downPayment / homePrice) * 100).toFixed(1) : '0.0'
  const years = Math.round(loanTerm / 12)

  const validate = useCallback((): boolean => {
    const errs: Record<string, string> = {}
    if (homePrice <= 0) errs.homePrice = 'Must be greater than 0'
    if (downPayment < 0) errs.downPayment = 'Cannot be negative'
    if (downPayment >= homePrice) errs.downPayment = 'Must be less than home price'
    if (interestRate < 0) errs.interestRate = 'Cannot be negative'
    if (interestRate > 30) errs.interestRate = 'Seems too high'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }, [homePrice, downPayment, interestRate])

  const calculate = useCallback(() => {
    if (!validate()) return
    const res = computeMortgage(homePrice, downPayment, interestRate, loanTerm)
    setResult(res)
    setShowSchedule(false)
  }, [validate, homePrice, downPayment, interestRate, loanTerm])

  const earlyPayoff = useCallback(() => {
    if (!result || extraPayment <= 0) return null
    const principal = result.principal
    const monthlyRate = interestRate / 100 / 12
    const newPayment = result.monthlyPayment + extraPayment
    let balance = principal
    let months = 0
    let totalPaid = 0

    while (balance > 0 && months < loanTerm) {
      const interestPaid = balance * monthlyRate
      const principalPaid = Math.min(newPayment - interestPaid, balance)
      balance -= principalPaid
      totalPaid += interestPaid + principalPaid
      months++
    }

    return {
      months,
      years: Math.floor(months / 12),
      remainingMonths: months % 12,
      totalInterest: totalPaid - principal,
      interestSaved: result.totalInterest - (totalPaid - principal),
      monthsSaved: loanTerm - months,
    }
  }, [result, extraPayment, interestRate, loanTerm])

  const handleCopy = () => {
    if (!result) return
    const text = [
      `Monthly Payment: ${currency.symbol}${fmt(result.monthlyPayment, currency)}`,
      `Loan Amount: ${currency.symbol}${fmtInt(result.principal, currency)}`,
      `Total Interest: ${currency.symbol}${fmtInt(result.totalInterest, currency)}`,
      `Total Cost: ${currency.symbol}${fmtInt(result.totalPayment, currency)}`,
    ].join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const payoff = result ? earlyPayoff() : null
  const principalPct = result ? (result.principal / result.totalPayment) * 100 : 0
  const interestPct = result ? (result.totalInterest / result.totalPayment) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Searchable Currency Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-2">Currency</label>
        <div className="relative">
          <div
            className="w-full p-3 border border-border rounded-lg bg-background flex items-center justify-between cursor-pointer hover:bg-muted"
            onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currency.symbol}</span>
              <div>
                <div className="font-semibold">{currency.code}</div>
                <div className="text-xs text-muted-foreground">{currency.name}</div>
              </div>
            </div>
            <span>▼</span>
          </div>

          {isCurrencyOpen && (
            <div className="absolute mt-1 w-full bg-background border border-border rounded-lg shadow-xl z-50 overflow-hidden">
              <input
                type="text"
                placeholder="Search currency (code, name or symbol)..."
                value={currencySearch}
                onChange={(e) => setCurrencySearch(e.target.value)}
                className="w-full p-3 border-b bg-background focus:outline-none text-sm"
                autoFocus
              />
              <div className="max-h-80 overflow-y-auto">
                {filteredCurrencies.length > 0 ? (
                  filteredCurrencies.map((curr) => (
                    <div
                      key={curr.code}
                      onClick={() => {
                        setCurrency(curr)
                        setCurrencySearch('')
                        setIsCurrencyOpen(false)
                      }}
                      className="px-4 py-3 hover:bg-muted cursor-pointer flex items-center gap-3 border-b last:border-0"
                    >
                      <span className="text-2xl w-10">{curr.symbol}</span>
                      <div>
                        <div className="font-medium">{curr.code} — {curr.name}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">No matching currency found</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Home Price */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-sm font-medium">
            Home Price
            {errors.homePrice && <span className="ml-2 text-xs text-red-500">{errors.homePrice}</span>}
          </label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              {currency.symbol}
            </span>
            <input
              type="number"
              value={homePrice}
              min={0}
              onChange={(e) => {
                setHomePrice(Number(e.target.value))
                setResult(null)
                setErrors(p => { const n = { ...p }; delete n.homePrice; return n })
              }}
              className="w-32 pl-6 pr-2 py-1 text-sm text-right border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>
        <input
          type="range" min="50000" max="2000000" step="10000" value={homePrice}
          onChange={(e) => { setHomePrice(Number(e.target.value)); setResult(null) }}
          className="w-full accent-primary cursor-pointer"
        />
      </div>

      {/* Down Payment */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-sm font-medium">
            Down Payment <span className="text-xs text-muted-foreground">({downPaymentPercent}%)</span>
            {errors.downPayment && <span className="ml-2 text-xs text-red-500">{errors.downPayment}</span>}
          </label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              {currency.symbol}
            </span>
            <input
              type="number"
              value={downPayment}
              min={0}
              max={homePrice}
              onChange={(e) => {
                setDownPayment(Number(e.target.value))
                setResult(null)
                setErrors(p => { const n = { ...p }; delete n.downPayment; return n })
              }}
              className="w-32 pl-6 pr-2 py-1 text-sm text-right border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>
        <input
          type="range" min="0" max={homePrice} step="1000" value={downPayment}
          onChange={(e) => { setDownPayment(Number(e.target.value)); setResult(null) }}
          className="w-full accent-primary cursor-pointer"
        />
        <div className="flex gap-2 mt-2">
          {[5, 10, 20, 25].map(pct => (
            <button
              key={pct}
              onClick={() => { setDownPayment(Math.round(homePrice * pct / 100)); setResult(null) }}
              className={`flex-1 py-1 text-xs rounded border transition-colors ${Math.round((downPayment / homePrice) * 100) === pct
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border bg-background hover:bg-muted'
                }`}
            >
              {pct}%
            </button>
          ))}
        </div>
        {Number(downPaymentPercent) < 20 && (
          <p className="mt-1.5 text-xs text-amber-600 dark:text-amber-400">
            ⚠ Less than 20% down — PMI may apply
          </p>
        )}
      </div>

      {/* Interest Rate */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-sm font-medium">
            Interest Rate
            {errors.interestRate && <span className="ml-2 text-xs text-red-500">{errors.interestRate}</span>}
          </label>
          <div className="relative">
            <input
              type="number"
              value={interestRate}
              min={0}
              max={30}
              step={0.01}
              onChange={(e) => {
                setInterestRate(Number(e.target.value))
                setResult(null)
                setErrors(p => { const n = { ...p }; delete n.interestRate; return n })
              }}
              className="w-20 pr-6 pl-2 py-1 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
          </div>
        </div>
        <input
          type="range" min="2" max="12" step="0.05" value={interestRate}
          onChange={(e) => { setInterestRate(Number(e.target.value)); setResult(null) }}
          className="w-full accent-primary cursor-pointer"
        />
      </div>

      {/* Loan Term */}
      <div>
        <label className="block text-sm font-medium mb-2">Loan Term</label>
        <div className="grid grid-cols-4 gap-2">
          {TERM_OPTIONS.map(opt => (
            <button
              key={opt.months}
              onClick={() => { setLoanTerm(opt.months); setResult(null) }}
              className={`py-2 text-sm rounded-lg border font-medium transition-all ${loanTerm === opt.months
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border bg-background hover:bg-muted'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculate}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
      >
        Calculate
      </button>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Monthly Payment */}
          <div className="rounded-xl border border-border bg-muted overflow-hidden">
            <div className="px-4 pt-4 pb-3 flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Monthly Payment</p>
                <p className="text-4xl font-bold tabular-nums leading-none">
                  {currency.symbol}{fmt(result.monthlyPayment, currency)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{years}-year fixed · {interestRate.toFixed(2)}% APR</p>
              </div>
              <button
                onClick={handleCopy}
                className="mt-1 px-3 py-1.5 text-xs rounded-md border border-border bg-background hover:bg-muted transition-colors font-medium"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div className="px-4 pb-3">
              <div className="flex rounded-full overflow-hidden h-2 bg-border">
                <div className="bg-primary h-full transition-all" style={{ width: `${principalPct}%` }} />
                <div className="bg-primary/30 h-full transition-all" style={{ width: `${interestPct}%` }} />
              </div>
              <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
                <span>Principal {principalPct.toFixed(0)}%</span>
                <span>Interest {interestPct.toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* Summary Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted border border-border">
              <p className="text-xs text-muted-foreground mb-1">Loan Amount</p>
              <p className="text-lg font-bold tabular-nums">{currency.symbol}{fmtInt(result.principal, currency)}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted border border-border">
              <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
              <p className="text-lg font-bold tabular-nums">{currency.symbol}{fmtInt(result.totalInterest, currency)}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted border border-border">
              <p className="text-xs text-muted-foreground mb-1">Total Cost</p>
              <p className="text-lg font-bold tabular-nums">{currency.symbol}{fmtInt(result.totalPayment, currency)}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted border border-border">
              <p className="text-xs text-muted-foreground mb-1">Loan-to-Value</p>
              <p className="text-lg font-bold tabular-nums">{result.loanToValue.toFixed(1)}%</p>
            </div>
          </div>

          {/* Payoff Accelerator */}
          <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
            <p className="text-sm font-medium">Payoff Accelerator</p>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Extra monthly payment</label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">{currency.symbol}</span>
                <input
                  type="number"
                  value={extraPayment}
                  min={0}
                  placeholder="0"
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  className="w-full pl-6 pr-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {payoff && extraPayment > 0 && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="rounded-lg bg-background border border-border p-2.5">
                  <p className="text-xs text-muted-foreground">Paid off in</p>
                  <p className="text-sm font-bold">{payoff.years}y {payoff.remainingMonths}m</p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    {Math.floor(payoff.monthsSaved / 12)}y {payoff.monthsSaved % 12}m sooner
                  </p>
                </div>
                <div className="rounded-lg bg-background border border-border p-2.5">
                  <p className="text-xs text-muted-foreground">Interest saved</p>
                  <p className="text-sm font-bold">{currency.symbol}{fmtInt(payoff.interestSaved, currency)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Amortization Schedule */}
          <div>
            <button
              onClick={() => setShowSchedule(v => !v)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{showSchedule ? '▾' : '▸'}</span>
              Amortization schedule (yearly)
            </button>
            {showSchedule && (
              <div className="mt-3 overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border bg-muted">
                      <th className="text-left px-3 py-2 font-medium text-muted-foreground">Year</th>
                      <th className="text-right px-3 py-2 font-medium text-muted-foreground">Principal</th>
                      <th className="text-right px-3 py-2 font-medium text-muted-foreground">Interest</th>
                      <th className="text-right px-3 py-2 font-medium text-muted-foreground">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map((row, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="px-3 py-2 font-medium">{Math.ceil(row.month / 12)}</td>
                        <td className="px-3 py-2 text-right tabular-nums">{currency.symbol}{fmtInt(row.principal * 12, currency)}</td>
                        <td className="px-3 py-2 text-right tabular-nums">{currency.symbol}{fmtInt(row.interest * 12, currency)}</td>
                        <td className="px-3 py-2 text-right tabular-nums">{currency.symbol}{fmtInt(row.balance, currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}