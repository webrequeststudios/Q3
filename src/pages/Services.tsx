import { Link } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import SectionTitle from "../components/SectionTitle";
import QuoteBand from "../components/QuoteBand";
import { services, sitePhotos } from "../data/content";
import { serviceIcons } from "../data/serviceIcons";

export default function Services() {
  return (
    <>
      <title>Services — Que3 SA</title>
      <PageBanner title="Our Services" image="/images/finished-slab.jpg" position="center 65%">
        From the first trench to the final handover.
      </PageBanner>

      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <p className="text-lg leading-relaxed">
            Que3 SA offers civil construction, road works, concrete works,
            pipelines, building construction, renovations, supply and delivery,
            and maintenance work. Choose a service below to read more, or get
            in touch for a quote.
          </p>
          <nav aria-label="Services on this page" className="mt-8 flex flex-wrap justify-center gap-2">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-[3px] border border-line px-4 py-2 text-sm font-medium text-ink hover:border-brand hover:text-brand transition-colors"
              >
                {s.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {services.map((s, i) => {
        const photo = sitePhotos.find((p) => p.src === s.photo);
        const Icon = serviceIcons[s.id];
        const flip = i % 2 === 1;
        return (
          <section
            key={s.id}
            id={s.id}
            className={`scroll-mt-24 py-16 sm:py-20 ${flip ? "bg-surface" : "bg-white"}`}
          >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
              {photo && (
                <div className={`relative aspect-[4/3] overflow-hidden rounded-lg shadow-[0_20px_50px_-24px_rgb(0_0_0/0.45)] ${flip ? "md:order-2" : ""}`}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    style={{ objectPosition: photo.focus }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              )}
              <div>
                {Icon && (
                  <span className="mb-6 grid place-items-center h-14 w-14 rounded-full bg-brand text-white">
                    <Icon size={26} aria-hidden="true" />
                  </span>
                )}
                <SectionTitle>{s.name}</SectionTitle>
                <p className="mt-7 text-lg leading-relaxed max-w-lg">{s.description}</p>
                <Link to="/contact" className="btn btn-primary mt-8">
                  Request a Quote
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <QuoteBand
        title="Not sure what your project needs?"
        body="Tell us about the site and the work, and we'll recommend an approach and send a quote."
      />
    </>
  );
}
