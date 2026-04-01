import { useRef } from 'react'
import { gsap, useGSAP, hasReducedMotion } from '../../lib/gsap'
import { education } from '../../data/trustData'
import SectionHeader from '../ui/section-header'

function EducationSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardRefs = useRef([])

  useGSAP(
    () => {
      if (hasReducedMotion()) {
        return
      }

      gsap.fromTo(
        headerRef.current,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.68,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        },
      )

      gsap.fromTo(
        cardRefs.current,
        { y: 42, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: 'power4.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        },
      )

      const cleanup = cardRefs.current.map((card) => {
        if (!card) {
          return () => {}
        }

        const xTo = gsap.quickTo(card, 'x', { duration: 0.3, ease: 'power3.out' })
        const yTo = gsap.quickTo(card, 'y', { duration: 0.3, ease: 'power3.out' })

        const handleMove = (event) => {
          const rect = card.getBoundingClientRect()
          const relX = (event.clientX - rect.left) / rect.width - 0.5
          const relY = (event.clientY - rect.top) / rect.height - 0.5
          xTo(relX * 5)
          yTo(relY * 4)
        }

        const handleLeave = () => {
          xTo(0)
          yTo(0)
        }

        card.addEventListener('mousemove', handleMove)
        card.addEventListener('mouseleave', handleLeave)

        return () => {
          card.removeEventListener('mousemove', handleMove)
          card.removeEventListener('mouseleave', handleLeave)
        }
      })

      return () => {
        cleanup.forEach((dispose) => dispose())
      }
    },
    { scope: sectionRef },
  )

  return (
    <section id="education" ref={sectionRef} className="bg-surface pt-[var(--ds-space-section-y)] pb-5">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-[var(--ds-space-container-x)]">
        <div ref={headerRef}>
          <SectionHeader title="Education Background" />
        </div>

        <ul className="flex flex-col gap-4 p-0">
          {education.map((item, index) => (
            <li
              key={item.id}
              ref={(node) => {
                cardRefs.current[index] = node
              }}
              className="list-none w-full rounded-[1.1rem] border border-border bg-surface p-5 shadow-none will-change-transform"
            >
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-chip uppercase tracking-[0.12em] text-brand">{item.type}</p>
                <h3 className="text-[1.02rem] font-semibold text-ink/80">{item.title}</h3>
                <p className="text-chip text-ink/65">{item.issuer}</p>
                <p className="text-chip text-ink/55">{item.year}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default EducationSection
