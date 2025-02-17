"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngularConf = exports.ViteConf = exports.NuxtJSConf = exports.NextJSConf = exports.CRAConf = exports.NodeJSConf = void 0;
exports.NodeJSConf = {
    rootDir: "./",
    outDir: "./" /* OutputDirectory.NODEJS */,
    buildCommand: "npm run build" /* BuildCommand.NODEJS */,
    installCommand: "npm install" /* InstallCommand.NODEJS */,
    startCommand: "npm start" /* StartCommand.NODEJS */
};
exports.CRAConf = {
    rootDir: "./",
    outDir: "build/" /* OutputDirectory.CRA */,
    buildCommand: "npm run build" /* BuildCommand.CRA */,
    installCommand: "npm install" /* InstallCommand.CRA */,
    startCommand: "npm start" /* StartCommand.CRA */
};
exports.NextJSConf = {
    rootDir: "./",
    outDir: ".next/" /* OutputDirectory.NEXTJS */,
    buildCommand: "npm run build" /* BuildCommand.NEXTJS */,
    installCommand: "npm install" /* InstallCommand.NEXTJS */,
    startCommand: "npm start" /* StartCommand.NEXTJS */
};
exports.NuxtJSConf = {
    rootDir: "./",
    outDir: "dist" /* OutputDirectory.NUXTJS */,
    buildCommand: "nuxt build" /* BuildCommand.NUXTJS */,
    installCommand: "npm install" /* InstallCommand.NUXTJS */,
    startCommand: "npm start" /* StartCommand.NUXTJS */
};
exports.ViteConf = {
    rootDir: "./",
    outDir: "dist/" /* OutputDirectory.VITE */,
    buildCommand: "npm run build" /* BuildCommand.VITE */,
    installCommand: "npm install" /* InstallCommand.VITE */,
    startCommand: "npm start" /* StartCommand.VITE */
};
exports.AngularConf = {
    rootDir: "./",
    outDir: "build/" /* OutputDirectory.ANGULAR */,
    buildCommand: "npm run build" /* BuildCommand.ANGULAR */,
    installCommand: "npm install" /* InstallCommand.ANGULAR */,
    startCommand: "npm start" /* StartCommand.ANGULAR */
};
