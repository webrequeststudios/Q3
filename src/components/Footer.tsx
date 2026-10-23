import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { company, services, telHref } from "../data/content";
import Wordmark from "./Wordmark";

const linkClass = "hover:text-white transition-colors";

function ColumnTitle({ children }: { children: string }) {
  return (
    <h2 className="text-base font-semibold uppercase tracking-wide text-white">
      {children}
      <span className="block mt-2.5 h-[3px] w-10 bg-brand-bright" aria-hidden="true" />
    </h2>
  );
}

export default function Footer() {
  return (
    <footer className="bg-night text-muted text-[15px]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1.2fr]">
        <div>
          <Link to="/" aria-label={`${company.name} — home`}>
            <Wordmark tone="light" />
          </Link>
          <p className="mt-5 max-w-xs leading-relaxed">
            Civil construction, road works, concrete works, pipelines and
            building construction.
          </p>
          <Link to="/contact" className="btn btn-primary mt-6">
            Request a Quote
          </Link>
        </div>

        <nav aria-label="Services">
          <ColumnTitle>Our Services</ColumnTitle>
          <ul className="mt-5 space-y-2">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`} className={linkClass}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Quick links">
          <ColumnTitle>Quick Links</ColumnTitle>
          <ul className="mt-5 space-y-2">
            <li><Link to="/" className={linkClass}>Home</Link></li>
            <li><Link to="/services" className={linkClass}>Services</Link></li>
            <li><Link to="/projects" className={linkClass}>Projects</Link></li>
            <li><Link to="/contact" className={linkClass}>Contact Us</Link></li>
          </ul>
        </nav>

        <div>
          <ColumnTitle>Get In Touch</ColumnTitle>
          <ul className="mt-5 space-y-4">
            <li className="flex gap-3">
              <Phone size={18} className="mt-1 shrink-0 text-white" aria-hidden="true" />
              <span>
                <a href={telHref(company.phone)} className={linkClass}>{company.phone}</a>
                <br />
                <a href={telHref(company.phoneAlt)} className={linkClass}>{company.phoneAlt}</a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="mt-1 shrink-0 text-white" aria-hidden="true" />
              <a href={`mailto:${company.email}`} className={`${linkClass} break-all`}>
                {company.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin size={18} className="mt-1 shrink-0 text-white" aria-hidden="true" />
              <span>{company.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center gap-2 justify-between text-sm text-center sm:text-left">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p>{company.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
