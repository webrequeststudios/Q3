# Que3 SA — Construction Company Website

A marketing site for Que3 SA, a civil and building construction company, built with React + Vite + TypeScript and styled with Tailwind CSS v4.

## Design concept

The look follows two reference sites chosen by the client — [iX Engineers](https://www.ixengineers.com/) and [Botani Construction](https://botaniconstruction.co.za) — using Que3 SA's own photos and content:

- **Type**: Poppins throughout; uppercase section headings with a short blue bar underneath.
- **Palette**: one strong royal blue (`brand`, #0052CC) for buttons, links, heading bars, the header stripe and the highlights band — the logo keeps its own colours; charcoal (`ink`) for headings and dark sections, near-black (`night`) for the footer, white and light grey (`surface`) for content.
- **Header**: white with a thin blue top stripe, the logo, phone number and a blue "Request a Quote" button.
- **Home**: full-width photo slideshow, blue highlights band, welcome section with overlapping photos, tabbed services on a dark background, a "Recent Work" photo carousel, and a photo call-to-action band.
- **Inner pages**: a photo banner with the page title, then content.

## Pages

- `/` — Home (featured projects appear once real projects are added)
- `/services` — the eight services, each with a photo, alternating left/right
- `/projects` — site photo grid with a filter by service, and a full-size photo viewer (a project log appears once real projects are added)
- `/contact` — quote request form and contact details

## Running it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Editing content

All copy — company info, services, and projects — lives in one place: `src/data/content.ts`. Update names, descriptions, stats, and project details there; the pages re-render automatically. The `projects` and `stats` lists are empty for now, and their sections stay hidden until real entries are added (see the examples in the comments).

## Deploying

`npm run build` produces a static site in `dist/`. Any static host works:

- **Netlify** — build command `npm run build`, publish directory `dist`. `public/_redirects` makes deep links like `/services` work.
- **Vercel** — import the project; it detects Vite automatically. `vercel.json` handles deep links.
- **Other hosts** — upload `dist/` and configure the server to serve `index.html` for unknown paths (needed for client-side routing).

## Quote form

By default, submitting the form opens the visitor's email app with their request pre-filled and addressed to the company email in `src/data/content.ts`.

To receive submissions directly instead, create a form endpoint (e.g. a free [Formspree](https://formspree.io) form), then set `VITE_FORM_ENDPOINT` to its URL — either in a `.env` file (see `.env.example`) or in your host's environment-variable settings — and rebuild.

## Code structure

- `src/data/content.ts` — all copy and company details, including `sitePhotos` (captions and alt text for the gallery)
- `public/images/` — real site photos used in the slideshow, services, galleries and banners. Tall photos have a `focus` value in `sitePhotos` so they crop well.
- `src/data/serviceIcons.ts` — the icon used for each service
- `src/components/` — Navbar, Footer, Hero (slideshow), plus shared pieces: `Wordmark` (logo mark + company name), `SectionTitle` (heading with blue bar), `PageBanner` (inner-page photo header), `ServiceTabs`, `PhotoCarousel`, `PhotoCard`, `PhotoLightbox`, `QuoteBand` (photo call to action), `ProjectCard`
- `src/index.css` — colour/font tokens in `@theme`, and shared classes: `btn` with `btn-primary` / `btn-outline-light` / `btn-dark`, `section-title`, `title-bar`, `field`

All text/background colour pairs meet WCAG AA contrast. `brand-bright` and `brand-light` are currently the same blue as `brand`. On the dark `ink`/`night` backgrounds use `brand-bright` or `brand-light` for blue accents. `danger` (red) is reserved for errors.

The logo is `public/logo.svg`, a vector redraw of the client's logo; `public/favicon.svg` is the same mark on a square canvas.

## Notes

- Tailwind v4 is configured via the `@tailwindcss/vite` plugin and the `@theme` block in `src/index.css` — there's no separate `tailwind.config.js`.
