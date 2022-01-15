<?php

$uploadDir = __DIR__ . '/uploads/';

$filesInput = $_FILES['files'];
$filesName = $filesInput['name'];
$filesTmpName = $filesInput['tmp_name'];
$filesError = $filesInput['error'];
$allowed  = ['jpg'];

foreach ($filesName as $index => $name) {
    $pathinfo = pathinfo($name); 
    $extension = strtolower($pathinfo['extension']);
    $res = new Response;
    if (in_array($extension, $allowed)) {
        if ($filesError[$index] == \UPLOAD_ERR_OK) {
            $toPath = $uploadDir . uniqid() . '_' . $name;
            $uploaded = move_uploaded_file($filesTmpName[$index], $toPath);
            $successName[] = $name;
        }
    } else {
        $errorsName[] = $name;
    }
}
if (isset($successName)) {
    $res->success  = true;
    $res->message   = $successName;
    $resJSON = json_encode($res);
    echo $resJSON;
}
if (isset($errorsName)) {
    $res->success  = false;
    $res->message   = $errorsName;
    $resJSON = json_encode($res);
    echo $resJSON;
}
class Response {
    public $success = true;
    public $message = "";
}