/* eslint-disable node/no-process-env */
export const isLocal = process.env["NODE_ENV"] === "local";

export const isProduction = process.env["NODE_ENV"] === "production";
