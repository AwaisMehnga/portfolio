import { useRef } from 'react'
import { gsap, useGSAP, hasReducedMotion } from '../../lib/gsap'
import SectionHeader from '../ui/section-header'
import { stats } from '../../data/trustData'

function StatisticsSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const railRef = useRef(null)
  const cardRefs = useRef([])
  const statRefs = useRef([])

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
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        },
      )

      gsap.fromTo(
        cardRefs.current,
        { y: 44, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          ease: 'power4.out',
          stagger: { amount: 0.25, from: 'start' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        },
      )

      gsap.to(railRef.current, {
        xPercent: -3.5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.9,
        },
      })

      statRefs.current.forEach((el, index) => {
        if (!el) {
          return
        }

        const targetValue = Number(el.dataset.value || 0)
        const suffix = el.dataset.suffix || ''
        const counter = { value: 0 }

        gsap.to(counter, {
          value: targetValue,
          duration: 1,
          delay: index * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}${suffix}`
          },
        })
      })

      const cleanup = cardRefs.current.map((card) => {
        if (!card) {
          return () => {}
        }

        const xTo = gsap.quickTo(card, 'x', { duration: 0.35, ease: 'power3.out' })
        const yTo = gsap.quickTo(card, 'y', { duration: 0.35, ease: 'power3.out' })

        const handleMove = (event) => {
          const rect = card.getBoundingClientRect()
          const relX = (event.clientX - rect.left) / rect.width - 0.5
          const relY = (event.clientY - rect.top) / rect.height - 0.5
          xTo(relX * 6)
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
    { scope: sectionRef }
  )

  return (
    <section id="statistics" ref={sectionRef} className="bg-surface py-[var(--ds-space-section-y)]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-[var(--ds-space-container-x)]">
        <div ref={headerRef}>
          <SectionHeader title="Statistics" description="A quick numeric snapshot of delivery and consistency." />
        </div>
        <div ref={railRef} className="flex gap-4 overflow-x-auto pb-2">
          {stats.map((item, index) => (
            <article
              key={item.id}
              ref={(node) => {
                cardRefs.current[index] = node
              }}
              className="min-w-[14rem] flex-1 rounded-[1rem] border border-border bg-[linear-gradient(165deg,rgba(236,46,58,0.06),rgba(255,255,255,0.95))] p-5 will-change-transform"
            >
              <div className="flex flex-col gap-1.5">
                <p
                  ref={(node) => {
                    statRefs.current[index] = node
                  }}
                  data-value={item.value}
                  data-suffix={item.suffix}
                  className="text-[clamp(1.6rem,2.8vw,2.15rem)] font-extrabold tracking-[-0.02em]"
                >
                  0{item.suffix}
                </p>
                <p className="text-chip text-ink/70">{item.label}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatisticsSection
