import { Environment } from "./forms";
export declare const enum OutputDirectory {
    CRA = "build/",
    NEXTJS = ".next/",
    NUXTJS = "dist",
    VITE = "dist/",
    ANGULAR = "build/",
    NODEJS = "./"
}
export declare const enum BuildCommand {
    CRA = "npm run build",
    NEXTJS = "npm run build",
    NUXTJS = "nuxt build",
    VITE = "npm run build",
    ANGULAR = "npm run build",
    NODEJS = "npm run build"
}
export declare const enum InstallCommand {
    CRA = "npm install",
    NEXTJS = "npm install",
    NUXTJS = "npm install",
    VITE = "npm install",
    ANGULAR = "npm install",
    NODEJS = "npm install"
}
export declare const enum StartCommand {
    CRA = "npm start",
    NEXTJS = "npm start",
    NUXTJS = "npm start",
    VITE = "npm start",
    ANGULAR = "npm start",
    NODEJS = "npm start"
}
export declare const enum FrameWork {
    CRA = "Create React App",
    NEXTJS = "NextJS",
    NUXTJS = "NuxtJS",
    VITE = "Vite",
    ANGULAR = "Angular"
}
export type FrameworkConfig = {
    rootDir: string;
    outDir: string;
    buildCommand: string;
    installCommand: string;
    startCommand: string;
    environments?: Environment[];
};
export declare const NodeJSConf: FrameworkConfig;
export declare const CRAConf: FrameworkConfig;
export declare const NextJSConf: FrameworkConfig;
export declare const NuxtJSConf: FrameworkConfig;
export declare const ViteConf: FrameworkConfig;
export declare const AngularConf: FrameworkConfig;
//# sourceMappingURL=frameworks.d.ts.map