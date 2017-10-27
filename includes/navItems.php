<?php 
    $pages = ["Home", "Task List", "Fancy"];

    foreach($pages as $page){
        $className = "header-nav__item";
        if($page == end($pages))
            $className = $className . " header-nav__item--last";
        if($page == $activePage)
            $className = $className . " header-nav__item--active";
        
        echo '<a class="' . $className . '" href="' . str_replace(' ', '', $page) . '.php">' . $page . '</a>';
    }
?>