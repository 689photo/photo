// 문서 로드 완료 후 실행되는 초기화 함수
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

  // 현재 표시 중인 이미지의 인덱스를 모드별로 저장
  let currentIndex = 0;
  let lastIndexLight = 0;
  let lastIndexDark = 0;

  setTimeout(() => {
    overlay.style.opacity = '0';
    overlay.addEventListener('transitionend', () => (overlay.style.display = 'none'));
  }, 3000);

  // 이미지 클릭 시 다크 모드 토글 및 현재 사진 인덱스 저장/복원
  currentPhoto.addEventListener('click', function () {
    if (darkMode) {
      lastIndexDark = currentIndex; // 다크 모드를 떠나면서 현재 인덱스 저장
      currentIndex = lastIndexLight; // 라이트 모드로 전환 시 마지막 인덱스 복원
    } else {
      lastIndexLight = currentIndex; // 라이트 모드를 떠나면서 현재 인덱스 저장
      currentIndex = lastIndexDark; // 다크 모드로 전환 시 마지막 인덱스 복원
    }
    darkMode = !darkMode;

    // 다크 모드에 따른 배경색과 글자색 업데이트
    body.style.backgroundColor = darkMode ? 'black' : '';
    body.style.color = darkMode ? 'white' : '';

    updatePhoto();
  });

  // 현재 이미지를 업데이트하는 함수
  function updatePhoto() {
    const images = darkMode ? darkImages : lightImages;
    const img = new Image();
    img.onload = function () {
      currentPhoto.src = this.src;
      currentPhoto.style.opacity = '1';
    };
    img.src = images[currentIndex];
  }

  // 현재 이미지를 다음 이미지로 변경하는 함수
  function changePhoto() {
    currentPhoto.style.opacity = '0';
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % (darkMode ? darkImages.length : lightImages.length);
      updatePhoto();
    }, 1000);
  }

  // 자동으로 이미지를 변경하는 타이머 설정
  setInterval(changePhoto, 5000);
});
