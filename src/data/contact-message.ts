export const CONTACT_TOPICS = ["work", "writing", "other"] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export type ContactFields = {
  name: string;
  email: string;
  topic: ContactTopic;
  message: string;
};

export type ContactParseResult =
  | { ok: true; value: ContactFields; spam: boolean }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 80;
const MAX_MESSAGE = 4000;

function isTopic(value: string): value is ContactTopic {
  return (CONTACT_TOPICS as readonly string[]).includes(value);
}

export function parseContactMessage(input: unknown): ContactParseResult {
  if (input === null || typeof input !== "object") {
    return { ok: false, error: "Invalid payload." };
  }

  const record = input as Record<string, unknown>;
  const honeypot = typeof record.company === "string" ? record.company.trim() : "";
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const topicRaw = typeof record.topic === "string" ? record.topic.trim() : "";
  const message = typeof record.message === "string" ? record.message.trim() : "";

  if (!name) return { ok: false, error: "Name is required." };
  if (name.length > MAX_NAME) return { ok: false, error: "Name is too long." };
  if (!email || !EMAIL_RE.test(email)) return { ok: false, error: "A valid email is required." };
  if (!isTopic(topicRaw)) return { ok: false, error: "Pick a topic." };
  if (!message) return { ok: false, error: "Message is required." };
  if (message.length > MAX_MESSAGE) return { ok: false, error: "Message is too long." };

  return {
    ok: true,
    spam: honeypot.length > 0,
    value: { name, email, topic: topicRaw, message },
  };
}
