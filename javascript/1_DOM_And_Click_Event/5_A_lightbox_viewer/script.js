const galleryItems = document.querySelectorAll('.gallery-item');

const closeBtn = document.getElementById('close-btn');

const lightbox = document.querySelector('.lightbox');

const lightboxImage = document.getElementById('lightbox-image');

galleryItems.forEach(item => {
  item.addEventListener('click', (event) => {
    lightbox.style.display = 'flex';
    const fullImageSrc = event.target.src.replace('-thumbnail', '');
    lightboxImage.setAttribute('src', fullImageSrc);
  });
});

lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});


lightboxImage.addEventListener('click', (event) => {
    event.stopPropagation();
    }
);
