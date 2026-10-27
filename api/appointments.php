<?php
require_once __DIR__ . '/db.php';

$pdo = getDB();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Resequence all appointment IDs consecutively in MySQL: APT-01, APT-02, APT-03...
function resequenceAppointmentIds($pdo) {
    try {
        $stmt = $pdo->query("SELECT id FROM `appointments` ORDER BY `created_at` ASC");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (empty($rows)) return;

        // Phase 1: Temporary IDs
        foreach ($rows as $i => $row) {
            $tempId = 'apt_tmp_' . uniqid() . '_' . $i;
            $pdo->prepare("UPDATE `appointments` SET `id` = :temp WHERE `id` = :old")
                ->execute([':temp' => $tempId, ':old' => $row['id']]);
            $rows[$i]['temp_id'] = $tempId;
        }

        // Phase 2: Consecutive IDs
        $updateStmt = $pdo->prepare("UPDATE `appointments` SET `id` = :new_id WHERE `id` = :temp_id");
        foreach ($rows as $index => $row) {
            $seq = str_pad($index + 1, 2, '0', STR_PAD_LEFT);
            $newId = 'APT-' . $seq;
            $updateStmt->execute([':new_id' => $newId, ':temp_id' => $row['temp_id']]);
        }
    } catch (Exception $e) {
        error_log("Appointment resequence error: " . $e->getMessage());
    }
}

switch ($method) {
    case 'GET':
        if (isset($_GET['resequence'])) {
            resequenceAppointmentIds($pdo);
        }
        $stmt = $pdo->query("SELECT * FROM `appointments` ORDER BY `created_at` DESC");
        $rows = $stmt->fetchAll();
        $appointments = [];
        foreach ($rows as $idx => $r) {
            $r['serialNo'] = $idx + 1;
            $appointments[] = $r;
        }
        echo json_encode(['success' => true, 'appointments' => $appointments]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data['name']) || empty($data['email'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Client name and email are required']);
            exit();
        }

        $count = (int)$pdo->query("SELECT COUNT(*) FROM `appointments`")->fetchColumn();
        $id = !empty($data['id']) ? $data['id'] : 'APT-' . str_pad($count + 1, 2, '0', STR_PAD_LEFT);
        $name = $data['name'];
        $email = $data['email'];
        $phone = $data['phone'] ?? '';
        $boutique = $data['boutique'] ?? 'Paris Flagship (Place Vendôme)';
        $preferredDate = $data['preferredDate'] ?? null;
        $serviceType = $data['serviceType'] ?? 'Bespoke Engagement Ring';
        $message = $data['message'] ?? '';
        $status = $data['status'] ?? 'Pending Review';

        $sql = "INSERT INTO `appointments` 
            (`id`, `name`, `email`, `phone`, `boutique`, `preferred_date`, `service_type`, `message`, `status`)
            VALUES 
            (:id, :name, :email, :phone, :boutique, :preferred_date, :service_type, :message, :status)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':id' => $id,
            ':name' => $name,
            ':email' => $email,
            ':phone' => $phone,
            ':boutique' => $boutique,
            ':preferred_date' => $preferredDate,
            ':service_type' => $serviceType,
            ':message' => $message,
            ':status' => $status
        ]);

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Appointment request submitted to MySQL',
            'id' => $id
        ]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data['id']) || empty($data['status'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Appointment ID and status are required']);
            exit();
        }

        $stmt = $pdo->prepare("UPDATE `appointments` SET `status` = :status WHERE `id` = :id");
        $stmt->execute([
            ':id' => $data['id'],
            ':status' => $data['status']
        ]);

        echo json_encode(['success' => true, 'message' => 'Appointment status updated successfully']);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            $data = json_decode(file_get_contents('php://input'), true);
            $id = $data['id'] ?? null;
        }

        if (!$id) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Appointment ID is required for deletion']);
            exit();
        }

        $stmt = $pdo->prepare("DELETE FROM `appointments` WHERE `id` = :id");
        $stmt->execute([':id' => $id]);

        resequenceAppointmentIds($pdo);

        echo json_encode([
            'success' => true,
            'message' => 'Appointment deleted successfully and IDs resequenced',
            'id' => $id
        ]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}
