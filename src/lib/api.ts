import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
export type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

const FALLBACK_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Shoes", slug: "shoes", created_at: "" },
  { id: "cat-2", name: "Wrist Watches", slug: "wrist-watches", created_at: "" },
  { id: "cat-3", name: "Glasses", slug: "glasses", created_at: "" },
  { id: "cat-4", name: "Jackets", slug: "jackets", created_at: "" },
  { id: "cat-5", name: "Accessories", slug: "accessories", created_at: "" },
];

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "p-s1",
    name: "Noir Leather Oxford",
    price: 185000,
    description:
      "A masterwork of cobblery precision. The Noir Oxford commands attention with its sleek silhouette and hand-burnished toe cap. Built for the man who understands that elegance is in the details.",
    material: "Full-grain calfskin leather",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["Black", "Dark Brown"],
    image_paths: ["https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80"],
    category_id: "cat-1",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-s2",
    name: "Elite Court Sneaker",
    price: 120000,
    description:
      "Where sport meets couture. The Elite Court blends athletic heritage with luxury finishing — a clean silhouette that transitions effortlessly from gallery openings to afternoon drives.",
    material: "Premium canvas & leather",
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: ["White", "Cream", "Black"],
    image_paths: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"],
    category_id: "cat-1",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-s3",
    name: "Heritage Derby",
    price: 145000,
    description:
      "Rooted in British tailoring tradition, the Heritage Derby is punctuated with intricate brogue detailing along the cap toe and quarters. A shoe that improves with every wear.",
    material: "Brogue-punched full-grain leather",
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["Cognac", "Black"],
    image_paths: ["https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80"],
    category_id: "cat-1",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-s4",
    name: "Midnight Suede Loafer",
    price: 165000,
    description:
      "The Midnight Loafer is the definition of effortless luxury. Slip into a shoe that requires no laces and no compromise — just pure refined ease from morning to midnight.",
    material: "Italian suede with leather sole",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["Black", "Navy", "Burgundy"],
    image_paths: ["https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80"],
    category_id: "cat-1",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-s5",
    name: "Obsidian Chelsea Boot",
    price: 210000,
    description:
      "The Obsidian Chelsea Boot carries a clean, unbroken profile that pairs with everything from tailored trousers to raw denim. A wardrobe cornerstone built to last decades.",
    material: "Calf leather with elastic gusset",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["Black", "Charcoal"],
    image_paths: ["https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80"],
    category_id: "cat-1",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-s6",
    name: "Sahara Desert Boot",
    price: 132000,
    description:
      "Born from the spirit of exploration, the Sahara Desert Boot is crafted from brushed suede with a signature crepe sole. Relaxed, refined, and endlessly versatile.",
    material: "Crepe-soled suede",
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["Sand", "Tan", "Khaki"],
    image_paths: ["https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80"],
    category_id: "cat-1",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-s7",
    name: "Monogram Slip-On",
    price: 155000,
    description:
      "The Monogram Slip-On fuses the ease of a loafer with the gravitas of a dress shoe. Its embossed pattern is subtle but unmistakable to those who know luxury.",
    material: "Embossed monogram leather",
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: ["Brown", "Black"],
    image_paths: ["https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&q=80"],
    category_id: "cat-1",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-s8",
    name: "Carbon Sport Runner",
    price: 175000,
    description:
      "Performance and prestige collide in the Carbon Sport Runner. Engineered for velocity with a carbon fibre plate underfoot and a sculptural knit upper that moulds to your foot.",
    material: "Tech mesh with carbon fibre plate",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: ["Black", "Grey", "Red"],
    image_paths: ["https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80"],
    category_id: "cat-1",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-s9",
    name: "Riviera Espadrille",
    price: 98000,
    description:
      "A summertime staple elevated to luxury status. The Riviera Espadrille channels Mediterranean ease with its hand-stitched jute sole and crisp canvas upper.",
    material: "Jute rope sole & canvas upper",
    sizes: ["39", "40", "41", "42", "43"],
    colors: ["Tan", "White", "Navy"],
    image_paths: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"],
    category_id: "cat-1",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-w1",
    name: "Obsidian Chronograph",
    price: 850000,
    description:
      "Precision engineered and dark as midnight. The Obsidian Chronograph features a triple-register dial with a ceramic bezel — a statement piece that commands the wrist.",
    material: "Sapphire crystal & brushed stainless steel",
    sizes: ["One Size"],
    colors: ["Black", "Silver"],
    image_paths: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"],
    category_id: "cat-2",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-w2",
    name: "Aurum Dress Watch",
    price: 1200000,
    description:
      "The Aurum is where horology becomes art. Its sunray-brushed guilloché dial catches light at every angle, while the hand-stitched alligator strap speaks to old-world craftsmanship.",
    material: "18k gold-plated case & alligator strap",
    sizes: ["One Size"],
    colors: ["Gold", "Rose Gold"],
    image_paths: ["https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80"],
    category_id: "cat-2",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-w3",
    name: "Titanium Sport Watch",
    price: 620000,
    description:
      "Forged from aerospace-grade titanium, this sport watch weighs almost nothing yet withstands everything. Water-resistant to 300m with a helium escape valve for the true adventurer.",
    material: "Grade 5 titanium with rubber strap",
    sizes: ["One Size"],
    colors: ["Gunmetal", "Blue"],
    image_paths: ["https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80"],
    category_id: "cat-2",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-w4",
    name: "Heritage Skeleton",
    price: 980000,
    description:
      "See time being made. The Heritage Skeleton exposes its intricate mechanical movement through an open-worked dial — a mesmerising display of horological mastery.",
    material: "Skeletonised movement, exhibition caseback",
    sizes: ["One Size"],
    colors: ["Silver", "Black"],
    image_paths: ["https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&q=80"],
    category_id: "cat-2",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-w4b",
    name: "Monaco Square Face",
    price: 1450000,
    description:
      "Iconic in its geometry, the Monaco Square Face broke convention when it first appeared and continues to do so. Its bold square case is a symbol of horological rebellion refined over decades.",
    material: "Brushed steel case & hand-stitched leather strap",
    sizes: ["One Size"],
    colors: ["Blue", "Black", "Silver"],
    image_paths: ["https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=80"],
    category_id: "cat-2",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-w5",
    name: "Ivory Moonphase",
    price: 1750000,
    description:
      "Poetic and celestial. The Ivory Moonphase tracks the lunar cycle with a hand-painted enamel disc beneath a domed crystal. A true collector's complication.",
    material: "Nacre dial, rose gold case, ostrich leather strap",
    sizes: ["One Size"],
    colors: ["White", "Champagne", "Rose Gold"],
    image_paths: ["https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80"],
    category_id: "cat-2",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-w6",
    name: "Stealth GMT",
    price: 780000,
    description:
      "For the man who moves between time zones without announcement. The Stealth GMT tracks two time zones simultaneously in a blacked-out case that disappears into the dark.",
    material: "DLC-coated steel with rubber strap",
    sizes: ["One Size"],
    colors: ["All Black"],
    image_paths: ["https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=800&q=80"],
    category_id: "cat-2",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-w7",
    name: "Vintage Pilot",
    price: 540000,
    description:
      "Inspired by the cockpit instruments of the 1940s, the Vintage Pilot wears history on its wrist. Anti-reflective sapphire crystal and luminous hands ensure legibility in all conditions.",
    material: "Brass case with aged leather strap",
    sizes: ["One Size"],
    colors: ["Brown", "Black"],
    image_paths: ["https://images.unsplash.com/photo-1548171915-f50a7db13fd5?w=800&q=80"],
    category_id: "cat-2",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-w8",
    name: "Aqua Diver Pro",
    price: 690000,
    description:
      "From the boardroom to the ocean floor. The Aqua Diver Pro is rated to 500m depth with a unidirectional ceramic bezel and super-luminova indices that blaze in darkness.",
    material: "Ceramic bezel & vulcanised rubber strap",
    sizes: ["One Size"],
    colors: ["Blue", "Green", "Black"],
    image_paths: ["https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=800&q=80"],
    category_id: "cat-2",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-g1",
    name: "Onyx Aviator Frames",
    price: 85000,
    description:
      "The Onyx Aviator sits at the intersection of military heritage and modern luxury. Lightweight titanium arms and gradient polarised lenses make this the definitive pilot frame.",
    material: "Titanium frame with polarised glass lens",
    sizes: ["One Size"],
    colors: ["Black", "Gold", "Silver"],
    image_paths: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"],
    category_id: "cat-3",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-g2",
    name: "Crystal Cat-Eye",
    price: 72000,
    description:
      "Commanding and feminine in equal measure. The Crystal Cat-Eye is cut from thick Italian acetate with an upswept silhouette that frames the face with unapologetic confidence.",
    material: "Hand-polished acetate",
    sizes: ["One Size"],
    colors: ["Tortoise", "Black", "Crystal Clear"],
    image_paths: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80"],
    category_id: "cat-3",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-g3",
    name: "Matte Shield Sport",
    price: 68000,
    description:
      "Wraparound protection meets premium aesthetics. The Matte Shield is engineered for movement — ultra-lightweight TR90 frame with anti-fog, UV400-rated lenses.",
    material: "TR90 polymer with rubber nose bridge",
    sizes: ["One Size"],
    colors: ["Black", "Red", "Blue"],
    image_paths: ["https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=80"],
    category_id: "cat-3",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-g4",
    name: "Gold Round Lennon",
    price: 95000,
    description:
      "Slim, circular, and timeless. The Gold Round Lennon carries the spirit of intellectual cool through a paper-thin metal frame and tinted glass lens.",
    material: "Thin spun metal frame, anti-reflective glass lens",
    sizes: ["One Size"],
    colors: ["Gold", "Silver", "Rose Gold"],
    image_paths: ["https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80"],
    category_id: "cat-3",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-g5",
    name: "Smoked Browline",
    price: 78000,
    description:
      "A mid-century silhouette brought into the present. The Smoked Browline pairs a bold acetate brow with delicate metal lower rims — character without noise.",
    material: "Acetate crown & metal lower rims",
    sizes: ["One Size"],
    colors: ["Tortoise", "Black", "Havana"],
    image_paths: ["https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&q=80"],
    category_id: "cat-3",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-g6",
    name: "Rimless Titanium",
    price: 125000,
    description:
      "Barely-there luxury. The Rimless Titanium is as light as air with drill-mounted lenses and ultra-fine titanium temples — eyewear that lets your face do the talking.",
    material: "Pure titanium temples, drill-mounted lenses",
    sizes: ["One Size"],
    colors: ["Silver", "Gold"],
    image_paths: ["https://images.unsplash.com/photo-1607749111659-e1406b1c2640?w=800&q=80"],
    category_id: "cat-3",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-g7",
    name: "Retro Oversized Square",
    price: 65000,
    description:
      "Bold, oversized, unapologetic. The Retro Square frame makes a statement that requires no words — just a thick acetate architecture that frames your personality front and centre.",
    material: "Thick acetate",
    sizes: ["One Size"],
    colors: ["Black", "Brown", "Cream"],
    image_paths: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80"],
    category_id: "cat-3",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-g8",
    name: "Navigator Wrap",
    price: 88000,
    description:
      "Built to move with you. The Navigator Wrap offers full-coverage protection in a sporty frame that stays locked during every pursuit — from the track to the terrace.",
    material: "Injection-moulded nylon with rubber grippers",
    sizes: ["One Size"],
    colors: ["Black", "Gunmetal", "Bronze"],
    image_paths: ["https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=80"],
    category_id: "cat-3",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-g9",
    name: "Club Master Deluxe",
    price: 92000,
    description:
      "The Club Master Deluxe is the apex of preppy luxury — a browline silhouette that has graced the faces of icons for seven decades, now with a gold-tipped finish.",
    material: "Acetate upper & metal lower frame",
    sizes: ["One Size"],
    colors: ["Black/Gold", "Tortoise/Gold", "Navy/Gold"],
    image_paths: ["https://images.unsplash.com/photo-1620471697019-13513a3e4509?w=800&q=80"],
    category_id: "cat-3",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-j1",
    name: "Caspian Leather Jacket",
    price: 380000,
    description:
      "The Caspian is the leather jacket perfected. Cut from butter-soft full-grain lambskin with a silk bemberg lining — it drapes, it moves, it ages magnificently.",
    material: "Full-grain lambskin with silk lining",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Dark Brown"],
    image_paths: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80"],
    category_id: "cat-4",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-j2",
    name: "Riviera Moto Jacket",
    price: 295000,
    description:
      "Speed and style in one silhouette. The Riviera Moto Jacket draws from racing heritage with asymmetric zips and perforated panels that breathe as fast as you move.",
    material: "Perforated leather with quilted panels",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Burgundy", "Midnight Blue"],
    image_paths: ["https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80"],
    category_id: "cat-4",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-j3",
    name: "Velvet Midnight Blazer",
    price: 265000,
    description:
      "Velvet speaks in a language all its own. The Midnight Blazer has been tailored from Italian crushed velvet with peak satin lapels — reserved for evenings worth dressing for.",
    material: "Italian crushed velvet with satin lapels",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Midnight Blue", "Black", "Emerald"],
    image_paths: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"],
    category_id: "cat-4",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-j4",
    name: "Herringbone Overcoat",
    price: 420000,
    description:
      "The Herringbone Overcoat is a study in restrained elegance. Cut long with structured shoulders and a fly-front closure — a coat that transforms any outfit underneath it.",
    material: "Wool-cashmere herringbone blend",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Camel", "Slate"],
    image_paths: ["https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80"],
    category_id: "cat-4",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-j5",
    name: "Silk Varsity Bomber",
    price: 310000,
    description:
      "Heritage sport meets high fashion. The Silk Varsity Bomber reworks a collegiate classic in pure silk — lightweight, lustrous, and completely unexpected.",
    material: "Pure silk shell with contrast ribbed trim",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Champagne"],
    image_paths: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"],
    category_id: "cat-4",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-j6",
    name: "Double Breasted Coat",
    price: 485000,
    description:
      "The pinnacle of outerwear. This double breasted coat is built from pure cashmere on a fully canvassed chest — a garment that becomes more personal and more beautiful with every season.",
    material: "Pure cashmere, fully canvassed",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Charcoal", "Black"],
    image_paths: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80"],
    category_id: "cat-4",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-j7",
    name: "Nappa Biker",
    price: 355000,
    description:
      "Raw attitude in the softest leather imaginable. The Nappa Biker is finished with matte black hardware and a cropped hem that hits exactly where it should.",
    material: "Nappa leather with matte hardware",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Olive", "Oxblood"],
    image_paths: ["https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&q=80"],
    category_id: "cat-4",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-j8",
    name: "Quilted Puffer Luxe",
    price: 245000,
    description:
      "Warmth without bulk. The Quilted Puffer Luxe is filled with ethically sourced 90/10 down and finished in a high-sheen nylon shell — the most considered cold-weather piece in your wardrobe.",
    material: "90/10 down fill, nylon shell",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Forest Green"],
    image_paths: ["https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&q=80"],
    category_id: "cat-4",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-j9",
    name: "Military Field Coat",
    price: 315000,
    description:
      "Utility made luxurious. The Military Field Coat is cut from British waxed cotton with storm cuffs, bellows pockets, and a removable fleece collar — dressed-up utility for the modern world.",
    material: "Waxed cotton with fleece collar",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Khaki", "Olive", "Black"],
    image_paths: ["https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=800&q=80"],
    category_id: "cat-4",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-a1",
    name: "Gold Chain Bracelet",
    price: 145000,
    description:
      "Bold enough to notice, refined enough for every occasion. The Gold Chain Bracelet is composed of hand-linked solid brass with an 18k gold finish that doesn't fade.",
    material: "18k gold-plated brass with lobster clasp",
    sizes: ["One Size"],
    colors: ["Gold", "Rose Gold", "Silver"],
    image_paths: ["https://images.unsplash.com/photo-1573408301185-9519bf4a914b?w=800&q=80"],
    category_id: "cat-5",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-a2",
    name: "Silk Pocket Square",
    price: 35000,
    description:
      "The finishing touch that separates a suit from a statement. This pocket square is hand-rolled from the finest mulberry silk — fold it, bunch it, let it live its own life.",
    material: "100% mulberry silk, hand-rolled edges",
    sizes: ["One Size"],
    colors: ["Navy", "Burgundy", "Ivory", "Emerald"],
    image_paths: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"],
    category_id: "cat-5",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-a3",
    name: "Crocodile Card Holder",
    price: 92000,
    description:
      "Every card you pull is a quiet display of taste. The Crocodile Card Holder is slim, structured, and crafted from hand-embossed calfskin that develops a rich patina over time.",
    material: "Embossed crocodile-print calfskin leather",
    sizes: ["One Size"],
    colors: ["Black", "Cognac", "Dark Brown"],
    image_paths: ["https://images.unsplash.com/photo-1627123424574-724758594913?w=800&q=80"],
    category_id: "cat-5",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-a4",
    name: "Monogram Leather Belt",
    price: 78000,
    description:
      "The belt that holds everything together — literally and figuratively. Full-grain leather that stiffens and softens perfectly over years, with a weight solid brass buckle.",
    material: "Full-grain leather with solid brass buckle",
    sizes: ["32", "34", "36", "38", "40"],
    colors: ["Black", "Brown", "Tan"],
    image_paths: ["https://images.unsplash.com/photo-1624222247344-550fb60fe8ff?w=800&q=80"],
    category_id: "cat-5",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-a5",
    name: "Cashmere Travel Scarf",
    price: 125000,
    description:
      "Lightweight enough to fold into a jacket pocket, warm enough to replace a blanket at 30,000 feet. The Cashmere Travel Scarf is woven from grade-A Mongolian cashmere.",
    material: "100% grade-A cashmere",
    sizes: ["One Size"],
    colors: ["Camel", "Grey", "Black", "Navy"],
    image_paths: ["https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80"],
    category_id: "cat-5",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-a6",
    name: "Sterling Silver Cufflinks",
    price: 110000,
    description:
      "Small in size, enormous in impact. These sterling silver cufflinks feature a hand-applied enamel inlay and a T-bar closure machined to tolerance of 0.1mm.",
    material: "925 sterling silver with enamel inlay",
    sizes: ["One Size"],
    colors: ["Silver", "Gold", "Black"],
    image_paths: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"],
    category_id: "cat-5",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-a7",
    name: "Full-Grain Duffle Bag",
    price: 285000,
    description:
      "A weekend bag that outlasts trends and decades. The Full-Grain Duffle is hand-stitched with waxed thread and fitted with solid brass hardware that only gets better as it tarnishes.",
    material: "Full-grain leather with brass fittings",
    sizes: ["One Size"],
    colors: ["Black", "Tan", "Dark Brown"],
    image_paths: ["https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80"],
    category_id: "cat-5",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-a8",
    name: "Titanium Money Clip",
    price: 55000,
    description:
      "Minimalist carry done to perfection. The Titanium Money Clip weighs less than a coin and holds a full complement of cards and notes with a tension spring engineered to last a lifetime.",
    material: "Grade 5 titanium, mirror-polished",
    sizes: ["One Size"],
    colors: ["Silver", "Black", "Gold"],
    image_paths: ["https://images.unsplash.com/photo-1554244933-d876deb6b2ff?w=800&q=80"],
    category_id: "cat-5",
    created_at: "",
    updated_at: "",
  },
  {
    id: "p-a9",
    name: "Suede & Cashmere Gloves",
    price: 88000,
    description:
      "Cold weather has never felt this indulgent. The Suede and Cashmere Gloves are cut from buttery suede and lined throughout with a dense cashmere fleece that wraps every finger in warmth.",
    material: "Suede exterior, cashmere fleece lining",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown", "Cognac"],
    image_paths: ["https://images.unsplash.com/photo-1545622783-b3e021430fee?w=800&q=80"],
    category_id: "cat-5",
    created_at: "",
    updated_at: "",
  },
];

export async function fetchProducts() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(name, slug)")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return FALLBACK_PRODUCTS;
    }

    return data;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export async function fetchCategories() {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error || !data || data.length === 0) {
      return FALLBACK_CATEGORIES;
    }

    return data;
  } catch {
    return FALLBACK_CATEGORIES;
  }
}

export async function createProduct(product: ProductInsert) {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id: string, product: ProductUpdate) {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadProductImage(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file);
  if (error) throw error;

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function deleteProductImage(url: string) {
  const path = url.split("/product-images/")[1];
  if (path) {
    await supabase.storage.from("product-images").remove([path]);
  }
}

export async function createCategory(name: string, slug: string) {
  const { data, error } = await supabase
    .from("categories")
    .insert({ name, slug })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}
