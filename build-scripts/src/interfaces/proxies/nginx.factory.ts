import fs from 'fs';

export interface NginxConfig {
    framework: string;
    serverName: string;
    writePath: string;

    nginxContent(): string;
    writeConfig(): Promise<void>;
}

export class NextJSNginxConfig implements NginxConfig {
    framework: string;
    serverName: string;
    writePath: string;
    port: number;

    constructor(serverName: string, writePath: string, port: number) {
        this.framework = 'NextJS';
        this.serverName = serverName;
        this.writePath = writePath;
        this.port = port;
    }

    nginxContent(): string {
        return `
            server {
                listen 80;
                server_name ${this.serverName};

                location / {
                    proxy_pass http://localhost:${this.port};
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection 'upgrade';
                    proxy_set_header Host $host;
                    proxy_cache_bypass $http_upgrade;
                }

                gzip on;
                gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
                gzip_proxied any;
                gzip_min_length 256;
            }
        `
    }

    async writeConfig(): Promise<void> {
        fs.writeFile(this.writePath, this.nginxContent(), (err) => {
            if (err) {
                console.error('Error writing file nginx.conf:', err);
                return;
            }
            console.log(`File ${this.writePath} created.`);
        });
    }
}

export class ViteNginxConfig implements NginxConfig {
    framework: string;
    serverName: string;
    writePath: string;
    rootDir: string;

    constructor(serverName: string, writePath: string, rootDir: string) {
        this.framework = 'Vite';
        this.serverName = serverName;
        this.writePath = writePath;
        this.rootDir = rootDir;
    }

    nginxContent(): string {
        return `
            server {
                listen 80;
                server_name ${this.serverName};

                root ${this.rootDir};
                index index.html;

                location / {
                    try_files $uri $uri/ /index.html;
                }

                location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
                    expires 1y;
                    log_not_found off;
                    access_log off;
                }

            }
    `
    }

    async writeConfig(): Promise<void> {
        fs.writeFile(this.writePath, this.nginxContent(), (err) => {
            if (err) {
                console.error('Error writing file nginx.conf:', err);
                return;
            }
            console.log(`File ${this.writePath} created.`);
        });
    }
}


export class CRANginxConfig implements NginxConfig {
    framework: string;
    serverName: string;
    writePath: string;
    rootDir: string;

    constructor(serverName: string, writePath: string, rootDir: string) {
        this.framework = 'Create React App';
        this.serverName = serverName;
        this.writePath = writePath;
        this.rootDir = rootDir;
    }

    nginxContent(): string {
        return `
            server {
                listen 80;
                server_name ${this.serverName};

                root ${this.rootDir};
                index index.html;

                location / {
                    try_files $uri $uri/ /index.html;
                }

                location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
                    expires 1y;
                    log_not_found off;
                    access_log off;
                }
            }
        `
    }

    async writeConfig(): Promise<void> {
        fs.writeFile(this.writePath, this.nginxContent(), (err) => {
            if (err) {
                console.error('Error writing file nginx.conf:', err);
                return;
            }
            console.log(`File ${this.writePath} created.`);
        });
    }
}
