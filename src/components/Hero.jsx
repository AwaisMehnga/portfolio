import { useState } from 'react'

const HERO_SKILLS = [
  { name: 'TypeScript', left: 61.2553, top: 60.2133, depth: 0.8178058871647367 },
  { name: 'React', left: 25.9672, top: 18.7964, depth: 0.8247488207682279 },
  { name: 'Next.js', left: 57.7336, top: 81.3287, depth: 1.8056586929948646 },
  { name: 'Node.js', left: 42.3866, top: 81.7618, depth: 0.7453962859179919 },
  { name: 'Tailwind CSS', left: 11.3893, top: 49.5684, depth: 1.9067226996732916 },
  { name: 'Express', left: 76.6464, top: 35.2456, depth: 1.3182042352049885 },
  { name: 'Vue.js', left: 86.8276, top: 76.6151, depth: 1.1045883712664686 },
  { name: 'Flutter', left: 11.9497, top: 52.6936, depth: 1.3007482110206914 },
  { name: 'GraphQL', left: 41.3606, top: 68.4073, depth: 1.8882189753255987 },
  { name: 'REST APIs', left: 20.1535, top: 72.0313, depth: 0.7994124553836138 },
  { name: 'PostgreSQL', left: 17.8761, top: 75.0136, depth: 1.4739351496131554 },
  { name: 'MongoDB', left: 69.7436, top: 40.2418, depth: 0.6708455230280264 },
  { name: 'Prisma', left: 48.4305, top: 14.8901, depth: 1.2583714729494937 },
  { name: 'Supabase', left: 44.1441, top: 11.5747, depth: 1.6356114694932629 },
  { name: 'Firebase', left: 17.3467, top: 32.1782, depth: 1.6695744675093773 },
  { name: 'Docker', left: 55.1359, top: 56.0599, depth: 1.886555270588578 },
  { name: 'AWS', left: 80.1112, top: 17.9432, depth: 1.5962655744090561 },
  { name: 'Web3', left: 35.3363, top: 60.378, depth: 1.4775825455085712 },
  { name: 'Testing', left: 37.9472, top: 37.7654, depth: 1.900449629941143 },
  { name: 'Jest', left: 47.6155, top: 78.5397, depth: 1.9465187969353877 },
  { name: 'Playwright', left: 53.8427, top: 36.4698, depth: 1.5295829902613485 },
  { name: 'CI/CD', left: 77.9185, top: 64.5095, depth: 0.755110518287372 },
  { name: 'Vite', left: 79.2056, top: 40.3979, depth: 1.4112674812063097 },
  { name: 'Framer Motion', left: 83.7382, top: 15.3996, depth: 1.1853594800804699 },
  { name: 'Accessibility', left: 78.4274, top: 62.0874, depth: 0.8203887288221656 },
  { name: 'Figma', left: 79.2709, top: 87.4884, depth: 0.6426627076321443 },
]

function Hero() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    setPointer({ x, y })
  }

  return (
    <section className="flex min-h-screen flex-col overflow-hidden bg-surface text-ink">
      <div className="relative z-[100] flex w-screen min-h-[40rem] flex-1 flex-row overflow-hidden max-[991px]:min-h-[34rem] max-[767px]:min-h-[28rem]">
        <div
          id="heroScene"
          className="relative flex w-full flex-wrap items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setPointer({ x: 0, y: 0 })}
        >
          <div
            className="pointer-events-none absolute z-[1000] block transition-transform duration-200 ease-out max-[991px]:relative"
            style={{
              transform: `translate3d(${pointer.x * 16}px, ${pointer.y * 10}px, 0px)`,
            }}
          >
            <div className="z-[1000] flex items-center bg-[url('https://wellfound.com/landing-page-assets/64626a4a74818ca87606a29e/646da3412c037b5778b74830_gradient-shadow.png')] bg-cover bg-[0_0] p-[var(--ds-space-hero-pad)]">
              <div className="rounded-card border-2 border-dashed border-brand bg-surface px-6 pb-3 pt-5 md:px-9 md:pb-4 md:pt-7">
                <p className="mb-2 text-center text-subtitle font-medium text-muted">
                  Full Stack Software Developer
                </p>
                <h1 className="m-0 text-center text-display font-semibold tracking-[-0.04em]">
                  Muhammad Awais
                </h1>
              </div>
            </div>
          </div>

          {HERO_SKILLS.map((skill, index) => (
            <a
              key={skill.name}
              href="#"
              className={`absolute z-[1] inline-block rounded-chip border border-border bg-surface px-6 py-3.5 font-mono text-chip no-underline shadow-chip transition-[transform,color,font-size,box-shadow,background-color,border-color,padding] duration-[800ms] ease-out hover:z-[1001] hover:border-brand hover:bg-brand-soft hover:px-10 hover:py-6 hover:text-button hover:text-brand hover:shadow-[0_0_0_8px_rgba(236,46,58,0.25)] max-[991px]:px-4 max-[991px]:py-2.5 max-[991px]:hover:px-4 max-[991px]:hover:py-2.5 ${
                index >= 13 ? 'max-[767px]:hidden' : ''
              }`}
              style={{
                left: `${skill.left}%`,
                top: `${skill.top}%`,
                transform: `translate3d(${pointer.x * 72 * skill.depth}px, ${pointer.y * 56 * skill.depth}px, 0px)`,
              }}
            >
              <span className="block">{skill.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border py-[var(--ds-space-section-y)] max-[767px]:px-4">
        <div className="mx-auto max-w-[1400px] px-[var(--ds-space-container-x)] max-[767px]:px-0">
          <div className="flex flex-col items-center justify-between gap-10 max-[991px]:gap-6">
            <h2 className="m-0 text-center text-title font-semibold tracking-[-0.02em]">
              Building products that people love to use
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="#"
                className="inline-block h-auto rounded-button border border-ink bg-ink px-12 py-6 text-center text-button font-medium text-surface no-underline transition-all duration-300 hover:border-brand hover:bg-brand-soft hover:text-brand hover:shadow-[0_0_0_4px_rgba(236,46,58,0.25)] max-[991px]:px-6 max-[991px]:py-4 max-[767px]:w-full"
              >
                View My Projects
              </a>
              <a
                href="#"
                className="inline-block h-auto rounded-button border border-border bg-surface px-12 py-6 text-center text-button font-medium text-ink no-underline transition-all duration-300 hover:border-brand hover:bg-brand-soft hover:text-brand hover:shadow-[0_0_0_4px_rgba(236,46,58,0.25)] max-[991px]:px-6 max-[991px]:py-4 max-[767px]:w-full"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
