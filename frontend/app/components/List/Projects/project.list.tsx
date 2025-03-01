import React from 'react'
import { ProjectDataProps, ProjectItem } from './project.item'
import Link from 'next/link'



export async function ProjectList({ projects }: { projects: ProjectDataProps[] }) {
    return (
        <div className="grid desktop:grid-cols-3 grid-cols-2 gap-3">
            {projects.map((project, index) => {
                return <Link key={index} href={``}>
                    <ProjectItem data={project} />
                </Link>
            })}
        </div>
    )
}
