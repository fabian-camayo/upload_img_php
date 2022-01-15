<?php

$uploadDir = __DIR__ . '/uploads/';

$filesInput = $_FILES['files'];
$filesName = $filesInput['name'];
$filesTmpName = $filesInput['tmp_name'];
$filesError = $filesInput['error'];

foreach ($filesName as $index => $name) {

    if ($filesError[$index] == \UPLOAD_ERR_OK) {
        $toPath = $uploadDir . uniqid() . '_' . $name;
        $uploaded = move_uploaded_file($filesTmpName[$index], $toPath);
    }

}
