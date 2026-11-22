import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";

import { Section } from "@/Components/Section";
import { SocialIcons } from "@/Components/SocialIcons";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { contact as profile, socials } from "@/data/resume";
import { useLang, useUi } from "@/i18n/lang";
import { ui, type Ui } from "@/i18n/ui";

type Reason = keyof Ui["contact"]["reasons"];
type Fields = { name: string; email: string; company: string; reason: Reason; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const REASONS: Reason[] = ["job", "freelance", "other"];
const EMPTY: Fields = { name: "", email: "", company: "", reason: "job", message: "" };

/** Errors are stored as keys so they follow a language switch. */
function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (f.name.trim().length < 2) errors.name = "name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) errors.email = "email";
  if (f.message.trim().length < 10) errors.message = "message";
  return errors;
}

const linkedin = socials.find((s) => s.key === "linkedin");

export default function ContactPage() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const { lang } = useLang();
  const t = useUi();
  const c = t.contact;
  // Subjects reach my inbox, so they stay in English; DE marks a message sent from the German page.
  const subject = `${ui.en.contact.reasons[fields.reason]}${lang === "de" ? " (DE)" : ""}`;
  const errorText = (key: keyof Fields) => {
    const k = errors[key];
    return k ? c.errors[k as keyof typeof c.errors] : undefined;
  };

  const update = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }) as Fields);
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
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`${subject} (via portfolio)`)}&body=${encodeURIComponent(body)}`;
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
    <Section id="contact" title={t.sections.contact}>
      <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
        <div className="space-y-5">
          <p className="max-w-[40ch] font-display text-2xl leading-snug tracking-tight">
            {c.lead}
          </p>
          <ul className="space-y-2 text-base">
            <li>
              <a href={`mailto:${profile.email}`} className="text-link">
                <Mail aria-hidden="true" className="mr-1.5 inline-block size-[1em] align-[-0.125em]" />
                {profile.email}
              </a>
            </li>
            {linkedin && (
              <li>
                <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className="text-link">
                  <SocialIcons.linkedin className="mr-1.5 inline-block size-[1em] align-[-0.125em]" />
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>

        {status === "sent" ? (
          <div role="status" className="flex flex-col items-start gap-3 rounded-lg border bg-card p-8">
            <CheckCircle2 className="size-8 text-link" aria-hidden="true" />
            <p className="font-display text-2xl font-semibold tracking-tight">{c.sentTitle}</p>
            <p className="text-muted-foreground">{c.sentBody}</p>
            <Button variant="outline" onClick={() => setStatus("idle")}>
              {c.sendAnother}
            </Button>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="space-y-5 rounded-lg border bg-card p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label={c.name} error={errorText("name")}>
                <Input id="name" name="name" autoComplete="name" value={fields.name} onChange={update("name")}
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
              </Field>
              <Field id="email" label={c.email} error={errorText("email")}>
                <Input id="email" name="email" type="email" autoComplete="email" value={fields.email} onChange={update("email")}
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="company" label={c.company}>
                <Input id="company" name="company" autoComplete="organization" value={fields.company} onChange={update("company")} />
              </Field>
              <Field id="reason" label={c.reason}>
                <select
                  id="reason"
                  value={fields.reason}
                  onChange={update("reason")}
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30 md:text-sm"
                >
                  {REASONS.map((r) => (
                    <option key={r} value={r} className="bg-background">
                      {c.reasons[r]}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field id="message" label={c.message} error={errorText("message")}>
              <Textarea id="message" name="message" rows={5} className="min-h-32" value={fields.message} onChange={update("message")}
                aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
            </Field>

            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <input type="hidden" name="reason" value={subject} />
            <input type="hidden" name="_subject" value={`Portfolio: ${subject}`} />

            {status === "error" && (
              <p role="alert" className="text-sm text-destructive">
                {c.failed(profile.email)}
              </p>
            )}

            <Button type="submit" size="lg" disabled={status === "sending"} className="w-full text-base sm:w-auto">
              {status === "sending" && <Loader2 className="animate-spin" />}
              {status === "sending" ? c.sending : c.send}
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
