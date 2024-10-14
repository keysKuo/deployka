import path from "path";
import dotEnv from 'dotenv';
dotEnv.config();


export const ROOT_DIR = path.posix.join(process.cwd(), "");


// Cloudflare R2
export const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
export const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
export const R2_ENDPOINT = process.env.R2_ENDPOINT;
export const R2_BUCKET = 'deployka';

export const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
export const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
export const DOMAIN = process.env.DOMAIN;
export const SERVER_IP_ADDRESS = process.env.SERVER_IP_ADDRESS;

export const OUTPUT_DIR = path.posix.join(ROOT_DIR, 'dist/output');
