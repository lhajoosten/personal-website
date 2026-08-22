import { useState, type FormEvent } from "react";
import { contactPage } from "../../content/site.ts";
import { CONTACT_TOPICS, type ContactTopic } from "../../data/contact-message.ts";
import { SendIcon } from "../icons/BrandIcons.tsx";
import { useTheme } from "../theme/useTheme.ts";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const { theme } = useTheme();
  const isBuilder = theme === "builder";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<ContactTopic>("work");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const fieldClass = isBuilder
    ? "min-h-10 w-full rounded-theme border border-line bg-canvas px-3 py-2 text-sm text-ink"
    : "min-h-10 w-full border-0 border-b-2 border-line bg-transparent px-0 py-2 text-sm text-ink";

  const labelClass = isBuilder
    ? "font-mono text-[11px] tracking-[0.14em] text-muted uppercase"
    : "text-[11px] tracking-[0.14em] text-muted uppercase";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, message, company }),
      });
      const raw = await response.text();
      let body: { error?: string } = {};
      try {
        body = raw ? (JSON.parse(raw) as { error?: string }) : {};
      } catch {
        body = {};
      }
      if (!response.ok) {
        setStatus("error");
        setError(
          body.error === "Mail is not configured (RESEND_API_KEY)."
            ? contactPage.notConfigured
            : body.error || contactPage.error,
        );
        return;
      }
      setStatus("sent");
      setName("");
      setEmail("");
      setTopic("work");
      setMessage("");
    } catch {
      setStatus("error");
      setError(contactPage.error);
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="border border-line bg-panel px-4 py-5 text-ink">
        {contactPage.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <p className="sr-only">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </p>
      <label className="grid gap-1.5">
        <span className={labelClass}>{contactPage.nameLabel}</span>
        <input
          name="name"
          required
          maxLength={80}
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={fieldClass}
        />
      </label>
      <label className="grid gap-1.5">
        <span className={labelClass}>{contactPage.emailLabel}</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={fieldClass}
        />
      </label>
      <fieldset className="grid gap-2">
        <legend className={labelClass}>{contactPage.topicLabel}</legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_TOPICS.map((item) => (
            <label
              key={item}
              className={
                topic === item
                  ? isBuilder
                    ? "inline-flex min-h-9 cursor-pointer items-center border border-accent bg-accent/10 px-3 font-mono text-xs text-accent"
                    : "inline-flex min-h-9 cursor-pointer items-center border-2 border-ink bg-ink px-3 text-sm text-canvas"
                  : isBuilder
                    ? "inline-flex min-h-9 cursor-pointer items-center border border-line px-3 font-mono text-xs text-muted"
                    : "inline-flex min-h-9 cursor-pointer items-center border-2 border-line px-3 text-sm text-muted"
              }
            >
              <input
                type="radio"
                name="topic"
                value={item}
                checked={topic === item}
                onChange={() => setTopic(item)}
                className="sr-only"
              />
              {contactPage.topics[item]}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="grid gap-1.5">
        <span className={labelClass}>{contactPage.messageLabel}</span>
        <textarea
          name="message"
          required
          rows={7}
          maxLength={4000}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${fieldClass} min-h-40 resize-y`}
        />
      </label>
      {status === "error" ? (
        <p role="alert" className="text-sm text-accent">
          {error}
        </p>
      ) : (
        <p className="text-sm text-muted">{contactPage.responseNote}</p>
      )}
      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className={
            isBuilder
              ? "inline-flex min-h-11 items-center gap-2 border border-accent bg-accent/10 px-4 font-mono text-xs text-accent disabled:opacity-60"
              : "inline-flex min-h-11 items-center gap-2 bg-ink px-5 text-sm text-[var(--theme-bg)] disabled:opacity-60"
          }
        >
          {status === "sending" ? null : <SendIcon className="size-4" />}
          {status === "sending" ? contactPage.sending : contactPage.submit}
        </button>
      </div>
    </form>
  );
}
