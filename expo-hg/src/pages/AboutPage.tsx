import { BauhausAccent } from '../components/BauhausAccent'
import { useTranslation } from '../i18n/I18nContext'

export function AboutPage() {
  const { t } = useTranslation()

  return (
    <>
      <section className="hero page-section">
        <div className="container hero__grid">
          <div>
            <BauhausAccent />
            <h2>{t.aboutPage.heading}</h2>
            <div className="hero__meta">
              <span>{t.architect.role}</span>
              <span>{t.architect.location}</span>
            </div>
          </div>
          <p className="hero__lead">{t.aboutPage.lead}</p>
        </div>
      </section>

      <section className="about page-section">
        <div className="container about__inner">
          <div className="about__portrait" aria-hidden="true">
            <div className="about__portrait-frame" />
          </div>
          <div className="about__content">
            <h3>{t.architect.name}</h3>
            <p className="about__role">{t.architect.tagline}</p>
            {t.architect.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="about__bio">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="about-details page-section">
        <div className="container about-details__grid">
          <div className="about-details__block">
            <span className="label">{t.aboutPage.studio}</span>
            <p>
              <strong>{t.architect.name}</strong>
              {t.architect.location}
              <br />
              {t.architect.year}
            </p>
          </div>
          <div className="about-details__block">
            <span className="label">{t.aboutPage.contact}</span>
            <p>
              <strong>{t.aboutPage.enquiries}</strong>
              <a href={`mailto:${t.architect.email}`}>{t.architect.email}</a>
            </p>
          </div>
          <div className="about-details__block">
            <span className="label">{t.aboutPage.focus}</span>
            <p>
              <strong>{t.aboutPage.practice}</strong>
              {t.aboutPage.focusAreas}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
