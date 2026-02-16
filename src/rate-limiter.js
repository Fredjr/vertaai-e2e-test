/**
 * API Rate Limiter
 * Implements token bucket algorithm for rate limiting
 */

class RateLimiter {
  constructor(maxRequests = 100, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.clients = new Map();
  }

  /**
   * Check if request is allowed
   * @param {string} clientId - Client identifier (IP, API key, etc.)
   * @returns {boolean}
   */
  isAllowed(clientId) {
    const now = Date.now();
    const client = this.clients.get(clientId);

    if (!client) {
      this.clients.set(clientId, {
        requests: 1,
        windowStart: now,
      });
      return true;
    }

    // Reset window if expired
    if (now - client.windowStart > this.windowMs) {
      client.requests = 1;
      client.windowStart = now;
      return true;
    }

    // Check if under limit
    if (client.requests < this.maxRequests) {
      client.requests++;
      return true;
    }

    return false;
  }

  /**
   * Get remaining requests for client
   * @param {string} clientId
   * @returns {number}
   */
  getRemaining(clientId) {
    const client = this.clients.get(clientId);
    if (!client) return this.maxRequests;
    
    const now = Date.now();
    if (now - client.windowStart > this.windowMs) {
      return this.maxRequests;
    }
    
    return Math.max(0, this.maxRequests - client.requests);
  }
}

module.exports = { RateLimiter };
