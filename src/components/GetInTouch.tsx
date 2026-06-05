import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/lib/brand";

export function GetInTouch() {
  return (
    <section className="contact-lux relative overflow-hidden border-t border-border">
      <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-28">
        {/* meta row */}
        <Reveal>
          <div className="flex items-center justify-between border-b border-border pb-5">
            <p className="eyebrow text-muted-foreground">Get in touch</p>
            <p className="eyebrow flex items-center gap-2.5 text-muted-foreground">
              <span className="pulse-dot" aria-hidden />
              Available for 2026
            </p>
          </div>
        </Reveal>

        {/* invitation + actions */}
        <div className="mt-14 grid items-end gap-x-12 gap-y-12 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal delay={80}>
              <h2 className="contact-heading font-display">
                Let&rsquo;s build something{" "}
                <span className="accent">that lasts.</span>
              </h2>
              <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
                Tell us about the place — its light, its slope, what you want from
                it. We&rsquo;ll walk it with you and take it from there.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9 md:justify-self-end">
            <Reveal delay={160}>
              <div className="flex flex-col items-start gap-5 md:items-end">
                <Link href="/contact" className="lux-cta">
                  Start a project
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a
                  href={`mailto:${brand.email}`}
                  className="arrow-link inline-flex items-center gap-2 border-b border-foreground/25 pb-0.5 text-base transition-colors hover:border-foreground/60"
                >
                  {brand.email}
                  <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* details row */}
        <Reveal delay={220}>
          <dl className="mt-16 grid gap-8 border-t border-border pt-9 sm:grid-cols-3 md:mt-24">
            <div>
              <dt className="eyebrow text-muted-foreground">By phone</dt>
              <dd className="mt-2.5">
                <a
                  href={brand.phoneHref}
                  className="font-display text-lg transition-opacity hover:opacity-70"
                >
                  {brand.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-foreground">The studio</dt>
              <dd className="mt-2.5 text-base leading-relaxed">
                {brand.address.line1}
                <br />
                {brand.address.line2}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-foreground">Hours</dt>
              <dd className="mt-2.5 text-base leading-relaxed text-muted-foreground">
                Mon&ndash;Fri, 7am&ndash;4pm
                <br />
                Site visits by appointment
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
