import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { services, sitePhotos } from "../data/content";
import { serviceIcons } from "../data/serviceIcons";
import SectionTitle from "./SectionTitle";

// Dark "Our Services" section: a row of tabs, one per service, each showing
// a photo, the description and a link to the full Services page.
export default function ServiceTabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const service = services[active];
  const photo = sitePhotos.find((p) => p.src === service.photo);
  const Icon = serviceIcons[service.id];

  const select = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus();
    tabRefs.current[i]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const last = services.length - 1;
    if (e.key === "ArrowRight") select(active === last ? 0 : active + 1);
    else if (e.key === "ArrowLeft") select(active === 0 ? last : active - 1);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(last);
    else return;
    e.preventDefault();
  };

  return (
    <section className="bg-ink py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionTitle center light>
          Our Services
        </SectionTitle>

        <div
          role="tablist"
          aria-label="Services"
          onKeyDown={onKeyDown}
          className="mt-12 flex overflow-x-auto lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((s, i) => {
            const selected = i === active;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={selected}
                aria-controls={`panel-${s.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`shrink-0 lg:shrink lg:flex-1 px-5 py-4 text-[13px] font-medium leading-tight border-r border-ink last:border-r-0 transition-colors ${
                  selected
                    ? "bg-brand text-white"
                    : "bg-[#2C3036] text-white/80 hover:bg-[#363A41] hover:text-white"
                }`}
              >
                {s.name}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${service.id}`}
          aria-labelledby={`tab-${service.id}`}
          className="mt-10 grid md:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {photo && (
            <div key={photo.src} className="animate-fade-up relative aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                style={{ objectPosition: photo.focus }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          )}
          <div key={service.id} className="animate-fade-up">
            {Icon && (
              <span className="grid place-items-center h-14 w-14 rounded-full bg-brand text-white">
                <Icon size={26} aria-hidden="true" />
              </span>
            )}
            <h3 className="mt-6 text-2xl sm:text-3xl font-medium uppercase text-white">
              {service.name}
            </h3>
            <p className="mt-4 text-muted leading-relaxed max-w-lg">{service.description}</p>
            <Link to={`/services#${service.id}`} className="btn btn-primary mt-8">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
