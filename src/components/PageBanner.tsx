import type { ReactNode } from "react";

type Props = {
  title: string;
  image: string;
  /** CSS object-position for the photo */
  position?: string;
  children?: ReactNode;
};

// Inner-page header: photo with the page title over it.
export default function PageBanner({ title, image, position = "center", children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <img
        src={image}
        alt=""
        fetchPriority="high"
        style={{ objectPosition: position }}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/25"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-20 min-h-[260px] sm:min-h-[320px] py-16 flex flex-col justify-center">
        <h1 className="animate-fade-up text-4xl sm:text-5xl font-bold uppercase text-white">
          {title}
        </h1>
        {children && (
          <div className="animate-fade-up [animation-delay:100ms] mt-4 max-w-xl text-white/85 text-lg">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
