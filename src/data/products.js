// Luxury Jewelry Product Catalog Data
export const CATEGORIES = [
  {
    id: 'rings',
    name: 'Rings',
    tagline: 'Solitaires, Eternity & Cocktail Bands',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    itemCount: '18 Designs'
  },
  {
    id: 'necklaces',
    name: 'Necklaces',
    tagline: 'Diamond Pendants & Golden Chokers',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    itemCount: '24 Designs'
  },
  {
    id: 'earrings',
    name: 'Earrings',
    tagline: 'Chandelier Drops & Pavé Huggies',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    itemCount: '16 Designs'
  },
  {
    id: 'bracelets',
    name: 'Bracelets',
    tagline: 'Diamond Tennis & Sculpted Cuffs',
    image: 'https://images.unsplash.com/photo-1611591475819-797de2338695?auto=format&fit=crop&w=800&q=80',
    itemCount: '14 Designs'
  }
];

export const PRODUCTS = [
  {
    id: 'lum-01',
    name: 'The Celestial Solitaire Ring',
    category: 'rings',
    categoryName: 'Rings',
    price: 2850,
    originalPrice: 3200,
    rating: 4.9,
    reviewsCount: 48,
    badge: 'Bestseller',
    isNew: false,
    isFeatured: true,
    metals: ['18K Yellow Gold', 'Platinum', '18K Rose Gold'],
    defaultMetal: '18K Yellow Gold',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85'
    ],
    shortDesc: 'A mesmerizing 1.75ct brilliant-cut laboratory-grown diamond perched on a tapered 18K solid gold band.',
    description: 'Masterfully crafted in our Paris atelier, The Celestial Solitaire captures light with incomparable brilliance. Featuring an exquisite 1.75 carat round brilliant diamond held gracefully by four micro-claw prongs on a knife-edge comfort-fit shank.',
    specs: {
      carat: '1.75 ct',
      clarity: 'VVS1 (Very Very Slightly Included)',
      color: 'D (Colorless)',
      cut: 'Super Ideal Triple Excellent',
      certification: 'GIA & IGI Certified'
    },
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9'],
    inStock: true
  },
  {
    id: 'lum-02',
    name: 'Aura Étoile Diamond Pendant',
    category: 'necklaces',
    categoryName: 'Necklaces',
    price: 1950,
    originalPrice: 2200,
    rating: 5.0,
    reviewsCount: 36,
    badge: 'New Arrival',
    isNew: true,
    isFeatured: true,
    metals: ['18K Yellow Gold', 'Platinum', '18K White Gold'],
    defaultMetal: '18K Yellow Gold',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=85'
    ],
    shortDesc: 'A delicate halo of round diamonds encasing a luminous center gem on an adjustable Italian cable chain.',
    description: 'The Aura Étoile Pendant radiates celestial majesty. Hand-set micro-pavé diamonds surround an iridescent center diamond, suspended along an authentic 18-inch 18K gold chain with jump rings at 16" and 18".',
    specs: {
      carat: '1.20 ct Total Weight',
      clarity: 'VS1',
      color: 'E',
      cut: 'Brilliant Cut',
      certification: 'GIA Certified'
    },
    sizes: ['16 Inch', '18 Inch', '20 Inch'],
    inStock: true
  },
  {
    id: 'lum-03',
    name: 'Seraphina Chandelier Drop Earrings',
    category: 'earrings',
    categoryName: 'Earrings',
    price: 3400,
    originalPrice: 3800,
    rating: 4.8,
    reviewsCount: 29,
    badge: 'Signature Piece',
    isNew: false,
    isFeatured: true,
    metals: ['18K Rose Gold', '18K Yellow Gold', 'Platinum'],
    defaultMetal: '18K Rose Gold',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=85'
    ],
    shortDesc: 'Cascading pear and marquise cut diamonds creating fluid movement and unmistakable glamour.',
    description: 'Artfully articulated to catch room light from every angle, the Seraphina Drop Earrings feature tiered pear-cut diamonds set in delicate bezel and prongs, providing weightless elegance for gala evenings and bridal celebrations.',
    specs: {
      carat: '2.50 ct Combined',
      clarity: 'VVS2',
      color: 'F',
      cut: 'Pear & Marquise',
      certification: 'IGI Certified'
    },
    sizes: ['Standard Pair'],
    inStock: true
  },
  {
    id: 'lum-04',
    name: 'Luxe Rivière Diamond Tennis Bracelet',
    category: 'bracelets',
    categoryName: 'Bracelets',
    price: 4900,
    originalPrice: 5500,
    rating: 5.0,
    reviewsCount: 52,
    badge: 'Iconic',
    isNew: false,
    isFeatured: true,
    metals: ['Platinum', '18K White Gold', '18K Yellow Gold'],
    defaultMetal: 'Platinum',
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1000&q=85'
    ],
    shortDesc: 'A seamless continuous line of 55 calibrated round brilliant diamonds secured with double safety clasp.',
    description: 'An enduring staple of high jewelry. The Luxe Rivière tennis bracelet is engineered with four-prong settings designed to maximize brilliance and lay completely flat against the wrist.',
    specs: {
      carat: '4.00 ct Total Weight',
      clarity: 'VVS1 - VS1',
      color: 'E - F',
      cut: 'Ideal Round',
      certification: 'GIA Verified'
    },
    sizes: ['6.5 Inch', '7.0 Inch', '7.5 Inch'],
    inStock: true
  },
  {
    id: 'lum-05',
    name: 'Verdant Empress Emerald & Diamond Ring',
    category: 'rings',
    categoryName: 'Rings',
    price: 4100,
    originalPrice: 4600,
    rating: 4.9,
    reviewsCount: 22,
    badge: 'Limited Edition',
    isNew: true,
    isFeatured: true,
    metals: ['18K Yellow Gold', 'Platinum'],
    defaultMetal: '18K Yellow Gold',
    images: [
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85'
    ],
    shortDesc: 'A deep Colombian vivid green emerald flanked by tapered baguette diamond shoulders.',
    description: 'The Verdant Empress celebrates the hypnotic depth of fine emeralds. Mined sustainably with ethical verification, each stone is hand-selected for its lush tone and garden inclusions.',
    specs: {
      carat: '2.10 ct Center Emerald, 0.40ct Diamonds',
      clarity: 'Minor Clarity Enhancement (Standard)',
      color: 'Vivid Forest Green',
      cut: 'Octagonal Emerald Cut',
      certification: 'Gübelin Gem Lab'
    },
    sizes: ['US 5', 'US 6', 'US 7', 'US 8'],
    inStock: true
  },
  {
    id: 'lum-06',
    name: 'Imperial South Sea Pearl Collar',
    category: 'necklaces',
    categoryName: 'Necklaces',
    price: 3650,
    originalPrice: 4100,
    rating: 4.7,
    reviewsCount: 18,
    badge: 'Heritage',
    isNew: false,
    isFeatured: false,
    metals: ['18K Yellow Gold', '18K White Gold'],
    defaultMetal: '18K Yellow Gold',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1000&q=85'
    ],
    shortDesc: 'A single 13mm Australian golden South Sea pearl held by an architectural pavé diamond bail.',
    description: 'Organic luxury in its purest distillation. Selected for mirror-like luster and rich warm undertones, complemented by 0.35ct micro-set diamonds.',
    specs: {
      carat: '13mm Pearl / 0.35ct Diamonds',
      clarity: 'Pristine Flawless Luster',
      color: 'Warm Golden Champagne',
      cut: 'Near-Perfect Round',
      certification: 'Pearl Sourcing Certificate'
    },
    sizes: ['16 Inch', '18 Inch'],
    inStock: true
  },
  {
    id: 'lum-07',
    name: 'Pavé Constellation Huggie Hoops',
    category: 'earrings',
    categoryName: 'Earrings',
    price: 1250,
    originalPrice: 1400,
    rating: 4.9,
    reviewsCount: 64,
    badge: 'Everyday Luxury',
    isNew: false,
    isFeatured: true,
    metals: ['18K Yellow Gold', '18K Rose Gold', '18K White Gold'],
    defaultMetal: '18K Yellow Gold',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=1000&q=85'
    ],
    shortDesc: 'Effortless huggie hoops encrusted with three micro-pavé rows of round diamonds inside and out.',
    description: 'Designed for daily decadence. Our signature hinged closure clicks shut with reassuring precision, providing total comfort for 24/7 wear.',
    specs: {
      carat: '0.85 ct Total Weight',
      clarity: 'VS2',
      color: 'F - G',
      cut: 'Round Brilliant',
      certification: 'In-house Atelier Appraisal'
    },
    sizes: ['12mm Diameter'],
    inStock: true
  },
  {
    id: 'lum-08',
    name: 'Helios Sculpted Heavy Gold Cuff',
    category: 'bracelets',
    categoryName: 'Bracelets',
    price: 3200,
    originalPrice: 3500,
    rating: 4.8,
    reviewsCount: 31,
    badge: 'Atelier Edition',
    isNew: true,
    isFeatured: true,
    metals: ['18K Yellow Gold', '18K Rose Gold'],
    defaultMetal: '18K Yellow Gold',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1000&q=85'
    ],
    shortDesc: 'Substantial solid 18K gold bangle with satin brushed exterior and high-polish beveled interior.',
    description: 'Hand-forged by our master goldsmiths in Florence, the Helios cuff features 32 grams of solid gold with subtle fluted ridges inspired by classical Greco-Roman architecture.',
    specs: {
      carat: 'Solid 18K Gold (32 Grams)',
      clarity: 'Pure Solid Metal',
      color: 'Warm 750 Yellow Gold',
      cut: 'Hand Chiseled & Buffed',
      certification: 'Hallmarked in London Assay Office'
    },
    sizes: ['Small (6.0")', 'Medium (6.5")', 'Large (7.0")'],
    inStock: true
  },
  {
    id: 'lum-09',
    name: 'Midnight Sapphire Halo Band',
    category: 'rings',
    categoryName: 'Rings',
    price: 2750,
    originalPrice: 3100,
    rating: 4.9,
    reviewsCount: 19,
    badge: 'Bestseller',
    isNew: false,
    isFeatured: false,
    metals: ['Platinum', '18K White Gold', '18K Yellow Gold'],
    defaultMetal: 'Platinum',
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1000&q=85'
    ],
    shortDesc: 'Velvety royal blue Ceylon sapphire hugged by 16 French-set diamond halo stones.',
    description: 'A tribute to regal romance. The deep cornflower blue sapphire is unheated and ethically sourced from Sri Lanka, catching royal reflections in sunlight.',
    specs: {
      carat: '1.80 ct Sapphire / 0.50 ct Diamonds',
      clarity: 'Eye-Clean Royal Blue',
      color: 'Vivid Ceylon Blue',
      cut: 'Cushion Modified Brilliant',
      certification: 'SSEF Swiss Certified'
    },
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9'],
    inStock: true
  },
  {
    id: 'lum-10',
    name: 'L’Amour Rose Gold Diamond Lariat',
    category: 'necklaces',
    categoryName: 'Necklaces',
    price: 2400,
    originalPrice: 2700,
    rating: 5.0,
    reviewsCount: 27,
    badge: 'Romantic',
    isNew: true,
    isFeatured: true,
    metals: ['18K Rose Gold', '18K Yellow Gold', 'Platinum'],
    defaultMetal: '18K Rose Gold',
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1000&q=85'
    ],
    shortDesc: 'A plunging Y-necklace with sliding pavé diamond medallion and pear-cut terminus.',
    description: 'Sensual and dramatic, the L’Amour lariat drops gracefully down the decolletage. Its adjustable silicon-grip bead allows seamless transformation from choker to deep plunge.',
    specs: {
      carat: '0.95 ct Diamond Weight',
      clarity: 'VVS2',
      color: 'F',
      cut: 'Brilliant & Pear',
      certification: 'GIA Certified'
    },
    sizes: ['Adjustable up to 24 Inch'],
    inStock: true
  },
  {
    id: 'lum-11',
    name: 'Soliel Marquise Diamond Studs',
    category: 'earrings',
    categoryName: 'Earrings',
    price: 1800,
    originalPrice: 2050,
    rating: 4.8,
    reviewsCount: 38,
    badge: 'Popular',
    isNew: false,
    isFeatured: false,
    metals: ['18K Yellow Gold', 'Platinum', '18K Rose Gold'],
    defaultMetal: '18K Yellow Gold',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=85'
    ],
    shortDesc: 'Elongated marquise cut diamonds set north-south in protective v-end prongs.',
    description: 'An elegant departure from round studs. The elongated marquise cut creates the optical illusion of greater carat size while lending a modern edge to casual and formal attire.',
    specs: {
      carat: '1.10 ct Pair (0.55 ct each)',
      clarity: 'VS1',
      color: 'D',
      cut: 'Marquise Brilliant',
      certification: 'IGI Verified'
    },
    sizes: ['Standard Pierced Post'],
    inStock: true
  },
  {
    id: 'lum-12',
    name: 'Infinity Pavé Diamond Eternity Band',
    category: 'rings',
    categoryName: 'Rings',
    price: 2150,
    originalPrice: 2400,
    rating: 4.9,
    reviewsCount: 57,
    badge: 'Wedding & Bridal',
    isNew: false,
    isFeatured: true,
    metals: ['Platinum', '18K Yellow Gold', '18K Rose Gold'],
    defaultMetal: 'Platinum',
    images: [
      'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=85'
    ],
    shortDesc: 'A complete 360-degree circle of matched micro-pavé diamonds symbolizing eternal devotion.',
    description: 'Cast in 950 pure platinum, this eternity band stacks seamlessly alongside our engagement solitaires or shines magnificently as a standalone statement.',
    specs: {
      carat: '1.40 ct Total Weight',
      clarity: 'VVS1',
      color: 'E',
      cut: 'Round Hearts & Arrows',
      certification: 'Atelier Certificate of Authenticity'
    },
    sizes: ['US 5', 'US 6', 'US 7', 'US 8'],
    inStock: true
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "The craftsmanship is beyond anything I have ever experienced. The Celestial Solitaire sparkles across the room and my fiancé was moved to tears.",
    author: "Eleanor Vance",
    location: "Geneva, Switzerland",
    verified: true,
    rating: 5,
    product: "The Celestial Solitaire Ring"
  },
  {
    id: 2,
    quote: "Ordering fine jewelry online felt intimidating until I reached Lumière concierge. The packaging, GIA documentation, and luxury insurance gave complete peace of mind.",
    author: "Marcus Sterling",
    location: "New York, USA",
    verified: true,
    rating: 5,
    product: "Luxe Rivière Diamond Tennis Bracelet"
  },
  {
    id: 3,
    quote: "The emerald ring is simply royalty. The deep green hue and delicate diamond settings look like an heirloom passed down through generations.",
    author: "Lady Vivienne Clarke",
    location: "London, UK",
    verified: true,
    rating: 5,
    product: "Verdant Empress Emerald Ring"
  }
];

export const BRAND_STATS = [
  { value: '45+', label: 'Years of Atelier Heritage' },
  { value: '100%', label: 'Conflict-Free Certified' },
  { value: '18K+', label: 'Bespoke Creations Crafted' },
  { value: '98.8%', label: '5-Star Client Satisfaction' }
];

export const FAQS = [
  {
    q: 'Are all Lumière diamonds conflict-free and certified?',
    a: 'Absolutely. Every diamond in our collection adheres strictly to the Kimberley Process and comes accompanied by accredited grading certificates from either GIA, IGI, or AGS.'
  },
  {
    q: 'Do you offer complimentary ring resizing and custom engraving?',
    a: 'Yes! We provide one complimentary resizing within 60 days of purchase for all rings. Custom laser engraving in script or block letters is also complimentary upon request during checkout.'
  },
  {
    q: 'How does insured shipping and signature delivery work?',
    a: 'All orders are shipped via discreet, fully-insured overnight courier (FedEx / DHL Express) requiring an adult signature upon delivery. The outer box carries no jewelry branding for optimal security.'
  },
  {
    q: 'What is your return and lifetime warranty policy?',
    a: 'We offer 30-day hassle-free returns on all non-customized pieces. Every creation is backed by our Lifetime Atelier Warranty covering prong retightening, annual deep ultrasonic cleaning, and rhodium replating.'
  }
];
