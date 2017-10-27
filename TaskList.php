<?php 
$activePage = "Task List";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Codevoorbeeld Olivier - Todo</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.4/bluebird.min.js"></script>
    <script type="text/javascript" src="js/taskList.js" defer></script>
    <link rel="stylesheet" href="styles/css/style.css" />
</head>
<body class="body">
    <header class="header">
        <ul class="header-nav">
            <?php include("includes/navItems.php") ?>
        </ul>
    </header>
    
    <section class="section">
        <div class="tasks">
            <h3 class="tasks__title">To do:</h3>
            <input placeholder="Search for an item" 
                onkeyup="taskList.searchTasks(this.value)" 
                class="tasks__search tasks__input"
            />
            <ul class="todos tasks__list"></ul>
            <form onsubmit="taskList.addTask(this); return false;">
                <input onkeyup="taskList.updateNewItemName(this.value)" placeholder="Add an item" class="tasks__add tasks__input"/>
                <input type="submit" style="position: absolute; left: -9999px; width: 1px; height: 1px;" tabindex="-1" />
            </form>
        </div>
    </section>
    
    <footer class="footer">
        <?php include("includes/footerInfo.php") ?>
    </footer>
</body>
</html>