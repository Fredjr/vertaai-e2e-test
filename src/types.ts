// TypeScript Interface Definitions (TRIGGER: Contract ↔ Implementation comparator)
// This contract has been modified but implementation not updated!

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(data: CreateUserInput): Promise<User>;
  update(id: string, data: UpdateUserInput): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  
  // NEW METHOD in contract - Not implemented!
  findByEmail(email: string): Promise<User | null>;
  
  // NEW METHOD in contract - Not implemented!
  countUsers(): Promise<number>;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  name: string;
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
}
