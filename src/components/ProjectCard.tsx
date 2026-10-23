import type { Project } from "../data/content";

type Props = {
  project: Project;
  /** Heading level, so cards nest correctly under the page's own headings. */
  as?: "h2" | "h3";
};

export default function ProjectCard({ project: p, as: Heading = "h3" }: Props) {
  const complete = p.status === "COMPLETE";

  return (
    <article className="bg-white rounded-lg p-6 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.18)] flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand pt-1">{p.type}</p>
        <span
          className={`shrink-0 rounded-[3px] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white ${
            complete ? "bg-ink" : "bg-brand"
          }`}
        >
          {complete ? "Complete" : "In progress"}
        </span>
      </div>
      <Heading className="mt-3 text-lg font-semibold uppercase leading-snug">{p.name}</Heading>
      <p className="mt-3 text-sm leading-relaxed flex-1">{p.summary}</p>
      <dl className="mt-5 pt-4 border-t border-line grid grid-cols-[1.5fr_1fr_auto] gap-3 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-wide">Location</dt>
          <dd className="mt-0.5 font-medium text-ink">{p.location}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide">Size</dt>
          <dd className="mt-0.5 font-medium text-ink">{p.sqft}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide">{complete ? "Completed" : "Due"}</dt>
          <dd className="mt-0.5 font-medium text-ink tabular-nums">{p.yearCompleted}</dd>
        </div>
      </dl>
    </article>
  );
}
