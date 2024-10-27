export const enum OutputDirectory {
    CRA = 'build/',
    NEXTJS = '.next/',
    NUXTJS = 'dist',
    VITE = 'dist/',
    ANGULAR = 'build/'
}

export const enum BuildCommand {
    CRA = 'npm run build',
    NEXTJS = 'npm run build',
    NUXTJS = 'nuxt build',
    VITE = 'npm run build',
    ANGULAR = 'npm run build'
}

export const enum InstallCommand {
    CRA = 'npm install',
    NEXTJS = 'npm install',
    NUXTJS = 'npm install',
    VITE = 'npm install',
    ANGULAR = 'npm install'
}

export const enum StartCommand {
    CRA = 'npm start',
    NEXTJS = 'npm start',
    NUXTJS = 'npm start',
    VITE = 'npm start',
    ANGULAR = 'npm start'
}

type Environment = {
    key: string,
    value: string
}


export type FrameworkConfig = {
    rootDir: string,
    outDir: string,
    buildCommand: string,
    installCommand: string,
    startCommand: string,
    environments?: Environment[]
}

export const CRAConf: FrameworkConfig = {
    rootDir: "./",
    outDir: OutputDirectory.CRA,
    buildCommand: BuildCommand.CRA,
    installCommand: InstallCommand.CRA,
    startCommand: StartCommand.CRA
}

export const NextJSConf: FrameworkConfig = {
    rootDir: "./",
    outDir: OutputDirectory.NEXTJS,
    buildCommand: BuildCommand.NEXTJS,
    installCommand: InstallCommand.NEXTJS,
    startCommand: StartCommand.NEXTJS
};

export const NuxtJSConf: FrameworkConfig = {
    rootDir: "./",
    outDir: OutputDirectory.NUXTJS,
    buildCommand: BuildCommand.NUXTJS,
    installCommand: InstallCommand.NUXTJS,
    startCommand: StartCommand.NUXTJS
};

export const ViteConf: FrameworkConfig = {
    rootDir: "./",
    outDir: OutputDirectory.VITE,
    buildCommand: BuildCommand.VITE,
    installCommand: InstallCommand.VITE,
    startCommand: StartCommand.VITE
};

export const AngularConf: FrameworkConfig = {
    rootDir: "./",
    outDir: OutputDirectory.ANGULAR,
    buildCommand: BuildCommand.ANGULAR,
    installCommand: InstallCommand.ANGULAR,
    startCommand: StartCommand.ANGULAR
};
