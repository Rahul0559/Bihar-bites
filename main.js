document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById('menu_js');
  const menuList = document.getElementById('js_nvlinks');
  const menuImage = document.getElementById('menuId');

  let isHidden = true;

  menu.addEventListener('click', () => {
    if (isHidden) {
      menuList.style.transform = 'translateY(0%)';
      menuImage.src = 'close-line.png';
    } else {
      menuList.style.transform = 'translateY(-200%)';
      menuImage.src = 'menu-fill.png';
    }
    isHidden = !isHidden;
  });
});

const swiperWrapper = document.querySelector('.swiper-wrapper');
const slides = document.querySelectorAll('.swiper-slide');
const prevBtn = document.querySelector('.swiper-button-prev');
const nextBtn = document.querySelector('.swiper-button-next');

let currentIndex = 0;
const totalSlides = slides.length;

function updateSlidePosition() {
  swiperWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function showNextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlidePosition();
}

function showPrevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
}

nextBtn.addEventListener('click', () => {
  showNextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
  showPrevSlide();
  resetAutoSlide();
});

let autoSlideInterval = setInterval(showNextSlide, 3000);

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(showNextSlide, 3000);
}

// Initialize
updateSlidePosition();




document.addEventListener("DOMContentLoaded", () => {
  // Select all buttons with the class 'section-footer_btn'
  document.querySelectorAll('.section-footer_btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      // Find the closest parent element with the class 'special_cart'
      const card = btn.closest('.special_cart');
      
      // Extract product details
      const image = card.querySelector('.product_image')?.getAttribute('src') || 'placeholder.jpg';
      const title = card.querySelector('.strong')?.textContent.trim() || 'Unknown Item';
      const description = card.querySelector('p')?.textContent.trim() || 'No description available.';
      const priceText = card.querySelector('.discounted-price')?.textContent.trim() || '₹0.00';
      const priceMatch = priceText.match(/₹(\d+(\.\d{1,2})?)/);
      const price = priceMatch ? priceMatch[1] : "0.00";

      // Build query string
      const params = new URLSearchParams({
        image,
        title,
        description,
        price
      });

      // Redirect to checkout page with query parameters
      window.location.href = `buynow.html?${params.toString()}`;
    });
  });
});
;