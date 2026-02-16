/**
 * Payment API Module
 * Handles payment processing and refunds
 */

class PaymentAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.payment.com';
  }

  /**
   * Process a payment
   * @param {Object} paymentData - Payment information
   * @param {number} paymentData.amount - Amount in cents
   * @param {string} paymentData.currency - Currency code (USD, EUR, etc.)
   * @param {string} paymentData.customerId - Customer ID
   * @returns {Promise<Object>} Payment result
   */
  async processPayment(paymentData) {
    const response = await fetch(`${this.baseUrl}/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData)
    });
    
    return response.json();
  }

  /**
   * Refund a payment
   * @param {string} paymentId - Payment ID to refund
   * @param {number} amount - Amount to refund in cents (optional, full refund if not specified)
   * @returns {Promise<Object>} Refund result
   */
  async refundPayment(paymentId, amount = null) {
    const body = { paymentId };
    if (amount) body.amount = amount;
    
    const response = await fetch(`${this.baseUrl}/refunds`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    
    return response.json();
  }
}

module.exports = PaymentAPI;
