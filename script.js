// DOMContentLoaded 이벤트가 발생하면 (문서가 완전히 로드되고 파싱될 때), 콜백 함수를 실행합니다.
document.addEventListener('DOMContentLoaded', function () {
  // HTML 요소들을 변수에 저장합니다.
  const overlay = document.getElementById('overlay'); // 오버레이 요소
  const body = document.querySelector('body'); // body 요소
  const currentPhoto = document.getElementById('currentPhoto'); // 현재 보여줄 이미지를 담는 요소
  let darkMode = false; // 다크 모드 상태를 나타내는 변수, 초기값은 false (라이트 모드)

  // 라이트 모드와 다크 모드에서 사용할 이미지 목록입니다.
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

  // 현재 표시 중인 이미지의 인덱스와 각 모드에서 마지막으로 표시된 이미지의 인덱스를 저장합니다.
  let currentIndex = 0;
  let lastIndexLight = 0;
  let lastIndexDark = 0;

  // 초기 오버레이 효과를 설정합니다. 3초 후에 투명도를 0으로 변경하여 점차 사라지게 합니다.
  setTimeout(() => {
    overlay.style.opacity = '0';
    overlay.addEventListener('transitionend', () => (overlay.style.display = 'none'));
  }, 3000);

  // 현재 이미지를 클릭하면 실행될 이벤트 리스너입니다. 모드를 전환하고, 테마를 적용하며, 이미지를 업데이트합니다.
  currentPhoto.addEventListener('click', function () {
    if (darkMode) {
      lastIndexDark = currentIndex;
      currentIndex = lastIndexLight;
    } else {
      lastIndexLight = currentIndex;
      currentIndex = lastIndexDark;
    }
    darkMode = !darkMode; // 모드를 전환합니다.
    applyTheme(); // 테마 적용 함수를 호출합니다.
    updatePhoto(); // 이미지 업데이트 함수를 호출합니다.
  });

  // 테마(다크 모드/라이트 모드)를 적용하는 함수입니다. 배경색과 텍스트 색상을 변경합니다.
  function applyTheme() {
    body.style.backgroundColor = darkMode ? 'black' : '';
    body.style.color = darkMode ? 'white' : '';
    overlay.style.display = 'flex';
    overlay.style.backgroundColor = darkMode ? 'black' : 'white';
    overlay.style.opacity = '1';
    overlay.textContent = darkMode ? 'Welcome to 689photo' : ''; // 다크 모드일 때만 텍스트를 표시합니다.

    // 오버레이를 점차 사라지게 하는 효과를 적용합니다.
    setTimeout(() => {
      overlay.style.opacity = '0';
      overlay.addEventListener('transitionend', () => {
        if (overlay.style.opacity === '0') {
          overlay.style.display = 'none';
        }
      });
    }, 500);
  }

  // 현재 이미지를 업데이트하는 함수입니다. 새 이미지를 로드하고, 로드가 완료되면 현재 이미지를 변경합니다.
  function updatePhoto() {
    const images = darkMode ? darkImages : lightImages; // 현재 모드에 맞는 이미지 목록을 선택합니다.
    const newImg = new Image(); // 새 Image 객체를 생성합니다.
    newImg.src = images[currentIndex]; // 현재 인덱스에 해당하는 이미지를 새 Image 객체의 소스로 설정합니다.
    newImg.onload = function () {
      // 이미지가 로드되면 실행될 콜백 함수입니다.
      currentPhoto.style.opacity = '0'; // 현재 이미지의 투명도를 0으로 설정하여 점차 사라지게 합니다.
      setTimeout(() => {
        currentPhoto.src = newImg.src; // 새 이미지로 교체합니다.
        currentPhoto.style.opacity = '1'; // 투명도를 1로 설정하여 점차 나타나게 합니다.
      }, 200);
    };
  }

  // 이미지를 자동으로 변경하는 함수입니다. 현재 인덱스를 업데이트하고, 이미지를 업데이트합니다.
  function changePhoto() {
    currentPhoto.style.opacity = '0'; // 현재 이미지를 점차 사라지게 합니다.
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % (darkMode ? darkImages.length : lightImages.length); // 다음 인덱스를 계산합니다.
      updatePhoto(); // 이미지를 업데이트합니다.
    }, 1000);
  }

  setInterval(changePhoto, 5000); // 5초마다 changePhoto 함수를 반복 실행하여 이미지를 자동으로 변경합니다.
});
