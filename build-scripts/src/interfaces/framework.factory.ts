import { DOMAIN } from "../constants"
import { runCommand } from "../middlewares/project.build"
import { NextJSNginxConfig, ViteNginxConfig } from "./nginx.factory"

const isStaging = process.env.NODE_ENV === 'production';

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

type BuildParams = {
    storedId: string,
    projectName: string,
    workingDir: string,
    rebuild: boolean
}

export interface FrameworkFactory {
    config: FrameworkConfig;
    buildProject(params: BuildParams): Promise<void>;
}

export class NextJSFactory implements FrameworkFactory {
    config: FrameworkConfig;

    constructor(config: FrameworkConfig = NextJSConf) {
        this.config = config;
    }

    async buildProject(params: BuildParams): Promise<void> {
        try {
            // 1. Install dependencies
            await runCommand({
                command: this.config.installCommand,
                workingDir: params.workingDir,
                log: '📦 Installing dependencies...'
            });

            // 2. Build Project
            await runCommand({
                command: this.config.buildCommand,
                workingDir: params.workingDir,
                log: '🚀 Building the project...'
            });

            // 3.1 Run dev start
            if (!isStaging) {
                await runCommand({
                    command: 'npm run dev',
                    workingDir: params.workingDir,
                    log: '🌐 Running project as dev...'
                });
                return;
            }

            const subdomain = `${params.projectName}-${params.storedId}`;

            // 3.2 Restart project as rebuilding
            if (params.rebuild) {
                await runCommand({
                    command: `pm2 restart ${subdomain}`,
                    workingDir: params.workingDir,
                    log: '🌐 Restart the project...'
                });
            }
            else {
                const randomPort = Math.floor(1000 + Math.random() * 9000);
                const writeConfPath = `${params.workingDir}/${subdomain}.conf`;
                const nginxConfPath = `/etc/nginx/sites-enabled/${subdomain}.conf`;
                await new NextJSNginxConfig(`${subdomain}.${DOMAIN}`, writeConfPath, randomPort).writeConfig();

                // 3.3 Link nginx.conf to nginx/sites-enabled
                await runCommand({
                    command: `sudo ln -s ${writeConfPath} ${nginxConfPath}`,
                    workingDir: params.workingDir,
                    log: '⚙️ Setting nginx config...'
                });

                // 4. Reload nginx service
                await runCommand({
                    command: `sudo service nginx reload`,
                    workingDir: params.workingDir,
                });

                // 5. Start new project with pm2
                await runCommand({
                    command: `pm2 start npm --name '${subdomain}' -- start -- -p ${randomPort}`,
                    workingDir: params.workingDir,
                    log: '🌐 Running the project...'
                });
            }

            console.log(`✔️ Your website started: https://${subdomain}.${DOMAIN}`);
        } catch (error) {
            console.error('Error during the build process:', error);
        }
    }
}

export class ViteFactory implements FrameworkFactory {
    config: FrameworkConfig;

    constructor(config: FrameworkConfig = ViteConf) {
        this.config = config;
    }

    async buildProject(params: BuildParams): Promise<void> {
        try {
            // 1. Install dependencies
            await runCommand({
                command: this.config.installCommand,
                workingDir: params.workingDir,
                log: '📦 Installing dependencies...'
            });

            // 2. Build Project
            await runCommand({
                command: this.config.buildCommand,
                workingDir: params.workingDir,
                log: '🚀 Building the project...'
            });

            // 3.1 Run dev start
            if (!isStaging) {
                await runCommand({
                    command: 'npm run dev',
                    workingDir: params.workingDir,
                    log: '🌐 Running project as dev...'
                });
                return;
            }

            const subdomain = `${params.projectName}-${params.storedId}`;
            if (params.rebuild) {
                // pass
            }
            else {
                const writeConfPath = `${params.workingDir}/${subdomain}.conf`;
                const nginxConfPath = `/etc/nginx/sites-enabled/${subdomain}.conf`;
                await new ViteNginxConfig(`${subdomain}.${DOMAIN}`, writeConfPath, `${params.workingDir}/dist`).writeConfig();

                // 3.2 Link nginx.conf to nginx/sites-enabled
                await runCommand({
                    command: `sudo ln -s ${writeConfPath} ${nginxConfPath}`,
                    workingDir: params.workingDir,
                    log: '⚙️ Setting nginx config...'
                });

                // 4. Reload nginx service
                await runCommand({
                    command: `sudo service nginx reload`,
                    workingDir: params.workingDir,
                });
            }

            console.log(`✔️ Your website started: https://${subdomain}.${DOMAIN}`);
        } catch (error) {
            console.error('Error during the build prstoredId: string, projectName: string, folderPath: string, rebuild: booleanocess:', error);
        }
    }
}
