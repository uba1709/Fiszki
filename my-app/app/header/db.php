<?php
// db.php - PDO connection helper
// Configure via environment variables or defaults

$db_dsn = getenv('DB_DSN') ?: null;
if (!$db_dsn) {
    $db_type = getenv('DB_TYPE') ?: 'sqlite'; // 'mysql' or 'sqlite'
    if ($db_type === 'mysql') {
        $db_host = getenv('DB_HOST') ?: '127.0.0.1';
        $db_name = getenv('DB_NAME') ?: 'myapp';
        $db_user = getenv('DB_USER') ?: 'root';
        $db_pass = getenv('DB_PASS') ?: '';
        $db_dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4";
    } else {
        // Default: SQLite file at repository root
        $db_file = __DIR__ . '/../../database.sqlite';
        $db_dsn = "sqlite:$db_file";
        $db_user = null;
        $db_pass = null;
    }
}

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($db_dsn, $db_user ?? null, $db_pass ?? null, $options);
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}
