document.addEventListener('DOMContentLoaded', function () {
  const images = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg', 'photo6.jpg', 'photo7.jpg'];
  let currentIndex = 0;

  // 이미지 미리 로드
  images.forEach((image) => {
    const img = new Image();
    img.src = image;
  });

  const currentPhoto = document.getElementById('currentPhoto');
  currentPhoto.style.opacity = '1'; // 초기 사진이 바로 보이도록 설정

  function changePhoto() {
    currentPhoto.style.opacity = '0';

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      currentPhoto.src = images[currentIndex];
      currentPhoto.style.opacity = '1';
    }, 1000); // 흐릿하게 등장하는 트랜지션 시간
  }

  setInterval(changePhoto, 5000); // 사진 변경 주기
});
