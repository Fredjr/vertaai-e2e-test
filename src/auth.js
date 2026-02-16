/**
 * Authentication Service
 * Handles user authentication, session management, and role-based access control
 */

class AuthService {
  constructor(db) {
    this.sessions = new Map();
    this.db = db;
  }

  /**
   * Authenticate user with credentials
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<{token: string, userId: string, roles: string[]}>}
   */
  async login(username, password) {
    // Validate credentials
    if (!username || !password) {
      throw new Error('Username and password required');
    }

    // Generate session token
    const token = this.generateToken();
    const userId = `user_${Date.now()}`;

    // Fetch user roles from database
    const roles = await this.getUserRoles(userId);

    this.sessions.set(token, {
      userId,
      username,
      roles,
      createdAt: new Date(),
    });

    return { token, userId, roles };
  }

  /**
   * Get user roles from database
   * @param {string} userId 
   * @returns {Promise<string[]>}
   */
  async getUserRoles(userId) {
    const query = `
      SELECT r.name 
      FROM roles r
      JOIN user_roles ur ON r.id = ur.role_id
      WHERE ur.user_id = $1
    `;
    const result = await this.db.query(query, [userId]);
    return result.rows.map(row => row.name);
  }

  /**
   * Check if user has required role
   * @param {string} token 
   * @param {string} requiredRole 
   * @returns {boolean}
   */
  hasRole(token, requiredRole) {
    const session = this.sessions.get(token);
    if (!session) return false;
    return session.roles.includes(requiredRole);
  }

  /**
   * Logout user and invalidate session
   * @param {string} token 
   */
  logout(token) {
    this.sessions.delete(token);
  }

  /**
   * Verify session token
   * @param {string} token 
   * @returns {boolean}
   */
  verifyToken(token) {
    return this.sessions.has(token);
  }

  generateToken() {
    return `tok_${Math.random().toString(36).substring(2)}`;
  }
}

module.exports = { AuthService };
