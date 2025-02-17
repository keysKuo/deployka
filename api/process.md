* Services:
    - Upload:
        1. User send request to server
            - repoUrl: Url to access the repository
        2. Server check if repository is safe
        3. If repository is safe
            - Clone and upload source to AWS S3 by uploadId
            - Send back uploadId(AWS S3), repoData, repoUrl
        4. Clear cloned source code
    - Build:
        1. User send request to server
            - uploadId: Unique id that used to store source code in S3
            - projectName: Name of the project that user want to deploy
            - framework: Framework that the project used
            - rebuild: True if user just want to rebuild the project was deployed else False
            - rootDir?: Root directory of the project
            - outDir?: Output directory of the project
            - installCommand?: Command that used to install the project
            - buildCommand?: Command that used to build the project
            - environments?: Environment variables that used in the project
        2. Server push the build infomation to queue -> build process
        3. Server create a unique subdomain for the project
        4. Building module will handle in order the projects
            - Download source code from S3 by uploadId
            - According to which framework project used -> Run to commands to build the project in server
            - Building module use websocket to realtime communicate with client (build log)
            - 
