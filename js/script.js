/**
 * RS MEDIA CONSULT – Master Application Logic
 * Premium Creative Digital Agency
 * 
 * Features:
 * - Dynamic Service Catalog & Dependent Dropdowns
 * - Automated WhatsApp Booking System (wa.me/233209792015)
 * - Portfolio Filter & Interactive Lightbox Modal
 * - Sticky Navigation & Scrollspy
 * - Mobile Drawer Menu
 * - Animated Counter Statistics
 * - Toast Notification Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. BUSINESS CONSTANTS & SERVICE CATALOG
  // --------------------------------------------------------------------------
  const RS_BUSINESS_PHONE = '233209792015'; // International Ghana Format (0209792015 -> 233209792015)

  const SERVICE_CATALOG = {
    'Photography': [
      'Wedding Photography',
      'Birthday Photography',
      'Graduation Photography',
      'Corporate Photography',
      'Studio Photography',
      'Event Photography',
      'Personal Portraits'
    ],
    'Videography': [
      'Wedding Videography',
      'Event Coverage',
      'Music Video Production',
      'Corporate Video Production',
      'Documentary Production',
      'Promotional Videos'
    ],
    'Graphic Design': [
      'Logo Design',
      'Flyers and Posters',
      'Business Cards',
      'Banners',
      'Social Media Designs',
      'Branding and Identity Design'
    ],
    'Video and Photo Editing': [
      'Professional Photo Retouching',
      'Video Editing',
      'Colour Grading',
      'Background Removal',
      'Promotional Video Editing'
    ],
    'Website Development': [
      'Business Websites',
      'E-commerce Websites',
      'School Websites',
      'Hospital and Clinic Websites',
      'Portfolio Websites',
      'Custom Web Applications'
    ],
    'Website Management': [
      'Website Updates',
      'Website Maintenance',
      'Website Security',
      'Content Updates',
      'Website Redesign'
    ],
    'Event Planning and Management': [
      'Wedding Planning',
      'Birthday Celebrations',
      'Corporate Events',
      'Award Ceremonies',
      'Entertainment Events'
    ]
  };

  // --------------------------------------------------------------------------
  // 2. DYNAMIC BOOKING SYSTEM & WHATSAPP INTEGRATION
  // --------------------------------------------------------------------------
  const bookingForm = document.getElementById('bookingForm');
  const serviceCategorySelect = document.getElementById('serviceCategory');
  const specificServiceSelect = document.getElementById('specificService');
  const projectDateInput = document.getElementById('projectDate');
  const bookingWrapper = document.querySelector('.booking-wrapper');

  // Prevent past dates in booking calendar
  if (projectDateInput) {
    const today = new Date().toISOString().split('T')[0];
    projectDateInput.setAttribute('min', today);
  }

  // Populate Specific Service Dropdown based on Selected Category
  function updateSpecificServices(category, preselectedService = null) {
    if (!specificServiceSelect) return;

    specificServiceSelect.innerHTML = '';

    if (!category || !SERVICE_CATALOG[category]) {
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = '– First select a category above –';
      specificServiceSelect.appendChild(defaultOption);
      specificServiceSelect.disabled = true;
      return;
    }

    specificServiceSelect.disabled = false;
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = `– Select Specific ${category} Service –`;
    specificServiceSelect.appendChild(placeholderOption);

    const services = SERVICE_CATALOG[category];
    services.forEach(service => {
      const opt = document.createElement('option');
      opt.value = service;
      opt.textContent = service;
      if (preselectedService && service.toLowerCase() === preselectedService.toLowerCase()) {
        opt.selected = true;
      }
      specificServiceSelect.appendChild(opt);
    });
  }

  if (serviceCategorySelect) {
    serviceCategorySelect.addEventListener('change', (e) => {
      updateSpecificServices(e.target.value);
    });
  }

  // Quick Book Service Handler from Service Cards
  const bookCardButtons = document.querySelectorAll('.js-book-service-btn');
  bookCardButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const category = btn.getAttribute('data-category');
      const defaultService = btn.getAttribute('data-service') || '';

      // Set category in dropdown
      if (serviceCategorySelect && category) {
        serviceCategorySelect.value = category;
        updateSpecificServices(category, defaultService);
      }

      // Smooth scroll to booking section
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Add eye-catching highlight flash
        if (bookingWrapper) {
          bookingWrapper.classList.remove('highlight-pulse');
          void bookingWrapper.offsetWidth; // Force CSS reflow
          bookingWrapper.classList.add('highlight-pulse');
        }

        // Focus client name field
        const nameInput = document.getElementById('clientName');
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 600);
        }
      }
    });
  });

  // Booking Form Submission & WhatsApp Message Generator
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Extract form values
      const clientName = document.getElementById('clientName');
      const clientPhone = document.getElementById('clientPhone');
      const clientEmail = document.getElementById('clientEmail');
      const serviceCategory = document.getElementById('serviceCategory');
      const specificService = document.getElementById('specificService');
      const projectDate = document.getElementById('projectDate');
      const projectLocation = document.getElementById('projectLocation');
      const budgetRange = document.getElementById('budgetRange');
      const projectDescription = document.getElementById('projectDescription');
      const contactMethod = document.getElementById('contactMethod');

      // Validation Helper
      function validateField(inputElement, condition) {
        const group = inputElement.closest('.form-group');
        if (!condition) {
          group.classList.add('has-error');
          isValid = false;
        } else {
          group.classList.remove('has-error');
        }
      }

      // Check Required Fields
      validateField(clientName, clientName.value.trim().length >= 2);
      validateField(clientPhone, clientPhone.value.trim().length >= 9);
      validateField(serviceCategory, serviceCategory.value.trim() !== '');
      validateField(specificService, specificService.value.trim() !== '');
      validateField(projectDate, projectDate.value.trim() !== '');
      validateField(projectLocation, projectLocation.value.trim().length >= 2);

      if (!isValid) {
        showToast('Please fill in all required fields accurately.', 'warning');
        return;
      }

      // Format values for WhatsApp
      const nameVal = clientName.value.trim();
      const phoneVal = clientPhone.value.trim();
      const emailVal = clientEmail.value.trim() || 'Not Provided';
      const categoryVal = serviceCategory.value.trim();
      const specificVal = specificService.value.trim();
      const dateVal = projectDate.value.trim();
      const locationVal = projectLocation.value.trim();
      const budgetVal = budgetRange.value.trim() || 'Flexible / Discussion';
      const descVal = projectDescription.value.trim() || 'Standard professional execution requested.';
      const methodVal = contactMethod ? contactMethod.value.trim() : 'WhatsApp';

      // Generate the exact specified WhatsApp message template
      const formattedMessage = 
`NEW SERVICE BOOKING – RS MEDIA CONSULT

Client Name: ${nameVal}

Phone Number: ${phoneVal}

Email: ${emailVal}

Service Category: ${categoryVal}

Specific Service: ${specificVal}

Project Date: ${dateVal}

Location: ${locationVal}

Budget: ${budgetVal}

Project Description: ${descVal}

Preferred Contact: ${methodVal}

Please contact me regarding this booking.`;

      // Properly URL Encode Message
      const encodedMessage = encodeURIComponent(formattedMessage);
      const whatsappUrl = `https://wa.me/${RS_BUSINESS_PHONE}?text=${encodedMessage}`;

      showToast('Opening WhatsApp with your booking details...', 'success');

      // Open WhatsApp in new tab / app window
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 350);

      // Reset form on submission
      bookingForm.reset();
      updateSpecificServices('');
    });
  }

  // --------------------------------------------------------------------------
  // 3. GENERAL CONTACT / INQUIRY FORM
  // --------------------------------------------------------------------------
  const generalContactForm = document.getElementById('generalContactForm');
  if (generalContactForm) {
    generalContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inquiryName').value.trim();
      const phone = document.getElementById('inquiryPhone').value.trim();
      const message = document.getElementById('inquiryMessage').value.trim();

      if (!name || !phone || !message) {
        showToast('Please fill out all inquiry fields.', 'warning');
        return;
      }

      const inquiryText = 
`GENERAL INQUIRY – RS MEDIA CONSULT

Name: ${name}
Phone: ${phone}
Message: ${message}

Kindly get back to me.`;

      const encoded = encodeURIComponent(inquiryText);
      const waUrl = `https://wa.me/${RS_BUSINESS_PHONE}?text=${encoded}`;

      showToast('Connecting you with RS Media Consult on WhatsApp...', 'success');
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 300);

      generalContactForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 4. PORTFOLIO FILTER & LIGHTBOX GALLERY
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentVisibleItems = Array.from(portfolioItems);
  let currentActiveIndex = 0;

  // Filter Categories
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory === filter) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });

      // Update currently visible items list for lightbox navigation
      currentVisibleItems = Array.from(portfolioItems).filter(item => !item.classList.contains('hide'));
    });
  });

  // Open Lightbox
  function openLightbox(index) {
    if (!lightboxModal || currentVisibleItems.length === 0) return;

    currentActiveIndex = (index + currentVisibleItems.length) % currentVisibleItems.length;
    const targetItem = currentVisibleItems[currentActiveIndex];

    const img = targetItem.querySelector('img');
    const title = targetItem.getAttribute('data-title') || 'RS Media Project';
    const category = targetItem.getAttribute('data-category-name') || 'Media Production';

    lightboxImg.src = img.src;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightboxCategory.textContent = category;

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Attach Lightbox triggers to Portfolio Items
  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = currentVisibleItems.indexOf(item);
      if (index !== -1) {
        openLightbox(index);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentActiveIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentActiveIndex + 1);
    });
  }

  // Close lightbox on clicking outside modal content
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard Navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      openLightbox(currentActiveIndex - 1);
    } else if (e.key === 'ArrowRight') {
      openLightbox(currentActiveIndex + 1);
    }
  });

  // --------------------------------------------------------------------------
  // 5. STICKY NAVBAR & SCROLLSPY
  // --------------------------------------------------------------------------
  const headerNav = document.querySelector('.header-nav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link, .mobile-links .nav-link');

  function handleNavbarScroll() {
    if (!headerNav) return;
    if (window.scrollY > 40) {
      headerNav.classList.add('scrolled');
    } else {
      headerNav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Scrollspy: Highlight Active Nav Link
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });

  // --------------------------------------------------------------------------
  // 6. MOBILE DRAWER NAVIGATION
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-links .nav-link');

  function openMobileMenu() {
    if (mobileDrawer && mobileDrawerOverlay) {
      mobileDrawer.classList.add('open');
      mobileDrawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer && mobileDrawerOverlay) {
      mobileDrawer.classList.remove('open');
      mobileDrawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeMobileMenu);
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // --------------------------------------------------------------------------
  // 7. ANIMATED COUNTERS FOR STATS
  // --------------------------------------------------------------------------
  const statElements = document.querySelectorAll('.stat-number[data-target]');
  let statsAnimated = false;

  function runCounterAnimation() {
    statElements.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const suffix = stat.getAttribute('data-suffix') || '';
      let current = 0;
      const increment = target / 50;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          stat.textContent = `${Math.ceil(current)}${suffix}`;
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = `${target}${suffix}`;
        }
      };

      updateCounter();
    });
  }

  if (statElements.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          runCounterAnimation();
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) {
      statsObserver.observe(statsContainer);
    }
  }

  // --------------------------------------------------------------------------
  // 8. HERO BACKGROUND REAL WORKS SLIDESHOW
  // --------------------------------------------------------------------------
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 6000);
  }

  // --------------------------------------------------------------------------
  // 9. BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. TOAST NOTIFICATION UTILITY
  // --------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }

    const icon = type === 'success' ? 'fa-circle-check' :
                 type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info';

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
});
