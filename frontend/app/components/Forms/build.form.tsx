'use client';

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BiLogoGithub, BiGitBranch } from "react-icons/bi";
import Link from "next/link";

import { ReloadIcon } from "@radix-ui/react-icons";
import { cancelDeploy } from "@/services/cancel.deploy";
import { BuildForm, FrameWork, RepositoryData } from "shared-types";
import { buildProject } from "@/services/build.project";

type BuildProjectFormProps = {
    uploadId: string,
    repoData: RepositoryData
}

export function BuildProjectForm({ uploadId, repoData }: BuildProjectFormProps) {
    const [buildForm, setBuildForm] = React.useState<BuildForm>({
        uploadId: uploadId,
        projectName: repoData.name,
        framework: FrameWork.NEXTJS,
        rebuild: false,
    })
    const [loading, setLoading] = React.useState(false);
    const [buildStatus, setBuildStatus] = React.useState("");
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setBuildForm({ ...buildForm, [e.target.name]: e.target.value });
    }

    const onChangeFramework = (value: string) => {
        console.log(value);
        setBuildForm({...buildForm, framework: value as FrameWork})
    }

    const onBuild = async () => {
        setLoading(true);
        setBuildStatus("Wait for a few minutes...");
        const buildData = await buildProject(buildForm);
        if (buildData) {
            console.log(buildData);
            setTimeout(() => {
                setLoading(false);
            }, 5000);
        }
    }

    const onCancel = async () => {
        setLoading(true);
        setBuildStatus("Removing resources...");
        const cancelData = await cancelDeploy({ uploadId: buildForm.uploadId });
        console.log(cancelData);
        window.location.reload();
    }

    return (
        <>
            {loading
                ? <div className="flex items-center">
                    <ReloadIcon className="h-4 w-10 animate-spin" /> {buildStatus}
                  </div>
                : <Card className="w-[650px] border-[#71b190] border-[0.15rem] shadow-md drop-shadow-md">
                    <CardHeader>
                        <CardTitle className="text-[1.8rem]">Build Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex items-center justify-between bg-zinc-800 py-2 px-4 rounded-md mb-4">
                                    <Link href={repoData.html_url || "https://github.com"} target="_blank" className="flex flex-row items-center text-sm gap-2">
                                        <BiLogoGithub size={20} />
                                        {repoData.full_name}
                                    </Link>
                                    <Select>
                                        <SelectTrigger className="w-[20%] justify-end gap-1" id="framework">
                                            <BiGitBranch size={15} />
                                            <SelectValue placeholder="branch" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            {repoData.branches.map((br, idx) => {
                                                return <SelectItem key={idx} value={br.name}>{br.name}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="framework">Framework</Label>
                                    <Select onValueChange={onChangeFramework}>
                                        <SelectTrigger id="framework">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent  position="popper">
                                            <SelectItem value="NextJS">Next.js</SelectItem>
                                            <SelectItem value="Vite">Vite</SelectItem>
                                            <SelectItem disabled value="astro">Astro</SelectItem>
                                            <SelectItem disabled value="nuxt">Nuxt.js</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="projectName">Project Name</Label>
                                    <Input onChange={onChangeInput} id="projectName" name="projectName" placeholder="Project name..." defaultValue={buildForm.projectName} />
                                    <Input id="uploadId" name="uploadId" className="hidden" value={uploadId} />
                                </div>

                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button onClick={onCancel} variant="outline">Cancel</Button>
                        <Button type="button" onClick={onBuild} className="hover:bg-[#71b190]">Deploy</Button>
                    </CardFooter>
                </Card>}
        </>
    )
}
