const navbarBtn = document.querySelector('.navbar__btn');
const navbarMenu = document.querySelector('.navbar__menu');
navbarBtn.addEventListener('click', function (e) {
  e.preventDefault();

  if (navbarBtn.classList.contains('active')) {
    navbarBtn.classList.remove('active');
    navbarMenu.style = `left: -280px; transition: left 0.5s`;
  } else {
    navbarBtn.classList.add('active');
    navbarMenu.style = `left: 0; transition: left 0.5s`;
  }
});
document.addEventListener('mouseup', function (e) {
  if (e.target != navbarBtn) {
    navbarMenu.style = `left: -260px; transition: 0.5s`;
    navbarBtn.classList.remove('active');
  }
});
navbarMenu.addEventListener('mouseup', function (e) {
  e.stopPropagation();
});

class Slider {
  constructor(options) {
    this.slider = options.slider;
    this.sliderList = this.slider.querySelector('.slider__list');
    this.sliderItems = this.slider.querySelectorAll('.slider__list--item');
    this.activeSlide = 0;
    this.moveSlide = 100;
    this.timeMove = 1000;
    this.dir = options.direction.toUpperCase() == 'X' ? 'X' : 'Y';
    this.dotsDisable = options.dotsDisable;
    this.interval = options.interval == undefined ? this.timeMove + 1000 : options.interval;

    if (this.dotsDisable == 'false') {
      this.active = true;
      this.ul = document.createElement('ul');
      this.ul.classList.add('slider__dots');
      this.sliderItems.forEach(() => {
        const li = document.createElement('li');
        this.ul.appendChild(li);
      });
      this.slider.appendChild(this.ul);
      this.dots = this.slider.querySelectorAll('.slider__dots li');
      this.dots[this.activeSlide].classList.add('active');
      this.dots.forEach((dot, key) => {
        dot.addEventListener('click', () => {
          this.controlsDots(key);
        });
      });
    }

    if (options.play == 'true') {
      let autoPlay = setInterval(() => {
        this.move();
      }, this.interval);
      this.slider.addEventListener('mouseenter', () => {
        clearInterval(autoPlay);
      });
      this.slider.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
          this.move();
        }, this.interval);
      });
    }

    this.sliderItems.forEach((slide, num) => {
      if (num != this.activeSlide) {
        slide.style.transform = `translate${this.dir}(${this.moveSlide}%)`;
      }

      if (num == this.sliderItems.length - 1) {
        slide.style.transform = `translate${this.dir}(${-this.moveSlide}%)`;
      }
    });
  }

  move() {
    this.sliderItems.forEach((slide, num) => {
      if (num != this.activeSlide) {
        slide.style.transform = `translate${this.dir}(${this.moveSlide}%)`;
        slide.style.transition = `0ms`;
      }
    });
    setTimeout(() => {
      this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${-this.moveSlide}%)`;
      this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;

      if (this.dotsDisable == 'false') {
        this.dots[this.activeSlide].classList.remove('active');
      }

      this.activeSlide++;

      if (this.activeSlide >= this.sliderItems.length) {
        this.activeSlide = 0;
      }

      this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${0}%)`;
      this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;

      if (this.dotsDisable == 'false') {
        this.dots[this.activeSlide].classList.add('active');
      }
    }, this.timeMove + 200);
  }

  controlsDots(dotKey) {
    if (this.active && dotKey != this.activeSlide) {
      this.sliderItems.forEach(slide => {
        slide.style.transition = `0ms`;
      });
      this.active = false;
      this.dots.forEach(dot => {
        dot.classList.remove('active');
      });
      let moveLeftOrRight = dotKey > this.activeSlide ? -this.moveSlide : this.moveSlide;
      this.sliderItems[dotKey].style.transform = `translate${this.dir}(${moveLeftOrRight}%)`;
      setTimeout(() => {
        this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${-moveLeftOrRight}%)`;
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
        this.dots[this.activeSlide].classList.remove('active');
        this.activeSlide = dotKey;
        this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${0}%)`;
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
        this.dots[this.activeSlide].classList.add('active');
      }, 100);
      setTimeout(() => {
        this.active = true;
      }, this.timeMove + 200);
    }
  }

}

const sliders = document.querySelectorAll('.slider');
sliders.forEach(slider => {
  const direction = slider.getAttribute('data-direction') == 'Y' ? 'Y' : 'X';
  const dotsDisable = slider.hasAttribute('dots-disabled') ? 'true' : 'false';
  const autoPlay = slider.hasAttribute('auto-play') ? 'true' : 'false';
  const interval = Number(slider.getAttribute('interval')) != 0 ? Number(slider.getAttribute('interval')) : undefined;
  new Slider({
    slider: slider,
    timeMove: 1000,
    direction: direction,
    dotsDisable: dotsDisable,
    play: autoPlay,
    interval: interval
  });
});
const tabsLi = document.querySelectorAll('.single__tab--min li');
const bigImg = document.querySelector('.single__tab--img img');
tabsLi.forEach((li, key) => {
  li.addEventListener('click', function () {
    const imgSrc = li.querySelector('img').getAttribute('src');
    tabsLi.forEach((li2, key) => {
      li2.classList.remove('active');
    });
    li.classList.add('active');
    bigImg.setAttribute('src', imgSrc);
  });
});