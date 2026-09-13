import { Navigate, useParams } from 'react-router-dom'
import { BauhausAccent } from '../components/BauhausAccent'
import { ProjectGrid } from '../components/ProjectGrid'
import { useTranslation } from '../i18n/I18nContext'
import type { Project } from '../i18n/types'
import {
  isWorkCategorySlug,
  WORK_CATEGORY_LABEL_KEYS,
  type WorkCategorySlug,
} from '../lib/workCategories'

type WorkPageProps = {
  period: Project['period']
}

const HOUSING_SECTION_ORDER = [
  'single-family',
  'semi-collective',
  'collective',
] as const

const HOUSING_SECTION_LABEL_KEYS = {
  'single-family': 'singleFamily',
  'semi-collective': 'semiCollective',
  collective: 'collective',
} as const

type HousingSectionKey = (typeof HOUSING_SECTION_ORDER)[number]

function isHousingSection(value: string): value is HousingSectionKey {
  return HOUSING_SECTION_ORDER.includes(value as HousingSectionKey)
}

export function WorkPage({ period }: WorkPageProps) {
  const { t } = useTranslation()
  const { category: categoryParam } = useParams<{ category?: string }>()

  if (categoryParam && !isWorkCategorySlug(categoryParam)) {
    return <Navigate to={period === 'a' ? '/work/romania/housing' : '/work/usa/housing'} replace />
  }

  const category = categoryParam as WorkCategorySlug | undefined
  const projects = t.projects.filter(
    (project) =>
      project.period === period && (!category || project.category === category),
  )
  const section =
    period === 'a'
      ? { title: t.workPage.periodRomania, subtitle: t.workPage.periodRomaniaSubtitle }
      : { title: t.workPage.periodSua, subtitle: t.workPage.periodSuaSubtitle }
  const categoryLabel = category
    ? t.workCategories[WORK_CATEGORY_LABEL_KEYS[category]]
    : null

  const groupedSections =
    category === 'housing'
      ? HOUSING_SECTION_ORDER.map((key) => ({
          key,
          title: t.housingSections[HOUSING_SECTION_LABEL_KEYS[key]],
          projects: projects.filter(
            (project) =>
              'section' in project &&
              typeof project.section === 'string' &&
              isHousingSection(project.section) &&
              project.section === key,
          ),
        })).filter((group) => group.projects.length > 0)
      : []

  const unsectioned =
    category === 'housing'
      ? projects.filter(
          (project) =>
            !('section' in project) ||
            typeof project.section !== 'string' ||
            !isHousingSection(project.section),
        )
      : projects

  return (
    <>
      <section className="hero page-section">
        <div className="container hero__grid">
          <div>
            <BauhausAccent />
            <h2>{t.workPage.heading}</h2>
            <div className="hero__meta">
              <span>
                {projects.length} {t.workPage.projectsCount}
              </span>
              <span>
                {section.subtitle}
                {categoryLabel ? ` · ${categoryLabel}` : ''}
              </span>
            </div>
          </div>
          <p className="hero__lead">{t.workPage.lead}</p>
        </div>
      </section>

      {groupedSections.length > 0 ? (
        groupedSections.map((group) => (
          <section key={group.key} className="works page-section">
            <div className="container">
              <div className="section-head">
                <h2>{group.title}</h2>
                <span className="label">
                  {section.subtitle}
                  {categoryLabel ? ` · ${categoryLabel}` : ''}
                </span>
              </div>
              <ProjectGrid projects={group.projects} />
            </div>
          </section>
        ))
      ) : (
        <section className="works page-section">
          <div className="container">
            <div className="section-head">
              <h2>{categoryLabel ?? section.title}</h2>
              <span className="label">
                {categoryLabel ? `${section.subtitle} · ${categoryLabel}` : section.subtitle}
              </span>
            </div>
            <ProjectGrid projects={unsectioned} />
          </div>
        </section>
      )}

      {groupedSections.length > 0 && unsectioned.length > 0 ? (
        <section className="works page-section">
          <div className="container">
            <div className="section-head">
              <h2>{categoryLabel ?? section.title}</h2>
              <span className="label">
                {categoryLabel ? `${section.subtitle} · ${categoryLabel}` : section.subtitle}
              </span>
            </div>
            <ProjectGrid projects={unsectioned} />
          </div>
        </section>
      ) : null}
    </>
  )
}
