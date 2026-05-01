export type BeamCfg = {
  w: string
  h: string
  l?: string
  r?: string
  t?: string
  bt?: string
  d: string
  c: string
  tm: string
  dl: string
}

export const BEAMS: BeamCfg[] = [
  { w: "1px", h: "42%", l: "16%", t: "0", d: "180deg", c: "rgba(0,212,255,.28)", tm: "4.5s", dl: "0s" },
  { w: "1px", h: "42%", l: "78%", t: "0", d: "180deg", c: "rgba(157,111,255,.24)", tm: "5.2s", dl: ".8s" },
  { w: "32%", h: "1px", l: "0", t: "45%", d: "90deg", c: "rgba(0,255,136,.22)", tm: "4.8s", dl: "1.2s" },
  { w: "32%", h: "1px", r: "0", t: "55%", d: "270deg", c: "rgba(0,212,255,.2)", tm: "5.6s", dl: ".4s" },
  { w: "1px", h: "36%", l: "58%", t: "0", d: "168deg", c: "rgba(0,212,255,.16)", tm: "6s", dl: "1.8s" },
  { w: "1px", h: "36%", l: "34%", t: "0", d: "192deg", c: "rgba(157,111,255,.16)", tm: "5.4s", dl: "2.4s" },
]

export const TRENDS = [
  "Website Custom",
  "Link in Bio",
  "Undangan Digital",
  "Portfolio",
  "Toko Online",
  "Landing Page",
  "Revamp",
  "Dashboard",
]

export const META_TAGS = [
  "Block Logo",
  "Color Palette",
  "Components",
  "Content Strategy",
  "Copywriting",
  "Iconography",
  "Information Architecture",
  "Layout & Grid",
  "Materi",
  "Motion Design",
  "Sound Design",
  "Surface",
  "Typography",
]

export const ALPHA_TAGS = [
  "Roadmap",
  "Framework",
  "Outline",
  "Template",
  "Playbooks",
  "Tutorials",
  "Project",
  "Portfolio",
]

export const X_TAGS = ["Alphabet Web", "Zodiak Web", "100 Web Collection", "Next..", "And many more ahead"]

export const CARD_STEPS: { l: string; n: string; d: string }[] = [
  { l: "C", n: "Concept", d: "ide & brief awal" },
  { l: "A", n: "Architecture", d: "struktur & desain sistem" },
  { l: "R", n: "Realization", d: "development & coding" },
  { l: "D", n: "Deployment", d: "live, domain, & support" },
]
