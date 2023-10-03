const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
    case "production":
        ENV_FILE_NAME = ".env.production";
        break;
    case "staging":
        ENV_FILE_NAME = ".env.staging";
        break;
    case "test":
        ENV_FILE_NAME = ".env.test";
        break;
    case "development":
    default:
        ENV_FILE_NAME = ".env";
        break;
}

try {
    dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
    process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL =
    process.env.DATABASE_URL || "postgres://localhost/medusa-store";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// New environment variables
const STREAMPAY_API = process.env.STREAMPAY_API || "https://example.com/streampay";
const MERCHANT_PORTAL_API = process.env.MERCHANT_PORTAL_API || "https://example.com/merchant";
const STRIPE_API = process.env.STRIPE_API || "https://example.com/stripe";

const basePlugins = [
    "medusa-fulfillment-manual",
    "medusa-payment-manual",
    {
        resolve: "@medusajs/file-local",
        options: {
            upload_dir: "uploads",
        },
    },
    {
        resolve: "@medusajs/admin",
        options: {
            autoRebuild: true,
            develop: {
                open: process.env.OPEN_BROWSER !== "false",
            },
        },
    },
];

const streampayPlugin = {
    resolve: "medusa-plugin-streampay",
    options: {
        // plugin options...
        // if the plugin has admin customizations:
        enableUI: true,
        // Pass environment variables to the plugin
        streampayApi: STREAMPAY_API,
        merchantPortalApi: MERCHANT_PORTAL_API,
        stripeApi: STRIPE_API,
    },
};

const plugins = [...basePlugins, streampayPlugin];

const projectConfig = {
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    store_cors: STORE_CORS,
    database_url: DATABASE_URL,
    admin_cors: ADMIN_CORS,
    // Uncomment the following lines to enable REDIS
    // redis_url: REDIS_URL
};

module.exports = {
    projectConfig,
    plugins,
};