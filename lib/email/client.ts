type EmailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
  previewLabel?: string;
};

function getEmailFrom() {
  return process.env.EMAIL_FROM ?? "Code2Crest Hub <hello@code2crest.com>";
}

export async function sendEmail(input: EmailInput) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(`[email:dev] ${input.previewLabel ?? input.subject} to=${input.to}`);
    return { ok: true, preview: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: getEmailFrom(),
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error(`[email] Resend delivery failed status=${response.status} body=${body.slice(0, 300)}`);
    return { ok: false, preview: false };
  }

  return { ok: true, preview: false };
}

