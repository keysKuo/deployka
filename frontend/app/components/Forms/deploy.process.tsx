'use client';

import { BuildProjectForm } from "@/app/components/Forms/build.form";
import { UploadRepoForm } from "@/app/components/Forms/upload.form";

import { Session } from "next-auth";
import * as React from "react"
import { RepositoryData } from "shared-types";

export function DeployProcess({ session }: { session: Session }) {
    const [uploadId, setUploadId] = React.useState("");
    const [repoData, setRepoData] = React.useState<RepositoryData | null>(null);

    const handleChangeId = React.useCallback((newId: string) => {
        setUploadId(newId);
    }, []);

    const handleChangeRepoData = React.useCallback((newRepoData: RepositoryData) => {
        setRepoData(newRepoData);
    }, [])

    React.useEffect(() => { }, [handleChangeId, handleChangeRepoData]);

    return <React.Fragment>
        {uploadId && repoData
            ? <BuildProjectForm uploadId={uploadId} repoData={repoData} />
            : <UploadRepoForm session={session} handleChangeId={handleChangeId} handleChangeRepoData={handleChangeRepoData} />}
    </React.Fragment>
}
