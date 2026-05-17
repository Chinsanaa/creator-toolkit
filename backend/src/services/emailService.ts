import { Resend } from 'resend';
import { buildNotificationEmail } from '../emails/templates';

class EmailService {
  private resend: Resend | null = null;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (apiKey) {
      this.resend = new Resend(apiKey);
    }
  }

  public isConfigured(): boolean {
    return Boolean(this.resend && process.env.EMAIL_FROM?.trim());
  }

  public warnIfNotConfigured(): void {
    if (!process.env.RESEND_API_KEY?.trim()) {
      console.warn(
        '⚠ RESEND_API_KEY is not set. Email notifications are disabled. Get a key at https://resend.com/api-keys'
      );
      return;
    }
    if (!process.env.EMAIL_FROM?.trim()) {
      console.warn(
        '⚠ EMAIL_FROM is not set. Email notifications are disabled. Example: Creator Toolkit <onboarding@resend.dev>'
      );
    }
  }

  public async sendNotificationEmail(params: {
    to: string;
    userName: string;
    title: string;
    body: string;
    type: string;
  }): Promise<void> {
    if (!this.resend) return;

    const from = process.env.EMAIL_FROM?.trim();
    if (!from) return;

    const html = buildNotificationEmail(params);

    const { error } = await this.resend.emails.send({
      from,
      to: params.to,
      subject: params.title,
      html,
    });

    if (error) {
      console.error('Resend send failed:', error.message);
    }
  }
}

export default new EmailService();
