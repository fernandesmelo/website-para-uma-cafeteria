function menuMobile() {
    let menuHamburguer = document.querySelector('.menu-mobile');
    if (menuHamburguer.classList.contains('open')) {
        menuHamburguer.classList.remove('open');
    } else {
        menuHamburguer.classList.add('open');
    }
}