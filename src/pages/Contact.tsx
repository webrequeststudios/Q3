import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ChevronDown, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import PageBanner from "../components/PageBanner";
import SectionTitle from "../components/SectionTitle";
import { company, services, telHref } from "../data/content";

// Optional: set VITE_FORM_ENDPOINT (e.g. a Formspree form URL) to receive
// requests directly. Without it, the form opens the visitor's email app
// with the request pre-filled, addressed to the company email.
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

type Status = "idle" | "sending" | "sent" | "emailed" | "error";

function buildMailto(data: FormData) {
  const field = (k: string) => String(data.get(k) ?? "").trim();
  const subject = `Quote request: ${field("projectType")} — ${field("name")}`;
  const body = [
    `Name: ${field("name")}`,
    `Company: ${field("company") || "—"}`,
    `Email: ${field("email")}`,
    `Phone: ${field("phone") || "—"}`,
    `Project type: ${field("projectType")}`,
    "",
    "Project details:",
    field("details"),
  ].join("\n");
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Field({
  id,
  label,
  optional,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-ink mb-1.5">
        {label}
        {optional && <span className="text-xs font-normal text-body">Optional</span>}
      </label>
      {children}
    </div>
  );
}

function InfoRow({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="grid place-items-center h-12 w-12 shrink-0 rounded-full bg-brand text-white">
        <Icon size={20} aria-hidden="true" />
      </span>
      <div>
        <h3 className="font-semibold text-ink">{title}</h3>
        <div className="mt-0.5 text-[15px]">{children}</div>
      </div>
    </li>
  );
}

const linkClass = "hover:text-brand transition-colors";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const done = status === "sent" || status === "emailed";

  // Move focus to the confirmation so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (done) confirmationRef.current?.focus();
  }, [done]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (!FORM_ENDPOINT) {
      window.location.href = buildMailto(data);
      setStatus("emailed");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <title>Contact Us — Que3 SA</title>
      <PageBanner title="Contact Us" image="/images/kerb-installation.jpg" position="center 70%">
        Request a quote or ask us anything about your project.
      </PageBanner>

      <section className="bg-surface py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionTitle>Get In Touch</SectionTitle>
          <p className="mt-6 max-w-2xl">
            Tell us about the site and scope of work, and we'll get back to you
            with a quote. For anything urgent, give us a call.
          </p>

          <div className="mt-12 grid lg:grid-cols-[1.45fr_1fr] gap-8 items-start">
            {/* Form card */}
            <div className="bg-white rounded-lg p-6 sm:p-10 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.15)]">
              {done ? (
                <div role="status">
                  <h2
                    ref={confirmationRef}
                    tabIndex={-1}
                    className="text-2xl font-semibold focus:outline-none"
                  >
                    {status === "sent" ? "Request received" : "Almost done — send the email"}
                  </h2>
                  <span className="title-bar" aria-hidden="true" />
                  <p className="mt-6 max-w-prose">
                    {status === "sent" ? (
                      "Thank you. We'll get back to you at the contact details you provided."
                    ) : (
                      <>
                        Your email app should have opened with your request
                        filled in. Press send there to reach us. If nothing
                        opened, email{" "}
                        <a href={`mailto:${company.email}`} className="text-brand underline underline-offset-2">
                          {company.email}
                        </a>{" "}
                        or call{" "}
                        <a href={telHref(company.phone)} className="text-brand underline underline-offset-2">
                          {company.phone}
                        </a>
                        .
                      </>
                    )}
                  </p>
                  <button type="button" onClick={() => setStatus("idle")} className="btn btn-dark mt-8">
                    Back to the form
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold">Send Us a Message</h2>
                  <span className="title-bar" aria-hidden="true" />
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field id="name" label="Name">
                        <input id="name" name="name" type="text" required autoComplete="name" className="field" />
                      </Field>
                      <Field id="company" label="Company" optional>
                        <input id="company" name="company" type="text" autoComplete="organization" className="field" />
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field id="email" label="Email">
                        <input id="email" name="email" type="email" required autoComplete="email" className="field" />
                      </Field>
                      <Field id="phone" label="Phone" optional>
                        <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" />
                      </Field>
                    </div>

                    <Field id="projectType" label="Service">
                      <div className="relative">
                        <select id="projectType" name="projectType" className="field appearance-none pr-10 cursor-pointer">
                          {services.map((s) => (
                            <option key={s.id}>{s.name}</option>
                          ))}
                          <option>Other</option>
                        </select>
                        <ChevronDown
                          size={18}
                          aria-hidden="true"
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-body"
                        />
                      </div>
                    </Field>

                    <Field id="details" label="Project Details">
                      <textarea
                        id="details"
                        name="details"
                        rows={6}
                        required
                        placeholder="Site location, scope of work, target start date…"
                        className="field resize-y min-h-36"
                      />
                    </Field>

                    {status === "error" && (
                      <p role="alert" className="rounded-[3px] border border-danger/30 bg-danger/5 text-danger text-sm p-4">
                        We couldn't send your request. Check your connection and
                        try again, or email{" "}
                        <a href={`mailto:${company.email}`} className="underline underline-offset-2">
                          {company.email}
                        </a>{" "}
                        / call{" "}
                        <a href={telHref(company.phone)} className="underline underline-offset-2">
                          {company.phone}
                        </a>
                        .
                      </p>
                    )}

                    <button type="submit" disabled={status === "sending"} className="btn btn-primary px-10">
                      {status === "sending" ? "Sending…" : "Send Message"}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Contact info card */}
            <aside className="bg-white rounded-lg p-6 sm:p-10 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.15)]">
              <h2 className="text-2xl font-semibold">Contact Info</h2>
              <span className="title-bar" aria-hidden="true" />
              <ul className="mt-8 space-y-7">
                <InfoRow icon={Phone} title="Call Us">
                  <a href={telHref(company.phone)} className={linkClass}>{company.phone}</a>
                  <br />
                  <a href={telHref(company.phoneAlt)} className={linkClass}>{company.phoneAlt}</a>
                </InfoRow>
                <InfoRow icon={Mail} title="Email Us">
                  <a href={`mailto:${company.email}`} className={`${linkClass} break-all`}>
                    {company.email}
                  </a>
                </InfoRow>
                <InfoRow icon={MapPin} title="Our Office">
                  {company.address}
                </InfoRow>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
