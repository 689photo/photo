// 문서 로드 완료 후 실행되는 초기화 함수
document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('overlay'); // 오버레이 요소 선택
  const body = document.querySelector('body'); // body 요소 선택
  const currentPhoto = document.getElementById('currentPhoto'); // 현재 사진 표시 요소 선택
  let darkMode = false; // 다크 모드 상태 저장 변수
  const lightImages = [
    // 라이트 모드에서 사용할 이미지 배열
    'photo1.jpg',
    'photo2.jpg',
    'photo3.jpg',
    'photo4.jpg',
    'photo5.jpg',
    'photo6.jpg',
    'photo7.jpg',
  ];
  const darkImages = [
    // 다크 모드에서 사용할 이미지 배열
    'black1.jpg',
    'black2.jpg',
    'black3.jpg',
    'black4.jpg',
    'black5.jpg',
  ];
  let currentIndex = 0; // 현재 표시 중인 이미지의 인덱스

  // 오버레이 사라지는 로직
  setTimeout(() => {
    overlay.style.opacity = '0';
    overlay.addEventListener('transitionend', () => (overlay.style.display = 'none'));
  }, 3000);

  // 이미지 클릭 시 다크 모드 토글
  currentPhoto.addEventListener('click', function () {
    darkMode = !darkMode;
    body.style.backgroundColor = darkMode ? 'black' : '';
    body.style.color = darkMode ? 'white' : '';
    currentIndex = 0;
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
