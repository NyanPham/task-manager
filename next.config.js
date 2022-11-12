/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        MONGODB_PASSWORD: 'nhanpham',
        MONGODB_URL:
            'mongodb+srv://nhanpham:<PASSWORD>@cluster0.kqwb4be.mongodb.net/<DATABASE>?retryWrites=true&w=majority',
        MONGODB_DATABASE: 'task-manager',
        SERVER_URL: 'http://localhost:3000',
        JWT_SECRET: 'thisisareallystrongandpowerfulsecretkey',
        JWT_EXPIRES_IN: '90d',
    },
}

module.exports = nextConfig
