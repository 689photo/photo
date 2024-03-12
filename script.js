document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('overlay');
  const body = document.querySelector('body');
  const currentPhoto = document.getElementById('currentPhoto');
  let darkMode = false; // 다크 모드 상태 저장 변수
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

  let currentIndex = 0; // 현재 표시 중인 이미지의 인덱스
  let lastIndexLight = 0;
  let lastIndexDark = 0;

  setTimeout(() => {
    overlay.style.opacity = '0';
    overlay.addEventListener('transitionend', () => (overlay.style.display = 'none'));
  }, 3000);

  currentPhoto.addEventListener('click', function () {
    if (darkMode) {
      lastIndexDark = currentIndex;
      currentIndex = lastIndexLight;
    } else {
      lastIndexLight = currentIndex;
      currentIndex = lastIndexDark;
    }
    darkMode = !darkMode;
    applyTheme(); // 배경과 텍스트 색상을 적용하는 함수 호출
    updatePhoto();
  });

  function applyTheme() {
    body.style.backgroundColor = darkMode ? 'black' : '';
    body.style.color = darkMode ? 'white' : '';
    overlay.style.display = 'flex';
    overlay.style.backgroundColor = darkMode ? 'black' : 'white';
    overlay.style.opacity = '1';
    // 다크 모드 활성화 시 텍스트 표시, 비활성화 시 텍스트 제거
    overlay.textContent = darkMode ? 'Welcome to 689photo' : ''; // 조건에 따른 텍스트 변경

    setTimeout(() => {
      overlay.style.opacity = '0';
      overlay.addEventListener('transitionend', () => {
        if (overlay.style.opacity === '0') {
          overlay.style.display = 'none';
        }
      });
    }, 500); // 페이드 인/아웃 속도 조절 가능
  }

  function updatePhoto() {
    const images = darkMode ? darkImages : lightImages;
    const newImg = new Image();
    newImg.src = images[currentIndex];
    newImg.onload = function () {
      currentPhoto.style.opacity = '0';
      setTimeout(() => {
        currentPhoto.src = newImg.src;
        currentPhoto.style.opacity = '1';
      }, 200);
    };
  }

  function changePhoto() {
    currentPhoto.style.opacity = '0';
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % (darkMode ? darkImages.length : lightImages.length);
      updatePhoto();
    }, 1000);
  }

  setInterval(changePhoto, 5000);
});
