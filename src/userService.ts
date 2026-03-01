// User Service Implementation (TRIGGER: Test ↔ Implementation comparator)
// This implementation has been modified but tests not updated!

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserService {
  private users: Map<string, User> = new Map();

  async createUser(email: string, name: string): Promise<User> {
    const user: User = {
      id: Math.random().toString(36).substring(7),
      email,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.users.set(user.id, user);
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // NEW METHOD - No tests added!
  async deleteUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  // NEW METHOD - No tests added!
  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;
    
    const updated = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updated);
    return updated;
  }
}
