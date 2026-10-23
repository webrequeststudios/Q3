import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { SitePhoto } from "../data/content";

type Props = {
  photos: SitePhoto[];
  index: number | null;
  onChange: (index: number | null) => void;
};

// Full-size photo viewer. Uses the native <dialog>, which traps focus and
// closes on Escape.
export default function PhotoLightbox({ photos, index, onChange }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = index !== null;
  const current = open ? photos[index] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const step = (delta: number) => {
    if (index === null) return;
    onChange((index + delta + photos.length) % photos.length);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={() => onChange(null)}
      onClick={(e) => {
        // Clicking the dark backdrop (the dialog itself, not its content) closes it.
        if (e.target === e.currentTarget) onChange(null);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      aria-label={current?.caption ?? "Photo viewer"}
      className="m-auto max-w-none max-h-none w-full h-full bg-transparent p-0 backdrop:bg-black/90"
    >
      {current && (
        <div className="h-full w-full flex flex-col items-center justify-center gap-4 px-4 py-16 pointer-events-none">
          <img
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            className="max-h-[calc(100%-3rem)] max-w-full w-auto h-auto object-contain rounded-md pointer-events-auto"
          />
          <p className="text-sm text-white/90 text-center pointer-events-auto">
            {current.caption}
            <span className="ml-3 text-white/55 tabular-nums">
              {index! + 1} / {photos.length}
            </span>
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => onChange(null)}
        aria-label="Close photo"
        className="fixed top-3 right-3 p-3 text-white/85 hover:text-white"
        autoFocus
      >
        <X size={28} />
      </button>
      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photo"
            className="fixed left-2 sm:left-5 top-1/2 -translate-y-1/2 grid place-items-center h-12 w-12 rounded-full border border-white/50 text-white/90 hover:bg-white hover:text-ink transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photo"
            className="fixed right-2 sm:right-5 top-1/2 -translate-y-1/2 grid place-items-center h-12 w-12 rounded-full border border-white/50 text-white/90 hover:bg-white hover:text-ink transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </dialog>
  );
}
