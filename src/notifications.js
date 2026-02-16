/**
 * User Notification Service
 * Sends email and SMS notifications to users
 */

class NotificationService {
  constructor(emailProvider, smsProvider) {
    this.emailProvider = emailProvider;
    this.smsProvider = smsProvider;
    this.templates = new Map();
  }

  /**
   * Send email notification
   * @param {string} userId - User ID
   * @param {string} templateId - Email template ID
   * @param {object} data - Template data
   */
  async sendEmail(userId, templateId, data) {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    const emailContent = this.renderTemplate(template, data);
    
    await this.emailProvider.send({
      to: userId,
      subject: emailContent.subject,
      body: emailContent.body,
    });

    console.log(`Email sent to user ${userId}`);
  }

  /**
   * Send SMS notification
   * @param {string} phoneNumber - User phone number
   * @param {string} message - SMS message
   */
  async sendSMS(phoneNumber, message) {
    if (message.length > 160) {
      throw new Error('SMS message too long');
    }

    await this.smsProvider.send({
      to: phoneNumber,
      message,
    });

    console.log(`SMS sent to ${phoneNumber}`);
  }

  /**
   * Register notification template
   * @param {string} id - Template ID
   * @param {object} template - Template object
   */
  registerTemplate(id, template) {
    this.templates.set(id, template);
  }

  /**
   * Render template with data
   * @private
   */
  renderTemplate(template, data) {
    let subject = template.subject;
    let body = template.body;

    Object.keys(data).forEach(key => {
      const placeholder = `{{${key}}}`;
      subject = subject.replace(new RegExp(placeholder, 'g'), data[key]);
      body = body.replace(new RegExp(placeholder, 'g'), data[key]);
    });

    return { subject, body };
  }
}

module.exports = { NotificationService };
