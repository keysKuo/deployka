import React from 'react'
import { ProjectDataProps, ProjectItem } from './project.item'



export function ProjectList({ projects }: { projects: ProjectDataProps[] }) {
    return (
        <div className="grid desktop:grid-cols-3 grid-cols-2 gap-3">
            {projects.map((project, index) => {
                return <ProjectItem key={index} data={project} />
            })}
        </div>
    )
}
