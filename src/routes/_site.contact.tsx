import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Atelier" },
      { name: "description", content: "Start a project with Atelier." },
      { property: "og:title", content: "Contact — Atelier" },
      { property: "og:description", content: "Get in touch about your next hospitality project." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 pb-32 pt-44 md:px-12 md:pt-56">
      <Reveal>
        <p className="eyebrow text-muted-foreground">Contact</p>
        <h1 className="mt-6 font-display text-6xl leading-[0.9] md:text-[9rem]">
          Tell us about<br /><em className="font-light">your place.</em>
        </h1>
      </Reveal>
      <div className="mt-20 grid gap-16 md:grid-cols-12">
        <Reveal delay={120} className="md:col-span-5 space-y-10">
          <div>
            <p className="eyebrow text-muted-foreground">Studio</p>
            <p className="mt-3 font-display text-2xl leading-snug">
              3015 Grand Ave, Suite 200<br />
              Coconut Grove, FL 33133
            </p>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Email</p>
            <a href="mailto:hello@atelier.studio" className="mt-3 block font-display text-2xl">hello@atelier.studio</a>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Phone</p>
            <a href="tel:7864332500" className="mt-3 block font-display text-2xl">786.433.2500</a>
          </div>
        </Reveal>
        <Reveal delay={200} className="md:col-span-6 md:col-start-7">
          <form className="space-y-8">
            {[
              { l: "Name", t: "text" },
              { l: "Email", t: "email" },
              { l: "Company", t: "text" },
            ].map((f) => (
              <label key={f.l} className="block border-b border-border pb-3">
                <span className="eyebrow text-muted-foreground">{f.l}</span>
                <input type={f.t} className="mt-2 w-full bg-transparent text-lg outline-none" />
              </label>
            ))}
            <label className="block border-b border-border pb-3">
              <span className="eyebrow text-muted-foreground">Tell us about your project</span>
              <textarea rows={4} className="mt-2 w-full resize-none bg-transparent text-lg outline-none" />
            </label>
            <button
              type="button"
              className="surface-deep inline-flex items-center gap-3 px-8 py-4 text-sm transition-opacity hover:opacity-90"
            >
              Send message <span aria-hidden>→</span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
