import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { company, telHref } from "../data/content";

type Props = {
  title?: string;
  body?: string;
  image?: string;
};

// Photo band with a centred call to action.
export default function QuoteBand({
  title = "Need a quote for your project?",
  body = "Tell us about the site and the work involved, and we'll get back to you with a quote.",
  image = "/images/slab-reinforcement.jpg",
}: Props) {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/70" aria-hidden="true" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center">
        <h2 className="text-3xl sm:text-[2.5rem] font-semibold text-white">{title}</h2>
        <span className="title-bar title-bar-center" aria-hidden="true" />
        <p className="mt-6 text-white/85 text-lg">{body}</p>
        <div className="mt-9 btn-pair sm:justify-center">
          <Link to="/contact" className="btn btn-primary">
            Request a Quote
          </Link>
          <a href={telHref(company.phone)} className="btn btn-outline-light">
            <Phone size={16} aria-hidden="true" />
            Call {company.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
