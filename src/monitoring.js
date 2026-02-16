/**
 * Application Monitoring and Metrics
 * Tracks performance, errors, and business metrics
 */

class MonitoringService {
  constructor(config) {
    this.metricsEndpoint = config.metricsEndpoint;
    this.errorTrackingEnabled = config.errorTrackingEnabled || true;
    this.metrics = new Map();
  }

  /**
   * Track custom metric
   * @param {string} name - Metric name
   * @param {number} value - Metric value
   * @param {object} tags - Additional tags
   */
  trackMetric(name, value, tags = {}) {
    const metric = {
      name,
      value,
      tags,
      timestamp: Date.now(),
    };

    // Store locally
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name).push(metric);

    // Send to monitoring service
    this.sendMetric(metric);
  }

  /**
   * Track error
   * @param {Error} error - Error object
   * @param {object} context - Additional context
   */
  trackError(error, context = {}) {
    if (!this.errorTrackingEnabled) return;

    const errorData = {
      message: error.message,
      stack: error.stack,
      name: error.name,
      context,
      timestamp: Date.now(),
    };

    console.error('[Monitoring] Error tracked:', errorData);
    this.sendError(errorData);
  }

  /**
   * Track API request
   * @param {string} method - HTTP method
   * @param {string} path - Request path
   * @param {number} duration - Request duration in ms
   * @param {number} statusCode - Response status code
   */
  trackRequest(method, path, duration, statusCode) {
    this.trackMetric('api.request', 1, {
      method,
      path,
      duration,
      statusCode,
      success: statusCode < 400,
    });
  }

  /**
   * Track database query
   * @param {string} query - SQL query
   * @param {number} duration - Query duration in ms
   */
  trackQuery(query, duration) {
    this.trackMetric('db.query', 1, {
      query: query.substring(0, 100), // Truncate for privacy
      duration,
      slow: duration > 1000,
    });
  }

  /**
   * Get metrics summary
   * @param {string} name - Metric name
   * @returns {object} Summary statistics
   */
  getMetricsSummary(name) {
    const metrics = this.metrics.get(name) || [];
    if (metrics.length === 0) return null;

    const values = metrics.map(m => m.value);
    return {
      count: values.length,
      sum: values.reduce((a, b) => a + b, 0),
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }

  /**
   * Send metric to external service
   * @private
   */
  async sendMetric(metric) {
    // TODO: Implement actual sending logic
    console.log('[Monitoring] Metric:', metric);
  }

  /**
   * Send error to external service
   * @private
   */
  async sendError(errorData) {
    // TODO: Implement actual sending logic
    console.error('[Monitoring] Error:', errorData);
  }
}

module.exports = { MonitoringService };
