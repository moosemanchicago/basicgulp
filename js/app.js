      $(document).foundation();

      $('.slick').slick({
        dots: false,
        speed:500,
        autoplay: true,
        autoplaySpeed: 3000,
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true
      });