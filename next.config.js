/** @type {import('next').NextConfig} */
const nextConfig = {
    // webpack: (
    //     config,
    //     ) => { // this webpack may not be needed, is a fix to a websocket error
    //     config.externals.push({
    //         "utf-8-validate": "commonjs utf-8-validate",
    //         bufferutil: "commonjs bufferutil"
    //     })

    //     return config;
    // },
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
      ) => {
        config.module.rules.push({ // fixes an error with this version of NextJs compiling the livekit
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        });
        return config;
      },
    images: {
        domains: [
            "uploadthing.com",
            "utfs.io"
        ]
    }
}

module.exports = nextConfig
