//slider phoness
var swiper = new Swiper('.swiper-container', {
  pagination: '.swiper-pagination',
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflow: {
      rotate: 20,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
});
//slider game img
!function(n){n(window).on("load",function(){window.loaded=!0}),n(function(){n.fn.infiniteslide=function(e){var t=n.extend({speed:100,direction:"left",pauseonhover:!0,responsive:!1,clone:1},e),o=function(e,t){if(n(e).wrap('<div class="infiniteslide_wrap"></div>').parent().css({overflow:"hidden"}),"up"==t||"down"==t)var o="column";else var o="row";n(e).css({display:"flex",flexWrap:"nowrap",alignItems:"center","-ms-flex-align":"center",flexDirection:o}).children().css({flex:"none",display:"block"})},r=function(e,t){var o=n(e).children().clone(!0).addClass("infiniteslide_clone");for(i=1;i<=t;)o.clone(!0).appendTo(n(e)),i++},a=function(e,t){if("up"==t||"down"==t)var o,r=(o=e,h=0,n(o).children(":not(.infiniteslide_clone)").each(function(e,t){h+=n(this).outerHeight(!0)}),h);else var a,r=(a=e,w=0,n(a).children(":not(.infiniteslide_clone)").each(function(e,t){w+=n(this).outerWidth(!0)}),w);return r},s=function(n,e){if("up"==e||"down"==e)var t="0,-"+n+"px,0";else var t="-"+n+"px,0,0";return t},l=function(e,t,o,r){var l,d,c=a(e,o);("up"==o||"down"==o)&&n(e).parent(".infiniteslide_wrap").css({height:c+"px"});var f=s(c,o);if(n(e).attr("data-style","infiniteslide"+t),n("<style />").attr("id","infiniteslide"+t+"_style").html("@keyframes infiniteslide"+t+"{from {transform:translate3d(0,0,0);}to {transform:translate3d("+f+");}}").appendTo("head"),"right"==o||"down"==o)var u=" reverse";else var u="";n(e).css({animation:"infiniteslide"+t+" "+(l=c,l/(d=r))+"s linear 0s infinite"+u})},d=function(e){n(e).on("mouseenter",function(){n(this).css({animationPlayState:"paused"})}).on("mouseleave",function(){n(this).css({animationPlayState:"running"})})},c=function(n,e){var t=a(n,e);return s(t,e)};return this.each(function(e,a){var s=n(this),f=Date.now()+Math.floor(1e4*Math.random()).toString(16);!0==t.pauseonhover&&d(s);var u=function(){o(s,t.direction),r(s,t.clone),l(s,f,t.direction,t.speed),t.responsive&&n(window).on("resize",function(){var e=c(s,t.direction),o=s.attr("data-style"),r=n("#"+o+"_style").html().replace(/to {transform:translate3d\((.*?)\)/,"to {transform:translate3d("+e+")");n("#"+o+"_style").html(r)})};window.loaded?u():n(window).on("load",u)})}})}(jQuery);

$(function(){
  $(window).load(function(){
   $('.game_slider_1').infiniteslide({
     clone: 10,
     direction:"left",
     'pauseonhover': true, 
   });
  });
 });
 $(function(){
  $(window).load(function(){
   $('.game_slider_2').infiniteslide({
     clone: 10,
     direction:"right",
     'pauseonhover': true, 
   });
  });
 });

//counter
class CountUp {
  constructor(el) {
    this.el = el;
    this.numberElements = this.el.querySelectorAll("[data-countup-number]");
    this.observerOptions = { root: null, rootMargin: "0px", threshold: 0 };
    this.observer = new IntersectionObserver(
      this.handleIntersect.bind(this),
      this.observerOptions
    );
    this.init();
  }

  init() {
    if (this.numberElements.length > 0) {
      this.numberElements.forEach((el) => {
        this.observer.observe(el);
      });
    }
  }

  handleIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const end = parseFloat(
          entry.target.dataset.countupNumber.replace(/,/g, "")
        );
        const decimals = this.countDecimals(end);
        this.animateValue(entry.target, end, decimals);
      }
    });
  }

  animateValue(el, end, decimals) {
    const start = 0;
    const duration = 2500;
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsedPercent = (timestamp - startTimestamp) / duration;
      const easedProgress = Math.min(this.easeOutQuint(elapsedPercent), 1);
      let interimNumber = Math.abs(easedProgress * (end - start) + start);
      el.textContent = this.formatNumber(interimNumber, decimals);
      if (easedProgress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }

  easeOutQuint(x) {
    return 1 - Math.pow(1 - x, 5);
  }

  countDecimals(val) {
    if (Math.floor(val) === val) return 0;
    return val.toString().split(".")[1].length || 0;
  }

  formatNumber(val, decimals) {
    return val.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
}
const countUpElements = document.querySelectorAll('[data-module="countup"]');
countUpElements.forEach((element) => {
  new CountUp(element);
});

// Sticky navbar &  Scroll to top function
let navbar = document.getElementById("navbarsticky");
let scrollToTopButton = document.getElementById("scrollToTopButton");
let sticky = navbar.offsetTop;
window.onscroll = function () {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }

  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    scrollToTopButton.classList.add("scroll_active");
  } else {
    scrollToTopButton.classList.remove("scroll_active");
  }
};
function scrollToTop() {
  document.documentElement.scrollTop = 0;
}
scrollToTopButton.addEventListener("click", scrollToTop);

// create toggle class
document.querySelector(".navIcon").onclick = function () {
  document.querySelector("html").classList.toggle("overflow");
  document.querySelector(".navIcon").classList.toggle("activeMenu");
  document.querySelector("nav").classList.toggle("activenav");
};

// for active class in menu
function addMenuClickListener(headerId, activeClassName) {
  let header = document.getElementById(headerId);
  let topmenus = header.getElementsByClassName("topmenu");

  for (let i = 0; i < topmenus.length; i++) {
    topmenus[i].addEventListener("click", function () {
      let current = document.getElementsByClassName(activeClassName);
      current[0].classList.remove(activeClassName);
      this.classList.add(activeClassName);
    });
  }
}
// Call the function for each menu
addMenuClickListener("menuid", "active");
addMenuClickListener("menuid1", "active1");


