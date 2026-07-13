function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function actionTemplate(title: string, body: string, actionUrl: string, actionLabel: string) {
  const safeUrl = escapeHtml(actionUrl);

  return {
    subject: title,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(body)}</p>
        <p><a href="${safeUrl}" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">${escapeHtml(actionLabel)}</a></p>
        <p style="font-size:12px;color:#64748b">If the button does not work, open this link: ${safeUrl}</p>
      </div>
    `,
    text: `${title}\n\n${body}\n\n${actionUrl}`,
  };
}

export function teamInviteEmail(input: { companyName: string; inviteLink: string }) {
  return actionTemplate(
    `You're invited to ${input.companyName} on Code2Crest Hub`,
    "Accept your invite to join the company workspace.",
    input.inviteLink,
    "Accept invite",
  );
}

export function passwordResetEmail(input: { resetLink: string }) {
  return actionTemplate(
    "Reset your Code2Crest Hub password",
    "Use this secure link within 30 minutes to reset your password. If you did not request this, ignore this email.",
    input.resetLink,
    "Reset password",
  );
}

export function emailVerificationEmail(input: { verificationLink: string }) {
  return actionTemplate(
    "Verify your Code2Crest Hub email",
    "Verify your email address to keep your workspace secure.",
    input.verificationLink,
    "Verify email",
  );
}

export function passwordChangedEmail() {
  return {
    subject: "Your Code2Crest Hub password was changed",
    html: "<p>Your Code2Crest Hub password was changed. If this was not you, contact Code2Crest support immediately.</p>",
    text: "Your Code2Crest Hub password was changed. If this was not you, contact Code2Crest support immediately.",
  };
}

