"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Innit slick always slider global

;(function () {
  var timer = void 0;

  var innitAlwaysSlider = function innitAlwaysSlider() {
    var alwaysSliderArr = [].concat(_toConsumableArray(document.querySelectorAll("[data-slick-slider]")));
    if (!alwaysSliderArr) return false;

    alwaysSliderArr.forEach(function (item) {
      if (item.hasAttribute("data-without-slider")) return false;

      var sliderItemLength = item.querySelectorAll("[data-slider-item]").length,
          slickSliderActive = item.getAttribute("data-slick-slider");

      if (sliderItemLength > 3 || window.innerWidth < 768) {
        var _$$slick;

        if (slickSliderActive) return false;
        item.setAttribute("data-slick-slider", true);

        $(item).slick((_$$slick = {
          dots: true,
          autoplay: true,
          arrows: false,
          slidesToShow: 3,
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

        calcHeightSlick($(item));
      } else {
        if (!slickSliderActive) return false;

        item.setAttribute("data-slick-slider", "");
        $(item).slick("unslick");
      }
    });
  };

  innitAlwaysSlider();

  window.addEventListener("resize", function () {
    clearTimeout(timer);

    timer = setTimeout(innitAlwaysSlider, 300);
  });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbC9qcS1nbG9iYWwtc2xpZGVyLmpzIl0sIm5hbWVzIjpbInRpbWVyIiwiaW5uaXRBbHdheXNTbGlkZXIiLCJhbHdheXNTbGlkZXJBcnIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiaXRlbSIsImhhc0F0dHJpYnV0ZSIsInNsaWRlckl0ZW1MZW5ndGgiLCJsZW5ndGgiLCJzbGlja1NsaWRlckFjdGl2ZSIsImdldEF0dHJpYnV0ZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJzZXRBdHRyaWJ1dGUiLCIkIiwic2xpY2siLCJkb3RzIiwiYXV0b3BsYXkiLCJhcnJvd3MiLCJzbGlkZXNUb1Nob3ciLCJpbmZpbml0ZSIsInNsaWRlc1RvU2Nyb2xsIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwiY2VudGVyTW9kZSIsImNlbnRlclBhZGRpbmciLCJjYWxjSGVpZ2h0U2xpY2siLCJhZGRFdmVudExpc3RlbmVyIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7O0FBRUEsQ0FBQyxDQUFDLFlBQU07QUFDTixNQUFJQSxjQUFKOztBQUVBLE1BQU1DLG9CQUFvQixTQUFwQkEsaUJBQW9CLEdBQU07QUFDOUIsUUFBTUMsK0NBQXNCQyxTQUFTQyxnQkFBVCx1QkFBdEIsRUFBTjtBQUNBLFFBQUcsQ0FBQ0YsZUFBSixFQUFxQixPQUFPLEtBQVA7O0FBRXJCQSxvQkFBZ0JHLE9BQWhCLENBQXdCLFVBQUNDLElBQUQsRUFBVTtBQUNoQyxVQUFHQSxLQUFLQyxZQUFMLHVCQUFILEVBQTZDLE9BQU8sS0FBUDs7QUFFN0MsVUFBTUMsbUJBQW1CRixLQUFLRixnQkFBTCx1QkFBNENLLE1BQXJFO0FBQUEsVUFDTUMsb0JBQW9CSixLQUFLSyxZQUFMLHFCQUQxQjs7QUFHRSxVQUFJSCxtQkFBbUIsQ0FBbkIsSUFBd0JJLE9BQU9DLFVBQVAsR0FBb0IsR0FBaEQsRUFBcUQ7QUFBQTs7QUFDbkQsWUFBSUgsaUJBQUosRUFBdUIsT0FBTyxLQUFQO0FBQ3ZCSixhQUFLUSxZQUFMLHNCQUF1QyxJQUF2Qzs7QUFFQUMsVUFBRVQsSUFBRixFQUFRVSxLQUFSO0FBQ0VDLGdCQUFNLElBRFI7QUFFRUMsb0JBQVUsSUFGWjtBQUdFQyxrQkFBUSxLQUhWO0FBSUVDLHdCQUFjLENBSmhCO0FBS0VDLG9CQUFVLElBTFo7QUFNRUMsMEJBQWdCO0FBTmxCLGlEQU9ZLEtBUFosMkNBUWMsQ0FDVjtBQUNFQyxzQkFBWSxHQURkO0FBRUVDLG9CQUFVO0FBQ1JDLHdCQUFZLElBREo7QUFFUkwsMEJBQWMsQ0FGTjtBQUdSTTtBQUhRO0FBRlosU0FEVSxFQVNWO0FBQ0VILHNCQUFZLEdBRGQ7QUFFSUMsb0JBQVU7QUFDVkMsd0JBQVksS0FERjtBQUVWTCwwQkFBYztBQUZKO0FBRmQsU0FUVSxDQVJkOztBQTJCQU8sd0JBQWdCWixFQUFFVCxJQUFGLENBQWhCO0FBQ0QsT0FoQ0QsTUFnQ087QUFDTCxZQUFJLENBQUNJLGlCQUFMLEVBQXdCLE9BQU8sS0FBUDs7QUFFeEJKLGFBQUtRLFlBQUw7QUFDQUMsVUFBRVQsSUFBRixFQUFRVSxLQUFSO0FBQ0Q7QUFDSixLQTVDRDtBQTZDRCxHQWpERDs7QUFtREFmOztBQUVBVyxTQUFPZ0IsZ0JBQVAsV0FBa0MsWUFBTTtBQUN0Q0MsaUJBQWE3QixLQUFiOztBQUVBQSxZQUFROEIsV0FBVzdCLGlCQUFYLEVBQThCLEdBQTlCLENBQVI7QUFDRCxHQUpEO0FBS0QsQ0E3REEiLCJmaWxlIjoianEtZ2xvYmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBJbm5pdCBzbGljayBhbHdheXMgc2xpZGVyIGdsb2JhbFxuXG47KCgpID0+IHtcbiAgbGV0IHRpbWVyO1xuXG4gIGNvbnN0IGlubml0QWx3YXlzU2xpZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGFsd2F5c1NsaWRlckFyciA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1zbGljay1zbGlkZXJdYCldO1xuICAgIGlmKCFhbHdheXNTbGlkZXJBcnIpIHJldHVybiBmYWxzZTtcblxuICAgIGFsd2F5c1NsaWRlckFyci5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZihpdGVtLmhhc0F0dHJpYnV0ZShgZGF0YS13aXRob3V0LXNsaWRlcmApKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIGNvbnN0IHNsaWRlckl0ZW1MZW5ndGggPSBpdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXNsaWRlci1pdGVtXWApLmxlbmd0aCxcbiAgICAgICAgICAgIHNsaWNrU2xpZGVyQWN0aXZlID0gaXRlbS5nZXRBdHRyaWJ1dGUoYGRhdGEtc2xpY2stc2xpZGVyYCk7XG5cbiAgICAgICAgaWYgKHNsaWRlckl0ZW1MZW5ndGggPiAzIHx8IHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgICAgaWYgKHNsaWNrU2xpZGVyQWN0aXZlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoYGRhdGEtc2xpY2stc2xpZGVyYCwgdHJ1ZSk7XG5cbiAgICAgICAgICAkKGl0ZW0pLnNsaWNrKHtcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY4LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogYDgwcHhgLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNhbGNIZWlnaHRTbGljaygkKGl0ZW0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIXNsaWNrU2xpZGVyQWN0aXZlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZShgZGF0YS1zbGljay1zbGlkZXJgLCBgYCk7XG4gICAgICAgICAgJChpdGVtKS5zbGljayhgdW5zbGlja2ApO1xuICAgICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpbm5pdEFsd2F5c1NsaWRlcigpO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGByZXNpemVgLCAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcblxuICAgIHRpbWVyID0gc2V0VGltZW91dChpbm5pdEFsd2F5c1NsaWRlciwgMzAwKTtcbiAgfSk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
