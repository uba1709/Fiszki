<?php
header('Content-Type: application/json');
// CORS: adjust origin check to your domain in production
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type');
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require __DIR__ . '/db.php'; // provides $pdo

$input = json_decode(file_get_contents('php://input'), true);
$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing email or password']);
    exit;
}

// fetch user
$stmt = $pdo->prepare('SELECT id, password_hash FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password_hash'])) {
    // Secure session cookie params
    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (
        isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443
    );
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'domain' => $_SERVER['HTTP_HOST'] ?? '',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    session_start();
    session_regenerate_id(true);
    $_SESSION['user_id'] = $user['id'];

    echo json_encode(['ok' => true, 'userId' => $user['id']]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
}
