import { services, type SitePhoto } from "../data/content";

type Props = {
  photo: SitePhoto;
  onOpen: () => void;
};

// Project-style card: rounded photo, caption, and a service tag.
export default function PhotoCard({ photo, onOpen }: Props) {
  const service = services.find((s) => s.id === photo.service);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View larger: ${photo.caption}`}
      className="group block h-full w-full text-left bg-white rounded-lg overflow-hidden shadow-[0_8px_30px_-12px_rgb(0_0_0/0.18)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-14px_rgb(0_0_0/0.3)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: photo.focus }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
        />
      </div>
      <div className="px-5 py-4">
        <p className="font-semibold uppercase text-ink leading-snug">{photo.caption}</p>
        {service && (
          <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
            {service.name}
          </p>
        )}
      </div>
    </button>
  );
}
