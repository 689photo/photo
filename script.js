document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('overlay');
  const currentPhoto = document.getElementById('currentPhoto');
  let darkMode = false; // Initially in light mode

  const lightImages = [
    'photo1.jpg',
    'photo2.jpg',
    'photo3.jpg',
    'photo4.jpg',
    'photo5.jpg',
    'photo6.jpg',
    'photo7.jpg',
  ];
  const darkImages = ['black1.jpg', 'black2.jpg', 'black3.jpg', 'black4.jpg', 'black5.jpg'];

  let currentIndex = 0;
  let lastIndexLight = 0;
  let lastIndexDark = 0;

  setTimeout(() => overlay.classList.add('hidden'), 3000);

  currentPhoto.addEventListener('click', function () {
    if (darkMode) {
      lastIndexDark = currentIndex;
      currentIndex = lastIndexLight;
    } else {
      lastIndexLight = currentIndex;
      currentIndex = lastIndexDark;
    }
    darkMode = !darkMode;
    applyDarkMode();
    updatePhoto();
  });

  function applyDarkMode() {
    document.body.classList.toggle('dark-mode', darkMode);
  }

  function updatePhoto() {
    const images = darkMode ? darkImages : lightImages;
    const newImgSrc = images[currentIndex];

    const newImg = new Image();
    newImg.onload = function () {
      currentPhoto.classList.add('hidden');
      setTimeout(() => {
        currentPhoto.src = newImgSrc;
        currentPhoto.classList.remove('hidden');
      }, 500);
    };
    newImg.src = newImgSrc;
  }

  function changePhoto() {
    currentIndex = (currentIndex + 1) % (darkMode ? darkImages.length : lightImages.length);
    updatePhoto();
  }

  setInterval(changePhoto, 5000);
});
