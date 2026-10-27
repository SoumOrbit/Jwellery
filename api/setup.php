<?php
// Lumière Haute Joaillerie - Automatic Database Setup & Seeder Script
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$host = 'localhost';
$user = 'root';
$pass = '';

try {
    // 1. Connect without selecting database
    $pdo = new PDO("mysql:host={$host};charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    // 2. Read and execute schema.sql
    $sqlFile = __DIR__ . '/../database/schema.sql';
    if (!file_exists($sqlFile)) {
        throw new Exception("schema.sql file not found at " . $sqlFile);
    }

    $sql = file_get_contents($sqlFile);
    $pdo->exec($sql);

    // 3. Connect to the newly created database
    $pdo->exec("USE `lumiere_jewelry`");

    // 4. Check if products table is seeded; if not, seed all 12 initial products
    $stmt = $pdo->query("SELECT COUNT(*) FROM `products`");
    $count = $stmt->fetchColumn();

    if ($count == 0) {
        $initialProducts = [
            [
                'id' => 'lum-01',
                'name' => 'The Celestial Solitaire Ring',
                'category' => 'rings',
                'category_name' => 'Rings',
                'price' => 2850.00,
                'original_price' => 3200.00,
                'rating' => 4.9,
                'reviews_count' => 48,
                'badge' => 'Bestseller',
                'is_new' => 0,
                'is_featured' => 1,
                'metals_json' => json_encode(['18K Yellow Gold', 'Platinum', '18K Rose Gold']),
                'default_metal' => '18K Yellow Gold',
                'images_json' => json_encode([
                    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85'
                ]),
                'short_desc' => 'A mesmerizing 1.75ct brilliant-cut laboratory-grown diamond perched on a tapered 18K solid gold band.',
                'description' => 'Masterfully crafted in our Paris atelier, The Celestial Solitaire captures light with incomparable brilliance. Featuring an exquisite 1.75 carat round brilliant diamond held gracefully by four micro-claw prongs on a knife-edge comfort-fit shank.',
                'specs_json' => json_encode([
                    'carat' => '1.75 ct',
                    'clarity' => 'VVS1 (Very Very Slightly Included)',
                    'color' => 'D (Colorless)',
                    'cut' => 'Super Ideal Triple Excellent',
                    'certification' => 'GIA & IGI Certified'
                ]),
                'sizes_json' => json_encode(['US 5', 'US 6', 'US 7', 'US 8', 'US 9']),
                'in_stock' => 1
            ],
            [
                'id' => 'lum-02',
                'name' => 'Aura Étoile Diamond Pendant',
                'category' => 'necklaces',
                'category_name' => 'Necklaces',
                'price' => 1950.00,
                'original_price' => 2200.00,
                'rating' => 5.0,
                'reviews_count' => 36,
                'badge' => 'New Arrival',
                'is_new' => 1,
                'is_featured' => 1,
                'metals_json' => json_encode(['18K Yellow Gold', 'Platinum', '18K White Gold']),
                'default_metal' => '18K Yellow Gold',
                'images_json' => json_encode([
                    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85'
                ]),
                'short_desc' => 'A delicate halo of round diamonds encasing a luminous center gem on an adjustable Italian cable chain.',
                'description' => 'The Aura Étoile Pendant radiates celestial majesty. Hand-set micro-pavé diamonds surround an iridescent center diamond, suspended along an authentic 18-inch 18K gold chain with jump rings at 16" and 18".',
                'specs_json' => json_encode([
                    'carat' => '1.20 ct Total Weight',
                    'clarity' => 'VS1',
                    'color' => 'E',
                    'cut' => 'Brilliant Cut',
                    'certification' => 'GIA Certified'
                ]),
                'sizes_json' => json_encode(['16 Inch', '18 Inch', '20 Inch']),
                'in_stock' => 1
            ],
            [
                'id' => 'lum-03',
                'name' => 'Seraphina Chandelier Drop Earrings',
                'category' => 'earrings',
                'category_name' => 'Earrings',
                'price' => 3400.00,
                'original_price' => 3800.00,
                'rating' => 4.8,
                'reviews_count' => 29,
                'badge' => 'Signature Piece',
                'is_new' => 0,
                'is_featured' => 1,
                'metals_json' => json_encode(['18K Rose Gold', '18K Yellow Gold', 'Platinum']),
                'default_metal' => '18K Rose Gold',
                'images_json' => json_encode([
                    'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85'
                ]),
                'short_desc' => 'Cascading pear and marquise cut diamonds creating fluid movement and unmistakable glamour.',
                'description' => 'Artfully articulated to catch room light from every angle, the Seraphina Drop Earrings feature tiered pear-cut diamonds set in delicate bezel and prongs, providing weightless elegance for gala evenings and bridal celebrations.',
                'specs_json' => json_encode([
                    'carat' => '2.50 ct Combined',
                    'clarity' => 'VVS2',
                    'color' => 'F',
                    'cut' => 'Pear & Marquise',
                    'certification' => 'IGI Certified'
                ]),
                'sizes_json' => json_encode(['Standard Pair']),
                'in_stock' => 1
            ],
            [
                'id' => 'lum-04',
                'name' => 'Luxe Rivière Diamond Tennis Bracelet',
                'category' => 'bracelets',
                'category_name' => 'Bracelets',
                'price' => 4900.00,
                'original_price' => 5500.00,
                'rating' => 5.0,
                'reviews_count' => 52,
                'badge' => 'Iconic',
                'is_new' => 0,
                'is_featured' => 1,
                'metals_json' => json_encode(['Platinum', '18K White Gold', '18K Yellow Gold']),
                'default_metal' => 'Platinum',
                'images_json' => json_encode([
                    'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1000&q=85'
                ]),
                'short_desc' => 'A seamless continuous line of 55 calibrated round brilliant diamonds secured with double safety clasp.',
                'description' => 'An enduring staple of high jewelry. The Luxe Rivière tennis bracelet is engineered with four-prong settings designed to maximize brilliance and lay completely flat against the wrist.',
                'specs_json' => json_encode([
                    'carat' => '4.00 ct Total Weight',
                    'clarity' => 'VVS1 - VS1',
                    'color' => 'E - F',
                    'cut' => 'Ideal Round',
                    'certification' => 'GIA Verified'
                ]),
                'sizes_json' => json_encode(['6.5 Inch', '7.0 Inch', '7.5 Inch']),
                'in_stock' => 1
            ],
            [
                'id' => 'lum-05',
                'name' => 'Verdant Empress Emerald & Diamond Ring',
                'category' => 'rings',
                'category_name' => 'Rings',
                'price' => 4100.00,
                'original_price' => 4600.00,
                'rating' => 4.9,
                'reviews_count' => 22,
                'badge' => 'Limited Edition',
                'is_new' => 1,
                'is_featured' => 1,
                'metals_json' => json_encode(['18K Yellow Gold', 'Platinum']),
                'default_metal' => '18K Yellow Gold',
                'images_json' => json_encode([
                    'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85'
                ]),
                'short_desc' => 'A deep Colombian vivid green emerald flanked by tapered baguette diamond shoulders.',
                'description' => 'The Verdant Empress celebrates the hypnotic depth of fine emeralds. Mined sustainably with ethical verification, each stone is hand-selected for its lush tone and garden inclusions.',
                'specs_json' => json_encode([
                    'carat' => '2.10 ct Center Emerald, 0.40ct Diamonds',
                    'clarity' => 'Minor Clarity Enhancement (Standard)',
                    'color' => 'Vivid Forest Green',
                    'cut' => 'Octagonal Emerald Cut',
                    'certification' => 'Gübelin Gem Lab'
                ]),
                'sizes_json' => json_encode(['US 5', 'US 6', 'US 7', 'US 8']),
                'in_stock' => 1
            ],
            [
                'id' => 'lum-06',
                'name' => 'Imperial South Sea Pearl Collar',
                'category' => 'necklaces',
                'category_name' => 'Necklaces',
                'price' => 3650.00,
                'original_price' => 4100.00,
                'rating' => 4.7,
                'reviews_count' => 18,
                'badge' => 'Heritage',
                'is_new' => 0,
                'is_featured' => 0,
                'metals_json' => json_encode(['18K Yellow Gold', '18K White Gold']),
                'default_metal' => '18K Yellow Gold',
                'images_json' => json_encode([
                    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1000&q=85'
                ]),
                'short_desc' => 'A single 13mm Australian golden South Sea pearl held by an architectural pavé diamond bail.',
                'description' => 'Organic luxury in its purest distillation. Selected for mirror-like luster and rich warm undertones, complemented by 0.35ct micro-set diamonds.',
                'specs_json' => json_encode([
                    'carat' => '13mm Pearl / 0.35ct Diamonds',
                    'clarity' => 'Pristine Flawless Luster',
                    'color' => 'Warm Golden Champagne',
                    'cut' => 'Near-Perfect Round',
                    'certification' => 'Pearl Sourcing Certificate'
                ]),
                'sizes_json' => json_encode(['16 Inch', '18 Inch']),
                'in_stock' => 1
            ],
            [
                'id' => 'lum-07',
                'name' => 'Pavé Constellation Huggie Hoops',
                'category' => 'earrings',
                'category_name' => 'Earrings',
                'price' => 1250.00,
                'original_price' => 1400.00,
                'rating' => 4.9,
                'reviews_count' => 64,
                'badge' => 'Everyday Luxury',
                'is_new' => 0,
                'is_featured' => 1,
                'metals_json' => json_encode(['18K Yellow Gold', '18K Rose Gold', '18K White Gold']),
                'default_metal' => '18K Yellow Gold',
                'images_json' => json_encode([
                    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=1000&q=85'
                ]),
                'short_desc' => 'Effortless huggie hoops encrusted with three micro-pavé rows of round diamonds inside and out.',
                'description' => 'Designed for daily decadence. Our signature hinged closure clicks shut with reassuring precision, providing total comfort for 24/7 wear.',
                'specs_json' => json_encode([
                    'carat' => '0.85 ct Total Weight',
                    'clarity' => 'VS2',
                    'color' => 'F - G',
                    'cut' => 'Round Brilliant',
                    'certification' => 'In-house Atelier Appraisal'
                ]),
                'sizes_json' => json_encode(['12mm Diameter']),
                'in_stock' => 1
            ],
            [
                'id' => 'lum-08',
                'name' => 'Helios Sculpted Heavy Gold Cuff',
                'category' => 'bracelets',
                'category_name' => 'Bracelets',
                'price' => 3200.00,
                'original_price' => 3500.00,
                'rating' => 4.8,
                'reviews_count' => 31,
                'badge' => 'Atelier Edition',
                'is_new' => 1,
                'is_featured' => 1,
                'metals_json' => json_encode(['18K Yellow Gold', '18K Rose Gold']),
                'default_metal' => '18K Yellow Gold',
                'images_json' => json_encode([
                    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1000&q=85'
                ]),
                'short_desc' => 'Substantial solid 18K gold bangle with satin brushed exterior and high-polish beveled interior.',
                'description' => 'Hand-forged by our master goldsmiths in Florence, the Helios cuff features 32 grams of solid gold with subtle fluted ridges inspired by classical Greco-Roman architecture.',
                'specs_json' => json_encode([
                    'carat' => 'Solid 18K Gold (32 Grams)',
                    'clarity' => 'Pure Solid Metal',
                    'color' => 'Warm 750 Yellow Gold',
                    'cut' => 'Hand Chiseled & Buffed',
                    'certification' => 'Hallmarked in London Assay Office'
                ]),
                'sizes_json' => json_encode(['Small (6.0")', 'Medium (6.5")', 'Large (7.0")']),
                'in_stock' => 1
            ],
            [
                'id' => 'lum-09',
                'name' => 'Midnight Sapphire Halo Band',
                'category' => 'rings',
                'category_name' => 'Rings',
                'price' => 2750.00,
                'original_price' => 3100.00,
                'rating' => 4.9,
                'reviews_count' => 19,
                'badge' => 'Bestseller',
                'is_new' => 0,
                'is_featured' => 0,
                'metals_json' => json_encode(['Platinum', '18K White Gold', '18K Yellow Gold']),
                'default_metal' => 'Platinum',
                'images_json' => json_encode([
                    'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1000&q=85'
                ]),
                'short_desc' => 'Velvety royal blue Ceylon sapphire hugged by 16 French-set diamond halo stones.',
                'description' => 'A tribute to regal romance. The deep cornflower blue sapphire is unheated and ethically sourced from Sri Lanka, catching royal reflections in sunlight.',
                'specs_json' => json_encode([
                    'carat' => '1.80 ct Sapphire / 0.50 ct Diamonds',
                    'clarity' => 'Eye-Clean Royal Blue',
                    'color' => 'Vivid Ceylon Blue',
                    'cut' => 'Cushion Modified Brilliant',
                    'certification' => 'SSEF Swiss Certified'
                ]),
                'sizes_json' => json_encode(['US 5', 'US 6', 'US 7', 'US 8', 'US 9']),
                'in_stock' => 1
            ],
            [
                'id' => 'lum-10',
                'name' => 'L’Amour Rose Gold Diamond Lariat',
                'category' => 'necklaces',
                'category_name' => 'Necklaces',
                'price' => 2400.00,
                'original_price' => 2700.00,
                'rating' => 5.0,
                'reviews_count' => 27,
                'badge' => 'Romantic',
                'is_new' => 1,
                'is_featured' => 1,
                'metals_json' => json_encode(['18K Rose Gold', '18K Yellow Gold', 'Platinum']),
                'default_metal' => '18K Rose Gold',
                'images_json' => json_encode([
                    'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1000&q=85'
                ]),
                'short_desc' => 'A plunging Y-necklace with sliding pavé diamond medallion and pear-cut terminus.',
                'description' => 'Sensual and dramatic, the L’Amour lariat drops gracefully down the decolletage. Its adjustable silicon-grip bead allows seamless transformation from choker to deep plunge.',
                'specs_json' => json_encode([
                    'carat' => '0.95 ct Diamond Weight',
                    'clarity' => 'VVS2',
                    'color' => 'F',
                    'cut' => 'Brilliant & Pear',
                    'certification' => 'GIA Certified'
                ]),
                'sizes_json' => json_encode(['Adjustable up to 24 Inch']),
                'in_stock' => 1
            ],
            [
                'id' => 'lum-11',
                'name' => 'Soliel Marquise Diamond Studs',
                'category' => 'earrings',
                'category_name' => 'Earrings',
                'price' => 1800.00,
                'original_price' => 2050.00,
                'rating' => 4.8,
                'reviews_count' => 38,
                'badge' => 'Popular',
                'is_new' => 0,
                'is_featured' => 0,
                'metals_json' => json_encode(['18K Yellow Gold', 'Platinum', '18K Rose Gold']),
                'default_metal' => '18K Yellow Gold',
                'images_json' => json_encode([
                    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=85'
                ]),
                'short_desc' => 'Elongated marquise cut diamonds set north-south in protective v-end prongs.',
                'description' => 'An elegant departure from round studs. The elongated marquise cut creates the optical illusion of greater carat size while lending a modern edge to casual and formal attire.',
                'specs_json' => json_encode([
                    'carat' => '1.10 ct Pair (0.55 ct each)',
                    'clarity' => 'VS1',
                    'color' => 'D',
                    'cut' => 'Marquise Brilliant',
                    'certification' => 'IGI Verified'
                ]),
                'sizes_json' => json_encode(['Standard Pierced Post']),
                'in_stock' => 1
            ],
            [
                'id' => 'lum-12',
                'name' => 'Infinity Pavé Diamond Eternity Band',
                'category' => 'rings',
                'category_name' => 'Rings',
                'price' => 2150.00,
                'original_price' => 2400.00,
                'rating' => 4.9,
                'reviews_count' => 57,
                'badge' => 'Wedding & Bridal',
                'is_new' => 0,
                'is_featured' => 1,
                'metals_json' => json_encode(['Platinum', '18K Yellow Gold', '18K Rose Gold']),
                'default_metal' => 'Platinum',
                'images_json' => json_encode([
                    'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1000&q=85',
                    'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=85'
                ]),
                'short_desc' => 'A complete 360-degree circle of matched micro-pavé diamonds symbolizing eternal devotion.',
                'description' => 'Cast in 950 pure platinum, this eternity band stacks seamlessly alongside our engagement solitaires or shines magnificently as a standalone statement.',
                'specs_json' => json_encode([
                    'carat' => '1.40 ct Total Weight',
                    'clarity' => 'VVS1',
                    'color' => 'E',
                    'cut' => 'Round Hearts & Arrows',
                    'certification' => 'Atelier Certificate of Authenticity'
                ]),
                'sizes_json' => json_encode(['US 5', 'US 6', 'US 7', 'US 8']),
                'in_stock' => 1
            ]
        ];

        $insertSql = "INSERT INTO `products` 
            (`id`, `name`, `category`, `category_name`, `price`, `original_price`, `rating`, `reviews_count`, `badge`, `is_new`, `is_featured`, `metals_json`, `default_metal`, `images_json`, `short_desc`, `description`, `specs_json`, `sizes_json`, `in_stock`)
            VALUES 
            (:id, :name, :category, :category_name, :price, :original_price, :rating, :reviews_count, :badge, :is_new, :is_featured, :metals_json, :default_metal, :images_json, :short_desc, :description, :specs_json, :sizes_json, :in_stock)";

        $insertStmt = $pdo->prepare($insertSql);
        foreach ($initialProducts as $p) {
            $insertStmt->execute($p);
        }
    }

    echo json_encode([
        'success' => true,
        'message' => 'Lumière MySQL Database (`lumiere_jewelry`) initialized and populated successfully!',
        'tables' => ['admins', 'products', 'orders', 'appointments'],
        'defaultAdmin' => [
            'email' => 'admin@lumiere.com',
            'password' => 'admin123'
        ]
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database setup failed: ' . $e->getMessage()
    ]);
}
