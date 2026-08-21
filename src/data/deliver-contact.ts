import { Resend } from "resend";
import { siteConfig } from "../config/site.config.ts";
import { parseContactMessage } from "./contact-message.ts";

const TOPIC_LABEL: Record<string, string> = {
  work: "Work / collaboration",
  writing: "Writing",
  other: "Something else",
};

export type ContactApiResult = {
  status: number;
  body: { ok?: boolean; error?: string };
};

export async function deliverContactPayload(payload: unknown): Promise<ContactApiResult> {
  const parsed = parseContactMessage(payload);
  if (!parsed.ok) return { status: 400, body: { error: parsed.error } };
  if (parsed.spam) return { status: 200, body: { ok: true } };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: 503, body: { error: "Mail is not configured (RESEND_API_KEY)." } };
  }

  const to = process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.links.email;
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || "onboarding@resend.dev";
  const { name, email, topic, message } = parsed.value;
  const subject = `[lucjoosten.nl] ${TOPIC_LABEL[topic] ?? topic} — ${name}`;
  const text = `From: ${name} <${email}>\nTopic: ${TOPIC_LABEL[topic] ?? topic}\n\n${message}`;
  const html = `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;<br/><strong>Topic:</strong> ${escapeHtml(TOPIC_LABEL[topic] ?? topic)}</p><p>${escapeHtml(message).replaceAll("\n", "<br/>")}</p>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject,
    text,
    html,
  });

  if (error) {
    return { status: 502, body: { error: error.message } };
  }

  return { status: 200, body: { ok: true } };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
