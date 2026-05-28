// Shared user store for authentication
// This persists across all requests in the same Node process

export const userStore = {
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
