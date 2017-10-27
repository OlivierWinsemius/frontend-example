$(document).ready(function(){
    const sidebarItems = $(".sidebar-list-item");
    
    $(document).on("scroll load", function(e){
        const scrollY = $(window).scrollTop() + $(window).innerHeight()/2;

        // activate / deactivate sidebar items
        $(".home-content-block").each(function(index) {
            const elementY = $(this).offset().top;
            if(scrollY - elementY > 0)
                sidebarItems[index].classList.add("sidebar-list-item--active");
            else
                sidebarItems[index].classList.remove("sidebar-list-item--active");
        });

        // creating parallax effect
        $(".parallax").each(function(index){
            const elementY = $(this).offset().top;
            const image = $(this).find("img");
            image.css("top", (scrollY - elementY) - image.innerHeight() / 2 + "px");
        });
    });

    sidebarItems.each(function() {
        $(this).on("click", function(e) {
            e.preventDefault()
            const scrollTarget = $($(this).attr("href")).offset().top;
            $("html, body").animate({
                scrollTop: scrollTarget - 10,
                easing: "easeout"
            }, 400);
        });
    });
});