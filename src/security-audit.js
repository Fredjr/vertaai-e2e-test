/**
 * Security Audit Logger
 * Logs all authentication attempts and security events
 */

class SecurityAuditLogger {
  constructor() {
    this.events = [];
  }

  /**
   * Log authentication attempt
   * @param {string} userId 
   * @param {boolean} success 
   * @param {string} ipAddress 
   */
  logAuthAttempt(userId, success, ipAddress) {
    this.events.push({
      type: 'auth_attempt',
      userId,
      success,
      ipAddress,
      timestamp: new Date(),
    });
    
    // Alert on failed attempts
    if (!success) {
      console.warn(`[SECURITY] Failed auth attempt for user ${userId} from ${ipAddress}`);
    }
  }

  /**
   * Get recent failed attempts for a user
   * @param {string} userId 
   * @param {number} minutes 
   * @returns {number}
   */
  getRecentFailedAttempts(userId, minutes = 15) {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000);
    return this.events.filter(e => 
      e.type === 'auth_attempt' && 
      e.userId === userId && 
      !e.success && 
      e.timestamp > cutoff
    ).length;
  }
}

module.exports = { SecurityAuditLogger };
