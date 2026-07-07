"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { brand } from "@/lib/brand";

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Home, About, and every project detail page open over a full-bleed image banner.
  const overImageHero =
    pathname === "/" || pathname === "/about" || /^\/projects\/.+/.test(pathname);
  const onDarkHero = overImageHero && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
        } ${open ? "pointer-events-none opacity-0" : "opacity-100"}`}
        style={{
          color: onDarkHero ? "var(--surface-deep-foreground)" : "var(--foreground)",
          transition:
            "color 0.5s var(--ease-out-expo), background-color 0.5s var(--ease-out-expo), opacity 0.15s linear",
        }}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
          <Link href="/" className="group flex items-center gap-3">
            <BrandMark size="md" />
            <span className="eyebrow hidden opacity-60 transition-opacity duration-300 group-hover:opacity-100 sm:inline">
              / {brand.tagline}
            </span>
          </Link>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="group eyebrow -m-3 flex items-center gap-3 p-3"
          >
            <span>Menu</span>
            <span className="hamburger-3" aria-hidden>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-[220ms] ease-out ${
          open ? "menu-open pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* blurred backdrop — frosts the live page; click to close */}
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 cursor-default backdrop-blur-sm"
          style={{ background: "var(--menu-scrim)" }}
        />

        {/* close button */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute right-6 top-5 z-20 -m-3 flex items-center gap-3 p-3 md:right-12"
          style={{ color: "var(--surface-deep-foreground)" }}
        >
          <span className="eyebrow md:text-foreground">Close</span>
          <span className="hamburger is-open md:text-foreground" aria-hidden>
            <span />
            <span />
          </span>
        </button>

        {/* LEFT sidebar panel */}
        <div className="menu-panel surface-deep absolute inset-y-0 left-0 flex w-full flex-col justify-between overflow-y-auto px-6 py-5 md:w-[420px] md:px-12">
          <div className="flex items-center justify-between">
            <BrandMark size="md" withName />
          </div>

          <nav className="flex flex-col py-8">
            {menuItems.map((item, i) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href + "/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 border-b border-current/12 py-3.5"
                  style={{
                    transform: open ? "translateX(0)" : "translateX(-16px)",
                    opacity: open ? 1 : 0,
                    transition: `opacity 0.6s var(--ease-out-expo) ${0.15 + i * 0.05}s, transform 0.6s var(--ease-out-expo) ${0.15 + i * 0.05}s`,
                  }}
                >
                  <span className="eyebrow w-6 shrink-0 opacity-40">0{i + 1}</span>
                  <span
                    className={`font-display text-2xl leading-none transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 md:text-[1.7rem] ${
                      active ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-4 text-sm opacity-85">
            <div className="flex flex-col gap-1">
              <a href={`mailto:${brand.email}`} className="hover:opacity-100">
                {brand.email}
              </a>
              <a href={brand.phoneHref} className="hover:opacity-100">
                {brand.phone}
              </a>
            </div>
            <div className="flex items-center gap-5">
              {brand.social.map((s) => (
                <a key={s.label} href={s.href} className="eyebrow opacity-70 hover:opacity-100">
                  {s.label}
                </a>
              ))}
            </div>
            <p className="eyebrow opacity-50">
              {brand.address.line1}, {brand.address.line2}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
