import { useRef } from 'react'
import { gsap, useGSAP, hasReducedMotion } from '../../lib/gsap'
import { certifications } from '../../data/trustData'
import SectionHeader from '../ui/section-header'

function CertificationsSection() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const proofRefs = useRef([])

  useGSAP(
    () => {
      if (hasReducedMotion()) {
        return
      }

      gsap.fromTo(
        cardRefs.current,
        { y: 52, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.72,
          ease: 'power4.out',
          stagger: { amount: 0.25, from: 'start' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        },
      )

      gsap.fromTo(
        proofRefs.current,
        { x: -14, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power3.out',
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

        const xTo = gsap.quickTo(card, 'x', { duration: 0.35, ease: 'power3.out' })
        const yTo = gsap.quickTo(card, 'y', { duration: 0.35, ease: 'power3.out' })
        const rotateYTo = gsap.quickTo(card, 'rotateY', { duration: 0.35, ease: 'power3.out' })

        const handleMove = (event) => {
          const rect = card.getBoundingClientRect()
          const relX = (event.clientX - rect.left) / rect.width - 0.5
          const relY = (event.clientY - rect.top) / rect.height - 0.5
          xTo(relX * 6)
          yTo(relY * 4)
          rotateYTo(relX * 7)
        }

        const handleLeave = () => {
          xTo(0)
          yTo(0)
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
    <section id="certifications" ref={sectionRef} className="bg-surface pt-3 pb-[var(--ds-space-section-y)]">
      <div className="mx-auto max-w-[1400px] px-[var(--ds-space-container-x)]">
        <SectionHeader
          title="Certifications"
          description="Verified credentials and proof links."
          className="sr-only"
        />
        <ul className="grid gap-4 md:grid-cols-2 p-0">
          {certifications.map((item, index) => (
            <li
              key={item.id}
              ref={(node) => {
                cardRefs.current[index] = node
              }}
              className="list-none rounded-[1.1rem] border border-border bg-surface p-5 shadow-none [transform-style:preserve-3d] will-change-transform"
            >
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-chip uppercase tracking-[0.12em] text-brand">{item.type}</p>
                <h3 className="text-[1.02rem] font-semibold text-ink/80">{item.title}</h3>
                <p className="text-chip text-ink/65">{item.issuer}</p>
                <p className="text-chip text-ink/55">{item.year}</p>
                <a
                  href={item.proofUrl}
                  target="_blank"
                  rel="noreferrer"
                  ref={(node) => {
                    proofRefs.current[index] = node
                  }}
                  className="inline-flex items-center self-start rounded-chip border border-border px-3 py-1.5 font-mono text-chip text-ink/75 no-underline transition-[border-color,color,background-color] duration-200 ease-out hover:border-brand hover:bg-brand-soft hover:text-brand"
                >
                  View Certification Proof
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default CertificationsSection
