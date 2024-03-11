document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('overlay');
  const body = document.querySelector('body');
  const currentPhoto = document.getElementById('currentPhoto');
  let darkMode = false;
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

  // 오버레이 사라지는 로직
  setTimeout(() => {
    overlay.style.opacity = '0';
    overlay.addEventListener('transitionend', () => (overlay.style.display = 'none'));
  }, 3000);

  // 이미지 클릭 이벤트
  currentPhoto.addEventListener('click', function () {
    darkMode = !darkMode;
    body.style.backgroundColor = darkMode ? 'black' : '';
    body.style.color = darkMode ? 'white' : '';
    currentIndex = 0;
    updatePhoto();
  });

  // 이미지 업데이트 함수
  function updatePhoto() {
    const images = darkMode ? darkImages : lightImages;
    const img = new Image();
    img.onload = function () {
      currentPhoto.src = this.src;
      currentPhoto.style.opacity = '1';
    };
    img.src = images[currentIndex];
  }

  // 이미지 변경 로직
  function changePhoto() {
    currentPhoto.style.opacity = '0';
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % (darkMode ? darkImages.length : lightImages.length);
      updatePhoto();
    }, 1000);
  }

  setInterval(changePhoto, 5000);
});
