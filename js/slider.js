let sliderTmp = 0;
const sliderArray = ["trading.png", "blackjackaccueil.png", "roulette.jpg", "elevageaccueil.png","oclock.png"];
const linkArray = ["crypto.html", "blackjack.html", "roulette.html", "elevage.html","oclock.html"];
function GenerateSlider() {
  const images = document.querySelector(".slider");
  for (let index = 0; index < sliderArray.length; index++) {
    const link = document.createElement("a");
    link.classList.add("link");
    images.appendChild(link);
    link.href = linkArray[index];
    const image = document.createElement("img");
    image.src = `../image/${sliderArray[index]}`;
    if (index === sliderTmp) {
      image.classList.add("slider__img--current");
    }
    image.classList.add("slider__img");
    link.appendChild(image);
  }
}

function mooveSlider() {
  const images = document.querySelectorAll(".slider__img");
  const btnSlider = document.querySelectorAll(".slider__btn");
  btnSlider[0].addEventListener("click", () => {
    images[sliderTmp].classList.remove("slider__img--current");
    sliderTmp--;
    if (sliderTmp < 0) {
      sliderTmp = sliderArray.length - 1;
    }
    images[sliderTmp].classList.add("slider__img--current");
  });
  btnSlider[1].addEventListener("click", () => {
    images[sliderTmp].classList.remove("slider__img--current");
    sliderTmp++;
    if (sliderTmp > sliderArray.length - 1) {
      sliderTmp = 0;
    }
    images[sliderTmp].classList.add("slider__img--current");
  });
}

function autoSlide(){
  const images = document.querySelectorAll(".slider__img");
  images[sliderTmp].classList.remove("slider__img--current");
  sliderTmp++;
  if (sliderTmp > sliderArray.length - 1) {
    sliderTmp = 0;
  }
  images[sliderTmp].classList.add("slider__img--current");
}

GenerateSlider();
mooveSlider();
setInterval(autoSlide,3000);