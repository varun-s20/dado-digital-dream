"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { BrandMark } from "@/components/BrandMark";
import { brand } from "@/lib/brand";

const navItems = [
  { href: "/approach", label: "Studio" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

const overlayItems = [{ href: "/", label: "Home" }, ...navItems];

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
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
          <Link href="/" className="group flex items-baseline gap-3 text-foreground">
            <BrandMark size="md" />
            <span className="eyebrow text-muted-foreground transition-opacity duration-300 group-hover:opacity-100">
              / {brand.tagline}
            </span>
          </Link>

          <DesktopNav pathname={pathname} />

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="eyebrow flex items-center gap-3 text-foreground"
          >
            <span className="hidden sm:inline">Navigate</span>
            <span className="hamburger" aria-hidden>
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] overflow-y-auto overscroll-contain transition-opacity duration-700 ${
          open ? "menu-open pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ background: "var(--surface-deep)", color: "var(--surface-deep-foreground)" }}
      >
        <div className="mx-auto flex min-h-full max-w-[1600px] flex-col px-6 py-5 md:px-12">
          <div
            className="sticky top-0 z-10 -mx-6 flex items-center justify-between px-6 py-4 md:-mx-12 md:px-12"
            style={{ background: "var(--surface-deep)" }}
          >
            <BrandMark size="md" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="eyebrow flex items-center gap-3"
            >
              <span className="hidden sm:inline">Close</span>
              <span className="hamburger is-open" aria-hidden>
                <span />
                <span />
              </span>
            </button>
          </div>
          <nav className="my-auto flex flex-col gap-1 py-10 sm:gap-2 md:gap-3">
            {overlayItems.map((item, i) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-baseline gap-4 font-display leading-[1.04] text-[clamp(2.75rem,11vw,8rem)] transition-opacity duration-300 hover:opacity-100 ${
                    active ? "opacity-100" : "opacity-60"
                  }`}
                >
                  <span className="menu-mask" style={{ ["--i" as string]: i }}>
                    <span>{item.label}</span>
                  </span>
                  <span
                    aria-hidden
                    className="eyebrow translate-y-[-0.6em] opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                  >
                    0{i + 1}
                  </span>
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col gap-3 pb-2 text-sm opacity-80 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-1">
              <a href={`mailto:${brand.email}`} className="hover:opacity-100">{brand.email}</a>
              <a href={brand.phoneHref} className="hover:opacity-100">{brand.phone}</a>
            </div>
            <span className="eyebrow opacity-70">{brand.fullName}</span>
          </div>
        </div>
      </div>
    </>
  );
}

function DesktopNav({ pathname }: { pathname: string }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [hovered, setHovered] = useState<string | null>(null);

  const activeHref = navItems.find((i) => pathname === i.href || pathname.startsWith(i.href + "/"))?.href ?? null;
  const target = hovered ?? activeHref;

  const positionIndicator = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    if (!target) { track.style.setProperty("--nav-op", "0"); return; }
    const link = linkRefs.current[target];
    if (!link) return;
    const trackRect = track.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    track.style.setProperty("--nav-x", `${linkRect.left - trackRect.left}px`);
    track.style.setProperty("--nav-w", `${linkRect.width}px`);
    track.style.setProperty("--nav-scale", "1");
    track.style.setProperty("--nav-op", "1");
  }, [target]);

  useLayoutEffect(() => { positionIndicator(); }, [positionIndicator]);

  useEffect(() => {
    const onResize = () => positionIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [positionIndicator]);

  return (
    <nav
      ref={trackRef}
      className="nav-track hidden items-center gap-10 md:flex"
      onPointerLeave={() => setHovered(null)}
    >
      {navItems.map((item) => {
        const active = activeHref === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            ref={(el) => { linkRefs.current[item.href] = el; }}
            onPointerEnter={() => setHovered(item.href)}
            onFocus={() => setHovered(item.href)}
            onBlur={() => setHovered(null)}
            className={`eyebrow nav-link ${active ? "text-foreground" : "text-foreground/65 hover:text-foreground"}`}
          >
            {item.label}
          </Link>
        );
      })}
      <span className="nav-indicator" aria-hidden />
    </nav>
  );
}
