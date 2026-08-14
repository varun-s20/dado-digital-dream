import { MagneticLink } from "@/components/MagneticLink";

/**
 * Quiet, premium outro CTA — shared by the homepage, services and about
 * pages so the closing call-to-action reads identically everywhere.
 */
export function CtaOutro({
  heading = "Tell us about your project.",
  body = "From the first conversation to the unveiling of your new design space, we'll guide you through every step.",
  ctaLabel = "Start a project",
  ctaHref = "/contact",
  bordered = true,
}: {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  bordered?: boolean;
}) {
  return (
    <section className={bordered ? "border-t border-border" : undefined}>
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-24">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow text-muted-foreground">Get in touch</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.02] tracking-[-0.02em] md:text-5xl">
              {heading}
            </h2>
            <p className="mt-5 max-w-md text-base leading-snug tracking-[-0.01em] text-muted-foreground">
              {body}
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:justify-self-end">
            <MagneticLink
              href={ctaHref}
              className="eyebrow inline-flex items-center gap-3 border-b border-foreground pb-1"
            >
              {ctaLabel} <span aria-hidden>→</span>
            </MagneticLink>
          </div>
        </div>
      </div>
    </section>
  );
}
