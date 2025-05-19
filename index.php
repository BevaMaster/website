<?php

require_once("function/helper.php");
require_once("function/koneksi.php");

$process = isset($_GET['alert']) ? ($_GET['alert']) : false;

?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Upload File PHP</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
</head>

<body>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h3 style="text-align: center;">Upload File dengan PHP @belajaryuk</h3>
            </div>
            <div class="card-body">
                <form method="POST" action="<?= BASE_URL . '/process/process_upload.php' ?>" enctype="multipart/form-data">
                    <div class="mb-3">
                        <input type="file" class="form-control" name="file">
                        <?php if ($process == 'gagal_ekstensi') : ?>
                            <div class="alert alert-danger">
                                Jenis file tidak diizinkan
                            </div>
                        <?php elseif ($process == 'gagal_ukuran') : ?>
                            <div class="alert alert-danger">
                                Ukuran file terlalu besar
                            </div>
                        <?php elseif ($process == 'berhasil') : ?>
                            <div class="alert alert-success">
                                Upload berhasil
                            </div>
                        <?php endif; ?>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>

        <hr>
        <!-- Query ke database -->
        <?php
        $data = mysqli_query($koneksi, "SELECT * FROM file");
        ?>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">File</th>
                </tr>
            </thead>
            <tbody>
                <?php $no = 1; ?>
                <?php foreach ($data as $d) : ?>
                    <?php $ext = pathinfo($d['name'], PATHINFO_EXTENSION); ?>
                    <tr>
                        <th scope="row"><?= $no++; ?></th>
                        <td>
                            <?php
                            if ($ext === 'png') {
                                echo '<img src="file/' . $d['name'] . '" alt="Gambar" height="300px" width="400px">';
                            } elseif ($ext === 'mp4') {
                                echo '<video src="file/' . $d['name'] . '" controls height="300px" width="400px"></video>';
                            } elseif ($ext === 'pdf') {
                                echo '<embed src="file/' . $d['name'] . '"type="application/pdf" width="100%" height="600px">';
                            }
                            ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <script>
        <?php if ($process) { ?>
            setTimeout(function() {
                location.href = '<?php echo BASE_URL ?>';
            }, 5000)
        <?php } ?>
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
</body>

</html>