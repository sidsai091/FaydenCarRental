// ============================================
// DriveLux - Main JavaScript
// ============================================

// Mobile Menu Toggle
(function () {
  var toggle = document.getElementById('navToggle');
  var mobile = document.getElementById('navMobile');
  var menuIcon = document.getElementById('menuIcon');
  var closeIcon = document.getElementById('closeIcon');

  toggle.addEventListener('click', function () {
    var isOpen = mobile.classList.toggle('open');
    menuIcon.style.display = isOpen ? 'none' : 'block';
    closeIcon.style.display = isOpen ? 'block' : 'none';
  });

  mobile.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobile.classList.remove('open');
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    });
  });
})();

// FAQ Accordion
(function () {
  var questions = document.querySelectorAll('.faq-question');

  questions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var answer = this.nextElementSibling;
      var isActive = this.classList.contains('active');

      // Close all
      questions.forEach(function (q) {
        q.classList.remove('active');
        q.setAttribute('aria-expanded', 'false');
        q.nextElementSibling.classList.remove('open');
      });

      // Open clicked (if it wasn't already open)
      if (!isActive) {
        this.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });
})();

// Vehicle Image Carousel
(function () {
  var isMobile = window.matchMedia('(max-width: 639px)');

  document.querySelectorAll('.vehicle-card').forEach(function (card) {
    var inner = card.querySelector('.vehicle-image-inner');
    var imgs = card.querySelectorAll('.vehicle-image-inner img');
    var dots = card.querySelectorAll('.vehicle-dot');
    var prev = card.querySelector('.vehicle-nav-prev');
    var next = card.querySelector('.vehicle-nav-next');
    var current = 0;
    var total = imgs.length;

    function show(index) {
      current = ((index % total) + total) % total;
      imgs.forEach(function (img, i) {
        img.className = i === current ? 'visible' : 'hidden';
      });
      dots.forEach(function (dot, i) {
        dot.className = 'vehicle-dot' + (i === current ? ' active' : '');
      });
    }

    // Desktop: prev/next buttons
    prev.addEventListener('click', function () {
      if (!isMobile.matches) show(current - 1);
    });
    next.addEventListener('click', function () {
      if (!isMobile.matches) show(current + 1);
    });

    // Dot clicks
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        if (isMobile.matches) {
          imgs[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        } else {
          show(i);
        }
      });
    });

    // Mobile: scroll-based dot update
    inner.addEventListener('scroll', function () {
      if (!isMobile.matches) return;
      var scrollLeft = inner.scrollLeft;
      var width = inner.offsetWidth;
      var activeIndex = Math.round(scrollLeft / width);
      activeIndex = Math.max(0, Math.min(activeIndex, total - 1));
      current = activeIndex;
      dots.forEach(function (dot, i) {
        dot.className = 'vehicle-dot' + (i === activeIndex ? ' active' : '');
      });
    });

    // Lightbox on image click
    imgs.forEach(function (img) {
      img.addEventListener('click', function () {
        document.getElementById('lightboxImg').src = this.src;
        document.getElementById('lightbox').classList.add('open');
      });
    });
  });
})();

// Lightbox Close
(function () {
  var lightbox = document.getElementById('lightbox');

  document.getElementById('lightboxClose').addEventListener('click', function () {
    lightbox.classList.remove('open');
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('open');
    }
  });
})();

// Reasons Slider (mobile)
(function () {
  var slider = document.querySelector('.reasons-slider');
  var dots = document.querySelectorAll('.reasons-dots button');
  if (!slider || !dots.length) return;

  function updateDots() {
    var cards = slider.querySelectorAll('.reason-card');
    var scrollLeft = slider.scrollLeft;
    var sliderWidth = slider.offsetWidth;
    var activeIndex = 0;
    var minDist = Infinity;

    cards.forEach(function (card, i) {
      var cardCenter = card.offsetLeft + card.offsetWidth / 2;
      var dist = Math.abs(cardCenter - scrollLeft - sliderWidth / 2);
      if (dist < minDist) {
        minDist = dist;
        activeIndex = i;
      }
    });

    dots.forEach(function (dot, i) {
      dot.className = i === activeIndex ? 'active' : '';
    });
  }

  slider.addEventListener('scroll', updateDots);

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      var cards = slider.querySelectorAll('.reason-card');
      if (cards[i]) {
        var cardLeft = cards[i].offsetLeft;
        var offset = cardLeft - (slider.offsetWidth - cards[i].offsetWidth) / 2;
        slider.scrollTo({ left: offset, behavior: 'smooth' });
      }
    });
  });
})();

// Booking Slider (mobile)
(function () {
  var slider = document.querySelector('.booking-slider');
  var dots = document.querySelectorAll('.booking-dots button');
  if (!slider || !dots.length) return;

  function updateDots() {
    var cards = slider.querySelectorAll('.booking-card');
    var scrollLeft = slider.scrollLeft;
    var sliderWidth = slider.offsetWidth;
    var activeIndex = 0;
    var minDist = Infinity;

    cards.forEach(function (card, i) {
      var cardCenter = card.offsetLeft + card.offsetWidth / 2;
      var dist = Math.abs(cardCenter - scrollLeft - sliderWidth / 2);
      if (dist < minDist) {
        minDist = dist;
        activeIndex = i;
      }
    });

    dots.forEach(function (dot, i) {
      dot.className = i === activeIndex ? 'active' : '';
    });
  }

  slider.addEventListener('scroll', updateDots);

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      var cards = slider.querySelectorAll('.booking-card');
      if (cards[i]) {
        var cardLeft = cards[i].offsetLeft;
        var offset = cardLeft - (slider.offsetWidth - cards[i].offsetWidth) / 2;
        slider.scrollTo({ left: offset, behavior: 'smooth' });
      }
    });
  });
})();

// Date Input Formatting (DD/MM/YYYY)
(function () {
  document.querySelectorAll('.date-input').forEach(function (input) {
    input.addEventListener('input', function (e) {
      var val = this.value.replace(/\D/g, '');
      if (val.length > 8) val = val.slice(0, 8);
      if (val.length >= 5) {
        this.value = val.slice(0, 2) + '/' + val.slice(2, 4) + '/' + val.slice(4);
      } else if (val.length >= 3) {
        this.value = val.slice(0, 2) + '/' + val.slice(2);
      } else {
        this.value = val;
      }
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && (this.value.endsWith('/'))) {
        e.preventDefault();
        this.value = this.value.slice(0, -2);
      }
    });
  });
})();

// Booking Form Submit
document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert("Thank you! We'll contact you shortly to confirm your booking.");
  this.reset();
});
