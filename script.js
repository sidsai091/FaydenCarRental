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
  });
})();

// Lightbox Functionality
(function () {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var closeBtn = document.getElementById('lightboxClose');
  var prevBtn = document.getElementById('lightboxPrev');
  var nextBtn = document.getElementById('lightboxNext');

  var currentImages = []; // Array of image sources
  var currentIndex = 0;   // Current index in the array

  // Function to open lightbox
  function openLightbox(images, index) {
    currentImages = images;
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('open');
  }

  // Function to update image based on current index
  function updateLightboxImage() {
    if (currentImages.length > 0) {
      lightboxImg.src = currentImages[currentIndex];
    }
  }

  // Next Image
  function nextImage(e) {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightboxImage();
  }

  // Previous Image
  function prevImage(e) {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
  }

  // Attach click events to all vehicle images
  document.querySelectorAll('.vehicle-card').forEach(function (card) {
    var imgs = Array.from(card.querySelectorAll('.vehicle-image-inner img'));
    var imgSources = imgs.map(function (img) { return img.src; });

    imgs.forEach(function (img, index) {
      img.addEventListener('click', function () {
        openLightbox(imgSources, index);
      });
    });
  });

  // Event Listeners for Lightbox Controls
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      lightbox.classList.remove('open');
    });
  }

  if (nextBtn) nextBtn.addEventListener('click', nextImage);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);

  // Close on background click
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('open');
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;

    if (e.key === 'Escape') lightbox.classList.remove('open');
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
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

// Date Input Validation for Date Picker
(function () {
  var pickupInput = document.querySelector('input[name="pickupDate"]');
  var returnInput = document.querySelector('input[name="returnDate"]');
  var allDateTimeInputs = document.querySelectorAll('input[type="date"], input[type="time"]');

  // Auto-open picker on click anywhere in the input
  allDateTimeInputs.forEach(function (input) {
    input.addEventListener('click', function () {
      // Check if showPicker is supported (modern browsers)
      if ('showPicker' in this) {
        this.showPicker();
      }
    });
  });

  if (!pickupInput || !returnInput) return;

  // Set minimum date to today
  var today = new Date().toISOString().split('T')[0];
  pickupInput.setAttribute('min', today);
  returnInput.setAttribute('min', today);

  // When pickup date changes, update return date minimum
  pickupInput.addEventListener('change', function () {
    returnInput.setAttribute('min', this.value || today);

    // If return date is before pickup date, clear it
    if (returnInput.value && returnInput.value < this.value) {
      returnInput.value = '';
    }
  });
})();

// Booking Form Submit - Send to WhatsApp
document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form data
  var name = this.name.value;
  var phone = this.phone.value;
  var vehicle = this.vehicle.value;
  var pickupDate = this.pickupDate.value;
  var pickupTime = this.pickupTime.value;
  var returnDate = this.returnDate.value;
  var returnTime = this.returnTime.value;
  var location = this.location.value;

  // Format dates for better readability
  var formattedPickupDate = new Date(pickupDate).toLocaleDateString('en-GB');
  var formattedReturnDate = new Date(returnDate).toLocaleDateString('en-GB');

  // Create WhatsApp message
  var message = '*🚗 NEW CAR RENTAL BOOKING REQUEST*\n\n';
  message += '*Name:* ' + name + '\n';
  message += '*Phone Number:* ' + phone + '\n';
  message += '*Vehicle:* ' + vehicle + '\n\n';
  message += '*📅 Pickup Details:*\n';
  message += '• Date: ' + formattedPickupDate + '\n';
  message += '• Time: ' + pickupTime + '\n\n';
  message += '*📅 Return Details:*\n';
  message += '• Date: ' + formattedReturnDate + '\n';
  message += '• Time: ' + returnTime + '\n\n';
  message += '*📍 Delivery Location:* ' + location + '\n\n';
  message += 'Looking forward to hearing from you! 🙏';

  // Fayden Car Rental WhatsApp number (601157746854)
  var whatsappNumber = '601157746854';

  // Encode message for URL
  var encodedMessage = encodeURIComponent(message);

  // Create WhatsApp URL
  var whatsappURL = 'https://wa.me/' + whatsappNumber + '?text=' + encodedMessage;

  // Open WhatsApp
  window.open(whatsappURL, '_blank');

  // Reset form
  this.reset();
});
