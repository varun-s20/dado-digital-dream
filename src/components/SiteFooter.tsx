import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { brand } from "@/lib/brand";

const studioLinks = [
  { href: "/approach", label: "Studio" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="surface-deep">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow opacity-70">Let&rsquo;s begin</p>
            <h2 className="mt-6 font-display text-5xl leading-[0.95] md:text-7xl">
              Gardens that<br />belong to<br /><em className="font-light">their place.</em>
            </h2>
            <a
              href={`mailto:${brand.email}`}
              className="arrow-link mt-10 inline-flex items-center gap-3 border-b border-current pb-1 text-base"
            >
              {brand.email}
              <span aria-hidden>→</span>
            </a>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-10">
            <div>
              <p className="eyebrow opacity-70">Studio</p>
              <ul className="mt-4 space-y-2 font-display text-2xl">
                {studioLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow opacity-70">Find us</p>
              <address className="mt-4 not-italic text-sm leading-relaxed opacity-80">
                {brand.address.line1}<br />
                {brand.address.line2}<br />
                <a href={brand.phoneHref}>{brand.phone}</a>
              </address>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-current/20 pt-8 text-xs opacity-70 md:flex-row md:items-center">
          <span className="flex items-baseline gap-3">
            <BrandMark size="sm" />
            <span>© {new Date().getFullYear()} {brand.fullName}.</span>
          </span>
          <span className="flex gap-6">
            {brand.social.map((s) => (
              <a key={s.label} href={s.href} className="transition-opacity duration-300 hover:opacity-100">
                {s.label}
              </a>
            ))}
            <a href="#" className="transition-opacity duration-300 hover:opacity-100">Privacy</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
