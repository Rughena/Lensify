// Global mock database instance - persists across requests
export const mockAuthDB = {
  users: [
    {
      id: '1',
      email: 'demo@example.com',
      password: 'demo123',
      firstName: 'Demo',
      lastName: 'User',
      role: 'customer',
    },
    {
      id: '2',
      email: 'admin@example.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    },
  ],
};
