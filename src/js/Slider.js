export default class Slider {
  constructor({ element, numberOfSlides, autoplay = true }) {
    this.element = element;
    this.numberOfSlides = numberOfSlides;
    this.sliderContainer = this.element.firstElementChild;
    this.autoplay = autoplay;
    this.init();
  }

  init() {
    this.autoSlide();
  }

  printWidth() {
    console.log(this.sliderContainer.clientWidth);
  }

  play() {
    this.autoplay = true;
    console.log("play");
  }

  pause() {
    this.autoplay = false;
  }

  autoSlide() {
    let counter = -1;
    let size = this.sliderContainer.offsetWidth;

    /* responsiveness */
    window.addEventListener("resize", () => {
      size = this.sliderContainer.clientWidth;
      slideTransform();
    });

    let slideTransform = () => {
      this.sliderContainer.style.transform = `translate3d(${
        -size * counter
      }px, 0,0)`;
      // this.sliderContainer.style.transition = `0.7s`;
    };

    let slide = () => {
      if (counter < this.numberOfSlides) {
        if (this.autoplay) {
          counter++;
          slideTransform();
        }
        setTimeout(slide, 3000);
      } else {
        counter = -1;
        slideTransform();
        slide();
      }
    };
    slide();
  }
}
