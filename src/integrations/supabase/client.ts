import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Validate environment variables
const getEnvVar = (key: string, isRequired = true): string => {
  const value = import.meta.env[key];
  if (isRequired && !value) {
    const message = `Missing required environment variable: ${key}`;
    if (import.meta.env.PROD) {
      console.error(message);
    } else {
      throw new Error(message);
    }
  }
  return value || '';
};

const SUPABASE_URL = getEnvVar('VITE_SUPABASE_URL');
const SUPABASE_ANON_KEY = getEnvVar('VITE_SUPABASE_ANON_KEY');

let supabaseInstance: SupabaseClient<Database> | null = null;

try {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabaseInstance = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: typeof window !== 'undefined' ? localStorage : undefined,
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  } else if (import.meta.env.PROD) {
    console.warn('Supabase client not initialized. Missing required environment variables.');
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
}

export const supabase = {
  // Only expose methods if supabase is initialized
  ...(supabaseInstance || {
    // Mock implementation that throws errors in development but fails silently in production
    ...Object.fromEntries(
      Object.getOwnPropertyNames(Object.getPrototypeOf({})).map((method) => [
        method,
        () => {
          const message = 'Supabase client not properly initialized. Check your environment variables.';
          if (!import.meta.env.PROD) {
            throw new Error(message);
          }
          console.error(message);
          return { data: null, error: new Error(message) };
        },
      ])
    ),
  }),
  // Ensure auth is always available
  auth: {
    // @ts-ignore - This is a simplified mock for the auth property
    onAuthStateChange: (callback: any) => {
      if (supabaseInstance?.auth) {
        return supabaseInstance.auth.onAuthStateChange(callback);
      }
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
  },
} as unknown as SupabaseClient<Database>;