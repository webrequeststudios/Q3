import { company } from "../data/content";

type Props = {
  /** "light" for white text on dark backgrounds (footer) */
  tone?: "dark" | "light";
};

// Logo mark with the company name and a small tagline beside it.
export default function Wordmark({ tone = "dark" }: Props) {
  const light = tone === "light";
  return (
    <span className="inline-flex items-center gap-3">
      <img
        src="/logo.svg"
        alt=""
        width={1068}
        height={915}
        className="h-10 sm:h-11 w-auto shrink-0"
      />
      <span className="inline-flex flex-col leading-none">
        <span
          className={`text-2xl sm:text-[1.7rem] font-bold tracking-tight ${
            light ? "text-white" : "text-ink"
          }`}
        >
          Que3<span className={light ? "text-brand-light" : "text-brand"}> SA</span>
        </span>
        <span
          className={`hidden min-[420px]:block mt-1.5 whitespace-nowrap text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] ${
            light ? "text-muted" : "text-body"
          }`}
        >
          {company.tagline}
        </span>
      </span>
    </span>
  );
}
