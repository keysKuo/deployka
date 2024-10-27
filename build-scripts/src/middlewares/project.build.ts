import fs from 'fs';
import { SERVER_IP_ADDRESS } from '../constants';



// export const runCommand = (command: string, workingDir: string, log?: string) => {
//     if (log) {
//         console.log(log);
//     }

//     return new Promise((resolve, reject) => {
//         const child = exec(command, { cwd: workingDir }, (error, stdout, stderr) => {
//             if (error) {
//                 console.error(`Error executing command: ${command}`);
//                 console.error(stderr);
//                 reject(error);
//             } else {
//                 // console.log(stdout);
//                 resolve(stdout);
//             }
//         })

//         child.stdout?.on('data', (data) => {
//             console.log(data.toString());
//         })

//         child.stderr?.on('data', (data) => {
//             console.error(data.toString());
//         })
//     })
// };

// export const buildProject = async (storedId: string, projectName: string, frameworkConf: FrameworkConfig, folderPath: string) => {
//     try {
//         console.log('📦 Installing dependencies...');
//         await runCommand(frameworkConf.installCommand, folderPath);

//         console.log('🚀 Building the project...');
//         await runCommand(frameworkConf.buildCommand, folderPath);

//         console.log('⚙️ Setting nginx config...');
//         const randomPort = Math.floor(Math.random() * 10000);
//         const nginxConfPath = `${folderPath}/${projectName}-${storedId}.conf`;
//         createNginxConf(`${projectName}-${storedId}.${DOMAIN}`, randomPort, nginxConfPath);
//         await runCommand(`docker cp ${nginxConfPath} nginx:/etc/nginx/conf.d/${projectName}-${storedId}.conf`, folderPath);
//         await runCommand(`docker exec nginx nginx -s reload`, folderPath);

//         console.log('🌐 Running the project...');
//         await runCommand(`pm2 start npm --name '${projectName}-${storedId}' -- start -- -p ${randomPort}`, folderPath);

//         console.log(`✔️ Your website started: https://${projectName}-${storedId}.${DOMAIN}`);
//     } catch (error) {
//         console.error('Error during the build process:', error);
//     }
// };

export const createNginxConf = (domain: string, port: number, filePath: string) => {
    const nginxContent =
        `
    server {
        listen 80;
        server_name ${domain};

        location / {
            proxy_pass http://${SERVER_IP_ADDRESS}:${port};
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

    fs.writeFile(filePath, nginxContent, (err) => {
        if (err) {
            console.error('Có lỗi khi tạo file nginx.conf:', err);
            return;
        }
        console.log(`File ${filePath} đã được tạo thành công.`);
    });
}
