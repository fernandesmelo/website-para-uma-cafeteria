document.getElementById("menu-hamburguer").addEventListener("click", function () {
    var links = document.getElementById("navbar-links");
    if (links.style.display === "block") {
        links.style.display = "none";
    } else {
        links.style.display = "block";
    }
});