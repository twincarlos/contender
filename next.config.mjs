/** @type {import("next").NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ["supreme-trout-v7qx6r946vw2xvxq-3000.app.github.dev", "localhost:3000", "contender-ochre.vercel.app"]
        }
    }
};

export default nextConfig;