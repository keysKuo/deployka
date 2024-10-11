type Config = {
    port: Number,
    mongodbURL: String | undefined,
    frontendURL: String | undefined,
    backendURL: String | undefined
}

const dev: Config = {
    port: 2405,
    mongodbURL: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/NewEzChatDev',
    frontendURL: process.env.FRONTEND_URL || 'http://localhost:5173',
    backendURL: process.env.BACKEND_URL || 'http://localhost:2405'
}

const production: Config = {
    port: 2405,
    mongodbURL: process.env.MONGODB_URL,
    frontendURL: process.env.FRONTEND_URL,
    backendURL: process.env.BACKEND_URL
}

const configs: any = { dev, production }
const env = process.env.NODE_ENV?.trim() || 'dev';
export default configs[env];