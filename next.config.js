/** @type {import('next').NextConfig} */
const nextConfig = {
    // webpack: (config) => { // this webpack may not be needed, used to counter a websocket error
    //     config.externals.push({
    //         "utf-8-validate": "commonjs utf-8-validate",
    //         bufferutil: "commonjs bufferutil"
    //     })

    //     return config;
    // },
    images: {
        domains: [
            "uploadthing.com",
            "utfs.io"
        ]
    }
}

module.exports = nextConfig
