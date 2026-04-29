import { useRef } from 'react'
import { gsap, useGSAP, hasReducedMotion } from '../lib/gsap'
import Button from './ui/button'

const CONTACT_EMAIL = 'awaismehngaa@gmail.com'

const SOCIAL_LINKS = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/awaismehnga' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/awaismehnga' },
  { id: 'phone', label: '+92 314 3151021', href: 'tel:+923143151021' },
]

function Contact() {
  const sectionRef = useRef(null)
  const introRef = useRef(null)
  const statusRef = useRef(null)
  const socialRefs = useRef([])
  const formRef = useRef(null)

  useGSAP(
    () => {
      if (hasReducedMotion()) {
        return
      }

      const socials = socialRefs.current.filter(Boolean)

      gsap.fromTo(
        introRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
          },
        },
      )

      gsap.fromTo(
        statusRef.current,
        { y: 18, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.46,
          ease: 'back.out(1.15)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        },
      )

      gsap.fromTo(
        socials,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.46,
          ease: 'power3.out',
          stagger: 0.09,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 74%',
          },
        },
      )

      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.76,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        },
      )
    },
    { scope: sectionRef },
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const message = String(formData.get('message') || '').trim()

    const subject = encodeURIComponent(`Project inquiry from ${name || 'Portfolio visitor'}`)
    const body = encodeURIComponent(
      [
        `Name: ${name || 'Not provided'}`,
        `Email: ${email || 'Not provided'}`,
        '',
        'Project details:',
        message || 'Not provided',
      ].join('\n'),
    )

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    form.reset()
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="overflow-hidden pb-8"
    >
      <div className="mx-auto max-w-350 px-(--ds-space-container-x)">
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div ref={introRef} className="space-y-5">
            <h2 className="m-0 text-title font-semibold tracking-[-0.02em] text-ink">Software Engineer</h2>
            <p className="max-w-[44ch] text-subtitle text-ink/75">
              Let's talk and create something that has positive impact on people's lives. I am currently open to new opportunities and collaborations.
            </p>

            <div
              ref={statusRef}
              className="inline-flex items-center gap-2.5 rounded-chip border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-chip font-medium text-emerald-700"
            >
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Available for new projects
            </div>


            <ul className="flex flex-wrap gap-3 p-0">
              {SOCIAL_LINKS.map((item, index) => (
                <li
                  key={item.id}
                  ref={(node) => {
                    socialRefs.current[index] = node
                  }}
                  className="list-none"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-chip border border-border bg-surface px-4 py-2.5 font-mono text-chip font-medium text-ink/85 no-underline transition-[transform,border-color,background-color,color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand hover:bg-brand-soft hover:text-brand hover:shadow-[0_8px_24px_rgba(236,46,58,0.2)]"
                  >
                    {item.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form
            id="footer-contact-form"
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-[1.2rem] border border-border bg-surface p-5 shadow-[0_18px_44px_rgba(0,0,0,0.08)]"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-chip font-medium text-ink/75">Name</span>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Muhammad Awais"
                  className="rounded-chip border border-border bg-surface px-3 py-2.5 text-chip text-ink outline-none transition-[border-color,box-shadow] duration-200 ease-out focus:border-brand focus:shadow-[0_0_0_4px_rgba(236,46,58,0.2)]"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-chip font-medium text-ink/75">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="rounded-chip border border-border bg-surface px-3 py-2.5 text-chip text-ink outline-none transition-[border-color,box-shadow] duration-200 ease-out focus:border-brand focus:shadow-[0_0_0_4px_rgba(236,46,58,0.2)]"
                />
              </label>

              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-chip font-medium text-ink/75">Project Brief</span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me what you are building, scope, and expected timeline."
                  className="resize-y rounded-card border border-border bg-surface px-3 py-2.5 text-chip text-ink outline-none transition-[border-color,box-shadow] duration-200 ease-out focus:border-brand focus:shadow-[0_0_0_4px_rgba(236,46,58,0.2)]"
                />
              </label>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button disabled type="submit" size="default">
                Send Message
              </Button>
              <p className="m-0 text-chip text-ink/65">This is coming soon!</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
