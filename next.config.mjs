/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'], // ページコンポーネントとして認識する拡張子を指定
};

export default nextConfig;