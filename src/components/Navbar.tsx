import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { company, telHref } from "../data/content";
import Wordmark from "./Wordmark";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the route changes (including back/forward).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Add a shadow once the page scrolls under the header.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-t-4 border-brand-bright transition-shadow duration-300 ${
        scrolled || open ? "shadow-[0_6px_24px_-12px_rgb(0_0_0/0.25)]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[76px] lg:h-[88px]">
        <Link to="/" aria-label={`${company.name} — home`}>
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) =>
                `px-4 py-2 text-[15px] font-medium transition-colors ${
                  isActive ? "text-brand" : "text-ink hover:text-brand"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-7">
          <a href={telHref(company.phone)} className="group flex items-center gap-3">
            <span className="grid place-items-center h-11 w-11 rounded-full bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
              <Phone size={18} aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs text-body">Call us</span>
              <span className="block text-lg font-semibold text-ink">{company.phone}</span>
            </span>
          </a>
          <Link to="/contact" className="btn btn-primary">
            Request a Quote
          </Link>
        </div>

        <div className="lg:hidden flex items-center">
          <a
            href={telHref(company.phone)}
            aria-label={`Call ${company.phone}`}
            className="grid place-items-center h-11 w-11 rounded-full bg-brand/10 text-brand"
          >
            <Phone size={19} />
          </a>
          <button
            type="button"
            className="p-3 -mr-3 ml-1 text-ink"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="lg:hidden border-t border-line bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-2 flex flex-col">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end
                className={({ isActive }) =>
                  `py-3.5 border-b border-line font-medium ${
                    isActive ? "text-brand" : "text-ink"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn btn-primary mt-5 mb-4 self-start">
              Request a Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
