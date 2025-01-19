const swiper = new Swiper(".poster ", {
  autoplay: true,
  loop: true,
  pagination: {
    el: ".dots-list",
    bulletClass: "bullet",
    bulletActiveClass: "bullet-active",
    clickable: true,
  },
  navigation: {
    nextEl: ".next-btn",
    prevEl: ".pre-btn",
  },
});
const promoteCarousel = new Swiper(".promote-carousel", {
  autoplay: true,
  loop: true,
  slidesPerView: 2,
  spaceBetween: 20,
  speed: 5000,
  freeMode: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 5,
    },
    1280: {
      slidesPerView: 5,
    },
  },
});
