<?php

// var_dump($_FILES);

// Specify the directory where the uploaded images will be stored
$uploadDirectory = 'uploads/';
$images = [];

foreach ($_FILES as $file) {
  $images[] = $file;
}

var_dump($images);

// Loop through each uploaded image
foreach ($images as $k => $v) {

  // var_dump($k, $v);

  // Get the temporary file name and destination file name
  $tmpFilePath = $v['tmp_name'];
  $newFileName = $uploadDirectory . $v['name'];

  // Check if the file has been uploaded successfully
  if (move_uploaded_file($tmpFilePath, $newFileName)) {
    // Handle successful upload
    echo "File uploaded successfully: " . $newFileName . "\n";
  } else {
    // Handle upload failure
    echo "Error uploading file: " . $v['name'] . "\n";
  }
}
