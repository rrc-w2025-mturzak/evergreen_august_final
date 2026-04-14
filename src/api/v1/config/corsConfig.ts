// config/corsConfig.ts

/**
 * Returns CORS options with:
 * - Full access in development
 * - HTTPS-only strict allowlist in production
 */
export const getCorsOptions = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        // In development, allow all origins for easy local testing
        return {
            origin: true,
            credentials: true,
        };
    }

    // Parse allowed origins from environment variable
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
        .split(",")
        .map(o => o.trim())
        .filter(origin => origin.startsWith("https://")); // Enforce HTTPS-only

    return {
        // Only allow origins explicitly listed AND using HTTPS
        origin: allowedOrigins,

        credentials: true, // Allow cookies / Authorization headers
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allowed request headers

        // Cache preflight responses for 10 minutes
        maxAge: 600,
    };
}; 
