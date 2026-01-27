import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { mockProjects, mockExperience, mockSkills, mockTestimonials } from './mockData';

// Type-safe environment variable access
const ENV = import.meta.env as Record<string, string>;

const getEnvVar = (key: string): string => {
  try {
    const value = ENV[key];
    if (!value) {
      console.warn(`[Supabase] Environment variable ${key} is missing. Using mock data.`);
      return '';
    }
    return value;
  } catch (error) {
    console.warn(`[Supabase] Error accessing environment variable ${key}:`, error);
    return '';
  }
};

const SUPABASE_URL = getEnvVar('VITE_SUPABASE_URL');
const SUPABASE_ANON_KEY = getEnvVar('VITE_SUPABASE_ANON_KEY');

let supabaseInstance: SupabaseClient<Database> | null = null;
const shouldUseMockData = !SUPABASE_URL || !SUPABASE_ANON_KEY;

if (shouldUseMockData) {
  console.warn('[Supabase] Running in mock mode. No real database connection will be made.');
}

let useMockData = shouldUseMockData;

// 2. Attempt Real Initialization
if (!useMockData) {
  try {
    supabaseInstance = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: typeof window !== 'undefined' ? localStorage : undefined,
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  } catch (error) {
    console.error('Supabase init failed:', error);
    useMockData = true;
    console.warn('[Supabase] Falling back to mock data due to initialization error');
  }
}

// Mock builder for Supabase query builder interface
const createMockBuilder = (table: string) => {
  const dataMap: Record<string, any[]> = {
    projects: mockProjects,
    experience: mockExperience,
    skills: mockSkills,
    testimonials: mockTestimonials,
  };

  const mockData = dataMap[table] || [];
  
  // Create a proxy that handles all method calls
  return new Proxy({}, {
    get: (_, prop: string) => {
      // Handle special methods
      if (prop === 'then') {
        // This makes the builder thenable
        return (onfulfilled: any) => 
          Promise.resolve({ data: mockData, error: null }).then(onfulfilled);
      }
      
      if (prop === 'single') {
        return () => Promise.resolve({ 
          data: mockData[0] || null, 
          error: null 
        });
      }
      
      // For other methods (select, eq, order, etc.), return the builder itself
      return () => createMockBuilder(table);
    }
  });
};

// Create a type-safe mock for the auth methods
const mockAuth = {
  onAuthStateChange: () => ({
    data: { 
      subscription: { 
        unsubscribe: () => {}
      } 
    } 
  }),
  getSession: async () => ({ data: { session: null }, error: null }),
  getUser: async () => ({ data: { user: null }, error: null }),
  signOut: async () => ({ error: null }),
  // Add any other auth methods you need
};

// Create a type that matches the Supabase client interface
type SupabaseClientLike = {
  [key: string]: any;
};

// Create the Supabase client with proper typing
export const supabase = new Proxy<SupabaseClientLike>({} as SupabaseClientLike, {
  get: (_, prop: string) => {
    // If we have a real instance and not in mock mode, use it
    if (supabaseInstance && !useMockData) {
      const value = (supabaseInstance as any)[prop];
      return typeof value === 'function' ? value.bind(supabaseInstance) : value;
    }

    // Mock implementations
    switch (prop) {
      case 'from':
        return (table: string) => createMockBuilder(table);
      
      case 'auth':
        return mockAuth;
      
      case 'rpc':
        return () => Promise.resolve({ data: null, error: null });
      
      case 'storage':
      case 'functions':
        // Return a proxy that will handle any method calls on these objects
        return new Proxy({}, {
          get: () => () => Promise.resolve({ data: null, error: null })
        });
      
      default:
        // For any other property, return a no-op function that returns a resolved promise
        return () => Promise.resolve({ data: null, error: null });
    }
  }
});