"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/approach", label: "Studio" },
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

const overlayItems = [
  { href: "/", label: "Index" },
  ...navItems,
];

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
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <span className="font-display text-2xl leading-none tracking-tight">fieldcraft</span>
            <span className="eyebrow text-muted-foreground">/ studio</span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
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
            {overlayItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-6xl leading-[1] transition-opacity hover:opacity-60 md:text-[8rem]"
              >
                {item.label}
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

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`eyebrow transition-colors ${
        active ? "text-foreground" : "text-foreground/80 hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
