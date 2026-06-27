import { useTranslation } from '../i18n/I18nContext'

export function HomePage() {
  const { t } = useTranslation()
  const [details, quality, craft] = t.home.blocks

  return (
    <div className="home">
      <section className="home-intro">
        <div
          className="home-intro__visual home-intro__visual--blue"
          role="img"
          aria-hidden="true"
        />
        <div className="home-intro__text">
          <h2 className="home-heading">{t.home.studio.title}</h2>
          <p className="home-body">{t.home.studio.text}</p>
        </div>
      </section>

      <div className="home-divider container">
        <div className="home-divider__label">
          <span className="home-divider__accent" aria-hidden="true" />
          <span className="label">{t.home.ethosLabel}</span>
        </div>
        <hr className="home-divider__line" />
      </div>

      <section className="home-ethos container">
        <article className="home-ethos__block home-ethos__block--details">
          <h2 className="home-heading">{details.title}</h2>
          <p className="home-body">{details.text}</p>
        </article>

        <div
          className="home-ethos__visual home-ethos__visual--red"
          role="img"
          aria-hidden="true"
        />

        <article className="home-ethos__block home-ethos__block--quality">
          <h2 className="home-heading">{quality.title}</h2>
          <p className="home-body">{quality.text}</p>
        </article>

        <article className="home-ethos__block home-ethos__block--craft">
          <h2 className="home-heading">{craft.title}</h2>
          <p className="home-body">{craft.text}</p>
        </article>

        <div className="home-ethos__accents" aria-hidden="true">
          <span className="home-ethos__accent home-ethos__accent--yellow" />
          <span className="home-ethos__accent home-ethos__accent--black" />
        </div>
      </section>
    </div>
  )
}
