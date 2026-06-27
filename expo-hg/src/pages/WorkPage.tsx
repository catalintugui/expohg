import { BauhausAccent } from '../components/BauhausAccent'
import { ProjectGrid } from '../components/ProjectGrid'
import { useTranslation } from '../i18n/I18nContext'

export function WorkPage() {
  const { t } = useTranslation()

  return (
    <>
      <section className="hero page-section">
        <div className="container hero__grid">
          <div>
            <BauhausAccent />
            <h2>{t.workPage.heading}</h2>
            <div className="hero__meta">
              <span>
                {t.projects.length} {t.workPage.projectsCount}
              </span>
              <span>{t.workPage.period}</span>
            </div>
          </div>
          <p className="hero__lead">{t.workPage.lead}</p>
        </div>
      </section>

      <section className="works page-section">
        <div className="container">
          <div className="section-head">
            <h2>{t.workPage.projects}</h2>
            <span className="label">{t.workPage.subtitle}</span>
          </div>
          <ProjectGrid />
        </div>
      </section>
    </>
  )
}
