const frontendUrl = () => process.env.FRONTEND_URL || 'http://localhost:3000';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildNotificationEmail(params: {
  userName: string;
  title: string;
  body: string;
  type: string;
}): string {
  const name = escapeHtml(params.userName || 'there');
  const title = escapeHtml(params.title);
  const body = escapeHtml(params.body);
  const dashboardUrl = escapeHtml(frontendUrl());

  const ctaPath =
    params.type.startsWith('application_') ? '/sponsorships/applications' : '/dashboard';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:system-ui,-apple-system,sans-serif;background:#f4f4f5;color:#18181b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:32px auto;background:#fff;border-radius:12px;border:1px solid #e4e4e7;">
    <tr>
      <td style="padding:28px 28px 8px;">
        <p style="margin:0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#2E5BFF;">Earnio</p>
        <h1 style="margin:12px 0 0;font-size:20px;font-weight:600;color:#18181b;">${title}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 28px 24px;">
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#52525b;">Hi ${name},</p>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3f3f46;">${body}</p>
        <a href="${dashboardUrl}${ctaPath}" style="display:inline-block;background:#2E5BFF;color:#fff;text-decoration:none;font-size:14px;font-weight:500;padding:10px 18px;border-radius:8px;">Open dashboard</a>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 28px;border-top:1px solid #f4f4f5;font-size:12px;color:#a1a1aa;">
        You received this because you have an account on Earnio.
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildPasswordResetEmail(params: {
  userName: string;
  resetLink: string;
  expiresInMinutes: number;
}): string {
  const name = escapeHtml(params.userName || 'there');
  const resetLink = escapeHtml(params.resetLink);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:system-ui,-apple-system,sans-serif;background:#f4f4f5;color:#18181b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:32px auto;background:#fff;border-radius:12px;border:1px solid #e4e4e7;">
    <tr>
      <td style="padding:28px 28px 8px;">
        <p style="margin:0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#2E5BFF;">Earnio</p>
        <h1 style="margin:12px 0 0;font-size:20px;font-weight:600;color:#18181b;">Reset your password</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 28px 24px;">
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#52525b;">Hi ${name},</p>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3f3f46;">We received a request to reset your password. Click the button below to set a new password. This link expires in ${params.expiresInMinutes} minutes.</p>
        <a href="${resetLink}" style="display:inline-block;background:#2E5BFF;color:#fff;text-decoration:none;font-size:14px;font-weight:500;padding:10px 18px;border-radius:8px;">Reset Password</a>
        <p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:#71717a;">If you didn't request this, you can safely ignore this email.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 28px;border-top:1px solid #f4f4f5;font-size:12px;color:#a1a1aa;">
        This is an automated email. Do not reply to this address.
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildPasswordChangedEmail(params: {
  userName: string;
  changedAt: string;
}): string {
  const name = escapeHtml(params.userName || 'there');
  const changedAt = escapeHtml(params.changedAt);
  const supportUrl = escapeHtml(frontendUrl());

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:system-ui,-apple-system,sans-serif;background:#f4f4f5;color:#18181b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:32px auto;background:#fff;border-radius:12px;border:1px solid #e4e4e7;">
    <tr>
      <td style="padding:28px 28px 8px;">
        <p style="margin:0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#2E5BFF;">Earnio</p>
        <h1 style="margin:12px 0 0;font-size:20px;font-weight:600;color:#18181b;">Password Changed</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 28px 24px;">
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#52525b;">Hi ${name},</p>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3f3f46;">Your password was successfully changed on ${changedAt}.</p>
        <div style="padding:16px;background:#fff3cd;border-left:4px solid #ffc107;border-radius:4px;margin:0 0 24px;">
          <p style="margin:0;font-size:14px;color:#664d03;"><strong>Security Alert:</strong> If you didn't make this change, please contact support immediately.</p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 28px;border-top:1px solid #f4f4f5;font-size:12px;color:#a1a1aa;">
        This is an automated email. Do not reply to this address.
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildVerificationEmail(params: {
  userName: string;
  verificationCode: string;
  expiresInMinutes: number;
}): string {
  const name = escapeHtml(params.userName || 'there');
  const code = escapeHtml(params.verificationCode);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:system-ui,-apple-system,sans-serif;background:#f4f4f5;color:#18181b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:32px auto;background:#fff;border-radius:12px;border:1px solid #e4e4e7;">
    <tr>
      <td style="padding:28px 28px 8px;">
        <p style="margin:0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#2E5BFF;">Earnio</p>
        <h1 style="margin:12px 0 0;font-size:20px;font-weight:600;color:#18181b;">Verify your email</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 28px 24px;">
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#52525b;">Hi ${name},</p>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3f3f46;">Please use the verification code below to confirm your email address. This code expires in ${params.expiresInMinutes} minutes.</p>
        <div style="padding:16px 24px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 24px;">
          <p style="margin:0;font-size:32px;font-weight:700;letter-spacing:2px;color:#18181b;text-align:center;">${code}</p>
        </div>
        <p style="margin:0 0 16px;font-size:13px;line-height:1.5;color:#6b7280;">If you didn't request this code, please ignore this email.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 28px;border-top:1px solid #f4f4f5;font-size:12px;color:#a1a1aa;">
        This is an automated email. Do not reply to this address.
      </td>
    </tr>
  </table>
</body>
</html>`;
}
