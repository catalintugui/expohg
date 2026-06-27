import { useTranslation } from '../i18n/I18nContext'
import { LOCALES } from '../i18n/translations'
import type { Locale } from '../i18n/types'

export function LanguageSelector() {
  const { locale, setLocale, t } = useTranslation()

  return (
    <div className="lang-switch" role="group" aria-label={t.nav.languageAria}>
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          className={locale === code ? 'is-active' : undefined}
          aria-pressed={locale === code}
          onClick={() => setLocale(code as Locale)}
        >
          {t.lang[code]}
        </button>
      ))}
    </div>
  )
}
