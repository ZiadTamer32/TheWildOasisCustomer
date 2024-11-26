/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bgwgrezozaopowjctpog.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabins-img/**"
      }
    ]
  }
  // output: "export"
};

export default nextConfig;
