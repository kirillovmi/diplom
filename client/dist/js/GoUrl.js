function GoUrl(url){
    location.href=url;
}
document.addEventListener('DOMContentLoaded', function () {
    $('.hamburger-menu').click(function(){
        $('.sliding-navbar').toggleClass('sliding-navbar--open');
        $('.mask').toggleClass('show')
        $('.hamburger').toggleClass('menu-opened');
    });

    $('.mask').click(function(){
        $('.sliding-navbar').toggleClass('sliding-navbar--open');
        $('.mask').removeClass('show');
        $('.hamburger').toggleClass('menu-opened');
    })
});