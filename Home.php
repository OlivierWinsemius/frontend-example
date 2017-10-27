<?php 
$activePage = "Home";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Codevoorbeeld Olivier - Home</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.4/bluebird.min.js"></script>
    <script type="text/javascript" src="modules/jquery/jquery-3.2.1.min.js"></script>  
    <script type="text/javascript" src="js/homeSidebar.js"></script>
    <link rel="stylesheet" href="styles/css/style.css" />
</head>
<body>
    <header class="header">
        <ul class="header-nav">
            <?php include("includes/navItems.php") ?>
        </ul>
    </header>

    <section class="section">
        <div class="sidebar">
            <div class="sidebar-list">
                <a class="sidebar-list-item sidebar-list-item--active" href="#item1">item 1</a>
                <a class="sidebar-list-item" href="#item2">item 2</a>
                <a class="sidebar-list-item" href="#item3">item 3</a>
                <a class="sidebar-list-item sidebar-list-item--last" href="#item4">item 4</a>
            </div>
        </div>

        <div id="item1" class="home-content">
            <div class="parallax">
                <img src="images/parallax-image-1.jpg" alt="parallax-image" class="parallax-image" />
                <h3 class="parallax-text">item 1</h3>
            </div>
            <div class="home-content-block">
                <?php include "includes/homeContent/item1.inc" ?>
            </div>
            
            <div id="item2" class="parallax">
                <img src="images/parallax-image-2.jpg" alt="parallax-image" class="parallax-image" />
                <h3 class="parallax-text">item 2</h3>
            </div>
            <div class="home-content-block">
                <?php include "includes/homeContent/item1.inc" ?>
            </div>
            
            <div id="item3" class="parallax">
                <img src="images/parallax-image-3.jpg" alt="parallax-image" class="parallax-image" />
                <h3 class="parallax-text">item 3</h3>
            </div>
            <div class="home-content-block">
                <?php include "includes/homeContent/item1.inc" ?>
            </div>

            <div id="item4" class="parallax">
                <img src="images/parallax-image-4.jpg" alt="parallax-image" class="parallax-image" />
                <h3 class="parallax-text">item 4</h3>
            </div>
            <div class="home-content-block">
                <?php include "includes/homeContent/item1.inc" ?>
            </div>
        </div>
    </section>
    
    <footer class="footer">
        <?php include("includes/footerInfo.php") ?>
    </footer>
</body>
</html>