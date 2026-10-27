<?php
require_once __DIR__ . '/db.php';

$pdo = getDB();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Resequence all order IDs consecutively in MySQL: ORD-01, ORD-02, ORD-03...
function resequenceOrderIds($pdo) {
    try {
        $stmt = $pdo->query("SELECT id FROM `orders` ORDER BY `created_at` ASC");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (empty($rows)) return;

        // Phase 1: Temporary IDs
        foreach ($rows as $i => $row) {
            $tempId = 'ord_tmp_' . uniqid() . '_' . $i;
            $pdo->prepare("UPDATE `orders` SET `id` = :temp WHERE `id` = :old")
                ->execute([':temp' => $tempId, ':old' => $row['id']]);
            $rows[$i]['temp_id'] = $tempId;
        }

        // Phase 2: Consecutive IDs
        $updateStmt = $pdo->prepare("UPDATE `orders` SET `id` = :new_id WHERE `id` = :temp_id");
        foreach ($rows as $index => $row) {
            $seq = str_pad($index + 1, 2, '0', STR_PAD_LEFT);
            $newId = 'ORD-' . $seq;
            $updateStmt->execute([':new_id' => $newId, ':temp_id' => $row['temp_id']]);
        }
    } catch (Exception $e) {
        error_log("Order resequence error: " . $e->getMessage());
    }
}

function formatOrder($row, $index = null) {
    return [
        'id' => $row['id'],
        'serialNo' => ($index !== null) ? ($index + 1) : 1,
        'customer' => $row['customer'],
        'email' => $row['email'],
        'phone' => $row['phone'],
        'address' => $row['address'],
        'total' => (float)$row['total'],
        'itemsCount' => (int)$row['items_count'],
        'status' => $row['status'],
        'shippingMethod' => $row['shipping_method'],
        'paymentStatus' => $row['payment_status'],
        'items' => json_decode($row['items_json'], true) ?: [],
        'date' => substr($row['created_at'], 0, 10),
        'createdAt' => $row['created_at']
    ];
}

switch ($method) {
    case 'GET':
        if (isset($_GET['resequence'])) {
            resequenceOrderIds($pdo);
        }
        $stmt = $pdo->query("SELECT * FROM `orders` ORDER BY `created_at` DESC");
        $rows = $stmt->fetchAll();
        $orders = [];
        foreach ($rows as $idx => $r) {
            $orders[] = formatOrder($r, $idx);
        }
        echo json_encode(['success' => true, 'orders' => $orders]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data['customer']) || empty($data['total'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Customer name and total are required']);
            exit();
        }

        $count = (int)$pdo->query("SELECT COUNT(*) FROM `orders`")->fetchColumn();
        $id = !empty($data['id']) ? $data['id'] : 'ORD-' . str_pad($count + 1, 2, '0', STR_PAD_LEFT);
        $customer = $data['customer'];
        $email = $data['email'] ?? '';
        $phone = $data['phone'] ?? '';
        $address = $data['address'] ?? '';
        $total = (float)$data['total'];
        $itemsCount = !empty($data['itemsCount']) ? (int)$data['itemsCount'] : (isset($data['items']) ? count($data['items']) : 1);
        $status = $data['status'] ?? 'In Atelier Inspection';
        $shippingMethod = $data['shippingMethod'] ?? 'Armored Overnight';
        $paymentStatus = $data['paymentStatus'] ?? 'Paid';
        $itemsJson = json_encode($data['items'] ?? []);

        $sql = "INSERT INTO `orders` 
            (`id`, `customer`, `email`, `phone`, `address`, `total`, `items_count`, `status`, `shipping_method`, `payment_status`, `items_json`)
            VALUES 
            (:id, :customer, :email, :phone, :address, :total, :items_count, :status, :shipping_method, :payment_status, :items_json)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':id' => $id,
            ':customer' => $customer,
            ':email' => $email,
            ':phone' => $phone,
            ':address' => $address,
            ':total' => $total,
            ':items_count' => $itemsCount,
            ':status' => $status,
            ':shipping_method' => $shippingMethod,
            ':payment_status' => $paymentStatus,
            ':items_json' => $itemsJson
        ]);

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Order created in MySQL database',
            'order' => [
                'id' => $id,
                'customer' => $customer,
                'total' => $total,
                'status' => $status
            ]
        ]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data['id']) || empty($data['status'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Order ID and status are required']);
            exit();
        }

        $stmt = $pdo->prepare("UPDATE `orders` SET `status` = :status WHERE `id` = :id");
        $stmt->execute([
            ':id' => $data['id'],
            ':status' => $data['status']
        ]);

        echo json_encode(['success' => true, 'message' => 'Order status updated successfully']);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            $data = json_decode(file_get_contents('php://input'), true);
            $id = $data['id'] ?? null;
        }

        if (!$id) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Order ID is required for deletion']);
            exit();
        }

        $stmt = $pdo->prepare("DELETE FROM `orders` WHERE `id` = :id");
        $stmt->execute([':id' => $id]);

        resequenceOrderIds($pdo);

        echo json_encode([
            'success' => true,
            'message' => 'Order deleted successfully and IDs resequenced',
            'id' => $id
        ]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}
