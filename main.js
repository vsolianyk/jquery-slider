$(function() {

  $.fn.slide = function (config) {
    var slides = this.find('.carousel-item');
    var left = this.find('.to-left');
    var right = this.find('.to-right');
    var height = 100000000;

    slides.each(function() {
      height = Math.min(height, $(this).height());
    });
    this.find('.carousel').height(height);

    var activeIndex = 0;
    var isActiveAnim = false;
    $(slides[activeIndex]).addClass('active');

    function slideRight() {
      var nextIndex;
      isActiveAnim = true;
      if(activeIndex < slides.length - 1) {
        nextIndex = activeIndex + 1;
      } else {
        nextIndex = 0;
      }
      $(slides[activeIndex]).animate({left: '100%' }, 500, function () {
        $(this).removeClass('active')
      })
      $(slides[nextIndex]).css({left: '-100%' });

      $(slides[nextIndex]).animate({left: '0%' }, 500, function () {
        $(this).addClass('active')
        activeIndex = nextIndex;
        isActiveAnim = false;
      })
    }
    function slideLeft() {
      var nextIndex;
      isActiveAnim = true;
      if(activeIndex > 0) {
        nextIndex = activeIndex - 1;
      } else {
        nextIndex = slides.length - 1;
      }
      $(slides[activeIndex]).animate({left: '-100%' }, 500, function () {
        $(this).removeClass('active');
      })
      $(slides[nextIndex]).css({left: '100%' });
      $(slides[nextIndex]).animate({left: '0%' }, 500, function () {
        $(this).addClass('active')
        activeIndex = nextIndex;
        isActiveAnim = false;
      })
    }

    function setAutoSlide() {
      interval = setInterval(function () {
          slideRight();
      }, 2000);
    }

    var interval = null;

    if(config.autoslide) {
      setAutoSlide();
    }

    if(config.showControls) {
      right.on('click', function() {
        if(isActiveAnim) return;
        clearInterval(interval);
        slideRight();
        setAutoSlide();
      });
      left.on('click', function() {
        if(isActiveAnim) return;
        clearInterval(interval);
        slideLeft();
        setAutoSlide();
      });
    }

  }


  $('#slider').slide({
    autoslide: true,
    slideAnimation: 'slide',
    showControls: true
  })
});
