"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticLink } from "@/components/MagneticLink";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Stage = { n: string; name: string; img: string; cap: string; alt: string };

const STAGES: Stage[] = [
  {
    n: "01",
    name: "Frame",
    img: "/images/earlwood-vid-framing-detail-tall.webp",
    cap: "Structural timber framing set out across three terrace levels.",
    alt: "Structural timber framing meeting the new deck levels at Earlwood",
  },
  {
    n: "02",
    name: "Clad",
    img: "/images/earlwood-vid-cladding-sunset-tall.webp",
    cap: "Vertical timber cladding, unifying the facade in low sun.",
    alt: "Timber cladding running up the facade, lit at sunset",
  },
  {
    n: "03",
    name: "Deck",
    img: "/images/earlwood-vid-decking-work-tall.webp",
    cap: "Hardwood decking laid by hand, every junction mitered.",
    alt: "Carpenter laying hardwood decking boards over the timber frame",
  },
  {
    n: "04",
    name: "Plant",
    img: "/images/earlwood-vid-garden-planting-tall.webp",
    cap: "Zoned irrigation and dense, terraced planting go in.",
    alt: "Newly planted terraced garden beds with irrigation",
  },
  {
    n: "05",
    name: "Settle",
    img: "/images/earlwood-vid-hero-dusk-tall.webp",
    cap: "The finished garden, resolved and reading at dusk.",
    alt: "The completed Earlwood garden and clad home at dusk",
  },
];

const LEDGER = [
  { v: "30+", l: "Years on the tools" },
  { v: "100%", l: "In-house crew" },
  { v: "1", l: "Point of contact" },
] as const;

const LIGHT = { color: "var(--surface-deep-foreground)" } as const;

/**
 * Workshop — a pinned horizontal "build film" told entirely in stills.
 *
 * The section pins full-height and an inner rail translates horizontally as the
 * user scrolls: an opening statement, the five stages of the Earlwood build
 * (frame → clad → deck → plant → settle), then the in-house ledger. Each stage
 * still settles from an over-scaled frame, its giant index counter-parallaxes,
 * and its caption rises as the panel reaches centre. A persistent HUD scrubs a
 * stage counter and an accent progress hairline. No video — the sequence is the
 * story.
 *
 * Touch / reduced-motion: collapses to a native, snap-scrolling filmstrip with
 * every caption and index composed statically.
 */
export function WorkshopProcess() {
  const stage = useRef<HTMLElement | null>(null);
  const rail = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const nameRef = useRef<HTMLSpanElement | null>(null);
  const [native, setNative] = useState(false);

  useEffect(() => {
    const stageEl = stage.current;
    const railEl = rail.current;
    if (!stageEl || !railEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduce || coarse) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNative(true);
      return;
    }

    const ctx = gsap.context(() => {
      const getDistance = () => railEl.scrollWidth - stageEl.clientWidth;

      const tween = gsap.to(railEl, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: stageEl,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      const panels = gsap.utils.toArray<HTMLElement>("[data-stage]", railEl);
      panels.forEach((panel) => {
        const img = panel.querySelector<HTMLElement>("[data-img]");
        const meta = panel.querySelector<HTMLElement>("[data-meta]");
        const num = panel.querySelector<HTMLElement>("[data-num]");

        // Frame settles from an over-scaled crop as it crosses the viewport.
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.16 },
            {
              scale: 1.02,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        }

        // Giant index counter-parallaxes for depth.
        if (num) {
          gsap.fromTo(
            num,
            { yPercent: 24, autoAlpha: 0.35 },
            {
              yPercent: -14,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        }

        // Caption rises as the panel reaches centre.
        if (meta) {
          gsap.fromTo(
            meta,
            { autoAlpha: 0, yPercent: 70 },
            {
              autoAlpha: 1,
              yPercent: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left 80%",
                end: "left 42%",
                scrub: true,
              },
            },
          );
        }

        // HUD scrubber — reflect the centred stage.
        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: tween,
          start: "left center",
          end: "right center",
          onToggle: (self) => {
            if (!self.isActive) return;
            const { n, name } = panel.dataset;
            if (counterRef.current && n) counterRef.current.textContent = n;
            if (nameRef.current && name) nameRef.current.textContent = name;
          },
        });
      });
    }, stageEl);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    // Wrapper stays under React's control. GSAP's `pin` reparents the pinned
    // <section> into a generated `.pin-spacer`, so on unmount React would try to
    // remove the <section> from a parent that no longer holds it ("Failed to
    // execute 'removeChild'"). Keeping a plain wrapper as the fragment child
    // means React only ever removes THIS div — always a true child of <main>.
    <div>
      <section
        ref={stage}
        className={`surface-deep relative w-full ${
          native
            ? "overflow-x-auto overscroll-x-contain py-14 [scrollbar-width:none]"
            : "h-[100svh] overflow-hidden"
        }`}
        aria-label="How we build, in-house"
      >
        {/* HUD — top readout. When pinned, offset below the fixed navbar so it
          never tucks under it; the native strip scrolls so it keeps a tight top. */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pb-6 md:px-12 ${
            native ? "pt-6" : "pt-20 md:pt-24"
          }`}
          style={LIGHT}
        >
          <p className="eyebrow opacity-55">The workshop</p>
          {!native && (
            <p className="eyebrow tabular-nums opacity-75">
              <span ref={counterRef}>01</span>
              <span className="opacity-40"> / 0{STAGES.length}</span>
              <span className="mx-2.5 opacity-30">·</span>
              <span ref={nameRef}>{STAGES[0].name}</span>
            </p>
          )}
        </div>

        {/* Rail */}
        <div
          ref={rail}
          className={`flex items-stretch gap-[4vw] px-6 md:gap-[3vw] md:px-12 ${
            native ? "h-[68svh] snap-x snap-mandatory" : "h-full"
          }`}
        >
          {/* Opening statement */}
          <div
            className="flex h-full w-[84vw] max-w-[560px] flex-none snap-center flex-col justify-center pr-4 md:w-[38vw]"
            style={LIGHT}
          >
            <p className="eyebrow opacity-55">In-house, end to end</p>
            <h2 className="mt-6 font-display text-[16vw] leading-[0.84] tracking-[-0.03em] md:text-[5.8vw]">
              Built
              <br />
              in-house.
            </h2>
            <p className="mt-7 max-w-md leading-relaxed opacity-75">
              One crew of designers, carpenters and landscapers. From the first sketch to the final
              planting, no handoffs and no subcontracted gaps.
            </p>
            <p className="eyebrow mt-10 flex items-center gap-3 opacity-55">
              The Earlwood build, in five stages
              <span aria-hidden>→</span>
            </p>
          </div>

          {/* Stage panels */}
          {STAGES.map((s) => (
            <article
              key={s.n}
              data-stage
              data-n={s.n}
              data-name={s.name}
              className="relative h-full w-[80vw] flex-none snap-center overflow-hidden md:w-[33vw] md:min-w-[360px]"
            >
              <div data-img className="absolute inset-0 will-change-transform">
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Legibility scrims */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.18 0.006 40 / 0.86) 2%, transparent 42%), linear-gradient(to bottom, oklch(0.18 0.006 40 / 0.5), transparent 26%)",
                }}
              />

              <span
                data-num
                aria-hidden
                className="absolute left-5 top-4 font-display text-6xl leading-none tabular-nums tracking-tight will-change-transform md:left-7 md:top-6 md:text-[5.5rem]"
                style={LIGHT}
              >
                {s.n}
              </span>

              <div
                data-meta
                className="absolute inset-x-5 bottom-6 will-change-transform md:inset-x-7 md:bottom-8"
                style={LIGHT}
              >
                <h3 className="font-display text-3xl md:text-4xl">{s.name}</h3>
                <p className="mt-2.5 max-w-[32ch] text-sm leading-relaxed opacity-75">{s.cap}</p>
              </div>
            </article>
          ))}

          {/* Closing — the ledger */}
          <div
            className="flex h-full w-[84vw] max-w-[540px] flex-none snap-center flex-col justify-center md:w-[36vw]"
            style={LIGHT}
          >
            <p className="eyebrow opacity-55">Finished</p>
            <h2 className="mt-6 font-display text-[13vw] leading-[0.88] tracking-[-0.025em] md:text-[4.4vw]">
              One garden,
              <br />
              one crew.
            </h2>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-current/15 pt-7">
              {LEDGER.map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-4xl leading-none tabular-nums tracking-[-0.02em] md:text-5xl">
                    {s.v}
                  </dt>
                  <dd className="eyebrow mt-3 opacity-55">{s.l}</dd>
                </div>
              ))}
            </dl>

            <MagneticLink
              href="/services"
              className="mt-9 inline-flex items-center gap-2 self-start border-b border-current pb-1 text-sm"
            >
              What we do <span aria-hidden>→</span>
            </MagneticLink>
          </div>
        </div>

        {/* HUD — bottom process bar + progress hairline (scrubbed) */}
        {!native && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
            <div className="mx-6 mb-4 flex items-center justify-between md:mx-12" style={LIGHT}>
              <p className="eyebrow opacity-45">Design · Build · Plant</p>
              <p className="eyebrow opacity-45">Earlwood, Sydney</p>
            </div>
            <div
              aria-hidden
              className="relative h-px w-full"
              style={{
                background: "color-mix(in oklab, var(--surface-deep-foreground) 15%, transparent)",
              }}
            >
              <span
                ref={barRef}
                className="absolute bottom-0 left-0 h-px w-full origin-left"
                style={{ background: "var(--accent)", transform: "scaleX(0)" }}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
