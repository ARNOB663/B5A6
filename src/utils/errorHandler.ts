import { isProduction } from '../config/env';

export interface ApiError {
    data?: {
        message?: string;
        errors?: Record<string, string[]>;
    };
    status?: number;
    error?: string;
}

/**
 * Type guard to check if error is an API error
 */
export const isApiError = (error: unknown): error is ApiError => {
    return (
        typeof error === 'object' &&
        error !== null &&
        ('data' in error || 'status' in error || 'error' in error)
    );
};

/**
 * Extract user-friendly error message from API error
 */
export const getErrorMessage = (error: unknown, fallback = 'An unexpected error occurred'): string => {
    if (isApiError(error)) {
        // Check for validation errors
        if (error.data?.errors) {
            const firstError = Object.values(error.data.errors)[0];
            return firstError?.[0] || fallback;
        }

        // Check for general message
        if (error.data?.message) {
            return error.data.message;
        }

        // Check for error string
        if (error.error) {
            return error.error;
        }

        // Status-based messages
        if (error.status === 401) {
            return 'Authentication required. Please log in again.';
        }
        if (error.status === 403) {
            return 'You do not have permission to perform this action.';
        }
        if (error.status === 404) {
            return 'The requested resource was not found.';
        }
        if (error.status === 429) {
            return 'Too many requests. Please try again later.';
        }
        if (error.status && error.status >= 500) {
            return 'Server error. Please try again later.';
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return fallback;
};

/**
 * Log error to console (development) or monitoring service (production)
 */
export const logError = (error: unknown, context: string): void => {
    const errorInfo = {
        context,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
    };

    if (isProduction) {
        // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
        // Sentry.captureException(error, { contexts: { custom: errorInfo } });
    } else {
        console.error(`[${context}]`, errorInfo);
    }
};

/**
 * Handle API errors with consistent logging and user feedback
 */
export const handleApiError = (
    error: unknown,
    context: string,
    fallbackMessage?: string
): string => {
    logError(error, context);
    return getErrorMessage(error, fallbackMessage);
};
