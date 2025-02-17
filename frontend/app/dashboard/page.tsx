import React from 'react'
import { ProjectList } from '../components/List/Projects/project.list'
import { ProjectDataProps } from '../components/List/Projects/project.item'
import { SearchInput } from '../components/Common/search.input'
import { Button } from '@/components/ui/button'
import { SortPicker } from '../components/Common/sort.picker'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const fakeDatas: ProjectDataProps[] = [
    {
        projectName: 'Monbeauty',
        domain: 'monbeauty.deployka.cloud',
        repoReference: 'keysKuo/monbeauty',
        lastCommit: 'fix: clear the page',
        updatedAt: new Date(),
        branch: 'main'
    },
    {
        projectName: 'Monbeauty',
        domain: 'monbeauty.deployka.cloud',
        repoReference: 'keysKuo/monbeauty',
        lastCommit: 'fix: clear the page',
        updatedAt: new Date(),
        branch: 'main'
    },
    {
        projectName: 'Monbeauty',
        domain: 'monbeauty.deployka.cloud',
        repoReference: 'keysKuo/monbeauty',
        lastCommit: 'fix: clear the page',
        updatedAt: new Date(),
        branch: 'main'
    },
    {
        projectName: 'Monbeauty',
        domain: 'monbeauty.deployka.cloud',
        repoReference: 'keysKuo/monbeauty',
        lastCommit: 'fix: clear the page',
        updatedAt: new Date(),
        branch: 'main'
    },
]

export default async function DashBoardPage() {
    const session = await getServerSession(authOptions);
    // console.log(session);
    if (!session) {
        redirect("/login"); // Chuyển hướng đến trang login
    }

    return (
        <div className="desktop:w-[80%] w-full mx-auto flex flex-col items-center justify-center gap-5 mt-40">
            <div className="w-full flex items-center justify-center gap-3">
                <SearchInput />
                <SortPicker />
                <Button>Add new ...</Button>
            </div>
            <ProjectList projects={fakeDatas} />
        </div>
    )
}
