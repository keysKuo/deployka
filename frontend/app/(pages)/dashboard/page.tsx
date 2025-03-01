import React from 'react'
import { ProjectList } from '../../components/List/Projects/project.list'
import { ProjectDataProps } from '../../components/List/Projects/project.item'
import { SearchInput } from '../../components/Common/search.input'
import { Button } from '@/components/ui/button'
import { SortPicker } from '../../components/Common/sort.picker'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Link from 'next/link'

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
    {
        projectName: 'Deployka',
        domain: 'deployka.cloud',
        repoReference: 'keysKuo/deployka',
        lastCommit: 'refact: original middleware',
        updatedAt: new Date(),
        branch: 'merge'
    }
]

export default async function DashBoardPage() {
    const session = await getServerSession(authOptions);
    // console.log(session);
    if (!session) {
        redirect("/login"); // Chuyển hướng đến trang login
    }

    return (
        <div className="desktop:w-[80vw] w-full mx-auto flex flex-col items-center justify-center gap-5 mt-40">
            <div className="flex items-center justify-center gap-3">
                <SearchInput />
                <SortPicker />
                <Link href="/upload">
                    <Button>Add new ...</Button>
                </Link>
            </div>
            <ProjectList projects={fakeDatas} />
        </div>
    )
}
