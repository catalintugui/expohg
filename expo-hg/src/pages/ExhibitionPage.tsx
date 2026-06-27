import { BauhausAccent } from '../components/BauhausAccent'
import { useTranslation } from '../i18n/I18nContext'

export function ExhibitionPage() {
  const { t } = useTranslation()

  return (
    <>
      <section className="hero page-section">
        <div className="container hero__grid">
          <div>
            <BauhausAccent />
            <h2>{t.exhibitionPage.heading}</h2>
            <div className="hero__meta">
              <span>{t.exhibition.dates}</span>
              <span>{t.exhibition.venue}</span>
            </div>
          </div>
          <p className="hero__lead">
            {t.exhibition.title} {t.exhibitionPage.lead}
          </p>
        </div>
      </section>

      <section className="statement page-section">
        <div className="container statement__inner">
          <h2>{t.exhibitionPage.statement}</h2>
          <div className="statement__text">
            <p>{t.exhibition.statement[0]}</p>
            <p>{t.exhibition.statement[1]}</p>
          </div>
        </div>
      </section>

      <section className="visit page-section">
        <div className="container">
          <h2>{t.exhibitionPage.visit}</h2>
          <div className="visit__grid">
            <div className="visit__block">
              <span className="label">{t.exhibitionPage.hours}</span>
              <p>
                <strong>{t.exhibitionPage.days}</strong>
                {t.exhibitionPage.time}
                <br />
                {t.exhibitionPage.closedMondays}
              </p>
            </div>
            <div className="visit__block">
              <span className="label">{t.exhibitionPage.address}</span>
              <p>
                <strong>{t.exhibition.venue}</strong>
                {t.exhibition.street}
                <br />
                {t.exhibition.city}
              </p>
            </div>
            <div className="visit__block">
              <span className="label">{t.exhibitionPage.admission}</span>
              <p>
                <strong>{t.exhibitionPage.tickets}</strong>
                {t.exhibition.admission}
                <br />
                {t.exhibitionPage.freeUnder18}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
