// Shared authentication database
// This persists in memory across all requests in the same process

export interface StoredUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export const authDatabase = {
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
  ] as StoredUser[],

  findByEmail(email: string): StoredUser | undefined {
    return this.users.find((u) => u.email === email);
  },

  addUser(user: StoredUser): void {
    this.users.push(user);
  },

  getAllUsers(): StoredUser[] {
    return this.users;
  },
};
