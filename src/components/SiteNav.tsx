import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-background/85 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
          <Link to="/" className="flex items-center gap-2 text-foreground">
            <span className="font-display text-2xl leading-none tracking-tight">fieldcraft</span>
            <span className="eyebrow text-muted-foreground">/ studio</span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            <NavLink to="/approach">Studio</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/journal">Journal</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="eyebrow flex items-center gap-3 text-foreground"
          >
            <span className="hidden sm:inline">Navigate</span>
            <span className="flex flex-col gap-[3px]">
              <span className="block h-[1px] w-6 bg-current" />
              <span className="block h-[1px] w-6 bg-current" />
            </span>
          </button>
        </div>
      </header>

      {/* Overlay menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-700 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ background: "var(--surface-deep)", color: "var(--surface-deep-foreground)" }}
      >
        <div className="mx-auto flex h-full max-w-[1600px] flex-col px-6 py-5 md:px-12">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl">fieldcraft</span>
            <button onClick={() => setOpen(false)} className="eyebrow">
              Close ✕
            </button>
          </div>
          <nav className="my-auto flex flex-col gap-2">
            {[
              ["/", "Index"],
              ["/approach", "Studio"],
              ["/projects", "Projects"],
              ["/journal", "Journal"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="font-display text-6xl leading-[1] transition-opacity hover:opacity-60 md:text-[8rem]"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 pb-2 text-sm opacity-80 md:flex-row md:justify-between">
            <a href="mailto:studio@fieldcraft.co">studio@fieldcraft.co</a>
            <a href="tel:0291234567">+61 2 9123 4567</a>
          </div>
        </div>
      </div>
    </>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="eyebrow text-foreground/80 transition-colors hover:text-foreground"
      activeProps={{ className: "eyebrow text-foreground" }}
    >
      {children}
    </Link>
  );
}
