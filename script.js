// Smooth scroll to section with header offset and expand section
function scrollToSection(id) {
    var el = document.getElementById(id);
    if (el) {
      var headerHeight = document.querySelector('.sticky-header').offsetHeight;
      var elementPosition = el.offsetTop;
      var offsetPosition = elementPosition - headerHeight - 2;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Expand the target section
      var contentId = id + '-content';
      var content = document.getElementById(contentId);
      var toggleBtn = el.querySelector('.section-toggle');
      
      if (content && toggleBtn) {
        // Set both content and button to expanded state
        content.setAttribute('aria-expanded', 'true');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    }
  }
  
  // Collapsible section toggle
  function toggleSection(contentId, btn) {
    var content = document.getElementById(contentId);
    var expanded = content.getAttribute('aria-expanded') === 'true';
    content.setAttribute('aria-expanded', !expanded);
    btn.setAttribute('aria-expanded', !expanded);
    content.setAttribute('aria-busy', 'true');
    setTimeout(function () {
      content.setAttribute('aria-busy', 'false');
    }, 300);
  }