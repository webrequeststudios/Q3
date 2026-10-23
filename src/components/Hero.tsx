import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { company } from "../data/content";

const slides = [
  {
    image: "/images/slab-pour.jpg",
    position: "60% center",
    title: "Civil construction & concrete works",
    text: "From earthworks and culverts to reinforced slabs, footings and structures.",
  },
  {
    image: "/images/concrete-plant-building.jpg",
    position: "center 60%",
    title: "Building construction & renovations",
    text: "New buildings and upgrades to existing ones — from foundations through to finishes.",
  },
  {
    image: "/images/box-culvert.jpg",
    position: "center center",
    title: "Road works & pipelines",
    text: "Roads, kerbing, stormwater culverts, and water and sewer pipelines.",
  },
];

const INTERVAL = 7000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = window.setTimeout(() => go(1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, paused, reduceMotion, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Our work"
      className="relative isolate overflow-hidden bg-ink text-white h-[calc(100svh-80px)] lg:h-[calc(100svh-92px)] min-h-[540px] max-h-[780px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <h1 className="sr-only">
        {company.name} — {company.tagline}
      </h1>

      {slides.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.image}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={!active}
            inert={!active}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              active ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.image}
              alt=""
              fetchPriority={i === 0 ? "high" : "auto"}
              loading={i === 0 ? "eager" : "lazy"}
              style={{ objectPosition: s.position }}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[8000ms] ease-out ${
                active ? "scale-105" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" aria-hidden="true" />

            <div className="relative h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-20 flex items-center">
              {active && (
                <div className="max-w-2xl">
                  <h2 className="animate-fade-up text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-[1.08] text-white">
                    {s.title}
                  </h2>
                  <p className="animate-fade-up [animation-delay:120ms] mt-5 max-w-lg text-lg text-white/90">
                    {s.text}
                  </p>
                  <div className="animate-fade-up [animation-delay:240ms] mt-9 flex flex-wrap gap-4">
                    <Link to="/contact" className="btn btn-primary">
                      Request a Quote
                    </Link>
                    <Link to="/services" className="btn btn-outline-light">
                      Our Services
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="hidden sm:grid place-items-center absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-white/60 text-white/90 hover:bg-white hover:text-ink transition-colors"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next slide"
        className="hidden sm:grid place-items-center absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-white/60 text-white/90 hover:bg-white hover:text-ink transition-colors"
      >
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-7 inset-x-0 flex justify-center gap-2.5">
        {slides.map((s, i) => (
          <button
            key={s.image}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
