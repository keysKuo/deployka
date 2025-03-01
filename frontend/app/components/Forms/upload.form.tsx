'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import GitHubIcon from "../Icons/github.icon";
import { Session } from "next-auth";
import { fetchRepos } from "@/services/fetch.repos";
import { RepositoryData, UploadForm } from "shared-types";
import { uploadRepository } from "@/services/upload.repo";
import Link from "next/link";
import { SearchInput } from "../Common/search.input";

type UploadRepoFormProps = {
    handleChangeId: (id: string) => void,
    handleChangeRepoData: (data: RepositoryData) => void,
    session: Session
}

export function UploadRepoForm({ handleChangeId, handleChangeRepoData, session }: UploadRepoFormProps) {
    const [uploadForm, setUploadForm] = React.useState<UploadForm>({ repoUrl: "" });
    const [loading, setLoading] = React.useState<boolean>(false);
    const [uploadStatus, setUploadStatus] = React.useState<string>("Checking repository...");
    const [repositories, setRepositories] = React.useState<RepositoryData[]>([]);
    const [showAll, setShowAll] = React.useState<boolean>(false);

    React.useEffect(() => {
        const fetchRepositories = async () => {
            const repos: RepositoryData[] = await fetchRepos(session.accessToken);
            console.log(repos)
            setRepositories(repos || []);
        }

        fetchRepositories();
    }, [])

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUploadForm({ ...uploadForm, [e.target.name]: e.target.value });
    }

    const onUpload = async (repoUrl?: string) => {
        setLoading(true);

        const uploadData = await uploadRepository(repoUrl ? { ...uploadForm, repoUrl } : uploadForm);
        if (uploadData) {
            setUploadStatus("Preparing project...");
            setTimeout(() => {
                handleChangeId(uploadData.uploadId);
                handleChangeRepoData(uploadData.repoData);
                setLoading(false);
            }, 2000);
        }
        else {
            setLoading(false);
        }
    }

    return (
        <>
            {
                loading
                    ? <div className="flex items-center">
                        <ReloadIcon className="h-4 w-10 animate-spin" /> {uploadStatus}
                    </div>
                    : <section className="space-y-4 my-20">
                        <Card className="w-[650px] border-[#71b190] border-[0.15rem] shadow-md drop-shadow-md">
                            <CardHeader>
                                <CardTitle className="text-[1.8rem]">Available Git Repository</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <div className="w-full flex items-center justify-between gap-3">

                                        <SearchInput />
                                    </div>

                                    <div className="w-full flex flex-col items-center justify-center">
                                        {repositories.sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, showAll ? repositories.length : 3).map((repo, index) => (
                                            <div key={index} className="w-full p-3 border border-input bg-transparent flex items-center justify-between">
                                                <div className="flex items-center justify-center gap-3">
                                                    <GitHubIcon />
                                                    <span>{repo.full_name}</span>
                                                </div>
                                                <Button type="button" onClick={() => onUpload(repo.clone_url)} className="hover:bg-[#71b190]">Import</Button>
                                            </div>
                                        ))}

                                        {repositories.length > 3 && (
                                            <Button className="mt-4" variant="outline" onClick={() => setShowAll(!showAll)}>
                                                {showAll ? "Show Less" : "More"}
                                            </Button>
                                        )}
                                    </div>

                                    <div className="text-sm">Missing git repository? <span className="text-blue-400 cursor-pointer">Adjust Github App permissions</span></div>
                                </div>
                            </CardContent>

                        </Card>
                        <Card className="w-[650px] border-[#71b190] border-[0.15rem] shadow-md drop-shadow-md">
                            <CardHeader>
                                <CardTitle className="text-[1.8rem]">Import a Git Repository</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="repoUrl">Git Repository URL</Label>
                                            <Input onChange={onChangeInput} id="repoUrl" name="repoUrl" placeholder="https://git-provider.com/scope/repo" />
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Link href="/dashboard"><Button variant="outline">Cancel</Button></Link>
                                <Button type="button" onClick={() => onUpload()} className="hover:bg-[#71b190]">Import</Button>
                            </CardFooter>
                        </Card>
                    </section>
            }
        </>
    )
}
