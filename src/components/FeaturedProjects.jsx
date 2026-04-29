import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './ui/button'
import SectionHeader from './ui/section-header'
import { featuredProjects } from '../data/projects'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function FeaturedProjects() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef([])

  useGSAP(
    () => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      )

      gsap.fromTo(
        cardsRef.current,
        { y: 56, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        }
      )

      const cleanup = cardsRef.current.map((card) => {
        if (!card) {
          return () => {}
        }

        const rotateXTo = gsap.quickTo(card, 'rotateX', { duration: 0.35, ease: 'power3.out' })
        const rotateYTo = gsap.quickTo(card, 'rotateY', { duration: 0.35, ease: 'power3.out' })
        const xTo = gsap.quickTo(card, 'x', { duration: 0.35, ease: 'power3.out' })
        const yTo = gsap.quickTo(card, 'y', { duration: 0.35, ease: 'power3.out' })

        const handleMove = (event) => {
          const rect = card.getBoundingClientRect()
          const relX = (event.clientX - rect.left) / rect.width - 0.5
          const relY = (event.clientY - rect.top) / rect.height - 0.5

          rotateXTo(relY * -8)
          rotateYTo(relX * 10)
          xTo(relX * 10)
          yTo(relY * 8)
        }

        const handleLeave = () => {
          rotateXTo(0)
          rotateYTo(0)
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
        cleanup.forEach((cb) => cb())
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="featured-projects"
      ref={sectionRef}
      className="relative overflow-hidden bg-surface py-(--ds-space-section-y)"
    >
      <div className="relative mx-auto max-w-350 px-(--ds-space-container-x)">
        <div ref={titleRef} className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            title="Featured Projects"
            description="Selected work from my project directory."
          />
          <a
            href="#featured-projects"
            className="inline-flex items-center gap-2 rounded-chip border border-border bg-surface px-5 py-3 font-mono text-chip font-medium no-underline transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_8px_24px_rgba(236,46,58,0.2)]"
          >
            Explore all projects
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <article
              key={project.id}
              ref={(node) => {
                cardsRef.current[index] = node
              }}
              className="group relative overflow-hidden rounded-[1.4rem] border border-border/80 bg-surface/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] transform-3d"
            >
              <div className="relative overflow-hidden rounded-[1rem] border border-border/90">
                <img
                  src={project.thumbnail}
                  alt={`${project.title} project thumbnail`}
                  loading="lazy"
                  className="aspect-16/10 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-ink/15 via-transparent to-transparent opacity-90" />
              </div>

              <div className="pt-4">
                <h3 className="m-0 text-[clamp(1.1rem,1.8vw,1.5rem)] font-semibold tracking-[-0.015em]">{project.title}</h3>
                <p className="mt-2 text-subtitle text-ink/80">{project.description}</p>

                <ul className="mt-4 flex flex-wrap gap-2 p-0">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="list-none rounded-chip border border-border bg-surface px-3 py-1.5 font-mono text-chip"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-3">
                  {
                    project?.urls?.length > 0 && project?.urls?.map((url) => (
                      <Button as="a" href={url.href} target="_blank" rel="noreferrer" size="sm" variant={url.variant || 'secondary'}>
                        {url.label}
                      </Button>
                    ))
                  }
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
