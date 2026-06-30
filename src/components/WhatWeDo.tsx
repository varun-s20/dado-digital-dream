"use client";

import { useState } from "react";

type Practice = {
  label: string;
  blurb: string;
  img: string;
  alt: string;
};

const practices: Practice[] = [
  {
    label: "Landscape Architecture",
    blurb:
      "Site-led garden design from first sketch to mature planting, resolved around the light, slope and architecture already on the ground.",
    img: "/images/earlwood-3.webp",
    alt: "Modern timber-clad home opening onto a designed lawn at dusk",
  },
  {
    label: "Landscape Construction",
    blurb:
      "Decks, retaining, paving and bespoke timber structures, built in-house by our own carpenters and stone-workers, not subcontracted out.",
    img: "/images/earlwood-2.webp",
    alt: "Contemporary garden with concrete steps, timber screen and native grasses",
  },
  {
    label: "Swimming Pools",
    blurb:
      "Concrete pools detailed as still water: mineral-rendered, stone-coped and wrapped in carpentry that ties straight back into the garden.",
    img: "/images/campsie-4.webp",
    alt: "Lap pool reflecting the sky among gum trees at sunset",
  },
  {
    label: "Garden Maintenance",
    blurb:
      "Ongoing care that keeps a garden reading the way it was drawn, through pruning, planting and the slow work of letting a place settle in.",
    img: "/images/avalon-6.webp",
    alt: "Raised garden beds planted densely with herbs and greens",
  },
];

export function WhatWeDo() {
  const [active, setActive] = useState(0);

  return (
    <section className="surface-deep">
      <div className="mx-auto grid max-w-[1600px] gap-px md:grid-cols-2">
        {/* LEFT — copy + practice list */}
        <div className="flex flex-col justify-between gap-12 px-6 py-16 md:px-12 md:py-20 lg:px-16">
          <div>
            <p className="eyebrow opacity-60">What we do</p>
            <p
              key={active}
              className="wwd-row mt-7 max-w-md text-lg leading-relaxed opacity-90 md:text-xl"
            >
              {practices[active].blurb}
            </p>
          </div>

          <ul className="flex flex-col">
            {practices.map((p, i) => {
              const on = i === active;
              return (
                <li key={p.label} className="border-t border-current/15 last:border-b">
                  <button
                    type="button"
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left md:py-6"
                  >
                    <span
                      className={`font-display text-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:text-3xl ${
                        on ? "translate-x-2 opacity-100" : "opacity-55"
                      }`}
                    >
                      {p.label}
                    </span>
                    <span
                      aria-hidden
                      className={`text-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        on ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-30"
                      }`}
                    >
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT — crossfading showcase */}
        <div className="relative min-h-[58svh] overflow-hidden md:min-h-full">
          {practices.map((p, i) => (
            <img
              key={p.label}
              src={p.img}
              alt={p.alt}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        </div>
      </div>
    </section>
  );
}
