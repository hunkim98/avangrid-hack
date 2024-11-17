/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5328/api/:path*' : '/api/',
      },
      {
        source: '/model/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5329/:path*'
            : 'https://avangrid-model.vercel.app/:path*',
      },
    ]
  },
}

module.exports = nextConfig
