import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SitePhoto } from "../data/content";
import PhotoCard from "./PhotoCard";
import PhotoLightbox from "./PhotoLightbox";

type Props = {
  photos: SitePhoto[];
};

// Horizontally scrolling row of photo cards with arrow buttons.
// Swipeable on touch screens; nothing moves on its own.
export default function PhotoCarousel({ photos }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setAtStart(track.scrollLeft <= 4);
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    track.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: "smooth" });
  };

  const arrow =
    "hidden md:grid place-items-center absolute top-[38%] -translate-y-1/2 h-12 w-12 rounded-full bg-white text-ink shadow-[0_6px_20px_-6px_rgb(0_0_0/0.3)] hover:bg-brand hover:text-white transition-colors disabled:opacity-0 disabled:pointer-events-none";

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 -mb-6 px-1 -mx-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, i) => (
          <li
            key={photo.src}
            className="snap-start shrink-0 w-[82%] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
          >
            <PhotoCard photo={photo} onOpen={() => setLightbox(i)} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        disabled={atStart}
        aria-label="Previous photos"
        className={`${arrow} -left-6`}
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        disabled={atEnd}
        aria-label="Next photos"
        className={`${arrow} -right-6`}
      >
        <ChevronRight size={22} />
      </button>

      <PhotoLightbox photos={photos} index={lightbox} onChange={setLightbox} />
    </div>
  );
}
