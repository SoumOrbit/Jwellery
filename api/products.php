<?php
require_once __DIR__ . '/db.php';

$pdo = getDB();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Resequence all product IDs in MySQL so they are strictly consecutive: lum-01, lum-02, lum-03...
function resequenceProductIds($pdo) {
    try {
        $stmt = $pdo->query("SELECT id FROM `products` ORDER BY CAST(SUBSTRING(id, 5) AS UNSIGNED) ASC, `created_at` ASC");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (empty($rows)) return;

        // Phase 1: Set temporary IDs to avoid duplicate key conflicts
        foreach ($rows as $i => $row) {
            $tempId = 'tmp_' . uniqid() . '_' . $i;
            $pdo->prepare("UPDATE `products` SET `id` = :temp WHERE `id` = :old")
                ->execute([':temp' => $tempId, ':old' => $row['id']]);
            $rows[$i]['temp_id'] = $tempId;
        }

        // Phase 2: Set consecutive IDs
        $updateStmt = $pdo->prepare("UPDATE `products` SET `id` = :new_id WHERE `id` = :temp_id");
        foreach ($rows as $index => $row) {
            $seq = str_pad($index + 1, 2, '0', STR_PAD_LEFT);
            $newId = 'lum-' . $seq;
            $updateStmt->execute([':new_id' => $newId, ':temp_id' => $row['temp_id']]);
        }
    } catch (Exception $e) {
        error_log("Resequence error: " . $e->getMessage());
    }
}

// Helper to format product row from DB to React model
function formatProduct($row, $index = null) {
    return [
        'id' => $row['id'],
        'serialNo' => ($index !== null) ? ($index + 1) : (int)substr($row['id'], 4),
        'name' => $row['name'],
        'category' => $row['category'],
        'categoryName' => $row['category_name'],
        'price' => (float)$row['price'],
        'originalPrice' => $row['original_price'] ? (float)$row['original_price'] : null,
        'rating' => (float)$row['rating'],
        'reviewsCount' => (int)$row['reviews_count'],
        'badge' => $row['badge'],
        'isNew' => (bool)$row['is_new'],
        'isFeatured' => (bool)$row['is_featured'],
        'metals' => json_decode($row['metals_json'], true) ?: ['18K Yellow Gold'],
        'defaultMetal' => $row['default_metal'],
        'images' => json_decode($row['images_json'], true) ?: [],
        'shortDesc' => $row['short_desc'],
        'description' => $row['description'],
        'specs' => json_decode($row['specs_json'], true) ?: [],
        'sizes' => json_decode($row['sizes_json'], true) ?: ['Standard'],
        'inStock' => (bool)$row['in_stock'],
        'createdAt' => $row['created_at']
    ];
}

switch ($method) {
    case 'GET':
        if (isset($_GET['resequence'])) {
            resequenceProductIds($pdo);
        }

        // Check if single product requested
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare("SELECT * FROM `products` WHERE `id` = :id LIMIT 1");
            $stmt->execute([':id' => $_GET['id']]);
            $row = $stmt->fetch();
            if ($row) {
                echo json_encode(['success' => true, 'product' => formatProduct($row)]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Product not found']);
            }
        } else {
            $stmt = $pdo->query("SELECT * FROM `products` ORDER BY CAST(SUBSTRING(id, 5) AS UNSIGNED) ASC, `created_at` ASC");
            $rows = $stmt->fetchAll();
            $products = [];
            foreach ($rows as $idx => $r) {
                $products[] = formatProduct($r, $idx);
            }
            echo json_encode(['success' => true, 'products' => $products]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data['name']) || empty($data['price'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Name and price are required']);
            exit();
        }

        // Count existing to assign next consecutive ID
        $count = (int)$pdo->query("SELECT COUNT(*) FROM `products`")->fetchColumn();
        $id = !empty($data['id']) ? $data['id'] : 'lum-' . str_pad($count + 1, 2, '0', STR_PAD_LEFT);
        
        $name = $data['name'];
        $category = $data['category'] ?? 'rings';
        $categoryName = $data['categoryName'] ?? ucfirst($category);
        $price = (float)$data['price'];
        $originalPrice = !empty($data['originalPrice']) ? (float)$data['originalPrice'] : null;
        $rating = !empty($data['rating']) ? (float)$data['rating'] : 5.0;
        $reviewsCount = !empty($data['reviewsCount']) ? (int)$data['reviewsCount'] : 1;
        $badge = $data['badge'] ?? 'New Arrival';
        $isNew = !empty($data['isNew']) ? 1 : 0;
        $isFeatured = !empty($data['isFeatured']) ? 1 : 0;
        $metalsJson = json_encode($data['metals'] ?? ['18K Yellow Gold', 'Platinum']);
        $defaultMetal = $data['defaultMetal'] ?? '18K Yellow Gold';
        $imagesJson = json_encode($data['images'] ?? ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85']);
        $shortDesc = $data['shortDesc'] ?? '';
        $description = $data['description'] ?? '';
        $specsJson = json_encode($data['specs'] ?? [
            'carat' => '1.50 ct',
            'clarity' => 'VVS1',
            'color' => 'E',
            'cut' => 'Super Ideal',
            'certification' => 'GIA Certified'
        ]);
        $sizesJson = json_encode($data['sizes'] ?? ['US 5', 'US 6', 'US 7', 'US 8']);
        $inStock = isset($data['inStock']) ? ($data['inStock'] ? 1 : 0) : 1;

        $sql = "INSERT INTO `products` 
            (`id`, `name`, `category`, `category_name`, `price`, `original_price`, `rating`, `reviews_count`, `badge`, `is_new`, `is_featured`, `metals_json`, `default_metal`, `images_json`, `short_desc`, `description`, `specs_json`, `sizes_json`, `in_stock`)
            VALUES 
            (:id, :name, :category, :category_name, :price, :original_price, :rating, :reviews_count, :badge, :is_new, :is_featured, :metals_json, :default_metal, :images_json, :short_desc, :description, :specs_json, :sizes_json, :in_stock)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':id' => $id,
            ':name' => $name,
            ':category' => $category,
            ':category_name' => $categoryName,
            ':price' => $price,
            ':original_price' => $originalPrice,
            ':rating' => $rating,
            ':reviews_count' => $reviewsCount,
            ':badge' => $badge,
            ':is_new' => $isNew,
            ':is_featured' => $isFeatured,
            ':metals_json' => $metalsJson,
            ':default_metal' => $defaultMetal,
            ':images_json' => $imagesJson,
            ':short_desc' => $shortDesc,
            ':description' => $description,
            ':specs_json' => $specsJson,
            ':sizes_json' => $sizesJson,
            ':in_stock' => $inStock
        ]);

        // Resequence to ensure continuous 1, 2, 3... order
        resequenceProductIds($pdo);

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Product published to catalog and consecutive IDs preserved',
            'id' => $id
        ]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Product ID is required']);
            exit();
        }

        $updates = [];
        $params = [':id' => $data['id']];

        if (isset($data['name'])) {
            $updates[] = "`name` = :name";
            $params[':name'] = $data['name'];
        }
        if (isset($data['category'])) {
            $updates[] = "`category` = :category";
            $params[':category'] = $data['category'];
        }
        if (isset($data['categoryName'])) {
            $updates[] = "`category_name` = :category_name";
            $params[':category_name'] = $data['categoryName'];
        }
        if (isset($data['price'])) {
            $updates[] = "`price` = :price";
            $params[':price'] = (float)$data['price'];
        }
        if (isset($data['originalPrice'])) {
            $updates[] = "`original_price` = :original_price";
            $params[':original_price'] = !empty($data['originalPrice']) ? (float)$data['originalPrice'] : null;
        }
        if (isset($data['badge'])) {
            $updates[] = "`badge` = :badge";
            $params[':badge'] = $data['badge'];
        }
        if (isset($data['shortDesc'])) {
            $updates[] = "`short_desc` = :short_desc";
            $params[':short_desc'] = $data['shortDesc'];
        }
        if (isset($data['description'])) {
            $updates[] = "`description` = :description";
            $params[':description'] = $data['description'];
        }
        if (isset($data['images']) && is_array($data['images'])) {
            $updates[] = "`images_json` = :images_json";
            $params[':images_json'] = json_encode($data['images']);
        }
        if (isset($data['metals']) && is_array($data['metals'])) {
            $updates[] = "`metals_json` = :metals_json";
            $params[':metals_json'] = json_encode($data['metals']);
        }
        if (isset($data['specs'])) {
            $updates[] = "`specs_json` = :specs_json";
            $params[':specs_json'] = is_string($data['specs']) ? $data['specs'] : json_encode($data['specs']);
        }
        if (isset($data['inStock'])) {
            $updates[] = "`in_stock` = :in_stock";
            $params[':in_stock'] = $data['inStock'] ? 1 : 0;
        }

        if (empty($updates)) {
            echo json_encode(['success' => true, 'message' => 'No fields to update']);
            exit();
        }

        $sql = "UPDATE `products` SET " . implode(', ', $updates) . " WHERE `id` = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        echo json_encode(['success' => true, 'message' => 'Product updated successfully']);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            $data = json_decode(file_get_contents('php://input'), true);
            $id = $data['id'] ?? null;
        }

        if (!$id) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Product ID is required for deletion']);
            exit();
        }

        $stmt = $pdo->prepare("DELETE FROM `products` WHERE `id` = :id");
        $stmt->execute([':id' => $id]);

        // Automatically re-sequence all remaining products in MySQL consecutively: lum-01, lum-02, lum-03...
        resequenceProductIds($pdo);

        echo json_encode([
            'success' => true, 
            'message' => 'Product deleted successfully and IDs resequenced consecutively', 
            'id' => $id
        ]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}
