import { SERVER_IP_ADDRESS } from "../constants";
import fs from 'fs';

export interface NginxConfig {
    serverName: string;
    writePath: string;

    writeConfig(): Promise<void>;
}

export class NextJSNginxConfig implements NginxConfig {
    serverName: string;
    writePath: string;
    port: number;

    constructor(serverName: string, writePath: string, port: number) {
        this.serverName = serverName;
        this.writePath = writePath;
        this.port = port;
    }

    async writeConfig(): Promise<void> {
        const nginxContent =
            `
            server {
                listen 80;
                server_name ${this.serverName};

                location / {
                    proxy_pass http://${SERVER_IP_ADDRESS}:${this.port};
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

        fs.writeFile(this.writePath, nginxContent, (err) => {
            if (err) {
                console.error('Error writing file nginx.conf:', err);
                return;
            }
            console.log(`File ${this.writePath} created.`);
        });
    }
}

export class ViteNginxConfig implements NginxConfig {
    serverName: string;
    writePath: string;
    rootDir: string;

    constructor(serverName: string, writePath: string, rootDir: string) {
        this.serverName = serverName;
        this.writePath = writePath;
        this.rootDir = rootDir;
    }

    async writeConfig(): Promise<void> {
        const nginxContent =
            `
            server {
                listen 80;
                server_name ${this.serverName};

                root ${this.rootDir};
                index index.html;

                location / {
                        try_files $uri /index.html;
                }

                error_page 500 502 503 504 /50x.html;
                location = /50x.html {
                       root /usr/share/nginx/html;
                }
            }
        `

        fs.writeFile(this.writePath, nginxContent, (err) => {
            if (err) {
                console.error('Error writing file nginx.conf:', err);
                return;
            }
            console.log(`File ${this.writePath} created.`);
        });
    }
}
