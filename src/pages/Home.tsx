import { Link } from "react-router-dom";
import { Building2, Construction, Droplets, Truck } from "lucide-react";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import ServiceTabs from "../components/ServiceTabs";
import PhotoCarousel from "../components/PhotoCarousel";
import ProjectCard from "../components/ProjectCard";
import QuoteBand from "../components/QuoteBand";
import { projects, sitePhotos } from "../data/content";

const highlights = [
  { icon: Construction, title: "Civil & Road Works", href: "/services#civil-construction" },
  { icon: Droplets, title: "Concrete & Pipelines", href: "/services#concrete-works" },
  { icon: Building2, title: "Building & Renovations", href: "/services#building-construction" },
  { icon: Truck, title: "Supply & Maintenance", href: "/services#supply-delivery" },
];

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <>
      <title>Que3 SA — Civil & Building Construction</title>
      <Hero />

      {/* Highlights band */}
      <section className="bg-brand text-white">
        <ul className="max-w-7xl mx-auto px-5 sm:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
          {highlights.map(({ icon: Icon, title, href }) => (
            <li key={title}>
              <Link to={href} className="group flex flex-col items-center text-center gap-3">
                <span className="grid place-items-center h-16 w-16 rounded-full border-2 border-white/40 transition-colors group-hover:bg-white group-hover:text-brand">
                  <Icon size={28} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="font-semibold text-[15px] sm:text-base leading-snug">{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Welcome */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none pb-16 pl-4 sm:pl-0">
            <div
              className="absolute top-6 -right-0 sm:-right-5 bottom-10 left-16 sm:left-24 border-2 border-brand-bright rounded-lg"
              aria-hidden="true"
            />
            <img
              src="/images/trench-reinforcement.jpg"
              alt="Steel reinforcement cage laid in an excavated trench, with a worker in a safety vest"
              width={960}
              height={1280}
              loading="lazy"
              style={{ objectPosition: "center 15%" }}
              className="relative ml-auto w-[78%] aspect-[4/5] object-cover rounded-lg shadow-[0_20px_50px_-20px_rgb(0_0_0/0.45)]"
            />
            <img
              src="/images/slab-pour.jpg"
              alt="Crew levelling freshly poured concrete on a reinforced slab"
              width={1024}
              height={768}
              loading="lazy"
              className="absolute bottom-0 left-0 w-[58%] aspect-[4/3] object-cover rounded-lg border-[6px] border-white shadow-[0_20px_50px_-20px_rgb(0_0_0/0.45)]"
            />
          </div>

          <div>
            <SectionTitle>Welcome to Que3 SA</SectionTitle>
            <p className="mt-7 text-xl font-medium text-ink">Civil &amp; building construction</p>
            <p className="mt-4 leading-relaxed">
              Que3 SA is a South African construction company. We take on civil
              construction, road works, concrete works and pipelines, as well as
              building construction and renovations.
            </p>
            <p className="mt-4 leading-relaxed">
              We also supply and deliver construction materials to site, and carry
              out maintenance work on buildings, roads and civil infrastructure.
            </p>
            <div className="mt-9 btn-pair">
              <Link to="/services" className="btn btn-primary">
                Our Services
              </Link>
              <Link to="/contact" className="btn btn-dark">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ServiceTabs />

      {/* Recent work */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionTitle center>Recent Work</SectionTitle>
          <p className="mt-6 text-center max-w-xl mx-auto">
            Photos from our sites — click any photo to see it full size.
          </p>
          <div className="mt-12">
            <PhotoCarousel photos={sitePhotos} />
          </div>
          <div className="mt-12 text-center">
            <Link to="/projects" className="btn btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Named projects — shown once real projects are added to content.ts */}
      {featured.length > 0 && (
        <section className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <SectionTitle center>Featured Projects</SectionTitle>
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {featured.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <QuoteBand />
    </>
  );
}
