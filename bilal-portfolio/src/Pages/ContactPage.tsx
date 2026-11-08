import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Section } from "@/Components/Section";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { profile, socials } from "@/data/resume";

type Fields = { name: string; email: string; company: string; reason: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const REASONS = ["Job opportunity", "Freelance or project work", "Something else"];
const EMPTY: Fields = { name: "", email: "", company: "", reason: REASONS[0], message: "" };

function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (f.name.trim().length < 2) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) errors.email = "Enter an email address like name@company.com.";
  if (f.message.trim().length < 10) errors.message = "Write at least 10 characters so I know how to help.";
  return errors;
}

const linkedin = socials.find((s) => s.key === "linkedin");

export default function ContactPage() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const form = new FormData(e.currentTarget);
    if (form.get("_gotcha")) return;

    if (!profile.formspreeEndpoint) {
      const body = `${fields.message}\n\n${fields.name}${fields.company ? `, ${fields.company}` : ""} (${fields.email})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`${fields.reason} (via portfolio)`)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(profile.formspreeEndpoint, {
        method: "POST",
        body: form,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setStatus("sent");
      setFields(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact" title="Contact">
      <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
        <div className="space-y-5">
          <p className="max-w-[40ch] font-display text-2xl leading-snug tracking-tight">
            Hiring for a full-stack or GenAI role? Tell me about it.
          </p>
          <ul className="space-y-2 text-base">
            <li>
              <a href={`mailto:${profile.email}`} className="text-link">
                {profile.email}
              </a>
            </li>
            {linkedin && (
              <li>
                <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className="text-link">
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>

        {status === "sent" ? (
          <div role="status" className="flex flex-col items-start gap-3 rounded-lg border bg-card p-8">
            <CheckCircle2 className="size-8 text-link" aria-hidden="true" />
            <p className="font-display text-2xl font-semibold tracking-tight">Message sent</p>
            <p className="text-muted-foreground">Thanks for reaching out. I'll reply to the email you gave.</p>
            <Button variant="outline" onClick={() => setStatus("idle")}>
              Send another message
            </Button>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="space-y-5 rounded-lg border bg-card p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Name" error={errors.name}>
                <Input id="name" name="name" autoComplete="name" value={fields.name} onChange={update("name")}
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <Input id="email" name="email" type="email" autoComplete="email" value={fields.email} onChange={update("email")}
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="company" label="Company (optional)">
                <Input id="company" name="company" autoComplete="organization" value={fields.company} onChange={update("company")} />
              </Field>
              <Field id="reason" label="What's this about?">
                <select
                  id="reason"
                  name="reason"
                  value={fields.reason}
                  onChange={update("reason")}
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30 md:text-sm"
                >
                  {REASONS.map((r) => (
                    <option key={r} value={r} className="bg-background">
                      {r}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field id="message" label="Message" error={errors.message}>
              <Textarea id="message" name="message" rows={5} className="min-h-32" value={fields.message} onChange={update("message")}
                aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
            </Field>

            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <input type="hidden" name="_subject" value={`Portfolio: ${fields.reason}`} />

            {status === "error" && (
              <p role="alert" className="text-sm text-destructive">
                The message didn't send. Check your connection and try again, or email {profile.email} directly.
              </p>
            )}

            <Button type="submit" size="lg" disabled={status === "sending"} className="w-full text-base sm:w-auto">
              {status === "sending" && <Loader2 className="animate-spin" />}
              {status === "sending" ? "Sending message" : "Send message"}
            </Button>
          </form>
        )}
      </div>
    </Section>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
