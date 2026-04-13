document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('.section'));
  let currentIndex = 0;

  function goToSection(index) {
    if (index < 0 || index >= sections.length) return;
    sections[currentIndex].classList.remove('active');
    sections[index].classList.add('active');
    currentIndex = index;
  }

  function goToSectionById(id) {
    const index = sections.findIndex(s => s.id === id);
    if (index !== -1) goToSection(index);
  }

  // Arrow nav buttons (prev/next)
  document.querySelectorAll('[data-direction]').forEach(btn => {
    btn.addEventListener('click', () => {
      const dir = btn.getAttribute('data-direction');
      if (dir === 'next') goToSection(currentIndex + 1);
      if (dir === 'prev') goToSection(currentIndex - 1);
    });
  });

  // Named navigation (data-goto)
  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      goToSectionById(el.getAttribute('data-goto'));
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      goToSection(currentIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      goToSection(currentIndex - 1);
    }
  });

  // Scroll/swipe navigation
  let touchStartY = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const diff = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSection(currentIndex + 1);
      else goToSection(currentIndex - 1);
    }
  });

  // Mouse wheel navigation
  let wheelTimeout = false;
  document.addEventListener('wheel', (e) => {
    if (wheelTimeout) return;
    wheelTimeout = true;
    setTimeout(() => { wheelTimeout = false; }, 800);

    if (e.deltaY > 0) goToSection(currentIndex + 1);
    else goToSection(currentIndex - 1);
  }, { passive: true });
});
