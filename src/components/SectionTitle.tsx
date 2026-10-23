import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  center?: boolean;
  /** white heading for dark sections */
  light?: boolean;
  as?: "h1" | "h2";
  id?: string;
};

// Uppercase section heading with the short blue bar underneath.
export default function SectionTitle({ children, center, light, as: Tag = "h2", id }: Props) {
  return (
    <div className={center ? "text-center" : undefined}>
      <Tag id={id} className={`section-title ${light ? "text-white" : ""}`}>
        {children}
      </Tag>
      <span className={`title-bar ${center ? "title-bar-center" : ""}`} aria-hidden="true" />
    </div>
  );
}
