import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, hasReducedMotion } from '../../lib/gsap'
import SectionHeader from '../ui/section-header'
import { stats } from '../../data/trustData'

function StatisticsSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
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

      const counterTweens = []
      const counterTriggers = []

      statRefs.current.forEach((el, index) => {
        if (!el) {
          return
        }

        const targetValue = Number(el.dataset.value || 0)
        const suffix = el.dataset.suffix || ''
        const counter = { value: 0 }
        let activeTween = null

        const startCounter = () => {
          if (activeTween) {
            activeTween.kill()
          }

          counter.value = 0
          el.textContent = `0${suffix}`

          activeTween = gsap.to(counter, {
            value: targetValue,
            duration: 1,
            delay: index * 0.08,
            ease: 'power2.out',
            overwrite: true,
            onUpdate: () => {
              el.textContent = `${Math.round(counter.value)}${suffix}`
            },
          })

          counterTweens.push(activeTween)
        }

        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: startCounter,
          onEnterBack: startCounter,
          onLeaveBack: () => {
            if (activeTween) {
              activeTween.kill()
            }

            counter.value = 0
            el.textContent = `0${suffix}`
          },
        })

        counterTriggers.push(trigger)
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
        counterTweens.forEach((tween) => tween.kill())
        counterTriggers.forEach((trigger) => trigger.kill())
      }
    },
    { scope: sectionRef }
  )

  return (
    <section id="statistics" ref={sectionRef} className="overflow-hidden bg-surface py-(--ds-space-section-y)">
      <div className="mx-auto flex max-w-350 flex-col gap-4 px-(--ds-space-container-x)">
        <div ref={headerRef}>
          <SectionHeader title="Statistics" description="A quick numeric snapshot of delivery and consistency." />
        </div>
        <div className="flex gap-4 overflow-x-auto overflow-y-hidden pb-2">
          {stats.map((item, index) => (
            <article
              key={item.id}
              ref={(node) => {
                cardRefs.current[index] = node
              }}
              className="min-w-56 flex-1 rounded-[1rem] border border-border bg-[linear-gradient(165deg,rgba(236,46,58,0.06),rgba(255,255,255,0.95))] p-5 will-change-transform"
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
