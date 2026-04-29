import { useState } from 'react'
import Button from './ui/button'

const HERO_SKILLS = [
  { name: 'JavaScript (ES6+)', left: 61.2553, top: 60.2133, depth: 0.8178058871647367 },
  { name: 'React.js', left: 25.9672, top: 18.7964, depth: 0.8247488207682279 },
  { name: 'Next.js', left: 57.7336, top: 81.3287, depth: 1.8056586929948646 },
  { name: 'Node.js', left: 42.3866, top: 81.7618, depth: 0.7453962859179919 },
  { name: 'Tailwind CSS', left: 11.3893, top: 49.5684, depth: 1.9067226996732916 },
  { name: 'Laravel', left: 76.6464, top: 35.2456, depth: 1.3182042352049885 },
  { name: 'Python', left: 86.8276, top: 76.6151, depth: 1.1045883712664686 },
  { name: 'PHP', left: 11.9497, top: 52.6936, depth: 1.3007482110206914 },
  { name: 'MySQL', left: 41.3606, top: 68.4073, depth: 1.8882189753255987 },
  { name: 'REST APIs', left: 20.1535, top: 72.0313, depth: 0.7994124553836138 },
  { name: 'PostgreSQL', left: 17.8761, top: 75.0136, depth: 1.4739351496131554 },
  { name: 'Shopify API', left: 69.7436, top: 40.2418, depth: 0.6708455230280264 },
  { name: 'eBay API', left: 48.4305, top: 14.8901, depth: 1.2583714729494937 },
  { name: 'EtherJS', left: 44.1441, top: 11.5747, depth: 1.6356114694932629 },
  { name: 'Pinata', left: 17.3467, top: 32.1782, depth: 1.6695744675093773 },
  { name: 'Git', left: 55.1359, top: 56.0599, depth: 1.886555270588578 },
  { name: 'GitHub', left: 80.1112, top: 17.9432, depth: 1.5962655744090561 },
  { name: 'Solidity Fundamentals', left: 35.3363, top: 60.378, depth: 1.4775825455085712 },
  { name: 'Agile', left: 37.9472, top: 37.7654, depth: 1.900449629941143 },
  { name: 'Scrum', left: 47.6155, top: 78.5397, depth: 1.9465187969353877 },
  { name: 'Code Reviews', left: 53.8427, top: 36.4698, depth: 1.5295829902613485 },
  { name: 'Debugging', left: 77.9185, top: 64.5095, depth: 0.755110518287372 },
  { name: 'Software Design', left: 79.2056, top: 40.3979, depth: 1.4112674812063097 },
  { name: 'C/C++ Familiarity', left: 83.7382, top: 15.3996, depth: 1.1853594800804699 },
  { name: 'Automation', left: 78.4274, top: 62.0874, depth: 0.8203887288221656 },
  { name: 'Scalable Systems', left: 79.2709, top: 87.4884, depth: 0.6426627076321443 },
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
      <div className="relative z-100 flex w-screen min-h-160 flex-1 flex-row overflow-hidden max-[991px]:min-h-136 max-[767px]:min-h-112">
        <div
          id="heroScene"
          className="relative flex w-full flex-wrap items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setPointer({ x: 0, y: 0 })}
        >
          <div
            className="pointer-events-none absolute z-1000 block transition-transform duration-200 ease-out max-[991px]:relative"
            style={{
              transform: `translate3d(${pointer.x * 16}px, ${pointer.y * 10}px, 0px)`,
            }}
          >
            <div className="z-1000 flex items-center bg-[url('https://wellfound.com/landing-page-assets/64626a4a74818ca87606a29e/646da3412c037b5778b74830_gradient-shadow.png')] bg-cover bg-[0_0] p-(--ds-space-hero-pad)">
              <div className="rounded-card border-2 border-dashed border-brand bg-surface px-6 py-4 md:px-9 md:py-4 ">
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
              className={`absolute z-1 inline-block rounded-chip border border-border bg-surface px-6 py-3.5 font-mono text-chip no-underline shadow-chip transition-[transform,color,font-size,box-shadow,background-color,border-color,padding] duration-800 ease-out hover:z-1001 hover:border-brand hover:bg-brand-soft hover:px-10 hover:py-6 hover:text-button hover:text-brand hover:shadow-[0_0_0_8px_rgba(236,46,58,0.25)] max-[991px]:px-4 max-[991px]:py-2.5 max-[991px]:hover:px-4 max-[991px]:hover:py-2.5 ${
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

      <div className="py-(--ds-space-section-y) max-[767px]:px-4">
        <div className="mx-auto max-w-350 px-(--ds-space-container-x) max-[767px]:px-0">
          <div className="flex flex-col items-center justify-between gap-10 max-[991px]:gap-6">
            <h2 className="flex m-0 justify-center items-center gap-4 text-title font-semibold tracking-[-0.02em]">
              Learn <span className="h-2 w-2 rounded-full bg-brand block"></span> Build <span className="h-2 w-2 rounded-full bg-brand block"></span> Open Source
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                as="a"
                href="#featured-projects"
                variant="default"
                size="lg"
                className="max-[767px]:w-full"
              >
                View My Projects
              </Button>
              <Button
                as="a"
                href="#contact"
                variant="secondary"
                size="lg"
                className="max-[767px]:w-full"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
