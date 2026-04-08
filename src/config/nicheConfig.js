import { Origami, Hammer, Gem, CakeSlice, Scissors } from "lucide-react";

export const NICHES = {
  crochet: {
    slug: "crochet",
    name: "Crochet",
    h1: "Crochet Profit Calculator",
    metaTitle: "CraftPrice | Crochet Profit Calculator",
    metaDescription:
      "Calculate the true cost of your crochet projects. Track yarn, hooks, and notions, add labor time, and find the perfect retail and wholesale price.",
    defaultHourlyWage: 15,
    materialPlaceholder: "e.g. Yarn",
    icon: Origami,
    description: "Price your crochet projects \u2014 from amigurumi to blankets.",
  },
  woodworking: {
    slug: "woodworking",
    name: "Woodworking",
    h1: "Woodworking Profit Calculator",
    metaTitle: "CraftPrice | Woodworking Profit Calculator",
    metaDescription:
      "Price your woodworking projects accurately. Track lumber, hardware, and finish costs, factor in shop time, and set profitable retail and wholesale prices.",
    defaultHourlyWage: 25,
    materialPlaceholder: "e.g. Lumber",
    icon: Hammer,
    description: "Calculate lumber, hardware, and shop-time costs accurately.",
  },
  jewelry: {
    slug: "jewelry",
    name: "Jewelry",
    h1: "Jewelry Profit Calculator",
    metaTitle: "CraftPrice | Jewelry Profit Calculator",
    metaDescription:
      "Price handmade jewelry for profit. Track beads, wire, and findings, add bench time, and calculate retail and wholesale prices instantly.",
    defaultHourlyWage: 20,
    materialPlaceholder: "e.g. Silver wire",
    icon: Gem,
    description: "Track beads, wire, and findings to find your true cost.",
  },
  baking: {
    slug: "baking",
    name: "Baking",
    h1: "Baking Profit Calculator",
    metaTitle: "CraftPrice | Baking Profit Calculator",
    metaDescription:
      "Find the right price for your baked goods. Track ingredients and packaging costs, add prep and bake time, and calculate profitable selling prices.",
    defaultHourlyWage: 18,
    materialPlaceholder: "e.g. Flour",
    icon: CakeSlice,
    description: "Know the real cost of every cake, cookie, and loaf.",
  },
  sewing: {
    slug: "sewing",
    name: "Sewing",
    h1: "Sewing Profit Calculator",
    metaTitle: "CraftPrice | Sewing Profit Calculator",
    metaDescription:
      "Calculate sewing project costs and pricing. Track fabric, thread, and notions, factor in cutting and sewing time, and set retail and wholesale prices.",
    defaultHourlyWage: 20,
    materialPlaceholder: "e.g. Fabric",
    icon: Scissors,
    description: "Price garments and quilts with fabric and notions tracking.",
  },
};

export function getNiche(slug) {
  return NICHES[slug] ?? null;
}
