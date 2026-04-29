import { useRef } from 'react'
import { gsap, useGSAP, hasReducedMotion } from '../lib/gsap'
import { skillGroups } from '../data/skills'
import SectionHeader from './ui/section-header'

function TechStack() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const groupRefs = useRef({})
  const skillRefs = useRef({})

  useGSAP(
    () => {
      if (hasReducedMotion()) {
        return
      }

      const groupNodes = Object.values(groupRefs.current).filter(Boolean)
      const skillNodes = Object.values(skillRefs.current).filter(Boolean)

      gsap.fromTo(
        headerRef.current,
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        },
      )

      gsap.fromTo(
        groupNodes,
        { y: 56, opacity: 0, rotateX: 10, scale: 0.97, transformPerspective: 1200 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 0.82,
          ease: 'power4.out',
          stagger: { amount: 0.32, from: 'start' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 66%',
          },
        },
      )

      gsap.fromTo(
        skillNodes,
        { y: 18, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'power3.out',
          stagger: { each: 0.03, from: 'random' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 58%',
          },
        },
      )

      const cleanup = groupNodes.map((card) => {
        const xTo = gsap.quickTo(card, 'x', { duration: 0.35, ease: 'power3.out' })
        const yTo = gsap.quickTo(card, 'y', { duration: 0.35, ease: 'power3.out' })
        const rotateXTo = gsap.quickTo(card, 'rotateX', { duration: 0.35, ease: 'power3.out' })
        const rotateYTo = gsap.quickTo(card, 'rotateY', { duration: 0.35, ease: 'power3.out' })

        const handleMove = (event) => {
          const rect = card.getBoundingClientRect()
          const relX = (event.clientX - rect.left) / rect.width - 0.5
          const relY = (event.clientY - rect.top) / rect.height - 0.5

          xTo(relX * 8)
          yTo(relY * 6)
          rotateXTo(relY * -7)
          rotateYTo(relX * 7)
        }

        const handleLeave = () => {
          xTo(0)
          yTo(0)
          rotateXTo(0)
          rotateYTo(0)
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
    <section
      id="tech-stack"
      ref={sectionRef}
      className="bg-[radial-gradient(circle_at_top_left,rgba(236,46,58,0.08),transparent_42%),#fff] py-(--ds-space-section-y)"
    >
      <div className="mx-auto max-w-350 px-(--ds-space-container-x)">
        <div ref={headerRef} className="mb-12 max-w-3xl">
          <SectionHeader
            title="Tech Stack"
            description="Frontend, backend, APIs, and engineering practices used to ship maintainable software."
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.id}
              ref={(node) => {
                groupRefs.current[group.id] = node
              }}
              className="group rounded-[1.25rem] border border-border bg-surface p-5 shadow-[0_14px_35px_rgba(0,0,0,0.06)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] transform-3d will-change-transform"
            >
              <div className={`mb-4 rounded-card bg-linear-to-r ${group.accentClass} p-4`}>
                <h3 className="m-0 text-[1.15rem] font-semibold tracking-[-0.015em]">{group.title}</h3>
                <p className="mt-1 text-chip text-ink/80">{group.description}</p>
              </div>

              <ul className="grid grid-cols-2 gap-2 p-0">
                {group.skills.map((skill) => (
                  <li key={skill.name} className="list-none">
                    <button
                      type="button"
                      ref={(node) => {
                        skillRefs.current[`${group.id}-${skill.name}`] = node
                      }}
                      className="flex w-full items-center gap-2 rounded-chip border border-border bg-surface px-3 py-2 text-left transition-[transform,border-color,background-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand hover:bg-brand-soft/40 hover:shadow-[0_8px_20px_rgba(236,46,58,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface font-mono text-[0.7rem] font-semibold tracking-[0.08em]">
                        {skill.iconLabel}
                      </span>
                      <span className="text-chip font-medium">{skill.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack
