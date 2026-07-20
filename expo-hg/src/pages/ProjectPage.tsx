import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ProjectSlider } from '../components/ProjectSlider'
import { useTranslation } from '../i18n/I18nContext'

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  const project = t.projects.find((item) => item.slug === slug)

  if (!project) {
    return <Navigate to="/work" replace />
  }

  const images =
    project.images.filter(Boolean).length > 0
      ? project.images.filter(Boolean)
      : project.hero
        ? [project.hero]
        : Array.from({ length: 4 }, () => '')

  return (
    <>
      <section className="project-hero page-section">
        <div className="container project-hero__grid">
          <div
            className="project-hero__media"
            role="img"
            aria-label={`${t.common.placeholderFor} ${project.title}`}
          >
            {project.hero ? (
              <img src={project.hero} alt={project.title} />
            ) : null}
          </div>

          <div className="project-hero__content">
            <p className="project-hero__meta">
              {project.type} · {project.year}
            </p>
            <h1>{project.title}</h1>
            <div
              className={
                expanded
                  ? 'project-hero__body is-expanded'
                  : 'project-hero__body'
              }
            >
              <p>{project.body}</p>
            </div>
            <button
              type="button"
              className="project-hero__more"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
            >
              {expanded ? t.projectPage.readLess : t.projectPage.readMore}
            </button>
          </div>
        </div>
      </section>

      <section className="project-gallery page-section">
        <div className="container">
          <ProjectSlider
            images={images}
            title={project.title}
            placeholderLabel={t.common.placeholderFor}
            prevLabel={t.projectPage.prev}
            nextLabel={t.projectPage.next}
          />
        </div>
      </section>

      <div className="container project-back">
        <Link to="/work">{t.projectPage.back}</Link>
      </div>
    </>
  )
}
