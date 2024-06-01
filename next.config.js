/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    output: "export",
    images: {
        unoptimized: true
    }
}

const withMDX = require("@next/mdx", {
    experimental: {
        mdxRs: true
    }
})()

module.exports = withMDX(nextConfig)
