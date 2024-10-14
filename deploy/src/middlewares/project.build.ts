import { exec } from 'child_process';
import fs from 'fs';
import { DOMAIN } from '../constants';

const runCommand = (command: string, workingDir: string) => {
    return new Promise((resolve, reject) => {
        const child = exec(command, { cwd: workingDir }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${command}`);
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
};

export const buildProject = async (storedId: string, folderPath: string) => {
    try {
        console.log('📦 Installing dependencies...');
        await runCommand('npm install', folderPath);

        console.log('🚀 Building the project...');
        await runCommand('npm run build', folderPath);

        console.log('⚙️ Setting nginx config...');
        const randomPort = Math.floor(Math.random() * 10000);
        const nginxConfPath = `${folderPath}/deployka-${storedId}.conf`;
        createNginxConf(`deployka-${storedId}.${DOMAIN}`, randomPort, nginxConfPath);
        await runCommand(`docker cp ${nginxConfPath} nginx:/etc/nginx/conf.d/deployka-${storedId}.conf`, folderPath);

        console.log('🌐 Running the project...');
        await runCommand(`pm2 start npm --name 'deployka-${storedId}' -- start -- -p ${randomPort}`, folderPath);

        console.log('✔️ Project built successfully.');
    } catch (error) {
        console.error('Error during the build process:', error);
    }
};

export const createNginxConf = (domain: string, port: number, filePath: string) => {
    const nginxContent =
    `
    server {
        listen 80;
        server_name ${domain};

        location / {
            proxy_pass http://localhost:${port};
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /_next/static/ {
            alias /var/www/monbeauty.org/.next/static/;
            expires 1y;
            access_log off;
        }

        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
        gzip_proxied any;
        gzip_min_length 256;
    }
    `

    fs.writeFile(filePath, nginxContent, (err) => {
        if (err) {
            console.error('Có lỗi khi tạo file nginx.conf:', err);
            return;
        }
        console.log(`File ${filePath} đã được tạo thành công.`);
    });
}
