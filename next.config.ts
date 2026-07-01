import type { NextConfig } from "next";

// Security headers applied to every route
const securityHeaders = [
  // Force HTTPS for 2 years, including subdomains
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Stop the site being embedded in iframes (clickjacking protection)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stop browsers MIME-sniffing responses away from the declared content-type
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Only send the origin on cross-origin requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Lock down powerful browser features we don't use
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // Legacy XSS protection for older browsers
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Content Security Policy — restricts where scripts, styles, images, etc. can load from
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https:",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false, // hide the "X-Powered-By: Next.js" fingerprint
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/recruitment-portal", destination: "/careers", permanent: true },
      { source: "/recruitment-portal/admin", destination: "/careers-admin", permanent: true },
      { source: "/recruitment-portal/:slug", destination: "/careers/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
