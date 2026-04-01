import { useRef } from 'react'
import { gsap, useGSAP, hasReducedMotion } from '../../lib/gsap'
import SectionHeader from '../ui/section-header'
import { experienceTimeline } from '../../data/trustData'

function ExperienceSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const lineFillRef = useRef(null)
  const timelineItemsRef = useRef([])
  const markerRefs = useRef([])

  useGSAP(
    () => {
      if (hasReducedMotion()) {
        return
      }

      gsap.fromTo(
        headerRef.current,
        { y: 38, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        },
      )

      gsap.fromTo(
        lineFillRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            end: 'bottom 76%',
            scrub: 0.9,
          },
        },
      )

      gsap.to(markerRefs.current, {
        scale: 1.35,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.12 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play pause resume pause',
        },
      })

      timelineItemsRef.current.forEach((el, index) => {
        if (!el) {
          return
        }

        gsap.fromTo(
          el,
          {
            x: index % 2 === 0 ? -120 : 120,
            opacity: 0,
            rotateZ: index % 2 === 0 ? -1.8 : 1.8,
            filter: 'blur(8px)',
          },
          {
            x: 0,
            opacity: 1,
            rotateZ: 0,
            filter: 'blur(0px)',
            duration: 0.72,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 84%',
              once: true,
            },
          }
        )
      })

      const cleanup = timelineItemsRef.current.map((item) => {
        if (!item) {
          return () => {}
        }

        const card = item.querySelector('[data-exp-card]')
        if (!card) {
          return () => {}
        }

        const xTo = gsap.quickTo(card, 'x', { duration: 0.35, ease: 'power3.out' })
        const yTo = gsap.quickTo(card, 'y', { duration: 0.35, ease: 'power3.out' })
        const rotateXTo = gsap.quickTo(card, 'rotateX', { duration: 0.35, ease: 'power3.out' })
        const rotateYTo = gsap.quickTo(card, 'rotateY', { duration: 0.35, ease: 'power3.out' })

        const handleMove = (event) => {
          const rect = card.getBoundingClientRect()
          const relX = (event.clientX - rect.left) / rect.width - 0.5
          const relY = (event.clientY - rect.top) / rect.height - 0.5

          xTo(relX * 6)
          yTo(relY * 5)
          rotateXTo(relY * -6)
          rotateYTo(relX * 6)
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
    { scope: sectionRef }
  )

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="bg-[radial-gradient(circle_at_top_left,_rgba(236,46,58,0.12),_transparent_42%),#fff] py-[var(--ds-space-section-y)]"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12 px-[var(--ds-space-container-x)]">
        <div ref={headerRef}>
          <SectionHeader title="Experience" description="Career timeline with real delivery milestones." />
        </div>

        <div className="relative">
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border max-[991px]:left-3" />
          <span
            ref={lineFillRef}
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-brand max-[991px]:left-3"
          />
          <ol className="relative flex flex-col gap-8 p-0">
            {experienceTimeline.map((item, index) => {
              const isLeft = index % 2 === 0

              return (
                <li
                  key={item.id}
                  ref={(node) => {
                    timelineItemsRef.current[index] = node
                  }}
                  className={`relative list-none ${
                    isLeft ? 'pr-[52%] text-right max-[991px]:pr-0 max-[991px]:pl-12 max-[991px]:text-left' : 'pl-[52%] max-[991px]:pl-12'
                  }`}
                >
                  <span className="absolute left-1/2 top-9 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-brand bg-surface max-[991px]:left-3" />
                  <span
                    ref={(node) => {
                      markerRefs.current[index] = node
                    }}
                    className="absolute left-1/2 top-9 z-20 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand/75 max-[991px]:left-3"
                  />

                  <article
                    data-exp-card
                    className="inline-block w-full max-w-[34rem] rounded-[1.15rem] border border-border bg-surface/95 p-5 shadow-[0_16px_35px_rgba(0,0,0,0.08)] [transform-style:preserve-3d] will-change-transform"
                  >
                    <div className="flex flex-col gap-1.5">
                      <p className="font-mono text-chip uppercase tracking-[0.12em] text-brand">{item.period}</p>
                      <h3 className="text-[1.04rem] font-semibold tracking-[-0.01em]">{item.role}</h3>
                      <p className="text-chip text-ink/70">{item.org}</p>
                      <p className="text-subtitle text-ink/80">{item.summary}</p>
                    </div>
                  </article>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
