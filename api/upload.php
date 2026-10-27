<?php
// Lumière Haute Joaillerie - Image Upload API Handler
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Use POST.']);
    exit();
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    $errorCode = $_FILES['image']['error'] ?? 'No file provided';
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'File upload error or no file provided: ' . $errorCode]);
    exit();
}

$file = $_FILES['image'];
$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid file format. Please upload JPG, PNG, WEBP, or GIF.']);
    exit();
}

// 10 MB limit
if ($file['size'] > 10 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Image size exceeds maximum limit of 10MB.']);
    exit();
}

$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
if (empty($ext)) {
    $mimeMap = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/gif' => 'gif'
    ];
    $ext = $mimeMap[$mimeType] ?? 'jpg';
}

$uniqueName = 'jewelry_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . strtolower($ext);
$uploadDir = __DIR__ . '/../public/uploads/';

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$destination = $uploadDir . $uniqueName;

if (move_uploaded_file($file['tmp_name'], $destination)) {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    
    // Full URL accessible from browser
    $fullUrl = $protocol . $host . '/Jwellery/public/uploads/' . $uniqueName;
    $relativePath = '/uploads/' . $uniqueName;

    echo json_encode([
        'success' => true,
        'url' => $fullUrl,
        'relativePath' => $relativePath,
        'filename' => $uniqueName,
        'message' => 'Jewelry image uploaded successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save uploaded image to server directory']);
}
