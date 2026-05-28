'use client';

import { useEffect } from 'react';

export function SeedInitializer() {
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        // Check if products exist
        const response = await fetch('/api/products?limit=1');
        const data = await response.json();
        
        // If no products, seed the database
        if (!data || data.length === 0) {
          console.log('Seeding database...');
          await fetch('/api/seed');
        }
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    initializeDatabase();
  }, []);

  return null;
}
