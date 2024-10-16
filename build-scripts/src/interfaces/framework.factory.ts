import { DOMAIN } from "../constants"
import { runCommand } from "../middlewares/project.build"
import { NextJSNginxConfig, ViteNginxConfig } from "./nginx.factory"

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

export interface FrameworkFactory {
    config: FrameworkConfig;
    buildProject(storedId: string, projectName: string, folderPath: string, rebuild: boolean): Promise<void>;
}

export class NextJSFactory implements FrameworkFactory {
    config: FrameworkConfig;

    constructor(config: FrameworkConfig = NextJSConf) {
        this.config = config;
    }

    async buildProject(storedId: string, projectName: string, folderPath: string, rebuild: boolean = false): Promise<void> {
        try {
            console.log('📦 Installing dependencies...');
            await runCommand(this.config.installCommand, folderPath);

            console.log('🚀 Building the project...');
            await runCommand(this.config.buildCommand, folderPath);

            const subdomain = `${projectName}-${storedId}`;
            if (rebuild) {
                console.log('🌐 Running the project...');
                await runCommand(`pm2 restart ${subdomain}`, folderPath);
            }
            else {
                console.log('⚙️ Setting nginx config...');
                const randomPort = Math.floor(1000 + Math.random() * 9000);
                const writeConfPath = `${folderPath}/${subdomain}.conf`;
                const nginxConfPath = `/etc/nginx/sites-enabled/${subdomain}.conf`;

                await new NextJSNginxConfig(`${subdomain}.${DOMAIN}`, writeConfPath, randomPort).writeConfig();
                await runCommand(`sudo ln -s ${writeConfPath} ${nginxConfPath}`, folderPath);
                await runCommand(`sudo service nginx reload`, folderPath);

                console.log('🌐 Running the project...');
                await runCommand(`pm2 start npm --name '${subdomain}' -- start -- -p ${randomPort}`, folderPath);
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

    async buildProject(storedId: string, projectName: string, folderPath: string, rebuild: boolean = false): Promise<void> {
        try {
            console.log('📦 Installing dependencies...');
            await runCommand(this.config.installCommand, folderPath);

            console.log('🚀 Building the project...');
            await runCommand(this.config.buildCommand, folderPath);

            const subdomain = `${projectName}-${storedId}`;
            if (rebuild) {
                // pass
            }
            else {
                console.log('⚙️ Setting nginx config...');
                const writeConfPath = `${folderPath}/${subdomain}.conf`;
                const nginxConfPath = `/etc/nginx/sites-enabled/${subdomain}.conf`;

                await new ViteNginxConfig(`${subdomain}.${DOMAIN}`, writeConfPath, `${folderPath}/dist`).writeConfig();
                await runCommand(`sudo ln -s ${writeConfPath} ${nginxConfPath}`, folderPath);
                await runCommand(`sudo service nginx reload`, folderPath);
            }

            console.log(`✔️ Your website started: https://${subdomain}.${DOMAIN}`);
        } catch (error) {
            console.error('Error during the build process:', error);
        }
    }
}
