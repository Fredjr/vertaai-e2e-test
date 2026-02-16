/**
 * API Client for User Management
 */

const API_BASE_URL = 'https://api.example.com/v1';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
}

/**
 * List all users
 * @param limit - Maximum number of users to return
 * @returns Array of users
 */
export async function listUsers(limit: number = 20): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users?limit=${limit}`);
  if (!response.ok) {
    throw new Error(`Failed to list users: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Create a new user
 * @param data - User data
 * @returns Created user
 */
export async function createUser(data: CreateUserRequest): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to create user: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Get a user by ID
 * @param userId - The ID of the user to retrieve
 * @returns User object
 */
export async function getUser(userId: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to get user: ${response.statusText}`);
  }
  return response.json();
}

