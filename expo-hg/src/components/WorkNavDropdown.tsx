import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from '../i18n/I18nContext'
import {
  WORK_CATEGORY_LABEL_KEYS,
  WORK_CATEGORY_SLUGS,
  WORK_PERIODS,
  type WorkPeriodSlug,
} from '../lib/workCategories'
import { workPath } from '../lib/workPaths'

export function WorkNavDropdown() {
  const { t } = useTranslation()
  const location = useLocation()
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openPeriod, setOpenPeriod] = useState<WorkPeriodSlug | null>(null)
  const isActive = location.pathname.startsWith('/work')

  useEffect(() => {
    setMenuOpen(false)
    setOpenPeriod(null)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
        setOpenPeriod(null)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setOpenPeriod(null)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <div
      ref={rootRef}
      className={menuOpen ? 'nav-dropdown is-open' : 'nav-dropdown'}
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => {
        setMenuOpen(false)
        setOpenPeriod(null)
      }}
    >
      <button
        type="button"
        className={isActive ? 'nav-dropdown__trigger is-active' : 'nav-dropdown__trigger'}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={() => {
          setMenuOpen((open) => {
            if (open) setOpenPeriod(null)
            return !open
          })
        }}
      >
        {t.nav.work}
        <span className="nav-dropdown__caret" aria-hidden="true" />
      </button>

      <ul id={menuId} className="nav-dropdown__menu" role="menu" hidden={!menuOpen}>
        {WORK_PERIODS.map(({ slug, labelKey }) => {
          const periodOpen = openPeriod === slug

          return (
            <li
              key={slug}
              className={
                periodOpen
                  ? 'nav-dropdown__item nav-dropdown__item--has-submenu is-open'
                  : 'nav-dropdown__item nav-dropdown__item--has-submenu'
              }
              role="none"
              onMouseEnter={() => setOpenPeriod(slug)}
            >
              <button
                type="button"
                className="nav-dropdown__label"
                role="menuitem"
                aria-haspopup="menu"
                aria-expanded={periodOpen}
                onClick={() =>
                  setOpenPeriod((current) => (current === slug ? null : slug))
                }
              >
                {t.nav[labelKey]}
                <span className="nav-dropdown__arrow nav-dropdown__arrow--right" aria-hidden="true" />
              </button>

              <ul
                className="nav-dropdown__submenu"
                role="menu"
                hidden={!periodOpen}
              >
                {WORK_CATEGORY_SLUGS.map((categorySlug) => (
                  <li key={categorySlug} role="none">
                    <NavLink
                      to={workPath(slug, categorySlug)}
                      role="menuitem"
                      className={({ isActive: isLinkActive }) =>
                        isLinkActive ? 'is-active' : undefined
                      }
                      onClick={() => {
                        setMenuOpen(false)
                        setOpenPeriod(null)
                      }}
                    >
                      {t.workCategories[WORK_CATEGORY_LABEL_KEYS[categorySlug]]}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
