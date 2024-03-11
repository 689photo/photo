document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('overlay');

  setTimeout(() => {
    overlay.style.opacity = '0';
    overlay.addEventListener('transitionend', () => {
      overlay.style.display = 'none';
    });
  }, 3000); // 3초 후 페이드 아웃

  const images = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg', 'photo6.jpg', 'photo7.jpg'];
  let currentIndex = 0;

  images.forEach((image) => {
    const img = new Image();
    img.src = image;
  });

  const currentPhoto = document.getElementById('currentPhoto');
  currentPhoto.style.opacity = '1';

  function changePhoto() {
    currentPhoto.style.opacity = '0';

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      currentPhoto.src = images[currentIndex];
      currentPhoto.style.opacity = '1';
    }, 1000);
  }

  setInterval(changePhoto, 5000);
});
