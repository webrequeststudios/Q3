import {
  BrickWall,
  Building2,
  Construction,
  Droplets,
  Hammer,
  Route,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// One icon per service id in content.ts
export const serviceIcons: Record<string, LucideIcon> = {
  "civil-construction": Construction,
  "road-works": Route,
  "concrete-works": BrickWall,
  pipelines: Droplets,
  "building-construction": Building2,
  renovations: Hammer,
  "supply-delivery": Truck,
  maintenance: Wrench,
};
