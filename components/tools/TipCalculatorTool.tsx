'use client'
import { useState, useCallback, useMemo } from 'react'

interface Currency {
  code: string
  symbol: string
  name: string
  locale: string
}

// Comprehensive world currencies
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
export function TipCalculatorTool() {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0])
  const [billAmount, setBillAmount] = useState(50)
  const [tipPercent, setTipPercent] = useState(18)
  const [people, setPeople] = useState(2)

  const [currencySearch, setCurrencySearch] = useState('')
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false)

  const filteredCurrencies = useMemo(() => {
    const search = currencySearch.toLowerCase().trim()
    return CURRENCIES.filter(curr =>
      curr.code.toLowerCase().includes(search) ||
      curr.name.toLowerCase().includes(search) ||
      curr.symbol.includes(search)
    )
  }, [currencySearch])

  const tipAmount = (billAmount * tipPercent) / 100
  const totalAmount = billAmount + tipAmount
  const perPerson = people > 0 ? totalAmount / people : totalAmount

  const savingsPercent = tipPercent // Just alias for clarity

  const handleCopy = () => {
    const text = [
      `Bill: ${currency.symbol}${billAmount.toFixed(2)}`,
      `Tip (${tipPercent}%): ${currency.symbol}${tipAmount.toFixed(2)}`,
      `Total: ${currency.symbol}${totalAmount.toFixed(2)}`,
      `Per Person (${people} people): ${currency.symbol}${perPerson.toFixed(2)}`,
    ].join('\n')
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Searchable Currency Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-2">Currency</label>
        <div className="relative">
          <div
            className="w-full p-3 border border-border rounded-lg bg-background flex items-center justify-between cursor-pointer"
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
                placeholder="Search currency..."
                value={currencySearch}
                onChange={(e) => setCurrencySearch(e.target.value)}
                className="w-full p-3 border-b focus:outline-none"
                autoFocus
              />
              <div className="max-h-72 overflow-y-auto">
                {filteredCurrencies.length > 0 ? (
                  filteredCurrencies.map((curr) => (
                    <div
                      key={curr.code}
                      onClick={() => {
                        setCurrency(curr)
                        setCurrencySearch('')
                        setIsCurrencyOpen(false)
                      }}
                      className="px-4 py-3 hover:bg-muted cursor-pointer flex items-center gap-3"
                    >
                      <span className="text-2xl w-10">{curr.symbol}</span>
                      <div>{curr.code} — {curr.name}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">No currency found</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bill Amount */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Bill Amount</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
            {currency.symbol}
          </span>
          <input
            type="number"
            value={billAmount}
            min={0}
            step="0.01"
            onChange={(e) => setBillAmount(Number(e.target.value))}
            className="w-full pl-10 p-4 text-2xl border border-border rounded-xl bg-background font-semibold"
          />
        </div>
      </div>

      {/* Number of People */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Number of People</label>
        <input
          type="number"
          value={people}
          min={1}
          onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))}
          className="w-full p-4 text-xl border border-border rounded-xl bg-background"
        />
      </div>

      {/* Tip Percentage */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium">Tip Percentage</label>
          <span className="font-bold text-xl">{tipPercent}%</span>
        </div>

        <div className="flex gap-2 mb-3">
          {[10, 15, 18, 20, 25].map((pct) => (
            <button
              key={pct}
              onClick={() => setTipPercent(pct)}
              className={`flex-1 py-3 rounded-xl border font-medium transition-all ${tipPercent === pct
                  ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border hover:bg-muted'
              }`}
            >
              {pct}%
            </button>
          ))}
        </div>

        <input
          type="range"
          min="0"
          max="50"
          step="0.5"
          value={tipPercent}
          onChange={(e) => setTipPercent(Number(e.target.value))}
          className="w-full accent-primary cursor-pointer"
        />
      </div>

      {/* Results */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-5 bg-muted border border-border rounded-2xl text-center">
            <p className="text-xs text-muted-foreground">Tip Amount</p>
            <p className="text-2xl font-bold mt-1 tabular-nums">
              {currency.symbol}{tipAmount.toFixed(2)}
            </p>
          </div>

          <div className="p-5 bg-muted border border-border rounded-2xl text-center">
            <p className="text-xs text-muted-foreground">Total Bill</p>
            <p className="text-2xl font-bold mt-1 tabular-nums text-green-600">
              {currency.symbol}{totalAmount.toFixed(2)}
            </p>
          </div>

          <div className="p-5 bg-muted border border-border rounded-2xl text-center">
            <p className="text-xs text-muted-foreground">Per Person</p>
            <p className="text-2xl font-bold mt-1 tabular-nums">
              {currency.symbol}{perPerson.toFixed(2)}
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="w-full py-3 border border-border rounded-xl hover:bg-muted transition-colors font-medium"
        >
          Copy Results
        </button>
      </div>
    </div>
  )
}