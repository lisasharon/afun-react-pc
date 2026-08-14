import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd'],
  // 关掉开发态左下角 N 图标，避免挡住 H5 底栏
  devIndicators: false,
}

export default nextConfig
