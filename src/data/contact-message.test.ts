import { describe, expect, it } from "vitest";
import { parseContactMessage } from "./contact-message.ts";

describe("parseContactMessage", () => {
  const valid = {
    name: "Ada",
    email: "ada@example.com",
    topic: "work",
    message: "Hello from a hiring note.",
  };

  it("accepts a complete message", () => {
    const result = parseContactMessage(valid);
    expect(result).toEqual({ ok: true, spam: false, value: valid });
  });

  it("rejects a bad email", () => {
    const result = parseContactMessage({ ...valid, email: "nope" });
    expect(result.ok).toBe(false);
  });

  it("flags honeypot spam without failing validation", () => {
    const result = parseContactMessage({ ...valid, company: "http://spam.example" });
    expect(result).toEqual({ ok: true, spam: true, value: valid });
  });
});
