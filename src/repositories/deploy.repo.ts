export const enum FrameWork {
    CRA = 'Create React App',
    NEXTJS = 'NextJS',
    NUXTJS = 'NuxtJS',
    VITE = 'Vite',
    ANGULAR = 'Angular'
}

export type Environment = {
    key: string,
    value: string
}

export type RepositoryData = {
    id: number,
    node_id: string,
    name: string,
    full_name: string,
    private: boolean,
    avatar_url: string
}



export type UploadForm = {
    repoUrl: string,
};

export type BuildForm = {
    uploadId: string,
    projectName: string
    framework: FrameWork,
    rootDir?: string,
    outDir?: string,
    buildCommand?: string,
    installCommand?: string
    environments?: Environment[]
}

export type UploadResponse = {
    success: boolean,
    uploadId: string,
    repoData: RepositoryData,
    repoUrl: string,
    uploadDir?: string,
    error?: string
};


export type BuildReponse = {

}


export interface DeployRepository {
    upload(form: UploadForm): Promise<UploadResponse>;
    build(form: BuildForm): Promise<BuildReponse>;
    cancel(uploadId: string): Promise<boolean>;
}
