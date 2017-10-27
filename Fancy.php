<?php 
$activePage = "Fancy";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Codevoorbeeld Olivier - Fancy</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.4/bluebird.min.js"></script>
    <script src="js/webgl.js"></script>
    <script src="js/fancy-canvas.js" defer></script>
    <link rel="stylesheet" href="styles/css/style.css" />
</head>
<body class="body--dark">
    <header class="header header--dark">
        <ul class="header-nav">
            <?php include("includes/navItems.php") ?>
        </ul>
    </header>

    <canvas id="fancy-canvas"></canvas>

    <footer class="footer">
        <?php include("includes/footerInfo.php") ?>
    </footer>
</body>
</html>