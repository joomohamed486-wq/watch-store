import { Pool, QueryResult } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export const db = {
  query: <T = any>(text: string, params?: any[]): Promise<QueryResult<T>> => pool.query(text, params),
  
  // Helper for single row
  queryOne: async <T = any>(text: string, params?: any[]): Promise<T | null> => {
    const result = await pool.query<T>(text, params);
    return result.rows[0] || null;
  },
  
  // Helper for many rows
  queryMany: async <T = any>(text: string, params?: any[]): Promise<T[]> => {
    const result = await pool.query<T>(text, params);
    return result.rows;
  },
};

// For transactions
export const getClient = () => pool.connect();
