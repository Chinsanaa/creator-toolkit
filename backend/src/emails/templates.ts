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
        <p style="margin:0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#7c3aed;">Creator Toolkit</p>
        <h1 style="margin:12px 0 0;font-size:20px;font-weight:600;color:#18181b;">${title}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 28px 24px;">
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#52525b;">Hi ${name},</p>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3f3f46;">${body}</p>
        <a href="${dashboardUrl}${ctaPath}" style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;font-size:14px;font-weight:500;padding:10px 18px;border-radius:8px;">Open dashboard</a>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 28px;border-top:1px solid #f4f4f5;font-size:12px;color:#a1a1aa;">
        You received this because you have an account on Creator Toolkit.
      </td>
    </tr>
  </table>
</body>
</html>`;
}
