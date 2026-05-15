import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="surface-deep">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow opacity-70">Let’s begin</p>
            <h2 className="mt-6 font-display text-5xl leading-[0.95] md:text-7xl">
              Designing places<br />that feel like<br /><em className="font-light">somewhere.</em>
            </h2>
            <a
              href="mailto:hello@atelier.studio"
              className="mt-10 inline-flex items-center gap-3 border-b border-current pb-1 text-base"
            >
              hello@atelier.studio
              <span aria-hidden>→</span>
            </a>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-10">
            <div>
              <p className="eyebrow opacity-70">Studio</p>
              <ul className="mt-4 space-y-2 font-display text-2xl">
                <li><Link to="/approach">Approach</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/journal">Journal</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow opacity-70">Find us</p>
              <address className="mt-4 not-italic text-sm leading-relaxed opacity-80">
                3015 Grand Ave, Suite 200<br />
                Coconut Grove, FL 33133<br />
                <a href="tel:7864332500">786.433.2500</a>
              </address>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-current/20 pt-8 text-xs opacity-70 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Atelier Studio — Interior design for hospitality.</span>
          <span className="flex gap-6">
            <a href="#" className="hover:opacity-100">Instagram</a>
            <a href="#" className="hover:opacity-100">LinkedIn</a>
            <a href="#" className="hover:opacity-100">Privacy</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
