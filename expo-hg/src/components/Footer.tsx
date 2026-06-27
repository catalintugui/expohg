import { useTranslation } from '../i18n/I18nContext'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__marks" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>
          {t.common.copyright} {t.architect.name}
        </span>
        <span>{t.architect.location}</span>
      </div>
    </footer>
  )
}
