import { useState } from "react";
import PageBanner from "../components/PageBanner";
import SectionTitle from "../components/SectionTitle";
import PhotoCard from "../components/PhotoCard";
import PhotoLightbox from "../components/PhotoLightbox";
import ProjectCard from "../components/ProjectCard";
import QuoteBand from "../components/QuoteBand";
import { projects, services, sitePhotos } from "../data/content";

// Only offer filters for services that actually have photos.
const filters = services.filter((s) => sitePhotos.some((p) => p.service === s.id));

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const shown = filter === "all" ? sitePhotos : sitePhotos.filter((p) => p.service === filter);

  const chip = (active: boolean) =>
    `rounded-[3px] px-5 py-2.5 text-sm font-medium transition-colors ${
      active ? "bg-brand text-white" : "bg-white text-ink border border-line hover:border-brand hover:text-brand"
    }`;

  return (
    <>
      <title>Projects — Que3 SA</title>
      <PageBanner title="Our Projects" image="/images/foundation-brickwork.jpg" position="center 55%">
        Photos from our sites — civil, road, concrete, pipeline and building work.
      </PageBanner>

      <section id="photos" className="bg-surface py-16 sm:py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionTitle center>Site Photos</SectionTitle>

          <div role="group" aria-label="Filter photos by service" className="mt-10 flex flex-wrap justify-center gap-2">
            <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")} className={chip(filter === "all")}>
              All
            </button>
            {filters.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={filter === s.id}
                onClick={() => setFilter(s.id)}
                className={chip(filter === s.id)}
              >
                {s.name}
              </button>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            Showing {shown.length} photo{shown.length === 1 ? "" : "s"}
          </p>

          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shown.map((photo, i) => (
              <li key={photo.src} className="animate-fade-up">
                <PhotoCard photo={photo} onOpen={() => setLightbox(i)} />
              </li>
            ))}
          </ul>
          <PhotoLightbox photos={shown} index={lightbox} onChange={setLightbox} />
        </div>
      </section>

      {projects.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <SectionTitle center>Project Log</SectionTitle>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <QuoteBand title="Planning something similar?" image="/images/water-pipeline.jpg" />
    </>
  );
}
