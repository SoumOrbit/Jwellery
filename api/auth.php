<?php
require_once __DIR__ . '/db.php';

$pdo = getDB();
$method = $_SERVER['REQUEST_METHOD'] ?? 'POST';

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $email = trim($input['email'] ?? '');
    $password = trim($input['password'] ?? '');

    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Email and password are required']);
        exit();
    }

    $stmt = $pdo->prepare("SELECT * FROM `admins` WHERE LOWER(`email`) = LOWER(:email) LIMIT 1");
    $stmt->execute([':email' => $email]);
    $admin = $stmt->fetch();

    if ($admin && ($admin['password'] === $password || password_verify($password, $admin['password']))) {
        echo json_encode([
            'success' => true,
            'message' => 'Authentication successful',
            'user' => [
                'name' => $admin['name'],
                'role' => $admin['role'],
                'email' => $admin['email']
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email or password. Use admin@lumiere.com / admin123'
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
