/**
 * Centralized Logging System
 * Provides structured logging with multiple transports
 */

class Logger {
  constructor(serviceName) {
    this.serviceName = serviceName;
    this.logLevel = process.env.LOG_LEVEL || 'info';
    this.transports = [];
  }

  /**
   * Log levels: debug, info, warn, error
   */
  static LEVELS = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  /**
   * Add a transport (console, file, external service)
   * @param {object} transport - Transport object with write() method
   */
  addTransport(transport) {
    this.transports.push(transport);
  }

  /**
   * Log a message
   * @param {string} level - Log level
   * @param {string} message - Log message
   * @param {object} metadata - Additional metadata
   */
  log(level, message, metadata = {}) {
    const levelValue = Logger.LEVELS[level];
    const currentLevelValue = Logger.LEVELS[this.logLevel];

    if (levelValue < currentLevelValue) {
      return; // Skip logs below current level
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      service: this.serviceName,
      message,
      ...metadata,
    };

    // Write to all transports
    this.transports.forEach(transport => {
      transport.write(logEntry);
    });

    // Default console output
    if (this.transports.length === 0) {
      console.log(JSON.stringify(logEntry));
    }
  }

  debug(message, metadata) {
    this.log('debug', message, metadata);
  }

  info(message, metadata) {
    this.log('info', message, metadata);
  }

  warn(message, metadata) {
    this.log('warn', message, metadata);
  }

  error(message, metadata) {
    this.log('error', message, metadata);
  }
}

module.exports = { Logger };
