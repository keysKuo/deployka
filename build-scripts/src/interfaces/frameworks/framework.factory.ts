import { DOMAIN } from "../../constants"
import { CRANginxConfig, NextJSNginxConfig, ViteNginxConfig } from "../proxies/nginx.factory"
import { exec } from 'child_process';
import { CRAConf, FrameworkConfig, NextJSConf, ViteConf } from "./configs";

const isStaging = process.env.NODE_ENV === 'production';

export type RunCommandParams = {
    command: string,
    workingDir: string,
    log?: string
}

export const runCommand = async (params: RunCommandParams) => {
    if (params.log) {
        console.log(params.log);
    }

    return new Promise((resolve, reject) => {
        const child = exec(params.command, { cwd: params.workingDir }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${params.command}`);
                console.error(stderr);
                reject(error);
            } else {
                // console.log(stdout);
                resolve(stdout);
            }
        })

        child.stdout?.on('data', (data) => {
            console.log(data.toString());
        })

        child.stderr?.on('data', (data) => {
            console.error(data.toString());
        })
    })
}

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
                    log: '🌐 Running the project (DEV)...'
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

export class CRAFactory implements FrameworkFactory {
    config: FrameworkConfig;

    constructor(config: FrameworkConfig = CRAConf) {
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
                await new CRANginxConfig(`${subdomain}.${DOMAIN}`, writeConfPath, `${params.workingDir}/build`).writeConfig();

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
        }
        catch (error) {
            console.error('Error during the build prstoredId: string, projectName: string, folderPath: string, rebuild: booleanocess:', error);
        }
    }
}
