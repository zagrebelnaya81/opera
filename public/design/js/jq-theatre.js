"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  var gallerySlider = [].concat(_toConsumableArray(document.querySelectorAll("[data-gallery-slider]")));

  if (!gallerySlider) return false;

  gallerySlider.forEach(function (item) {

    var flag = item.getAttribute("data-gallery-slider");

    if (item.children.length > 4 && !flag) {
      $(item).slick({
        dots: true,
        autoplay: false,
        arrows: false,
        slidesToShow: 4,
        responsive: [{
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 481,
          settings: {
            slidesToShow: 1
          }
        }]
      });

      item.setAttribute("data-gallery-slider", true);
    }
  });
})();

(function () {

  var timer = void 0;

  var gallerySliderEvent = [].concat(_toConsumableArray(document.querySelectorAll("[data-gallery-event]")));

  if (!gallerySliderEvent) return false;

  var innitEventSlider = function innitEventSlider() {
    gallerySliderEvent.forEach(function (item) {

      var flag = item.getAttribute("data-slider-active");

      if (window.innerWidth <= 1024 && !flag) {
        $(item).slick({
          dots: true,
          autoplay: false,
          arrows: false,
          slidesToShow: 3,
          responsive: [{
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          }, {
            breakpoint: 481,
            settings: {
              slidesToShow: 1
            }
          }]
        });

        item.setAttribute("data-slider-active", true);
      } else if (window.innerWidth > 1024 && flag) {
        $(item).slick("unslick");
        item.removeAttribute("data-slider-active");
      }
    });
  };

  innitEventSlider();

  window.addEventListener("resize", function () {
    clearTimeout(timer);

    timer = setTimeout(innitEventSlider, 300);
  });
})();
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

$("[data-scroll-arr]").on("click", function (e) {
  e.preventDefault();

  var menuHeight = $(".header").height(),
      scrollPosition = this.getBoundingClientRect().bottom + pageYOffset - menuHeight;

  $("html,body").animate({
    scrollTop: scrollPosition
  }, 1000);
});

(function () {
  var promoSlider = document.querySelector("[data-promo-slider]");
  if (!promoSlider) return false;

  $(promoSlider).slick({
    dots: false,
    prevArrow: $("[data-promo-slider-btn-prev]"),
    nextArrow: $("[data-promo-slider-btn-next]")
  });
})();

;(function () {
  var changePromoSliderImg = function changePromoSliderImg() {
    var imgArr = [].concat(_toConsumableArray(document.querySelectorAll("[data-promo-mobile-url]")));
    imgArr.forEach(function (item) {
      if (!imgArr) return false;

      if (window.innerWidth <= 375) {
        if (!item.hasAttribute("data-promo-mobile-url-active")) {
          item.setAttribute("data-promo-desktop-url", item.getAttribute("src"));
          item.setAttribute("src", item.getAttribute("data-promo-mobile-url"));
          item.setAttribute("data-promo-mobile-url-active", true);
        }
      } else {
        if (item.hasAttribute("data-promo-mobile-url-active")) {
          item.setAttribute("data-promo-mobile-url", item.getAttribute("src"));
          item.setAttribute("src", item.getAttribute("data-promo-desktop-url"));
          item.removeAttribute("data-promo-mobile-url-active");
        }
      }
    });
  };

  changePromoSliderImg();
  window.addEventListener("resize", changePromoSliderImg);
})();
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  var timer = void 0;

  var innitSliderRecommend = function innitSliderRecommend() {
    var dataSlick = document.querySelector("[data-slick-slider-recommend]");
    if (!dataSlick) return false;

    var sliderItemLength = dataSlick.querySelectorAll("[data-slider-item]").length,
        slickSliderActive = dataSlick.getAttribute("data-slick-slider-recommend");

    if (sliderItemLength > 4 || window.innerWidth < 768) {
      var _$$slick;

      if (slickSliderActive) return false;
      dataSlick.setAttribute("data-slick-slider-recommend", true);

      $(dataSlick).slick((_$$slick = {
        dots: true,
        autoplay: true,
        arrows: false,
        slidesToShow: 2,
        infinite: true,
        slidesToScroll: 1
      }, _defineProperty(_$$slick, "autoplay", false), _defineProperty(_$$slick, "responsive", [{
        breakpoint: 768,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          centerPadding: "80px"
        }
      }, {
        breakpoint: 481,
        settings: {
          centerMode: false,
          slidesToShow: 1
        }
      }]), _$$slick));

      calcHeightSlick($("[data-slick-slider-recommend]"));
    } else {
      if (!slickSliderActive) return false;

      $(dataSlick).slick("unslick");
      dataSlick.setAttribute("data-slick-slider-recommend", "");
    }
  };

  innitSliderRecommend();
  window.addEventListener("resize", function () {
    clearTimeout(timer);

    timer = setTimeout(innitSliderRecommend, 300);
  });
})();
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  if ($('.releases-media')) {
    if ($('[data-slick-slider-releases]')) {

      $('.releases-media [data-slick-slider-releases]').slick({
        dots: true,
        autoplay: false,
        infinite: true,
        arrows: false,
        adaptiveHeight: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 1000,
        responsive: [{
          breakpoint: 1400,
          settings: {
            centerMode: true,
            centerPadding: '20.86%',
            slidesToShow: 1
          }
        }, {
          breakpoint: 768,
          settings: {
            centerPadding: '40px',
            slidesToShow: 1
          }
        }, {
          breakpoint: 480,
          settings: {
            centerPadding: '20px',
            slidesToShow: 1
          }
        }]
      });

      calcHeightSlick($('.releases-media'));
    }

    if ($('[data-fancybox=gallery]')) {
      var fancyBoxItems = document.querySelectorAll('[data-slider-item]:not(.slick-cloned) [data-fancybox=gallery]');

      var addRelAttribute = function addRelAttribute(itemArr) {
        return [].concat(_toConsumableArray(itemArr)).forEach(function (item) {
          return item.setAttribute('rel', 'group-releases-media');
        });
      };

      var innitReleasesGallery = function innitReleasesGallery(itemArr) {
        var fancyBoxLinks = $('a[rel=group-releases-media]');

        if (fancyBoxLinks) fancyBoxLinks.fancybox();
      };

      addRelAttribute(fancyBoxItems);
      innitReleasesGallery(fancyBoxItems);
    }
  }
})();
"use strict";

(function () {
  var socialLikes = document.querySelector("[data-social-likes]");

  if (!socialLikes) return false;

  var script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/social-likes/dist/social-likes.min.js";

  document.body.appendChild(script);

  script.addEventListener("load", function (e) {
    $("[data-social-likes-list]").socialLikes();
  });
})();

// remove social-share on description block
(function () {
  var replaceSocialShareBlock = function replaceSocialShareBlock() {
    var replaceSocialParent = document.querySelector("[data-replace-social-share]");
    if (!replaceSocialParent) return false;

    var removed = replaceSocialParent.getAttribute("data-replace-social-share"),
        replaceSocialBlock = replaceSocialParent.querySelector("[data-replace-social-share-block]"),
        parentAbout = replaceSocialParent.querySelector("[data-about]");
    if (!removed) {
      if (window.innerWidth < 768 && replaceSocialBlock) {
        parentAbout.appendChild(replaceSocialBlock);
        replaceSocialParent.setAttribute("data-replace-social-share", "removed");
      }
    } else {
      if (window.innerWidth >= 768 && replaceSocialBlock) {
        var parentInfo = replaceSocialParent.querySelector("[data-info]");
        parentInfo.appendChild(replaceSocialBlock);
        replaceSocialParent.setAttribute("data-replace-social-share", "");
      }
    }
  };

  replaceSocialShareBlock();
  window.addEventListener("resize", replaceSocialShareBlock);
})();
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// innit Slick Slider for Special Projects
(function () {
  var timer = void 0;

  var innitSliderSpecialProjects = function innitSliderSpecialProjects() {
    var dataSlick = document.querySelector("[data-slick-slider-special-projects]");
    if (!dataSlick) return false;

    var sliderItemLength = dataSlick.querySelectorAll("[data-slider-item]").length,
        slickSliderActive = dataSlick.getAttribute("data-slick-slider-special-projects");

    if (sliderItemLength > 2 || window.innerWidth < 768) {
      var _$$slick;

      if (slickSliderActive) return false;
      dataSlick.setAttribute("data-slick-slider-special-projects", true);

      $(dataSlick).slick((_$$slick = {
        dots: true,
        autoplay: true,
        arrows: false,
        slidesToShow: 2,
        infinite: true,
        slidesToScroll: 1
      }, _defineProperty(_$$slick, "autoplay", false), _defineProperty(_$$slick, "responsive", [{
        breakpoint: 768,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          centerPadding: "80px"
        }
      }, {
        breakpoint: 481,
        settings: {
          centerMode: false,
          slidesToShow: 1
        }
      }]), _$$slick));

      calcHeightSlick($("[data-slick-slider-special-projects]"));
    } else {
      if (!slickSliderActive) return false;

      $(dataSlick).slick("unslick");
      dataSlick.setAttribute("data-slick-slider-special-projects", "");
    }
  };

  innitSliderSpecialProjects();
  window.addEventListener("resize", function () {
    clearTimeout(timer);

    timer = setTimeout(innitSliderSpecialProjects, 300);
  });
})();
"use strict";

(function () {

  var navScroll = document.querySelector("[data-nav-scroll]");

  if (!navScroll) return false;

  var navScrollParent = navScroll.parentElement,
      navScrollHeight = navScroll.offsetHeight,
      eventName = document.querySelector("[data-event-name]").textContent,
      eventBtn = document.querySelector("[data-event-btn]"),
      eventScrollTabs = document.querySelector("[data-event-scroll-tabs]");

  $("a[data-scroll]").on("click", function () {
    var currentNavScroll = document.querySelector("[data-nav-scroll]"),
        currentNavScrollHeight = currentNavScroll.offsetHeight;

    if (location.pathname.replace(/^\//, ") == this.pathname.replace(/^//,") && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

      if (target.length) {
        $("html,body").animate({
          scrollTop: target.offset().top - currentNavScrollHeight
        }, 1000);
        return false;
      }
    }
  });

  if (eventBtn = document.querySelector("[data-event-btn]")) {
    var eventBtnCloned = eventBtn.cloneNode(true);
    eventScrollTabs.append(eventBtnCloned);
  }
  eventScrollTabs.insertAdjacentHTML("afterBegin", "<p data-event-name class=\"tabs__title\">" + eventName + "</p>");

  var fixNavScrollPosition = function fixNavScrollPosition() {
    if (window.innerWidth < 768) {
      if (navScroll.hasAttribute("data-active")) {
        navScroll.removeAttribute("data-active");
        navScroll.style = "";
        navScrollParent.style = "";
      }
    } else {
      var navScrollParentPosition = {
        top: navScrollParent.getBoundingClientRect().top,
        left: parseInt(getComputedStyle(document.body).paddingLeft),
        height: navScrollParent.offsetHeight
      };

      if (navScrollParentPosition.top < 0) {
        navScroll.dataset.active = true;
        navScroll.style.left = navScrollParentPosition.left + "px";
        navScrollParent.style.paddingTop = navScrollHeight + "px";

        if (navScrollParentPosition.top + navScrollParentPosition.height < 0) {
          navScroll.style.opacity = 0;
          navScroll.style.zIndex = -1;
        } else {
          navScroll.style.opacity = 1;
          navScroll.style.zIndex = "";
        }
      } else {
        navScroll.removeAttribute("data-active");
        navScroll.style = "";
        navScrollParent.style = "";
      }
    }
  };

  window.addEventListener("scroll", fixNavScrollPosition);
  window.addEventListener("resize", fixNavScrollPosition);
})();
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  var mapElementArr = document.querySelectorAll("[data-map]");

  if (mapElementArr) {
    var createMarker = function createMarker(coordinates, map) {
      var coordinateParse = coordinates.split(",");

      return new google.maps.Marker({
        position: { lat: parseFloat(coordinateParse[0].trim()), lng: parseFloat(coordinateParse[1].trim()) },
        map: map,
        title: "",
        zIndex: 9999
      });
    };

    [].concat(_toConsumableArray(mapElementArr)).forEach(function (mapElement) {
      var scale = parseFloat(mapElement.dataset.mapScale) || 11,
          drag = true,
          scroll = false,
          zoomAuto = mapElement.dataset.autoZoom || false,
          bounds = new google.maps.LatLngBounds(),
          coordinate = mapElement.dataset.mapCoordinate.split(";");

      var markers = [];

      var map = new google.maps.Map(mapElement, {
        zoom: scale,
        center: new google.maps.LatLng(parseFloat(coordinate[0].split(",")[0].trim()), parseFloat(coordinate[0].split(",")[1].trim())),
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        draggable: drag,
        scrollwheel: scroll
      });

      if (coordinate.length) {
        markers = coordinate.map(function (item) {
          var marker = createMarker(item, map);

          if (zoomAuto) bounds.extend(new google.maps.LatLng(marker.position.lat(), marker.position.lng()));

          return marker;
        });
      }

      if (markers.length) markers.forEach(function (marker) {
        return marker.setMap(map);
      });

      if (zoomAuto) {
        map.fitBounds(bounds);
        map.panToBounds(bounds);
      }
    });
  }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbGxlcnkvanEtZ2FsbGVyeS5qcyIsInByb21vLXNsaWRlci9qcS1wcm9tby1zbGlkZXIuanMiLCJyZWNvbW1lbmQvanEtcmVjb21tZW5kLmpzIiwicmVsZWFzZXMtbWVkaWEvanEtcmVsZWFzZXMtbWVkaWEuanMiLCJzb2NpYWwtc2hhcmUvanEtc29jaWFsLXNoYXJlLmpzIiwic3BlY2lhbC1wcm9qZWN0cy9qcS1zcGVjaWFsLXByb2plY3RzLmpzIiwidGFicy9qcS10YWJzLXNjcm9sbC5qcyIsInZpc2l0L3Zpc2l0LXdoZXJlL2pxLXZpc2l0LXdoZXJlLmpzIl0sIm5hbWVzIjpbImdhbGxlcnlTbGlkZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiaXRlbSIsImZsYWciLCJnZXRBdHRyaWJ1dGUiLCJjaGlsZHJlbiIsImxlbmd0aCIsIiQiLCJzbGljayIsImRvdHMiLCJhdXRvcGxheSIsImFycm93cyIsInNsaWRlc1RvU2hvdyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJzZXRBdHRyaWJ1dGUiLCJ0aW1lciIsImdhbGxlcnlTbGlkZXJFdmVudCIsImlubml0RXZlbnRTbGlkZXIiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwicmVtb3ZlQXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIm1lbnVIZWlnaHQiLCJoZWlnaHQiLCJzY3JvbGxQb3NpdGlvbiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsInBhZ2VZT2Zmc2V0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInByb21vU2xpZGVyIiwicXVlcnlTZWxlY3RvciIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsImNoYW5nZVByb21vU2xpZGVySW1nIiwiaW1nQXJyIiwiaGFzQXR0cmlidXRlIiwiaW5uaXRTbGlkZXJSZWNvbW1lbmQiLCJkYXRhU2xpY2siLCJzbGlkZXJJdGVtTGVuZ3RoIiwic2xpY2tTbGlkZXJBY3RpdmUiLCJpbmZpbml0ZSIsInNsaWRlc1RvU2Nyb2xsIiwiY2VudGVyTW9kZSIsImNlbnRlclBhZGRpbmciLCJjYWxjSGVpZ2h0U2xpY2siLCJhZGFwdGl2ZUhlaWdodCIsInNwZWVkIiwiZmFuY3lCb3hJdGVtcyIsImFkZFJlbEF0dHJpYnV0ZSIsIml0ZW1BcnIiLCJpbm5pdFJlbGVhc2VzR2FsbGVyeSIsImZhbmN5Qm94TGlua3MiLCJmYW5jeWJveCIsInNvY2lhbExpa2VzIiwic2NyaXB0IiwiY3JlYXRlRWxlbWVudCIsInNyYyIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInJlcGxhY2VTb2NpYWxTaGFyZUJsb2NrIiwicmVwbGFjZVNvY2lhbFBhcmVudCIsInJlbW92ZWQiLCJyZXBsYWNlU29jaWFsQmxvY2siLCJwYXJlbnRBYm91dCIsInBhcmVudEluZm8iLCJpbm5pdFNsaWRlclNwZWNpYWxQcm9qZWN0cyIsIm5hdlNjcm9sbCIsIm5hdlNjcm9sbFBhcmVudCIsInBhcmVudEVsZW1lbnQiLCJuYXZTY3JvbGxIZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJldmVudE5hbWUiLCJ0ZXh0Q29udGVudCIsImV2ZW50QnRuIiwiZXZlbnRTY3JvbGxUYWJzIiwiY3VycmVudE5hdlNjcm9sbCIsImN1cnJlbnROYXZTY3JvbGxIZWlnaHQiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwicmVwbGFjZSIsImhvc3RuYW1lIiwidGFyZ2V0IiwiaGFzaCIsInNsaWNlIiwib2Zmc2V0IiwidG9wIiwiZXZlbnRCdG5DbG9uZWQiLCJjbG9uZU5vZGUiLCJhcHBlbmQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJmaXhOYXZTY3JvbGxQb3NpdGlvbiIsInN0eWxlIiwibmF2U2Nyb2xsUGFyZW50UG9zaXRpb24iLCJsZWZ0IiwicGFyc2VJbnQiLCJnZXRDb21wdXRlZFN0eWxlIiwicGFkZGluZ0xlZnQiLCJkYXRhc2V0IiwiYWN0aXZlIiwicGFkZGluZ1RvcCIsIm9wYWNpdHkiLCJ6SW5kZXgiLCJtYXBFbGVtZW50QXJyIiwiY3JlYXRlTWFya2VyIiwiY29vcmRpbmF0ZXMiLCJtYXAiLCJjb29yZGluYXRlUGFyc2UiLCJzcGxpdCIsImdvb2dsZSIsIm1hcHMiLCJNYXJrZXIiLCJwb3NpdGlvbiIsImxhdCIsInBhcnNlRmxvYXQiLCJ0cmltIiwibG5nIiwidGl0bGUiLCJzY2FsZSIsIm1hcEVsZW1lbnQiLCJtYXBTY2FsZSIsImRyYWciLCJzY3JvbGwiLCJ6b29tQXV0byIsImF1dG9ab29tIiwiYm91bmRzIiwiTGF0TG5nQm91bmRzIiwiY29vcmRpbmF0ZSIsIm1hcENvb3JkaW5hdGUiLCJtYXJrZXJzIiwiTWFwIiwiem9vbSIsImNlbnRlciIsIkxhdExuZyIsInBhbkNvbnRyb2wiLCJ6b29tQ29udHJvbCIsIm1hcFR5cGVDb250cm9sIiwic3RyZWV0Vmlld0NvbnRyb2wiLCJkcmFnZ2FibGUiLCJzY3JvbGx3aGVlbCIsIm1hcmtlciIsImV4dGVuZCIsInNldE1hcCIsImZpdEJvdW5kcyIsInBhblRvQm91bmRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsQ0FBQyxZQUFNO0FBQ0wsTUFBTUEsNkNBQW9CQyxTQUFTQyxnQkFBVCx5QkFBcEIsRUFBTjs7QUFFQSxNQUFJLENBQUNGLGFBQUwsRUFBb0IsT0FBTyxLQUFQOztBQUVwQkEsZ0JBQWNHLE9BQWQsQ0FBc0IsVUFBQ0MsSUFBRCxFQUFVOztBQUU5QixRQUFJQyxPQUFPRCxLQUFLRSxZQUFMLHVCQUFYOztBQUVBLFFBQUlGLEtBQUtHLFFBQUwsQ0FBY0MsTUFBZCxHQUF1QixDQUF2QixJQUE0QixDQUFDSCxJQUFqQyxFQUF1QztBQUNyQ0ksUUFBRUwsSUFBRixFQUFRTSxLQUFSLENBQWM7QUFDWkMsY0FBTSxJQURNO0FBRVpDLGtCQUFVLEtBRkU7QUFHWkMsZ0JBQVEsS0FISTtBQUlaQyxzQkFBYyxDQUpGO0FBS1pDLG9CQUFZLENBQ1Y7QUFDRUMsc0JBQVksR0FEZDtBQUVFQyxvQkFBVTtBQUNSSCww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QkFBZ0IsS0FMMEI7QUFNMUNDLDJCQUFtQixLQU51QjtBQU8xQ0MsbUJBQVdqQixJQVArQjtBQVExQ2tCLHFCQUFhakI7QUFSNkIsT0FBaEMsQ0FBWjs7QUFXQSxVQUFJSyxXQUFXaEksTUFBZixFQUF1QjtBQUNyQmtJLGtCQUFVRixXQUFXckIsR0FBWCxDQUFlLGdCQUFRO0FBQy9CLGNBQU1rQyxTQUFTcEMsYUFBYTdHLElBQWIsRUFBbUIrRyxHQUFuQixDQUFmOztBQUVBLGNBQUlpQixRQUFKLEVBQWNFLE9BQU9nQixNQUFQLENBQWMsSUFBSWhDLE9BQU9DLElBQVAsQ0FBWXVCLE1BQWhCLENBQXVCTyxPQUFPNUIsUUFBUCxDQUFnQkMsR0FBaEIsRUFBdkIsRUFBOEMyQixPQUFPNUIsUUFBUCxDQUFnQkksR0FBaEIsRUFBOUMsQ0FBZDs7QUFFZCxpQkFBT3dCLE1BQVA7QUFDRCxTQU5TLENBQVY7QUFPRDs7QUFFRCxVQUFJWCxRQUFRbEksTUFBWixFQUFvQmtJLFFBQVF2SSxPQUFSLENBQWdCO0FBQUEsZUFBVWtKLE9BQU9FLE1BQVAsQ0FBY3BDLEdBQWQsQ0FBVjtBQUFBLE9BQWhCOztBQUVwQixVQUFJaUIsUUFBSixFQUFjO0FBQ1pqQixZQUFJcUMsU0FBSixDQUFjbEIsTUFBZDtBQUNBbkIsWUFBSXNDLFdBQUosQ0FBZ0JuQixNQUFoQjtBQUNEO0FBQ0YsS0FyQ0Q7QUFzQ0Q7QUFDRixDQXRERCIsImZpbGUiOiJqcS10aGVhdHJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKCgpID0+IHtcbiAgY29uc3QgZ2FsbGVyeVNsaWRlciA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1nYWxsZXJ5LXNsaWRlcl1gKV07XG5cbiAgaWYgKCFnYWxsZXJ5U2xpZGVyKSByZXR1cm4gZmFsc2U7XG5cbiAgZ2FsbGVyeVNsaWRlci5mb3JFYWNoKChpdGVtKSA9PiB7XG5cbiAgICBsZXQgZmxhZyA9IGl0ZW0uZ2V0QXR0cmlidXRlKGBkYXRhLWdhbGxlcnktc2xpZGVyYCk7XG5cbiAgICBpZiAoaXRlbS5jaGlsZHJlbi5sZW5ndGggPiA0ICYmICFmbGFnKSB7XG4gICAgICAkKGl0ZW0pLnNsaWNrKHtcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBicmVha3BvaW50OiA3NjgsXG4gICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pO1xuXG4gICAgICBpdGVtLnNldEF0dHJpYnV0ZShgZGF0YS1nYWxsZXJ5LXNsaWRlcmAsIHRydWUpO1xuICAgIH1cbiAgfSlcbn0pKCk7XG5cblxuKCgpID0+IHtcblxuICBsZXQgdGltZXI7XG5cbiAgY29uc3QgZ2FsbGVyeVNsaWRlckV2ZW50ID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWdhbGxlcnktZXZlbnRdYCldO1xuXG4gIGlmICghZ2FsbGVyeVNsaWRlckV2ZW50KSByZXR1cm4gZmFsc2U7XG5cbiAgbGV0IGlubml0RXZlbnRTbGlkZXIgPSAoKCkgPT4ge1xuICAgIGdhbGxlcnlTbGlkZXJFdmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG5cbiAgICAgIGxldCBmbGFnID0gaXRlbS5nZXRBdHRyaWJ1dGUoYGRhdGEtc2xpZGVyLWFjdGl2ZWApO1xuXG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gMTAyNCAmJiAhZmxhZykge1xuICAgICAgICAkKGl0ZW0pLnNsaWNrKHtcbiAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcbiAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoYGRhdGEtc2xpZGVyLWFjdGl2ZWAsIHRydWUpO1xuXG4gICAgICB9IGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gMTAyNCAmJiBmbGFnKSB7XG4gICAgICAgICQoaXRlbSkuc2xpY2soYHVuc2xpY2tgKTtcbiAgICAgICAgaXRlbS5yZW1vdmVBdHRyaWJ1dGUoYGRhdGEtc2xpZGVyLWFjdGl2ZWApO1xuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgaW5uaXRFdmVudFNsaWRlcigpO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGByZXNpemVgLCAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcblxuICAgIHRpbWVyID0gc2V0VGltZW91dChpbm5pdEV2ZW50U2xpZGVyLCAzMDApO1xuICB9KTtcbn0pKCk7XG4iLCIkKFwiW2RhdGEtc2Nyb2xsLWFycl1cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBjb25zdCBtZW51SGVpZ2h0ID0gJChcIi5oZWFkZXJcIikuaGVpZ2h0KCksXG4gICAgICAgIHNjcm9sbFBvc2l0aW9uID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gKyBwYWdlWU9mZnNldCAtIG1lbnVIZWlnaHQ7XG5cbiAgJChcImh0bWwsYm9keVwiKS5hbmltYXRlKHtcbiAgICBzY3JvbGxUb3A6IHNjcm9sbFBvc2l0aW9uXG4gIH0sIDEwMDApO1xufSk7XG5cbigoKSA9PiB7XG4gIGNvbnN0IHByb21vU2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXByb21vLXNsaWRlcl1cIik7XG4gIGlmICghcHJvbW9TbGlkZXIpIHJldHVybiBmYWxzZTtcblxuICAkKHByb21vU2xpZGVyKS5zbGljayh7XG4gICAgZG90czogZmFsc2UsXG4gICAgcHJldkFycm93OiAkKGBbZGF0YS1wcm9tby1zbGlkZXItYnRuLXByZXZdYCksXG4gICAgbmV4dEFycm93OiAkKGBbZGF0YS1wcm9tby1zbGlkZXItYnRuLW5leHRdYClcbiAgfSk7XG59KSgpO1xuXG5cbjsoKCkgPT4ge1xuICBsZXQgY2hhbmdlUHJvbW9TbGlkZXJJbWcgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBpbWdBcnIgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtcHJvbW8tbW9iaWxlLXVybF1gKV07XG4gICAgaW1nQXJyLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmKCFpbWdBcnIpIHJldHVybiBmYWxzZTtcblxuICAgICAgaWYod2luZG93LmlubmVyV2lkdGggPD0gMzc1KXtcbiAgICAgICAgaWYoIWl0ZW0uaGFzQXR0cmlidXRlKGBkYXRhLXByb21vLW1vYmlsZS11cmwtYWN0aXZlYCkpe1xuICAgICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKGBkYXRhLXByb21vLWRlc2t0b3AtdXJsYCwgaXRlbS5nZXRBdHRyaWJ1dGUoYHNyY2ApKTtcbiAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZShgc3JjYCwgaXRlbS5nZXRBdHRyaWJ1dGUoYGRhdGEtcHJvbW8tbW9iaWxlLXVybGApKTtcbiAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZShgZGF0YS1wcm9tby1tb2JpbGUtdXJsLWFjdGl2ZWAsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZihpdGVtLmhhc0F0dHJpYnV0ZShgZGF0YS1wcm9tby1tb2JpbGUtdXJsLWFjdGl2ZWApKXtcbiAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZShgZGF0YS1wcm9tby1tb2JpbGUtdXJsYCwgaXRlbS5nZXRBdHRyaWJ1dGUoYHNyY2ApKTtcbiAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZShgc3JjYCwgaXRlbS5nZXRBdHRyaWJ1dGUoYGRhdGEtcHJvbW8tZGVza3RvcC11cmxgKSk7XG4gICAgICAgICAgaXRlbS5yZW1vdmVBdHRyaWJ1dGUoYGRhdGEtcHJvbW8tbW9iaWxlLXVybC1hY3RpdmVgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlUHJvbW9TbGlkZXJJbWcoKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoYHJlc2l6ZWAsIGNoYW5nZVByb21vU2xpZGVySW1nKTtcbn0pKCk7XG4iLCIoKCkgPT4ge1xuICBsZXQgdGltZXI7XG5cbiAgY29uc3QgaW5uaXRTbGlkZXJSZWNvbW1lbmQgPSAoKSA9PiB7XG4gICAgY29uc3QgZGF0YVNsaWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtc2xpY2stc2xpZGVyLXJlY29tbWVuZF1gKTtcbiAgICBpZiAoIWRhdGFTbGljaykgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3Qgc2xpZGVySXRlbUxlbmd0aCA9IGRhdGFTbGljay5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1zbGlkZXItaXRlbV1gKS5sZW5ndGgsXG4gICAgICAgICAgc2xpY2tTbGlkZXJBY3RpdmUgPSBkYXRhU2xpY2suZ2V0QXR0cmlidXRlKGBkYXRhLXNsaWNrLXNsaWRlci1yZWNvbW1lbmRgKTtcblxuICAgIGlmIChzbGlkZXJJdGVtTGVuZ3RoID4gNCB8fCB3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgaWYgKHNsaWNrU2xpZGVyQWN0aXZlKSByZXR1cm4gZmFsc2U7XG4gICAgICBkYXRhU2xpY2suc2V0QXR0cmlidXRlKGBkYXRhLXNsaWNrLXNsaWRlci1yZWNvbW1lbmRgLCB0cnVlKTtcblxuICAgICAgJChkYXRhU2xpY2spLnNsaWNrKHtcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBicmVha3BvaW50OiA3NjgsXG4gICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6IGA4MHB4YCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2UsXG4gICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pO1xuXG4gICAgICBjYWxjSGVpZ2h0U2xpY2soJChgW2RhdGEtc2xpY2stc2xpZGVyLXJlY29tbWVuZF1gKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghc2xpY2tTbGlkZXJBY3RpdmUpIHJldHVybiBmYWxzZTtcblxuICAgICAgJChkYXRhU2xpY2spLnNsaWNrKGB1bnNsaWNrYCk7XG4gICAgICBkYXRhU2xpY2suc2V0QXR0cmlidXRlKGBkYXRhLXNsaWNrLXNsaWRlci1yZWNvbW1lbmRgLCBgYCk7XG4gICAgfVxuICB9O1xuXG4gIGlubml0U2xpZGVyUmVjb21tZW5kKCk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGByZXNpemVgLCAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcblxuICAgIHRpbWVyID0gc2V0VGltZW91dChpbm5pdFNsaWRlclJlY29tbWVuZCwgMzAwKTtcbiAgfSk7XG59KSgpO1xuIiwiKCgpID0+IHtcbiAgaWYgKCQoYC5yZWxlYXNlcy1tZWRpYWApKSB7XG4gICAgaWYgKCQoYFtkYXRhLXNsaWNrLXNsaWRlci1yZWxlYXNlc11gKSkge1xuXG4gICAgICAgICQoYC5yZWxlYXNlcy1tZWRpYSBbZGF0YS1zbGljay1zbGlkZXItcmVsZWFzZXNdYCkuc2xpY2soe1xuICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWUsXG4gICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTQwMCxcbiAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcyMC44NiUnLFxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjgsXG4gICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzQwcHgnLFxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODAsXG4gICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzIwcHgnLFxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9KTtcblxuICAgICAgICBjYWxjSGVpZ2h0U2xpY2soJChgLnJlbGVhc2VzLW1lZGlhYCkpO1xuICAgICAgfVxuXG4gICAgaWYgKCQoYFtkYXRhLWZhbmN5Ym94PWdhbGxlcnldYCkpIHtcbiAgICAgIHZhciBmYW5jeUJveEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtc2xpZGVyLWl0ZW1dOm5vdCguc2xpY2stY2xvbmVkKSBbZGF0YS1mYW5jeWJveD1nYWxsZXJ5XWApXG5cbiAgICAgIGNvbnN0IGFkZFJlbEF0dHJpYnV0ZSA9IChpdGVtQXJyKSA9PiBbLi4uaXRlbUFycl0uZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5zZXRBdHRyaWJ1dGUoYHJlbGAsIGBncm91cC1yZWxlYXNlcy1tZWRpYWApKTtcblxuICAgICAgY29uc3QgaW5uaXRSZWxlYXNlc0dhbGxlcnkgPSAoaXRlbUFycikgPT4ge1xuICAgICAgICBjb25zdCBmYW5jeUJveExpbmtzID0gJChgYVtyZWw9Z3JvdXAtcmVsZWFzZXMtbWVkaWFdYCk7XG5cbiAgICAgICAgaWYgKGZhbmN5Qm94TGlua3MpIGZhbmN5Qm94TGlua3MuZmFuY3lib3goKTtcbiAgICAgIH07XG5cbiAgICAgIGFkZFJlbEF0dHJpYnV0ZShmYW5jeUJveEl0ZW1zKTtcbiAgICAgIGlubml0UmVsZWFzZXNHYWxsZXJ5KGZhbmN5Qm94SXRlbXMpO1xuICAgIH1cbiAgfVxufSkoKTtcbiIsIigoKSA9PiB7XG4gIGNvbnN0IHNvY2lhbExpa2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtc29jaWFsLWxpa2VzXWApO1xuXG4gIGlmICghc29jaWFsTGlrZXMpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzY3JpcHRgKTtcbiAgICAgICAgc2NyaXB0LnNyYyA9IGBodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3NvY2lhbC1saWtlcy9kaXN0L3NvY2lhbC1saWtlcy5taW4uanNgO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblxuICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihgbG9hZGAsIChlKSA9PiB7XG4gICAgJChgW2RhdGEtc29jaWFsLWxpa2VzLWxpc3RdYCkuc29jaWFsTGlrZXMoKTtcbiAgfSk7XG59KSgpO1xuXG5cbi8vIHJlbW92ZSBzb2NpYWwtc2hhcmUgb24gZGVzY3JpcHRpb24gYmxvY2tcbigoKSA9PiB7XG4gIGNvbnN0IHJlcGxhY2VTb2NpYWxTaGFyZUJsb2NrID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCByZXBsYWNlU29jaWFsUGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcmVwbGFjZS1zb2NpYWwtc2hhcmVdYCk7XG4gICAgaWYgKCFyZXBsYWNlU29jaWFsUGFyZW50KSByZXR1cm4gZmFsc2U7XG5cbiAgICBsZXQgcmVtb3ZlZCA9IHJlcGxhY2VTb2NpYWxQYXJlbnQuZ2V0QXR0cmlidXRlKGBkYXRhLXJlcGxhY2Utc29jaWFsLXNoYXJlYCksXG4gICAgICAgIHJlcGxhY2VTb2NpYWxCbG9jayA9IHJlcGxhY2VTb2NpYWxQYXJlbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcmVwbGFjZS1zb2NpYWwtc2hhcmUtYmxvY2tdYCksXG4gICAgICAgIHBhcmVudEFib3V0ID0gcmVwbGFjZVNvY2lhbFBhcmVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hYm91dF1gKTtcbiAgICBpZiAoIXJlbW92ZWQpIHtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCAmJiByZXBsYWNlU29jaWFsQmxvY2spIHtcbiAgICAgICAgcGFyZW50QWJvdXQuYXBwZW5kQ2hpbGQocmVwbGFjZVNvY2lhbEJsb2NrKTtcbiAgICAgICAgcmVwbGFjZVNvY2lhbFBhcmVudC5zZXRBdHRyaWJ1dGUoYGRhdGEtcmVwbGFjZS1zb2NpYWwtc2hhcmVgLCBgcmVtb3ZlZGApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gNzY4ICYmIHJlcGxhY2VTb2NpYWxCbG9jaykge1xuICAgICAgICBsZXQgcGFyZW50SW5mbyA9IHJlcGxhY2VTb2NpYWxQYXJlbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaW5mb11gKTtcbiAgICAgICAgcGFyZW50SW5mby5hcHBlbmRDaGlsZChyZXBsYWNlU29jaWFsQmxvY2spO1xuICAgICAgICByZXBsYWNlU29jaWFsUGFyZW50LnNldEF0dHJpYnV0ZShgZGF0YS1yZXBsYWNlLXNvY2lhbC1zaGFyZWAsIGBgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXBsYWNlU29jaWFsU2hhcmVCbG9jaygpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgcmVzaXplYCwgcmVwbGFjZVNvY2lhbFNoYXJlQmxvY2spO1xufSkoKTtcbiIsIi8vIGlubml0IFNsaWNrIFNsaWRlciBmb3IgU3BlY2lhbCBQcm9qZWN0c1xuKCgpID0+IHtcbiAgbGV0IHRpbWVyO1xuXG4gIGNvbnN0IGlubml0U2xpZGVyU3BlY2lhbFByb2plY3RzID0gKCkgPT4ge1xuICAgIGNvbnN0IGRhdGFTbGljayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNsaWNrLXNsaWRlci1zcGVjaWFsLXByb2plY3RzXWApO1xuICAgIGlmICghZGF0YVNsaWNrKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBzbGlkZXJJdGVtTGVuZ3RoID0gZGF0YVNsaWNrLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXNsaWRlci1pdGVtXWApLmxlbmd0aCxcbiAgICAgICAgICBzbGlja1NsaWRlckFjdGl2ZSA9IGRhdGFTbGljay5nZXRBdHRyaWJ1dGUoYGRhdGEtc2xpY2stc2xpZGVyLXNwZWNpYWwtcHJvamVjdHNgKTtcblxuICAgIGlmIChzbGlkZXJJdGVtTGVuZ3RoID4gMiB8fCB3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgaWYgKHNsaWNrU2xpZGVyQWN0aXZlKSByZXR1cm4gZmFsc2U7XG4gICAgICBkYXRhU2xpY2suc2V0QXR0cmlidXRlKGBkYXRhLXNsaWNrLXNsaWRlci1zcGVjaWFsLXByb2plY3RzYCwgdHJ1ZSk7XG5cbiAgICAgICQoZGF0YVNsaWNrKS5zbGljayh7XG4gICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgYnJlYWtwb2ludDogNzY4LFxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiBgODBweGAsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KTtcblxuICAgICAgY2FsY0hlaWdodFNsaWNrKCQoYFtkYXRhLXNsaWNrLXNsaWRlci1zcGVjaWFsLXByb2plY3RzXWApKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFzbGlja1NsaWRlckFjdGl2ZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAkKGRhdGFTbGljaykuc2xpY2soYHVuc2xpY2tgKTtcbiAgICAgIGRhdGFTbGljay5zZXRBdHRyaWJ1dGUoYGRhdGEtc2xpY2stc2xpZGVyLXNwZWNpYWwtcHJvamVjdHNgLCBgYCk7XG4gICAgfVxuICB9O1xuXG4gIGlubml0U2xpZGVyU3BlY2lhbFByb2plY3RzKCk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGByZXNpemVgLCAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcblxuICAgIHRpbWVyID0gc2V0VGltZW91dChpbm5pdFNsaWRlclNwZWNpYWxQcm9qZWN0cywgMzAwKTtcbiAgfSk7XG59KSgpO1xuIiwiKCgpID0+IHtcblxuICBjb25zdCBuYXZTY3JvbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1uYXYtc2Nyb2xsXWApO1xuXG4gIGlmICghbmF2U2Nyb2xsKSByZXR1cm4gZmFsc2U7XG5cblxuICBsZXQgbmF2U2Nyb2xsUGFyZW50ID0gbmF2U2Nyb2xsLnBhcmVudEVsZW1lbnQsXG4gICAgICAgIG5hdlNjcm9sbEhlaWdodCA9IG5hdlNjcm9sbC5vZmZzZXRIZWlnaHQsXG4gICAgICAgIGV2ZW50TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWV2ZW50LW5hbWVdYCkudGV4dENvbnRlbnQsXG4gICAgICAgIGV2ZW50QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtZXZlbnQtYnRuXWApLFxuICAgICAgICBldmVudFNjcm9sbFRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ldmVudC1zY3JvbGwtdGFic11gKTtcblxuICAkKGBhW2RhdGEtc2Nyb2xsXWApLm9uKGBjbGlja2AsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGN1cnJlbnROYXZTY3JvbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1uYXYtc2Nyb2xsXWApLFxuICAgICAgICAgIGN1cnJlbnROYXZTY3JvbGxIZWlnaHQgPSBjdXJyZW50TmF2U2Nyb2xsLm9mZnNldEhlaWdodDtcblxuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLyxgKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLGApICYmIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWUpIHtcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJChgW25hbWU9YCArIHRoaXMuaGFzaC5zbGljZSgxKSArYF1gKTtcblxuICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgJChgaHRtbCxib2R5YCkuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wIC0gY3VycmVudE5hdlNjcm9sbEhlaWdodFxuICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaWYoZXZlbnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ldmVudC1idG5dYCkpIHtcbiAgICBjb25zdCBldmVudEJ0bkNsb25lZCA9IGV2ZW50QnRuLmNsb25lTm9kZSh0cnVlKTtcbiAgICBldmVudFNjcm9sbFRhYnMuYXBwZW5kKGV2ZW50QnRuQ2xvbmVkKTtcbiAgfVxuICBldmVudFNjcm9sbFRhYnMuaW5zZXJ0QWRqYWNlbnRIVE1MKGBhZnRlckJlZ2luYCwgYDxwIGRhdGEtZXZlbnQtbmFtZSBjbGFzcz1cInRhYnNfX3RpdGxlXCI+JHtldmVudE5hbWV9PC9wPmApO1xuXG4gIGNvbnN0IGZpeE5hdlNjcm9sbFBvc2l0aW9uID0gKCkgPT4ge1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgaWYobmF2U2Nyb2xsLmhhc0F0dHJpYnV0ZShgZGF0YS1hY3RpdmVgKSkge1xuICAgICAgICBuYXZTY3JvbGwucmVtb3ZlQXR0cmlidXRlKGBkYXRhLWFjdGl2ZWApO1xuICAgICAgICBuYXZTY3JvbGwuc3R5bGUgPSBgYDtcbiAgICAgICAgbmF2U2Nyb2xsUGFyZW50LnN0eWxlID0gYGA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5hdlNjcm9sbFBhcmVudFBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICB0b3A6IG5hdlNjcm9sbFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AsXG4gICAgICAgICAgICAgIGxlZnQ6IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSkucGFkZGluZ0xlZnQpLFxuICAgICAgICAgICAgICBoZWlnaHQ6IG5hdlNjcm9sbFBhcmVudC5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgIH07XG5cbiAgICAgIGlmIChuYXZTY3JvbGxQYXJlbnRQb3NpdGlvbi50b3AgPCAwKSB7XG4gICAgICAgIG5hdlNjcm9sbC5kYXRhc2V0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIG5hdlNjcm9sbC5zdHlsZS5sZWZ0ID0gYCR7bmF2U2Nyb2xsUGFyZW50UG9zaXRpb24ubGVmdH1weGA7XG4gICAgICAgIG5hdlNjcm9sbFBhcmVudC5zdHlsZS5wYWRkaW5nVG9wID0gYCR7bmF2U2Nyb2xsSGVpZ2h0fXB4YDtcblxuICAgICAgICBpZiAobmF2U2Nyb2xsUGFyZW50UG9zaXRpb24udG9wICsgbmF2U2Nyb2xsUGFyZW50UG9zaXRpb24uaGVpZ2h0IDwgMCkge1xuICAgICAgICAgIG5hdlNjcm9sbC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICBuYXZTY3JvbGwuc3R5bGUuekluZGV4ID0gLTE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmF2U2Nyb2xsLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgIG5hdlNjcm9sbC5zdHlsZS56SW5kZXggPSBgYDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmF2U2Nyb2xsLnJlbW92ZUF0dHJpYnV0ZShgZGF0YS1hY3RpdmVgKTtcbiAgICAgICAgbmF2U2Nyb2xsLnN0eWxlID0gYGA7XG4gICAgICAgIG5hdlNjcm9sbFBhcmVudC5zdHlsZSA9IGBgO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgc2Nyb2xsYCwgZml4TmF2U2Nyb2xsUG9zaXRpb24pO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgcmVzaXplYCwgZml4TmF2U2Nyb2xsUG9zaXRpb24pO1xufSkoKTtcblxuIiwiKCgpID0+IHtcbiAgY29uc3QgbWFwRWxlbWVudEFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLW1hcF1gKTtcblxuICBpZiAobWFwRWxlbWVudEFycikge1xuICAgIGNvbnN0IGNyZWF0ZU1hcmtlciA9IChjb29yZGluYXRlcywgbWFwKSA9PiB7XG4gICAgICBjb25zdCBjb29yZGluYXRlUGFyc2UgPSBjb29yZGluYXRlcy5zcGxpdChgLGApO1xuXG4gICAgICByZXR1cm4gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgIHBvc2l0aW9uOiB7bGF0OiBwYXJzZUZsb2F0KGNvb3JkaW5hdGVQYXJzZVswXS50cmltKCkpLCBsbmc6IHBhcnNlRmxvYXQoY29vcmRpbmF0ZVBhcnNlWzFdLnRyaW0oKSl9LFxuICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgdGl0bGU6IGBgLFxuICAgICAgICB6SW5kZXg6IDk5OTlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFsuLi5tYXBFbGVtZW50QXJyXS5mb3JFYWNoKG1hcEVsZW1lbnQgPT4ge1xuICAgICAgY29uc3Qgc2NhbGUgPSBwYXJzZUZsb2F0KG1hcEVsZW1lbnQuZGF0YXNldC5tYXBTY2FsZSkgfHwgMTEsXG4gICAgICAgICAgICBkcmFnID0gdHJ1ZSxcbiAgICAgICAgICAgIHNjcm9sbCA9IGZhbHNlLFxuICAgICAgICAgICAgem9vbUF1dG8gPSBtYXBFbGVtZW50LmRhdGFzZXQuYXV0b1pvb20gfHwgZmFsc2UsXG4gICAgICAgICAgICBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCksXG4gICAgICAgICAgICBjb29yZGluYXRlID0gbWFwRWxlbWVudC5kYXRhc2V0Lm1hcENvb3JkaW5hdGUuc3BsaXQoYDtgKTtcblxuICAgICAgbGV0IG1hcmtlcnMgPSBbXTtcblxuICAgICAgY29uc3QgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChtYXBFbGVtZW50LCB7XG4gICAgICAgIHpvb206IHNjYWxlLFxuICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcocGFyc2VGbG9hdChjb29yZGluYXRlWzBdLnNwbGl0KGAsYClbMF0udHJpbSgpKSwgcGFyc2VGbG9hdChjb29yZGluYXRlWzBdLnNwbGl0KGAsYClbMV0udHJpbSgpKSksXG4gICAgICAgIHBhbkNvbnRyb2w6IGZhbHNlLFxuICAgICAgICB6b29tQ29udHJvbDogZmFsc2UsXG4gICAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcbiAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxuICAgICAgICBkcmFnZ2FibGU6IGRyYWcsXG4gICAgICAgIHNjcm9sbHdoZWVsOiBzY3JvbGxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoY29vcmRpbmF0ZS5sZW5ndGgpIHtcbiAgICAgICAgbWFya2VycyA9IGNvb3JkaW5hdGUubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgIGNvbnN0IG1hcmtlciA9IGNyZWF0ZU1hcmtlcihpdGVtLCBtYXApO1xuXG4gICAgICAgICAgaWYgKHpvb21BdXRvKSBib3VuZHMuZXh0ZW5kKG5ldyBnb29nbGUubWFwcy5MYXRMbmcobWFya2VyLnBvc2l0aW9uLmxhdCgpLCBtYXJrZXIucG9zaXRpb24ubG5nKCkpKTtcblxuICAgICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAobWFya2Vycy5sZW5ndGgpIG1hcmtlcnMuZm9yRWFjaChtYXJrZXIgPT4gbWFya2VyLnNldE1hcChtYXApKTtcblxuICAgICAgaWYgKHpvb21BdXRvKSB7XG4gICAgICAgIG1hcC5maXRCb3VuZHMoYm91bmRzKTtcbiAgICAgICAgbWFwLnBhblRvQm91bmRzKGJvdW5kcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
