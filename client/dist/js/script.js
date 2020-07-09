$('.slider').slick({
  dots: true,
  infinite: true,
  speed: 400,
  slidesToShow: 2,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows:false,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 760,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        centerMode: true,
        centerPadding: '40px'

      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});