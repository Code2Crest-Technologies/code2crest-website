import { LEGAL_CONTACT_EMAIL } from "@/lib/legal/constants";
import { sendEmail } from "@/lib/email/client";
import { forwardLeadToLeadFlow } from "@/lib/leads/leadflow-client";
import {
  budgetOptions,
  heardAboutOptions,
  serviceOptions,
  timelineOptions,
  type NormalizedPublicLead,
} from "@/lib/leads/types";
import { getOptionLabel } from "@/lib/leads/normalize";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function text(value?: string) {
  return value && value.length > 0 ? value : "Not provided";
}

function row(label: string, value?: string) {
  return `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#64748b;width:180px">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a">${escapeHtml(text(value))}</td>
    </tr>
  `;
}

function leadNotificationEmail(lead: NormalizedPublicLead) {
  const serviceLabel = getOptionLabel(serviceOptions, lead.service);
  const budgetLabel = getOptionLabel(budgetOptions, lead.budget);
  const timelineLabel = getOptionLabel(timelineOptions, lead.timeline);
  const heardAboutLabel = getOptionLabel(heardAboutOptions, lead.heardAboutUs);
  const subjectName = lead.companyName ?? lead.name;
  const subject = `New Website Lead - ${serviceLabel} - ${subjectName}`;
  const replyMailto = `mailto:${lead.email}?subject=${encodeURIComponent(
    `Re: Your ${serviceLabel} enquiry with Code2Crest`,
  )}`;

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h1 style="margin:0 0 8px">New Website Lead</h1>
      <p style="margin:0 0 20px;color:#475569">A new Code2Crest public website enquiry was submitted.</p>

      <h2 style="font-size:16px;margin:24px 0 8px">Contact</h2>
      <table style="border-collapse:collapse;width:100%;max-width:720px;background:#fff;border:1px solid #e2e8f0">
        ${row("Name", lead.name)}
        ${row("Company", lead.companyName)}
        ${row("Email", lead.email)}
        ${row("Phone / WhatsApp", lead.phone)}
      </table>

      <h2 style="font-size:16px;margin:24px 0 8px">Requirement</h2>
      <table style="border-collapse:collapse;width:100%;max-width:720px;background:#fff;border:1px solid #e2e8f0">
        ${row("Service", serviceLabel)}
        ${row("Budget", budgetLabel)}
        ${row("Timeline", timelineLabel)}
        ${row("Project description", lead.projectDescription)}
      </table>

      <h2 style="font-size:16px;margin:24px 0 8px">Source</h2>
      <table style="border-collapse:collapse;width:100%;max-width:720px;background:#fff;border:1px solid #e2e8f0">
        ${row("Lead source", lead.source)}
        ${row("Heard about us", heardAboutLabel)}
        ${row("UTM source", lead.attribution?.utmSource)}
        ${row("UTM campaign", lead.attribution?.utmCampaign)}
        ${row("Referrer", lead.attribution?.referrer)}
        ${row("Landing page", lead.attribution?.landingPage)}
        ${row("Current page", lead.attribution?.currentPage)}
      </table>

      <p style="margin-top:24px">
        <a href="${escapeHtml(replyMailto)}" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Reply to lead</a>
      </p>

      <p style="font-size:12px;color:#64748b;margin-top:24px">
        This lead was processed by the Code2Crest website lead capture workflow.
      </p>
    </div>
  `;

  const plainText = [
    "New Website Lead",
    "",
    "Contact",
    `Name: ${lead.name}`,
    `Company: ${text(lead.companyName)}`,
    `Email: ${lead.email}`,
    `Phone / WhatsApp: ${lead.phone}`,
    "",
    "Requirement",
    `Service: ${serviceLabel}`,
    `Budget: ${budgetLabel}`,
    `Timeline: ${timelineLabel}`,
    `Project description: ${lead.projectDescription}`,
    "",
    "Source",
    `Lead source: ${lead.source}`,
    `Heard about us: ${heardAboutLabel}`,
    `UTM source: ${text(lead.attribution?.utmSource)}`,
    `UTM campaign: ${text(lead.attribution?.utmCampaign)}`,
    `Referrer: ${text(lead.attribution?.referrer)}`,
    `Landing page: ${text(lead.attribution?.landingPage)}`,
    `Current page: ${text(lead.attribution?.currentPage)}`,
    "",
    `Reply to lead: ${replyMailto}`,
  ].join("\n");

  return { subject, html, text: plainText };
}

export async function submitPublicLead(lead: NormalizedPublicLead) {
  const email = leadNotificationEmail(lead);
  const [leadFlow, notification] = await Promise.all([
    forwardLeadToLeadFlow(lead),
    sendEmail({
      to: LEGAL_CONTACT_EMAIL,
      ...email,
      previewLabel: `website-lead:${lead.source}`,
    }),
  ]);

  if (leadFlow.ok) {
    console.info(
      JSON.stringify({
        event: "LEADFLOW_INTAKE_SUCCESS",
        contactId: leadFlow.contactId,
        dealId: leadFlow.dealId,
        duplicateReused: leadFlow.duplicateReused,
        service: lead.service,
        source: lead.source,
      }),
    );
  } else {
    console.error(
      JSON.stringify({
        event: "LEADFLOW_INTAKE_FAILED",
        reason: leadFlow.reason,
        service: lead.service,
        source: lead.source,
      }),
    );
  }

  if (notification.ok) {
    console.info(
      JSON.stringify({
        event: "LEAD_NOTIFICATION_EMAIL_SUCCESS",
        service: lead.service,
        source: lead.source,
      }),
    );
  } else {
    console.error(
      JSON.stringify({
        event: "LEAD_NOTIFICATION_EMAIL_FAILED",
        service: lead.service,
        source: lead.source,
      }),
    );
  }

  return {
    ok: leadFlow.ok || notification.ok,
    leadFlow,
    notification,
  };
}
