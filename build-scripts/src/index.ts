import { commandOptions, createClient } from 'redis';
import { downloadFromS3, uploadFolderToS3 } from './middlewares/aws.handler';
import { buildProject } from './middlewares/project.build';
import { DOMAIN, OUTPUT_DIR, R2_BUCKET, ROOT_DIR } from './constants';
import { NextJSNginxConfig } from './interfaces/nginx.factory';
import { NextJSFactory, ViteFactory } from './interfaces/framework.factory';
const subscriber = createClient();
subscriber.connect();

async function main () {
    while(1) {
        const response = await subscriber.brPop(commandOptions({ isolated: true }), 'build-queue', 0);

        const buildData = JSON.parse(response?.element || "");
        if (!buildData) return;

        const storedId = buildData.uploadId;
        console.log(storedId);

        // Download source code by its id from AWS S3
        await downloadFromS3(R2_BUCKET, `sources/${storedId}`);

        const framework = buildData.framework;
        const projectName = buildData.projectName;
        switch (framework) {
            case 'NextJS':
                await new NextJSFactory().buildProject(storedId, projectName, `${OUTPUT_DIR}/${storedId}`);
                return;
            case 'Vite':
                await new ViteFactory().buildProject(storedId, projectName, `${OUTPUT_DIR}/${storedId}`);
                return;
            default:
                console.log('Framework not supported');
                return;
        }
        // Build the project in sight
        // await buildProject(storedId, `${OUTPUT_DIR}/${storedId}`);

        // Upload the built files back to AWS S3
        // await uploadFolderToS3(R2_BUCKET, `builds`,`${OUTPUT_DIR}/${storedId}/.next`);
    }
}

main();
