import { BauhausAccent } from '../components/BauhausAccent'
import { ProjectGrid } from '../components/ProjectGrid'
import { useTranslation } from '../i18n/I18nContext'

export function WorkPage() {
  const { t } = useTranslation()
  const periodA = t.projects.filter((project) => project.period === 'a')
  const periodB = t.projects.filter((project) => project.period === 'b')

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
            <h2>{t.workPage.periodA}</h2>
            <span className="label">{t.workPage.periodASubtitle}</span>
          </div>
          <ProjectGrid projects={periodA} />
        </div>
      </section>

      <section className="works page-section">
        <div className="container">
          <div className="section-head">
            <h2>{t.workPage.periodB}</h2>
            <span className="label">{t.workPage.periodBSubtitle}</span>
          </div>
          <ProjectGrid projects={periodB} />
        </div>
      </section>
    </>
  )
}
