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
    // 인덱스 저장/복원 로직은 변경 없음
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
    // 배경색과 글자색 변경 로직을 별도의 함수로 분리
    body.style.backgroundColor = darkMode ? 'black' : '';
    body.style.color = darkMode ? 'white' : '';
  }

  function updatePhoto() {
    const images = darkMode ? darkImages : lightImages;
    const newImg = new Image();
    newImg.src = images[currentIndex];
    newImg.onload = function () {
      // 이미지 로드 완료 후, 페이드 아웃 시작
      currentPhoto.style.opacity = '0';
      // 페이드 아웃 완료 후 이미지 교체 및 페이드 인 처리
      setTimeout(() => {
        currentPhoto.src = newImg.src;
        currentPhoto.style.opacity = '1';
      }, 200); // CSS에서 정의한 transition 시간과 일치하거나 그보다 짧게 설정
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
