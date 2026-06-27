import { NavLink } from 'react-router-dom'
import { useTranslation } from '../i18n/I18nContext'
import { LanguageSelector } from './LanguageSelector'

export function Header() {
  const { t } = useTranslation()

  const nav = [
    { to: '/', label: t.nav.homepage, end: true },
    { to: '/exhibition', label: t.nav.exhibition },
    { to: '/work', label: t.nav.work },
    { to: '/about', label: t.nav.about },
  ]

  return (
    <header className="header">
      <div className="container header__inner">
        <div className="header__top">
          <NavLink to="/" className="header__title" end>
            <h1>{t.architect.name}</h1>
            <span>{t.architect.tagline}</span>
          </NavLink>
          <LanguageSelector />
        </div>
        <nav className="nav" aria-label={t.nav.mainAria}>
          {nav.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
