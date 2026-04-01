import { useRef } from 'react'
import { gsap, useGSAP, hasReducedMotion } from '../../lib/gsap'
import { testimonials } from '../../data/trustData'
import SectionHeader from '../ui/section-header'

function TestimonialsSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const railRef = useRef(null)
  const cardRefs = useRef([])

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
        { x: 66, y: 24, opacity: 0, rotateY: -10, scale: 0.97, transformPerspective: 1200 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          rotateY: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power4.out',
          stagger: { amount: 0.36, from: 'start' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
          },
        },
      )

      gsap.to(railRef.current, {
        xPercent: -4,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      const cleanup = cardRefs.current.map((card) => {
        if (!card) {
          return () => {}
        }

        const xTo = gsap.quickTo(card, 'x', { duration: 0.3, ease: 'power3.out' })
        const yTo = gsap.quickTo(card, 'y', { duration: 0.3, ease: 'power3.out' })
        const rotateYTo = gsap.quickTo(card, 'rotateY', { duration: 0.3, ease: 'power3.out' })
        const rotateXTo = gsap.quickTo(card, 'rotateX', { duration: 0.3, ease: 'power3.out' })

        const handleMove = (event) => {
          const rect = card.getBoundingClientRect()
          const relX = (event.clientX - rect.left) / rect.width - 0.5
          const relY = (event.clientY - rect.top) / rect.height - 0.5

          xTo(relX * 7)
          yTo(relY * 5)
          rotateYTo(relX * 8)
          rotateXTo(relY * -8)
        }

        const handleLeave = () => {
          xTo(0)
          yTo(0)
          rotateYTo(0)
          rotateXTo(0)
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
      id="testimonials"
      ref={sectionRef}
      className="bg-[radial-gradient(circle_at_bottom_right,_rgba(5,19,22,0.08),_transparent_34%),#fff] py-[var(--ds-space-section-y)]"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-[var(--ds-space-container-x)]">
        <div ref={headerRef}>
          <SectionHeader title="Testimonials" description="What clients and managers said after shipping together." />
        </div>

        <div ref={railRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:thin]">
          {testimonials.map((item, index) => (
            <article
              key={item.id}
              ref={(node) => {
                cardRefs.current[index] = node
              }}
              className="min-w-[19rem] max-w-[22rem] shrink-0 snap-start rounded-[1.2rem] border border-border/80 bg-surface p-5 shadow-none [transform-style:preserve-3d] will-change-transform"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={`${item.author} avatar`}
                    loading="lazy"
                    className="h-12 w-12 rounded-full border border-border object-cover"
                  />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-chip font-semibold text-ink/80">{item.author}</p>
                    <p className="text-chip text-ink/60">{item.title}</p>
                  </div>
                </div>
                <p className="text-subtitle text-ink/65">&ldquo;{item.quote}&rdquo;</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
