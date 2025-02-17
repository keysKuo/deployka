import * as React from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { BiGitBranch } from "react-icons/bi";
import GitHubIcon from "../../Icons/github.icon"

export type ProjectDataProps = {
    projectName: string,
    domain: string,
    repoReference: string,
    lastCommit: string,
    updatedAt: Date,
    branch: string
}

export function ProjectItem({ data }: { data: ProjectDataProps }) {
    return (
        <Card className="cursor-pointer hover:opacity-90 hover:border-[#71b190] border-[0.15rem]">
            <CardHeader>
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md border border-gray-400">

                        </div>
                        <div>
                            <Label>{data?.projectName}</Label>
                            <CardDescription>{data?.domain}</CardDescription>
                        </div>
                    </div>
                    <div className="flex item-center justify-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-gray-400"></div>
                        <div className="w-8 h-8 rounded-full border border-gray-400"></div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="inline-block mb-4">
                    <div className="flex items-center gap-1 pl-3 pr-4 py-1 rounded-full bg-zinc-900">
                        <GitHubIcon />
                        <span className="text-[0.8rem]">{data?.repoReference}</span>
                    </div>

                </div>
                <div className="flex flex-col gap-1">
                    <CardDescription className="text-sm">{data?.lastCommit}</CardDescription>
                    <CardDescription className="text-sm flex items-center gap-1">{data?.updatedAt?.toLocaleDateString('vi-vn')} on <BiGitBranch color="white" /> {data?.branch} </CardDescription>
                </div>
            </CardContent>
        </Card>
    )
}
