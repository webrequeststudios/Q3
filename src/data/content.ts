export const company = {
  name: "Que3 SA",
  shortName: "Q3",
  tagline: "Civil & Building Construction",
  phone: "076 721 8727",
  phoneAlt: "047 004 0057",
  email: "wandamancotywa1@gmail.com",
  address: "118 Foundry Row, Millbrook Industrial Park",
};

/** Turns a local SA number like "076 721 8727" into a tel: link that works from any phone. */
export function telHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `tel:+27${digits.replace(/^0/, "")}`;
}

export type Service = {
  id: string;
  name: string;
  description: string;
  /** Photo from sitePhotos (by src) used to illustrate the service. */
  photo: string;
};

export const services: Service[] = [
  {
    id: "civil-construction",
    name: "Civil Construction",
    description:
      "Earthworks, stormwater drainage, culverts and the other civil infrastructure that sits under roads, buildings and services.",
    photo: "/images/box-culvert.jpg",
  },
  {
    id: "road-works",
    name: "Road Works",
    description:
      "Road construction and upgrades, including layer works, kerbing and channelling, and interlocking-paver surfacing.",
    photo: "/images/paved-road.jpg",
  },
  {
    id: "concrete-works",
    name: "Concrete Works",
    description:
      "Reinforced concrete slabs, footings, decks and structures — from fixing steel and formwork through to the pour and finish.",
    photo: "/images/finished-slab.jpg",
  },
  {
    id: "pipelines",
    name: "Pipelines",
    description:
      "Trenching and laying of water and sewer pipelines, with manholes, inspection chambers and backfilling.",
    photo: "/images/water-pipeline.jpg",
  },
  {
    id: "building-construction",
    name: "Building Construction",
    description:
      "New buildings from foundations and brickwork through to roof and finishes.",
    photo: "/images/concrete-plant-building.jpg",
  },
  {
    id: "renovations",
    name: "Renovations",
    description:
      "Alterations, repairs and upgrades to existing buildings and structures.",
    photo: "/images/brick-substructure.jpg",
  },
  {
    id: "supply-delivery",
    name: "Supply & Delivery",
    description:
      "Supply and delivery of construction materials to site.",
    photo: "/images/foundation-brickwork.jpg",
  },
  {
    id: "maintenance",
    name: "Maintenance Work",
    description:
      "Ongoing and once-off maintenance of buildings, roads and civil infrastructure.",
    photo: "/images/manhole-chamber.jpg",
  },
];

export type Project = {
  id: string;
  name: string;
  type: string;
  location: string;
  yearCompleted: number;
  sqft: string;
  status: "COMPLETE" | "IN PROGRESS";
  summary: string;
};

// Add real projects here — the "Recent work" and "Project log" sections
// appear automatically once this list has entries. Example:
// {
//   id: "example-road",
//   name: "Project name",
//   type: "Road Works",
//   location: "Town or area",
//   yearCompleted: 2025,
//   sqft: "1.2 km",
//   status: "COMPLETE",
//   summary: "One or two sentences on the scope.",
// },
export const projects: Project[] = [];

export type SitePhoto = {
  src: string;
  /** id of the service this photo shows */
  service: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** CSS object-position used when the photo is cropped (tall photos) */
  focus?: string;
};

// Real photos from Que3 SA sites. Captions describe only what is visible —
// add the project name and location to each once confirmed.
export const sitePhotos: SitePhoto[] = [
  {
    src: "/images/slab-pour.jpg",
    service: "concrete-works",
    alt: "Crew in high-visibility workwear spreading and levelling freshly poured concrete on a reinforced slab inside steel formwork",
    caption: "Concrete pour on a reinforced slab",
    width: 1024,
    height: 768,
  },
  {
    src: "/images/box-culvert.jpg",
    service: "civil-construction",
    alt: "Workers finishing a twin-cell concrete box culvert over a stream, with brick wing walls and a palisade fence behind",
    caption: "Twin-cell box culvert over a watercourse",
    width: 1024,
    height: 768,
  },
  {
    src: "/images/water-pipeline.jpg",
    service: "pipelines",
    alt: "Workers in a deep red-soil trench laying a long blue water pipe",
    caption: "Laying a water main in open trench",
    width: 960,
    height: 1280,
    focus: "center 35%",
  },
  {
    src: "/images/paved-road.jpg",
    service: "road-works",
    alt: "Newly laid interlocking concrete paver road running between houses, with kerbs on both sides",
    caption: "Interlocking-paver road surfacing",
    width: 720,
    height: 1280,
    focus: "center 22%",
  },
  {
    src: "/images/concrete-plant-building.jpg",
    service: "building-construction",
    alt: "Off-shutter concrete building with a flat roof, surrounded by a newly installed concrete kerb edge",
    caption: "Concrete plant building with kerbed surround",
    width: 1280,
    height: 960,
  },
  {
    src: "/images/trench-reinforcement.jpg",
    service: "concrete-works",
    alt: "Steel reinforcement cage laid along the bottom of an excavated trench, with a worker in a safety vest standing on it",
    caption: "Reinforcement cage in a footing trench",
    width: 960,
    height: 1280,
    focus: "center 15%",
  },
  {
    src: "/images/slab-reinforcement.jpg",
    service: "concrete-works",
    alt: "Steel mesh on spacer blocks over black plastic sheeting, ready for a concrete pour, with workers on site",
    caption: "Mesh on spacers over damp-proof sheeting, ready to pour",
    width: 1024,
    height: 768,
  },
  {
    src: "/images/finished-slab.jpg",
    service: "concrete-works",
    alt: "Completed concrete deck with saw-cut joints and kerb blocks along its edges",
    caption: "Finished concrete deck with cut joints",
    width: 1024,
    height: 768,
  },
  {
    src: "/images/kerb-installation.jpg",
    service: "road-works",
    alt: "Newly set concrete kerbs and channel running along a prepared road bed",
    caption: "Kerb and channel along a new road",
    width: 768,
    height: 1024,
    focus: "center 35%",
  },
  {
    src: "/images/manhole-chamber.jpg",
    service: "pipelines",
    alt: "Looking down into a newly built square brick inspection chamber set in red soil",
    caption: "Brick inspection chamber",
    width: 960,
    height: 1280,
    focus: "center 45%",
  },
  {
    src: "/images/trench-excavation.jpg",
    service: "pipelines",
    alt: "Long excavated trench set out with string lines, with workers digging at the far end behind safety netting",
    caption: "Trench excavation, set out to line",
    width: 960,
    height: 1280,
    focus: "center 20%",
  },
  {
    src: "/images/foundation-brickwork.jpg",
    service: "building-construction",
    alt: "Brick foundation walls and cast concrete chambers on a cleared site, with green hills behind",
    caption: "Brick foundations and concrete chambers",
    width: 1024,
    height: 768,
  },
  {
    src: "/images/brick-substructure.jpg",
    service: "building-construction",
    alt: "Brick substructure walls on a concrete base with service ducts, stacks of bricks around the site",
    caption: "Brick substructure on a concrete base",
    width: 1024,
    height: 768,
  },
];

// Add real figures here (e.g. years in business, CIDB grading, B-BBEE level)
// — the stats bar under the hero appears automatically once this has entries.
// Example: { label: "Years in Operation", value: "12" },
export const stats: { label: string; value: string }[] = [];
