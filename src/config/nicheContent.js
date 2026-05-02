// Long-form supporting content per niche. Keeps nicheConfig.js focused on
// calculator defaults; this file holds copy that needs editorial care.

export const NICHE_CONTENT = {
  crochet: {
    intro: {
      heading: "How to price your crochet projects",
      paragraphs: [
        "Pricing crochet is hard because most makers underestimate two things: yarn cost per finished item and the hours that vanish into a single project. A blanket can take 30+ hours; an amigurumi might be 8. If you only charge for the yarn and skip the labor, you're paying customers to take your work home.",
        "Use this formula: (yarn + notions) + (hours × hourly wage) + 10–15% overhead, then multiply by your markup. The calculator above handles the math — your job is to track every skein and time every project for one full month so the numbers stop being guesses.",
        "If your retail price feels too high, the answer isn't lowering the price. It's finding customers who already pay that much for handmade. Etsy crochet listings range from $15 amigurumi keychains to $400+ heirloom blankets — the buyers exist.",
      ],
    },
    mistakes: {
      heading: "Common pricing mistakes for crochet makers",
      items: [
        {
          title: "Charging by the skein",
          body: "Yarn weight varies. A worsted-weight throw uses ~$30 in yarn but takes 25 hours. Pricing by skein cost ignores the bulk of your investment.",
        },
        {
          title: "Forgetting pattern royalties",
          body: "If you sell items made from a paid pattern, check the designer's commercial-use policy. Some require attribution, some require a per-item royalty, some forbid resale entirely.",
        },
        {
          title: "Discounting custom orders",
          body: "Custom work takes longer than stock items — design time, fittings, color matching, revisions. Charge a 25–50% premium, not a discount.",
        },
      ],
    },
    worked_example: {
      heading: "Worked example: a baby blanket",
      rows: [
        ["Yarn (4 skeins worsted, $8 each)", "$32"],
        ["Hours (20 hrs × $20/hr)", "$400"],
        ["Overhead (12% of subtotal)", "$52"],
        ["Total cost", "$484"],
        ["Retail (50% margin)", "$968"],
        ["Wholesale (1.5× cost)", "$726"],
      ],
      footnote: "If $968 sounds high, that's the gap between hobby pricing and sustainable pricing. Most successful crochet sellers focus on smaller, faster items (hats, scarves, plushies) where the absolute price is more accessible.",
    },
    faq: [
      {
        q: "How much should I charge for a crochet hat?",
        a: "Most adult crochet hats take 3–5 hours and use $5–8 in yarn. At a $20/hr wage with 10% overhead and 50% margin, that's a retail price of $80–$130. Faster makers and bulky-yarn patterns land lower; intricate cables or hand-dyed yarn land higher.",
      },
      {
        q: "Should I charge by the hour or by the project?",
        a: "Use hourly internally to set your floor, then quote a project price. Customers don't want to feel like they're paying a meter. But you should always know your effective hourly rate — if it drops below your minimum, raise prices or stop taking that type of work.",
      },
      {
        q: "Why do my crochet prices look so high compared to fast fashion?",
        a: "Because they are. A handmade blanket competes with $30 acrylic store-bought blankets in price but with $300+ artisan textiles in quality. Sell on the value, not the cost — sustainability, custom colors, heirloom durability.",
      },
    ],
  },

  woodworking: {
    intro: {
      heading: "How to price your woodworking projects",
      paragraphs: [
        "Woodworking pricing has three traps: forgetting waste factor on lumber, undercharging for finishing time, and ignoring shop overhead. A cutting board uses 1.5x its finished volume in raw stock once you account for jointing, planing, and rip cuts.",
        "Use this formula: (lumber × 1.5 waste factor) + hardware + finish + (hours × hourly wage) + shop overhead (15–20%), then multiply by markup. Shop overhead covers blade sharpening, sandpaper, tool depreciation, electricity, and dust collection — it adds up fast.",
        "Custom furniture commands premium prices, but only if you build relationships with buyers who value craftsmanship. Local craft fairs, Instagram, and word-of-mouth beat Etsy for high-ticket items where shipping is prohibitive.",
      ],
    },
    mistakes: {
      heading: "Common pricing mistakes for woodworking makers",
      items: [
        {
          title: "Pricing by board-foot of finished product",
          body: "You buy 5/4 stock to mill down to 4/4 and lose 20%. Cuts and waste add another 20–30%. Always price using your raw lumber bill, not the finished volume.",
        },
        {
          title: "Skipping shop time in the labor count",
          body: "Setup, jig-making, sanding between coats, glue-up clamping — these are real hours. If you only count active machining time, you're undercharging by 30–50%.",
        },
        {
          title: "Underpricing custom commissions",
          body: "Custom means design consultation, prototype iteration, client revisions, and zero economy of scale. Charge 1.5–2× your stock-item rate.",
        },
      ],
    },
    worked_example: {
      heading: "Worked example: a walnut cutting board",
      rows: [
        ["Lumber (3 bd-ft walnut + maple, $15/bd-ft)", "$45"],
        ["Finish (mineral oil + beeswax)", "$3"],
        ["Hours (4 hrs × $30/hr)", "$120"],
        ["Shop overhead (18%)", "$30"],
        ["Total cost", "$198"],
        ["Retail (50% margin)", "$396"],
        ["Wholesale (1.5× cost)", "$297"],
      ],
      footnote: "Mass-produced cutting boards retail at $20–$50, but those are made on CNC lines from cheap stock. Your handmade walnut board competes with $200–$500 artisan boards — don't apologize for the price.",
    },
    faq: [
      {
        q: "How much should I charge for a custom dining table?",
        a: "A 6-ft solid hardwood table typically takes 30–60 hours and uses $300–$700 in lumber and hardware. At $35/hr with 18% shop overhead and 50% margin, that's a retail range of $2,400–$4,800. Live-edge or premium woods (walnut, white oak) land toward the top.",
      },
      {
        q: "Should I charge for shop time even when I'm not at the machine?",
        a: "Yes. Glue-up clamping (8–24 hours), finish curing (4–72 hours), and jig setup are all part of the project even when you're not actively working. Track them separately if helpful, but include them in your total hours.",
      },
      {
        q: "How do I price commissions when the client wants me to source the wood?",
        a: "Always add 15–20% to material costs to cover sourcing time, dealer markups, and waste. Quote materials separately from labor on the invoice so the client sees both line items.",
      },
    ],
  },

  jewelry: {
    intro: {
      heading: "How to price your handmade jewelry",
      paragraphs: [
        "Jewelry pricing is brutal because tiny material costs hide huge labor and skill investments. A pair of sterling earrings might use $4 of silver but takes 90 minutes from layout to polish. If you price 2× materials, you make $4 in profit on 1.5 hours of work.",
        "Use this formula: metal (by weight × current spot price + 30–40% fabrication factor) + stones + findings + (hours × hourly wage) + bench overhead (15%), then multiply by markup. Bench overhead covers solder, flux, polishing compound, sandpaper, propane, and sawblade replacements.",
        "For precious metals, repost your prices monthly. Silver moved 25% in 2025; gold moved 40%. If your retail prices lag spot by 60 days, you're losing money on every sale.",
      ],
    },
    mistakes: {
      heading: "Common pricing mistakes for jewelry makers",
      items: [
        {
          title: "Multiplying material cost by 2 or 3",
          body: "The keystone markup is for retailers reselling factory goods. You're a maker. Your labor and skill are 70% of the value, not 30%. Multiply by 4–6× for retail, then sanity-check against the calculator.",
        },
        {
          title: "Forgetting bench fees",
          body: "Solder, flux, polish, propane, sandpaper, sawblades, gloves — these consume on every piece. Add 12–18% as overhead, not zero.",
        },
        {
          title: "Ignoring metal market volatility",
          body: "If you priced earrings at $80 when silver was $24/oz and silver is now $32/oz, you're losing $4–6 per pair. Reprice quarterly minimum.",
        },
      ],
    },
    worked_example: {
      heading: "Worked example: sterling silver hoop earrings",
      rows: [
        ["Sterling silver (4g × $1.10/g spot + 35% fabrication)", "$5.94"],
        ["Ear wires (sterling, pair)", "$2.50"],
        ["Hours (1.5 hrs × $40/hr)", "$60"],
        ["Bench overhead (15%)", "$10.27"],
        ["Total cost", "$78.71"],
        ["Retail (55% margin)", "$175"],
        ["Wholesale (1.5× cost)", "$118"],
      ],
      footnote: "$175 for sterling hoops sounds steep next to $25 fashion jewelry, but it's right in line with handmade-jewelry pricing on Etsy and at galleries. Your buyer is choosing tarnish-resistant sterling over plated brass.",
    },
    faq: [
      {
        q: "How much should I charge for a custom engagement ring?",
        a: "Custom rings range from $400 (simple sterling band with a synthetic stone) to $5,000+ (gold setting with a natural diamond). Material cost is 30–60% of the total; the rest is design time, CAD, casting, stone setting, and polishing. Always quote materials and labor separately.",
      },
      {
        q: "Should I include the cost of metal scraps and lemel?",
        a: "Track scraps separately — they're recoverable. Most jewelers refine sweepings annually and credit that against next year's metal purchases, not against individual project costs.",
      },
      {
        q: "How do I price stones I cut myself?",
        a: "Add your lapidary time at the same hourly rate as bench work. A self-cut cabochon might use $5 in rough but represent 2 hours of cutting. Most makers undercharge here because the rough was cheap.",
      },
    ],
  },

  baking: {
    intro: {
      heading: "How to price your baked goods",
      paragraphs: [
        "Bakery pricing collapses without ingredient tracking. Flour, butter, and sugar costs feel small until you scale to 50 cookies and realize you used $18 of butter alone. Then add the prep, the bake, the decoration, and the packaging — a single dozen cookies has 30+ minutes of human time invested.",
        "Use this formula: (ingredients per batch ÷ yield) + packaging per unit + (active hours × hourly wage) + kitchen overhead (15–20%), then multiply by markup. Kitchen overhead is your cottage food permit, oven gas, parchment, dish soap, refrigeration, and the inevitable failed batches.",
        "If you're cottage-food-licensed, you can sell direct in most U.S. states. Farmers' markets, Instagram, and local pickup orders typically beat retail consignment for margin — and they let you skip the wholesale haircut.",
      ],
    },
    mistakes: {
      heading: "Common pricing mistakes for bakers",
      items: [
        {
          title: "Pricing per cookie instead of per batch",
          body: "Your batch yield varies by recipe and your scoop size. Calculate cost per batch, divide by actual finished count, then add labor and overhead per unit.",
        },
        {
          title: "Forgetting decorating time on custom cakes",
          body: "Royal icing flowers and detailed piping can take 3–5 hours on a single tier. That's the entire profit if you only charged for ingredients and bake time.",
        },
        {
          title: "Underpricing custom orders by 'eyeballing'",
          body: "Custom cakes need a written quote based on tier count, design complexity, and dietary requirements (gluten-free, vegan = 1.5–2× ingredient cost). No one-size-fits-all flat rate.",
        },
      ],
    },
    worked_example: {
      heading: "Worked example: a dozen decorated sugar cookies",
      rows: [
        ["Ingredients (cookies + royal icing for 12)", "$8"],
        ["Packaging (box, divider, ribbon)", "$3"],
        ["Hours (2.5 hrs × $22/hr)", "$55"],
        ["Kitchen overhead (18%)", "$12"],
        ["Total cost", "$78"],
        ["Retail (50% margin)", "$156"],
        ["Per cookie", "$13"],
      ],
      footnote: "$13/cookie sounds high until you compare to bakery decorated cookies (average $6–$10 each). Custom designs and themes push prices to $15–$25 per cookie at the high end.",
    },
    faq: [
      {
        q: "How much should I charge for a custom birthday cake?",
        a: "Single-tier custom cakes typically run $60–$150 (8–10 servings); multi-tier and detailed designs run $200–$600+. The biggest variable is decorating time — a smooth buttercream is 1 hour, hand-piped roses across the entire cake is 4+ hours.",
      },
      {
        q: "Do I need to charge sales tax on baked goods?",
        a: "Depends on your state. Most U.S. states exempt grocery food but tax prepared/ready-to-eat food. Cottage food laws vary widely — check your state's specific rules and consult a tax professional.",
      },
      {
        q: "Should I price wholesale lower than retail when selling to coffee shops?",
        a: "Yes. Standard wholesale is 50–60% of retail (1.5–2× cost markup vs. 2–3× for retail). The shop needs margin to resell. If wholesale doesn't pencil out, you're either underpricing retail or you can't profitably wholesale.",
      },
    ],
  },

  sewing: {
    intro: {
      heading: "How to price your sewing projects",
      paragraphs: [
        "Sewing pricing fails at fabric estimation and finishing detail. A garment uses more fabric than the pattern envelope claims (account for matching stripes, fixing layout errors, and waste at 15–20%). Lining, interfacing, zippers, and topstitching consume both materials and hours.",
        "Use this formula: (fabric × 1.2 waste factor) + notions (zippers, interfacing, thread, buttons) + (hours × hourly wage) + machine overhead (10%), then multiply by markup. Machine overhead is needles, bobbin thread, scissor sharpening, and the fact that your sewing machine eats $80 in service every 2–3 years.",
        "Custom alterations (hemming, taking in, replacing zippers) tend to be your highest hourly rate because the materials are minimal and the customer is locked in. Garment construction from scratch competes with fast fashion — sell to people who want fit, not low prices.",
      ],
    },
    mistakes: {
      heading: "Common pricing mistakes for sewing makers",
      items: [
        {
          title: "Buying fabric on sale and then pricing as if it cost retail — or vice versa",
          body: "Track your actual cost per yard, not what the bolt was originally tagged at. Sale fabric isn't free; full-price fabric isn't a markup opportunity.",
        },
        {
          title: "Forgetting interfacing, lining, and thread",
          body: "Interfacing alone can run $4–8 per garment. Add it as a line item, not as 'I'll round up the fabric cost.'",
        },
        {
          title: "Quoting alterations by gut",
          body: "A 'simple hem' can be 30 minutes (machine-stitched bedsheet) or 2 hours (lined wool trousers). Standard tailor pricing has tiers for a reason — use them.",
        },
      ],
    },
    worked_example: {
      heading: "Worked example: a custom-fit cotton dress",
      rows: [
        ["Fabric (3.5 yd cotton lawn × $12/yd × 1.2 waste)", "$50"],
        ["Notions (zipper, interfacing, thread, buttons)", "$10"],
        ["Hours (8 hrs × $25/hr)", "$200"],
        ["Machine overhead (10%)", "$26"],
        ["Total cost", "$286"],
        ["Retail (50% margin)", "$572"],
        ["Wholesale (1.5× cost)", "$429"],
      ],
      footnote: "Custom-fit means muslin fitting, pattern adjustments, and at least one wear-test — add 2–4 hours over an off-the-rack make. Off-the-rack pricing for the same garment in standard sizes would land at $350–$450 retail.",
    },
    faq: [
      {
        q: "How much should I charge for a custom wedding dress?",
        a: "Custom wedding gowns range from $1,200 (simple silhouette, mid-range fabric) to $8,000+ (heavily beaded, structured corsetry, multiple fittings). The biggest cost drivers are fabric ($30–$200/yd for silk/lace) and the number of fittings (3–5 typical).",
      },
      {
        q: "Should I charge per inch or per garment for alterations?",
        a: "Use flat-rate tiers, not per-inch. Customers want a quote before they hand over the garment. Standard tiers: hem ($15–40 by garment type), take-in ($25–60), zipper replacement ($30–80), full re-fit ($75–$200).",
      },
      {
        q: "How do I price quilts when the labor is so much higher than the materials?",
        a: "Use hourly internally and a project rate externally. A queen-sized hand-quilted quilt is 80–150 hours; at $25/hr with materials, that's $2,500–$5,000+ retail. Most quilts sell below cost — market to collectors and gift-givers, not bedding shoppers.",
      },
    ],
  },
};
