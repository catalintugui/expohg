import { useRef } from 'react'

type ProjectSliderProps = {
  images: string[]
  title: string
  placeholderLabel: string
  prevLabel: string
  nextLabel: string
}

export function ProjectSlider({
  images,
  title,
  placeholderLabel,
  prevLabel,
  nextLabel,
}: ProjectSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollBy(direction: -1 | 1) {
    const track = trackRef.current
    if (!track) return
    const slide = track.querySelector<HTMLElement>('.project-slider__slide')
    if (!slide) return
    const gap = parseFloat(getComputedStyle(track).gap) || 0
    track.scrollBy({
      left: direction * (slide.offsetWidth + gap),
      behavior: 'smooth',
    })
  }

  return (
    <div className="project-slider">
      <div className="project-slider__controls">
        <button
          type="button"
          className="project-slider__btn"
          onClick={() => scrollBy(-1)}
          aria-label={prevLabel}
        >
          ←
        </button>
        <button
          type="button"
          className="project-slider__btn"
          onClick={() => scrollBy(1)}
          aria-label={nextLabel}
        >
          →
        </button>
      </div>

      <div ref={trackRef} className="project-slider__track">
        {images.map((src, index) => (
          <div key={`${src || 'placeholder'}-${index}`} className="project-slider__slide">
            {src ? (
              <img src={src} alt={`${title} — ${index + 1}`} loading="lazy" />
            ) : (
              <div
                className="project-slider__placeholder"
                role="img"
                aria-label={`${placeholderLabel} ${title} ${index + 1}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
