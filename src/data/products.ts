import { Product } from '../types';

import heroLifestyleImg from '../assets/images/kobrox_hero_lifestyle_1784713850417.jpg';
import cutterDetailImg from '../assets/images/kobrox_cutter_detail_1784713861967.jpg';
import craftsmanshipImg from '../assets/images/kobrox_craftsmanship_1784713873281.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'kobrox-sig-cutter-v1',
    sku: 'KBX-CUT-SIG-01',
    name: 'KOBROX Signature Series Dual-Action Precision Cigar Cutter',
    series: 'Signature Atelier Collection',
    tagline: 'Precision Cut. Refined Ritual',
    category: 'cutters',
    price: 28.00,
    originalPrice: 68.00,
    rating: 4.9,
    reviewCount: 148,
    inStock: true,
    isFeatured: true,
    badge: 'Flagship Edition',
    description:
      '1：Dual-Action Cutting\nBalanced blades move smoothly for a precise, clean cut while preserving cigar integrity.\n\n2：Premium Metal Design\nA refined metal body combines durability with modern cigar aesthetics.\n\n3：Crafted for the Ritual\nDesigned to elevate every cigar moment, from the first cut to the final draw.',
    overview:
      'A premium dual-action cigar cutter designed for clean, effortless cuts. Crafted with refined metal construction and engineered for cigars up to 64 ring gauge.',
    detailImages: [
      'https://res.cloudinary.com/exzhqokh/image/upload/v1787473739/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260728153738_1306_7.jpg',
      'https://res.cloudinary.com/exzhqokh/image/upload/v1787473737/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260728153800_1313_7.jpg',
      'https://res.cloudinary.com/exzhqokh/image/upload/v1787473742/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260728153748_1309_7.jpg',
      'https://res.cloudinary.com/exzhqokh/image/upload/v1787473743/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260728153741_1307_7.jpg',
      'https://res.cloudinary.com/exzhqokh/image/upload/v1787473734/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260728153801_1314_7.jpg',
      'https://res.cloudinary.com/exzhqokh/image/upload/v1787474013/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260728153755_1312_7.jpg',
      'https://res.cloudinary.com/exzhqokh/image/upload/v1787474012/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260728153752_1311_7.jpg',
      'https://res.cloudinary.com/exzhqokh/image/upload/v1787474012/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260728153750_1310_7.jpg'
    ],
    keyFeatures: [
      'Dual-Action Cutting: Balanced blades move smoothly for a precise, clean cut while preserving cigar integrity',
      'Premium Metal Design: A refined metal body combines durability with modern cigar aesthetics',
      'Crafted for the Ritual: Designed to elevate every cigar moment, from the first cut to the final draw',
      'Engineered for cigars up to 64 Ring Gauge'
    ],
    materials: [
      {
        name: 'Refined Metal Construction',
        description: 'Solid durable alloy housing with balanced ergonomics.'
      },
      {
        name: 'Precision Dual Blades',
        description: 'Smooth synchronized motion for crisp, clean cuts.'
      }
    ],
    craftsmanshipNotes:
      'Designed with respect for cigar tradition, KOBROX accessories combine precision, simplicity, and timeless craftsmanship.',
    specifications: {
      'Dimensions': '76mm x 45mm x 9mm',
      'Weight': '118g',
      'Max Ring Gauge': 'Up to 64 Ring Gauge',
      'Action': 'Dual-Action Cutting Mechanism',
      'Material': 'Refined Metal Body'
    },
    packageContents: [
      '1x KOBROX Dual-Action Precision Cigar Cutter',
      '1x Velvet Travel Pouch',
      '1x KOBROX Presentation Box'
    ],
    media: [
      {
        type: 'image',
        url: 'https://res.cloudinary.com/exzhqokh/image/upload/v1787473739/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260728153738_1306_7.jpg',
        alt: 'KOBROX Dual-Action Precision Cigar Cutter Main View',
        caption: 'Precision Cut. Refined Ritual'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/exzhqokh/image/upload/v1787473737/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260728153800_1313_7.jpg',
        alt: 'KOBROX Dual-Action Cigar Cutter View 2',
        caption: 'Premium Metal Design'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/exzhqokh/image/upload/v1787473742/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260728153748_1309_7.jpg',
        alt: 'KOBROX Dual-Action Cigar Cutter View 3',
        caption: 'Engineered for cigars up to 64 ring gauge'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/exzhqokh/image/upload/v1787473743/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260728153741_1307_7.jpg',
        alt: 'KOBROX Dual-Action Cigar Cutter View 4',
        caption: 'Crafted for the Ritual'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/exzhqokh/image/upload/v1787557808/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260728154050_1346_7.jpg',
        alt: 'KOBROX Dual-Action Cigar Cutter View 5',
        caption: 'Refined Precision & Craftsmanship'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/exzhqokh/image/upload/v1787557785/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260728153926_1326_7.jpg',
        alt: 'KOBROX Dual-Action Cigar Cutter View 6',
        caption: 'Ergonomic Dual Blades'
      }
    ],
    amazonLinks: {
      US: '',
      EU: ''
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Alexander V.',
        rating: 5,
        date: '2026-05-14',
        title: 'The Rolex of Cigar Cutters',
        content: 'I have owned Dupont and Xikar cutters over the years, but KOBROX operates on an entirely different level. The weight in hand and the absolute crispness of the cut through a 56 ring gauge Cohiba was sublime.',
        verifiedAmazonPurchase: true,
        region: 'US'
      },
      {
        id: 'rev-2',
        author: 'Marcus Sterling',
        rating: 5,
        date: '2026-06-02',
        title: 'Unbelievable Precision & Packaging',
        content: 'Bought this as a gift for a partner and ended up buying a second for myself. The leather sleeve and gold accents are sheer class.',
        verifiedAmazonPurchase: true,
        region: 'US'
      }
    ]
  },
  {
    id: 'kobrox-titan-lighter-t3',
    sku: 'KBX-LGT-TIT-03',
    name: 'KOBROX Titan Triple Jet Torch Lighter & Built-in Punch',
    series: 'Titan Performance Series',
    tagline: 'Windproof triple jet flame technology with integrated fold-out punch cutter.',
    category: 'lighters',
    price: 165.00,
    originalPrice: 195.00,
    rating: 4.8,
    reviewCount: 96,
    inStock: true,
    isFeatured: true,
    badge: 'Best Seller',
    description:
      'Engineered for reliable ignition in high-altitude or windy outdoor conditions. Features three targeted windproof jet burners, a fuel inspection window, and an ergonomic slide ignition.',
    overview:
      'The KOBROX Titan Torch Lighter embodies raw power in a sleek, masculine silhouette. Equipped with heavy-gauge solid zinc casing and precision-tuned brass burner nozzles for a clean, odorless blue torch flame.',
    detailImages: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
      heroLifestyleImg
    ],
    keyFeatures: [
      'Triple-pinpoint jet flames reaching temperatures up to 2,400°F (1,300°C)',
      'Integrated 8mm fold-out stainless steel punch cutter in base',
      'Fuel capacity window with subtle amber tinting for easy level checks',
      'Flame height adjustment wheel with tactile knurled grip',
      'Double air intake vents for consistent ignition'
    ],
    materials: [
      {
        name: 'Solid Zinc Alloy Die-Cast Body',
        description: 'Durable structure resistant to heat exposure and drops.'
      },
      {
        name: 'Precision Brass Nozzles',
        description: 'Corrosion-free brass orifices delivering laser-focused torch streams.'
      }
    ],
    craftsmanshipNotes:
      'Flow-tested under pressurized chamber conditions to ensure instantaneous flame ignition on the first slide every single time.',
    specifications: {
      'Dimensions': '82mm x 38mm x 22mm',
      'Weight': '165g',
      'Fuel Type': 'Refillable Premium Butane (Filtered 5x)',
      'Burner Vents': 'Triple Jet Stream',
      'Integrated Tool': '8mm Punch Cutter'
    },
    packageContents: [
      '1x KOBROX Titan Triple Jet Lighter',
      '1x Velvet Drawstring Gift Pouch',
      '1x Flame Adjustment Tool & Fuel Key',
      '1x Owner Manual & Warranty Card'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
        alt: 'KOBROX Titan Triple Torch Lighter',
        caption: 'Triple blue torch flame engineered for wind resistance.'
      },
      {
        type: 'image',
        url: heroLifestyleImg,
        alt: 'Lighter in Luxury Setting',
        caption: 'Matching aesthetic with KOBROX cutters and ashtrays.'
      }
    ],
    amazonLinks: {
      US: 'https://www.amazon.com/dp/B0KOBROXLGT3?tag=kobrox-20',
      EU: 'https://www.amazon.de/dp/B0KOBROXLGT3?tag=kobrox-de-20'
    },
    reviews: [
      {
        id: 'rev-3',
        author: 'Jonathan K.',
        rating: 5,
        date: '2026-06-18',
        title: 'Perfect flame control',
        content: 'Lights a 60-ring Maduro evenly in under 5 seconds on my patio even with wind blowing. Outstanding solid feel.',
        verifiedAmazonPurchase: true,
        region: 'US'
      }
    ]
  },
  {
    id: 'kobrox-monolith-ashtray-brass',
    sku: 'KBX-ASH-MON-01',
    name: 'KOBROX Monolith Solid Brass & Walnut Executive Cigar Ashtray',
    series: 'Atelier Interior Collection',
    tagline: 'Hand-carved solid American Walnut frame with heavy removable brass ash basin.',
    category: 'accessories',
    price: 245.00,
    originalPrice: 280.00,
    rating: 5.0,
    reviewCount: 62,
    inStock: true,
    isFeatured: true,
    badge: 'Artisanal Piece',
    description:
      'A centerpiece for the modern lounge or executive desk. Features a deep brushed solid brass basin resting inside a hand-finished dark walnut block with 4 lip rests.',
    overview:
      'The Monolith Ashtray is sculpted for those who host cigar evenings. Four precision-milled contoured rests accommodate large ring gauge cigars without slippage, while the heavy solid brass core isolates ash elegantly.',
    detailImages: [
      'https://images.unsplash.com/photo-1511389026070-a14ae610a1be?auto=format&fit=crop&w=1200&q=80',
      craftsmanshipImg
    ],
    keyFeatures: [
      'Solid CNC-milled brass bowl with protective clear coat seal',
      'Sustainably harvested American Dark Walnut base with felt floor pad',
      '4 extra-wide cigar rests engineered to cradle up to 70 ring gauge cigars',
      'Removable brass bowl for effortless cleaning and maintenance',
      'Weight: over 1.4 kg for immovable stability'
    ],
    materials: [
      {
        name: 'Solid Architectural Brass',
        description: 'Weighted core with hand-brushed satin surface treatment.'
      },
      {
        name: 'American Dark Walnut Wood',
        description: 'Kiln-dried wood rubbed with natural organic beeswax.'
      }
    ],
    craftsmanshipNotes:
      'Wood blocks are cured for 90 days prior to CNC sculpting to eliminate warp risk. Brass components undergo 6 stages of hand polishing.',
    specifications: {
      'Dimensions': '210mm x 210mm x 42mm',
      'Weight': '1,420g',
      'Cigar Capacity': '4 Simultaneous Rest Position',
      'Base Finish': 'Natural Waxed Walnut'
    },
    packageContents: [
      '1x KOBROX Monolith Walnut Base',
      '1x Heavy Solid Brass Ash Basin',
      '1x KOBROX Wood Care Polish Cloth',
      '1x Luxury Presentation Box'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511389026070-a14ae610a1be?auto=format&fit=crop&w=1200&q=80',
        alt: 'Monolith Brass & Walnut Ashtray',
        caption: 'Sculptural elegance for office, terrace, or humidor room.'
      }
    ],
    amazonLinks: {
      US: 'https://www.amazon.com/dp/B0KOBROXASH1?tag=kobrox-20',
      EU: 'https://www.amazon.de/dp/B0KOBROXASH1?tag=kobrox-de-20'
    },
    reviews: [
      {
        id: 'rev-4',
        author: 'David Hassel',
        rating: 5,
        date: '2026-04-20',
        title: 'Masterpiece on my mahogany desk',
        content: 'It is heavy, beautiful, and holds four large cigars during scotch nights with colleagues. Exceeded expectations.',
        verifiedAmazonPurchase: true,
        region: 'US'
      }
    ]
  },
  {
    id: 'kobrox-heritage-exec-set',
    sku: 'KBX-SET-HER-01',
    name: 'KOBROX Heritage Executive Cigar Accessory Trio Gift Set',
    series: 'Executive Gift Collection',
    tagline: 'Curated 3-piece set comprising Signature Cutter, Titan Lighter & Cedar Travel Sleeve.',
    category: 'sets',
    price: 320.00,
    originalPrice: 385.00,
    rating: 4.9,
    reviewCount: 112,
    inStock: true,
    isFeatured: true,
    badge: 'Ultimate Gift',
    description:
      'The definitive luxury set for the distinguished cigar smoker. Presented in a custom matte-black lacquered wooden gift box with velvet lining.',
    overview:
      'Combining the award-winning Signature Cutter, Titan Jet Lighter, and a genuine Spanish Cedar-lined leather cigar holder for 3 cigars. Everything needed for an elevated smoke session on the golf course or travel lounge.',
    detailImages: [
      heroLifestyleImg,
      cutterDetailImg,
      craftsmanshipImg
    ],
    keyFeatures: [
      'Complete 3-in-1 executive cigar ritual system',
      'Spanish Cedar-lined full-grain leather 3-cigar travel case with humidity gel pouch slot',
      'Signature Dual-Blade Stainless Cutter with matching gunmetal finish',
      'Titan Windproof Triple Torch Lighter',
      'Lacquered presentation display box with magnetic ribbon closure'
    ],
    materials: [
      {
        name: 'Genuine Spanish Cedar Wood',
        description: 'Imparts traditional aroma and maintains optimal 70% RH levels.'
      },
      {
        name: 'Italian Calf Leather',
        description: 'Vegetable-tanned leather that develops a rich patina over time.'
      }
    ],
    craftsmanshipNotes:
      'Every wooden presentation box is hand-lacquered with 7 coats of black satin glaze and lined with high-density gold stamped suede.',
    specifications: {
      'Set Dimensions': '320mm x 240mm x 65mm',
      'Total Package Weight': '1,850g',
      'Case Capacity': '3 Cigars up to 60 Ring Gauge'
    },
    packageContents: [
      '1x KOBROX Signature Dual-Blade Cutter',
      '1x KOBROX Titan Triple Torch Lighter',
      '1x Spanish Cedar Lined Leather 3-Cigar Travel Humidor',
      '1x Lacquered Wooden Display Gift Box',
      '1x Gold Foil Stamped Gift Card & Envelope'
    ],
    media: [
      {
        type: 'image',
        url: heroLifestyleImg,
        alt: 'KOBROX Heritage Executive Gift Set',
        caption: 'Packaged in a piano-lacquer presentation box.'
      },
      {
        type: 'image',
        url: cutterDetailImg,
        alt: 'Included Signature Cutter in Set',
        caption: 'High-precision components matching in color and design.'
      }
    ],
    amazonLinks: {
      US: 'https://www.amazon.com/dp/B0KOBROXSET1?tag=kobrox-20',
      EU: 'https://www.amazon.de/dp/B0KOBROXSET1?tag=kobrox-de-20'
    },
    reviews: [
      {
        id: 'rev-5',
        author: 'Robert C.',
        rating: 5,
        date: '2026-05-30',
        title: 'The ultimate retirement gift',
        content: 'Gifted this to my father for his 60th birthday. He was speechless when opening the wooden velvet box. Outstanding quality!',
        verifiedAmazonPurchase: true,
        region: 'US'
      }
    ]
  },
  {
    id: 'kobrox-sovereign-travel-humidor',
    sku: 'KBX-GFT-SOV-01',
    name: 'KOBROX Sovereign Armor Travel Humidor & Accessory Dock',
    series: 'Gifting & Travel Collection',
    tagline: 'Airtight, shockproof aluminum travel humidor with precision digital hygrometer.',
    category: 'accessories',
    price: 210.00,
    originalPrice: 240.00,
    rating: 4.9,
    reviewCount: 84,
    inStock: true,
    isFeatured: false,
    badge: 'Travel Essential',
    description:
      'Engineered for yachts, flights, and outdoor expeditions. The Sovereign Travel Humidor features a crushproof anodized aluminum shell with high-density shock-absorbing foam inserts for 5 cigars and accessories.',
    overview:
      'Never compromise cigar integrity while traveling. Equipped with an integrated Swiss-calibrated digital hygrometer displaying humidity and temperature with +/- 1% accuracy.',
    detailImages: [
      craftsmanshipImg,
      heroLifestyleImg
    ],
    keyFeatures: [
      'Crushproof 6061 Anodized Aluminum alloy shell with dual heavy-duty latches',
      'Airtight silicone rubber O-ring seal (IP67 water resistant)',
      'Built-in HD digital LCD hygrometer & thermometer',
      'Precision laser-cut foam cradles up to 5 cigars plus cutter and lighter',
      'Humidifier gel disc slot for consistent 70% RH maintainance'
    ],
    materials: [
      {
        name: 'Aircraft Aluminum & Silicone Seal',
        description: 'Lightweight armor housing immune to atmospheric pressure shifts during flights.'
      }
    ],
    craftsmanshipNotes:
      'Tested under water immersion and 10,000 foot altitude pressure chambers to guarantee airtight protection.',
    specifications: {
      'Dimensions': '240mm x 150mm x 55mm',
      'Weight': '820g',
      'Capacity': '5 Cigars (Up to 8" length, 60 Ring Gauge)',
      'Waterproof Rating': 'IP67 Submersible'
    },
    packageContents: [
      '1x KOBROX Sovereign Travel Armor Case',
      '1x Digital LCD Hygrometer Unit (Battery Included)',
      '1x Crystal Gel Humidity Control Disc',
      '1x Tactical Carabiner & Shoulder Strap'
    ],
    media: [
      {
        type: 'image',
        url: craftsmanshipImg,
        alt: 'Sovereign Armor Travel Humidor',
        caption: 'Airtight protection for travel, golf, and marine environments.'
      }
    ],
    amazonLinks: {
      US: 'https://www.amazon.com/dp/B0KOBROXSOV1?tag=kobrox-20',
      EU: 'https://www.amazon.de/dp/B0KOBROXSOV1?tag=kobrox-de-20'
    },
    reviews: [
      {
        id: 'rev-6',
        author: 'Erich M.',
        rating: 5,
        date: '2026-06-11',
        title: 'Took it on a 2-week flight round trip',
        content: 'Digital reader stayed rock solid at 69% humidity. Cigars arrived in perfect smoking condition. Worth every penny.',
        verifiedAmazonPurchase: true,
        region: 'EU'
      }
    ]
  }
];
