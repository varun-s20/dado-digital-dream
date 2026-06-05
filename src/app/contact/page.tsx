import type { Metadata } from "next";
import { HoverFillButton } from "@/components/HoverFillButton";
import { MagneticLink } from "@/components/MagneticLink";
import { Reveal } from "@/components/Reveal";
import { RevealImage } from "@/components/RevealImage";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a garden, pool or carpentry project with BM.",
  openGraph: {
    title: "Contact — BM.",
    description: "Get in touch about your next outdoor project.",
  },
};

// CSS-only floating label: rests inside the line, rises to small-caps on focus
// or once the field holds a value. Tight tracking for the luxury read.
const floatLabel =
  "pointer-events-none absolute left-0 top-5 text-[0.95rem] tracking-[-0.005em] text-muted-foreground " +
  "transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] " +
  "peer-focus:top-0 peer-focus:text-[0.66rem] peer-focus:uppercase peer-focus:tracking-[0.05em] " +
  "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.66rem] " +
  "peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.05em]";

// 16px on mobile — anything smaller makes iOS Safari auto-zoom the
// viewport when a field gains focus. Desktop drops back to the 0.95rem set.
const fieldBase =
  "peer w-full border-b border-border bg-transparent pb-2 pt-5 text-base tracking-[-0.005em] md:text-[0.95rem] " +
  "outline-none focus:border-foreground/0";

const PROJECT_TYPES = ["Landscape", "Carpentry", "Pool", "Stonework", "Other"];

export default function ContactPage() {
  return (
    <section className="contact-atmos relative overflow-hidden">
      {/* aesthetic design layer — fixed grain + a faint oversized watermark
          seated behind the body for depth */}
      <div className="film-grain" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden justify-center overflow-hidden md:flex"
      >
        <span className="contact-watermark translate-y-[26%] text-[24vw]">{brand.mark}</span>
      </div>

      {/* MASTHEAD — editorial, left-aligned, asymmetric */}
      <div className="relative mx-auto max-w-[1320px] px-6 pt-28 md:px-12 md:pt-32">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <span className="eyebrow-pill eyebrow text-muted-foreground">
            <span className="pulse-dot" aria-hidden /> Contact
          </span>
          <p className="eyebrow text-muted-foreground">Sydney &amp; South Coast</p>
        </div>

        <div className="mt-7 grid items-end gap-x-10 gap-y-6 md:mt-9 md:grid-cols-12">
          <h1 className="word-rise font-display text-[2.4rem] font-[400] leading-[0.9] tracking-[-0.04em] md:col-span-7 md:text-[3.5rem]">
            <span style={{ animationDelay: "0.1s" }}>Tell us about</span>
            <br />
            <span style={{ animationDelay: "0.28s" }} className="italic font-[300]">
              your site.
            </span>
          </h1>
          <Reveal delay={160} className="md:col-span-5 md:col-start-8">
            <p className="text-[0.92rem] leading-[1.5] tracking-[-0.005em] text-muted-foreground">
              We take on a small number of projects each year. The earlier we hear from
              you, the more we can shape.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.05em]">
              <span className="pulse-dot" aria-hidden /> Currently booking for 2026
            </span>
          </Reveal>
        </div>
      </div>

      {/* BODY — image + details · form */}
      <div className="relative mx-auto mt-10 max-w-[1320px] border-t border-border px-6 pb-20 pt-10 md:mt-14 md:px-12 md:pb-24 md:pt-12">
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-12">
          {/* LEFT — image anchor + studio details */}
          <div className="md:col-span-5">
            <RevealImage
              src="/images/studio.jpg"
              alt="Inside the workshop — a carpenter shaping a hardwood joint"
              loading="eager"
              className="aspect-[4/5] w-full bg-muted"
            />
            <dl className="mt-8 divide-y divide-border border-y border-border">
              <DetailRow label="Phone">
                <a href={brand.phoneHref} className="arrow-link font-display tracking-[-0.01em]">
                  {brand.phone}
                </a>
              </DetailRow>
              <DetailRow label="Email">
                <MagneticLink
                  href={`mailto:${brand.email}` as never}
                  className="arrow-link inline-flex items-baseline gap-2 font-display tracking-[-0.01em]"
                >
                  {brand.email}
                  <span aria-hidden className="text-xs">
                    →
                  </span>
                </MagneticLink>
              </DetailRow>
              <DetailRow label="Studio">
                <span className="font-display leading-snug tracking-[-0.01em]">
                  {brand.address.line1}, {brand.address.line2}
                </span>
              </DetailRow>
              <DetailRow label="Hours">
                <span className="text-muted-foreground">Mon — Fri · 8:00 — 17:00</span>
              </DetailRow>
            </dl>
            <div className="mt-6 flex items-center gap-6">
              {brand.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.68rem] font-medium uppercase tracking-[0.05em] text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:underline focus-visible:underline-offset-4"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — enquiry form */}
          <Reveal delay={120} className="md:col-span-7 md:col-start-6">
            <p className="eyebrow text-muted-foreground">Send an enquiry</p>
            <form className="mt-7 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
              <Field id="firstName" label="First name" autoComplete="given-name" />
              <Field id="lastName" label="Last name" autoComplete="family-name" />
              <Field id="email" label="Email" type="email" autoComplete="email" />
              <Field id="phone" label="Phone" type="tel" autoComplete="tel" />
              <Field id="address" label="Address" className="sm:col-span-2" />
              <Field
                id="hear"
                label="How did you hear about us?"
                className="sm:col-span-2"
              />

              <fieldset className="sm:col-span-2">
                <legend className="eyebrow text-muted-foreground">Project type</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((t) => (
                    <label key={t} className="cursor-pointer">
                      <input type="checkbox" name="projectType" value={t} className="peer sr-only" />
                      <span className="inline-block border border-border px-4 py-2.5 text-[0.7rem] uppercase tracking-[0.05em] text-muted-foreground transition-colors duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-foreground hover:text-foreground peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:ring-1 peer-focus-visible:ring-foreground peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background">
                        {t}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <TextareaField
                id="message"
                label="Tell us about the project — site, scope, ideal start"
                className="sm:col-span-2"
              />

              <div className="flex flex-col items-start gap-6 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-[0.76rem] leading-[1.5] text-muted-foreground/70">
                  We&rsquo;ll reply within two working days, usually with a few first
                  questions.
                </p>
                <HoverFillButton
                  type="button"
                  className="surface-deep px-7 py-3.5 text-[0.72rem] uppercase tracking-[0.06em]"
                >
                  Send enquiry <span aria-hidden>→</span>
                </HoverFillButton>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 py-3.5 text-[0.95rem]">
      <dt className="eyebrow text-muted-foreground">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  className = "",
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  className?: string;
  autoComplete?: string;
}) {
  return (
    <div className={`field-line relative ${className}`}>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder=" "
        className={fieldBase}
      />
      <label htmlFor={id} className={floatLabel}>
        {label}
      </label>
    </div>
  );
}

function TextareaField({
  id,
  label,
  className = "",
}: {
  id: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`field-line relative ${className}`}>
      <textarea
        id={id}
        name={id}
        rows={4}
        placeholder=" "
        className={`${fieldBase} resize-none leading-[1.5]`}
      />
      <label htmlFor={id} className={floatLabel}>
        {label}
      </label>
    </div>
  );
}
