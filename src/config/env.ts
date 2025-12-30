import { z } from 'zod';

const envSchema = z.object({
    VITE_API_BASE_URL: z.string().url(),
    VITE_WS_URL: z.string().optional(),
    VITE_ENVIRONMENT: z.enum(['development', 'staging', 'production']).default('development'),
    VITE_DEMO_MODE: z.string().optional(),
});

// Validate environment variables at build time
const parseEnv = () => {
    try {
        return envSchema.parse({
            VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
            VITE_WS_URL: import.meta.env.VITE_WS_URL,
            VITE_ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
            VITE_DEMO_MODE: import.meta.env.VITE_DEMO_MODE,
        });
    } catch (error) {
        console.error('❌ Invalid environment variables:', error);
        throw new Error('Invalid environment configuration. Please check your .env file.');
    }
};

export const env = parseEnv();

// Helper to check if we're in production
export const isProduction = env.VITE_ENVIRONMENT === 'production';
export const isDevelopment = env.VITE_ENVIRONMENT === 'development';
export const isDemoMode = env.VITE_DEMO_MODE === 'true';
