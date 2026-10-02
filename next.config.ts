import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  default-src 'self';
  base-uri 'self';
  object-src 'none';

  script-src
    'self'
    'unsafe-inline'
    'unsafe-eval'
    https://www.google.com
    https://www.gstatic.com
    https://*.trustpilot.com
    https://cdn.trustpilot.net;

  style-src
    'self'
    'unsafe-inline';

  img-src
    'self'
    data:
    blob:
    https:;

  font-src
    'self'
    data:
    https://fonts.gstatic.com;

  connect-src
    'self'
    https://www.google.com
    https://www.gstatic.com
    https://*.trustpilot.com;

  frame-src
    'self'
    https://www.google.com
    https://recaptcha.google.com
    https://*.trustpilot.com;

  worker-src 'self' blob:;
  child-src 'self' blob:;
  
  form-action 'self';
  
  upgrade-insecure-requests;
`.replace(/\n/g, "");

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],

    unoptimized: true,
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: ContentSecurityPolicy,
        },
        {
          key: "Cross-Origin-Opener-Policy",
          value: "same-origin",
        },
        // disabled causing issues on iframed content youtube embed, trustpilot etc...
        // {
        //   key: "Cross-Origin-Embedder-Policy",
        //   value: "credentialless",
        // },
        {
          key: "Cross-Origin-Resource-Policy",
          value: "same-site",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains; preload",
        },
      ],
    },
  ],
};

export default nextConfig;
