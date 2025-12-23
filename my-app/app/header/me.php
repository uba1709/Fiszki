<?php
header('Content-Type: application/json');
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    header('Access-Control-Allow-Credentials: true');
}

session_start();

if (isset($_SESSION['user_id'])) {
    echo json_encode(['logged' => true, 'userId' => $_SESSION['user_id']]);
} else {
    echo json_encode(['logged' => false]);
}
