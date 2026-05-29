import type { Metadata } from "next";
import { HoverFillButton } from "@/components/HoverFillButton";
import { MagneticLink } from "@/components/MagneticLink";
import { MaskHeading } from "@/components/MaskHeading";
import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/SplitText";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a garden, pool or carpentry project with BM.",
  openGraph: {
    title: "Contact — BM.",
    description: "Get in touch about your next outdoor project.",
  },
};

const fields = [
  { l: "Name", t: "text", p: "Your name" },
  { l: "Email", t: "email", p: "you@example.com" },
  { l: "Company", t: "text", p: "Optional" },
];

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-6 pb-20 pt-44 md:px-12 md:pb-32 md:pt-56">
        <p className="eyebrow text-muted-foreground">Contact</p>
        <SplitText
          as="h1"
          className="mt-6 font-display text-6xl leading-[0.9] md:text-[10rem]"
          stagger={28}
        >
          Tell us about your site.
        </SplitText>
        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <Reveal delay={120} className="md:col-span-5 space-y-12">
            <MaskHeading
              as="p"
              lines={[
                "We take on a small number",
                "of projects each year. The",
                "earlier we hear from you,",
                "the more we can shape.",
              ]}
              className="font-display text-2xl leading-snug md:text-3xl"
              stagger={120}
            />
            <div className="space-y-10">
              <div>
                <p className="eyebrow text-muted-foreground">Studio</p>
                <p className="mt-3 font-display text-2xl leading-snug">
                  {brand.address.line1}<br />
                  {brand.address.line2}
                </p>
              </div>
              <div>
                <p className="eyebrow text-muted-foreground">Email</p>
                <MagneticLink
                  href={`mailto:${brand.email}` as never}
                  className="arrow-link mt-3 inline-flex items-baseline gap-3 font-display text-2xl"
                >
                  {brand.email} <span aria-hidden className="text-base">→</span>
                </MagneticLink>
              </div>
              <div>
                <p className="eyebrow text-muted-foreground">Phone</p>
                <a href={brand.phoneHref} className="arrow-link mt-3 inline-flex items-baseline gap-3 font-display text-2xl">
                  {brand.phone}
                </a>
              </div>
              <div>
                <p className="eyebrow text-muted-foreground">Hours</p>
                <p className="mt-3 text-base text-muted-foreground">
                  Mon — Fri · 8:00 — 17:00<br />
                  Site visits by appointment.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200} className="md:col-span-6 md:col-start-7">
            <form className="space-y-8">
              {fields.map((f) => (
                <label key={f.l} className="field-line block border-b border-border pb-3">
                  <span className="eyebrow text-muted-foreground">{f.l}</span>
                  <input
                    type={f.t}
                    placeholder={f.p}
                    className="mt-2 w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground/40"
                  />
                </label>
              ))}
              <label className="field-line block border-b border-border pb-3">
                <span className="eyebrow text-muted-foreground">Tell us about your project</span>
                <textarea
                  rows={5}
                  placeholder="Site, scope, ideal start date — anything that helps us picture it."
                  className="mt-2 w-full resize-none bg-transparent text-lg outline-none placeholder:text-muted-foreground/40"
                />
              </label>
              <fieldset>
                <legend className="eyebrow text-muted-foreground">Project type</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Landscape", "Carpentry", "Pool", "Stonework", "Other"].map((t) => (
                    <label key={t} className="cursor-pointer">
                      <input type="checkbox" className="peer sr-only" />
                      <span className="eyebrow inline-block border border-border px-4 py-2 transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background hover:border-foreground">
                        {t}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="flex items-center justify-between gap-6 pt-4">
                <p className="text-xs text-muted-foreground/70 max-w-xs">
                  We&rsquo;ll reply within two working days, usually with a few first questions.
                </p>
                <HoverFillButton type="button" className="surface-deep px-8 py-4 text-sm">
                  Send message <span aria-hidden>→</span>
                </HoverFillButton>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
