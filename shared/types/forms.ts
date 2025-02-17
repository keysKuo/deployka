import { FrameWork } from "./frameworks";
import { User } from "./user";

export type Environment = {
    key: string,
    value: string
}

export type UploadForm = {
    repoUrl: string,
};

export type BuildForm = {
    uploadId: string,
    projectName: string
    framework: FrameWork,
    rebuild: boolean,
    subdomain?: string,
    rootDir?: string,
    outDir?: string,
    buildCommand?: string,
    installCommand?: string
    environments?: Environment[]
}

export type DeleteForm = {
    projectName: string,
    storedId: string
}

export type CancelForm = {
    uploadId: string
}


export type UserRegistedForm = Omit<User, "_id"> & {
	confirmPassword: string;
};

export type UserLoginForm = {
	email: string;
	password: string;
};

export type UserGoogleLoginForm = Omit<User, "password" | "_id"> & {
	googleId: string;
};
