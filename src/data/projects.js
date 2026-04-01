import projects from './projects.json'

export const allProjects = projects
export const featuredProjects = projects.filter((project) => project.featured)
