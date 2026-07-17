import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/I18nContext'
import type { Project } from '../i18n/types'

type ProjectGridProps = {
  projects?: Project[]
  limit?: number
}

export function ProjectGrid({ projects, limit }: ProjectGridProps) {
  const { t } = useTranslation()
  const items = limit ? t.projects.slice(0, limit) : (projects ?? t.projects)

  return (
    <div className="works__grid">
      {items.map((project) => (
        <Link
          key={project.slug}
          to={`/work/${project.slug}`}
          className="work-card"
        >
          <div
            className="work-card__frame"
            role="img"
            aria-label={`${t.common.placeholderFor} ${project.title}`}
          />
          <div className="work-card__body">
            <span className="work-card__index">{project.index}</span>
            <h3>{project.title}</h3>
            <p className="work-card__meta">
              {project.type} · {project.year}
            </p>
            <p className="work-card__desc">{project.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
