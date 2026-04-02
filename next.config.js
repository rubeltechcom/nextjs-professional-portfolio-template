import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    reactStrictMode: true,
    transpilePackages: ['swiper', 'smooth-scrollbar'],
    sassOptions: {
        api: 'legacy',
        includePaths: [path.join(__dirname, 'src'), path.join(__dirname, 'src/styles')],
        quietDeps: true,
    },
}

export default nextConfig
