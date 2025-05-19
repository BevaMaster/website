<?php
require_once("../function/helper.php");
require_once("../function/koneksi.php");

// untuk random file
$rand = rand();
// mengambil nama file original
$filename = $_FILES['file']['name'];
// mengambil ukuran file
$ukuran = $_FILES['file']['size'];
// mengambil ekstensi
$ext = pathinfo($filename, PATHINFO_EXTENSION);
// untuk mengatur ekstensi yang diizinkan
$ekstensi = array('png', 'mp4', 'pdf');

if (!in_array($ext, $ekstensi)) {
    header("location: " . BASE_URL . 'index.php?alert=gagal_ekstensi');
} else {
    if ($ukuran < 1044070) {
        $newName = $rand . '_' . $filename;
        move_uploaded_file($_FILES['file']['tmp_name'], '../file/' . $rand . '_' . $filename);
        mysqli_query($koneksi, "INSERT INTO file (name) VALUES ('$newName')");
        header("location: " . BASE_URL . 'index.php?alert=berhasil');
    } else {
        header("location: " . BASE_URL . 'index.php?alert=gagal_ukuran');
    }
}
