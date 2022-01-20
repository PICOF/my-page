class Slide {
  constructor() {
    this.slideBoxDOM = document.querySelector('.slide-box');
    this.slideLeftBtnDOM = this.slideBoxDOM.querySelector('.slide-left-btn');
    this.slideRightBtnDOM = this.slideBoxDOM.querySelector('.slide-right-btn ');
    this.bannerBoxDOM = this.slideBoxDOM.querySelector('.banner-box');
    this.paginationBoxDOM = this.slideBoxDOM.querySelector('.pagination-box');

    this._currentIndex = 0;
    this.bannerItemDOMs = null;
    this.bannerItemDOMsLen = 0;

    this.banners = [
      {
        imageName: '1.jpg',
      },
      {
        imageName: '2.jpg',
      },
      {
        imageName: '3.jpg',
      },
      {
        imageName: '4.jpg',
      },
    ];
    this.imageUrl = './image/';

    this.timer = null;
  }

  get currentIndex() {
    return this._currentIndex;
  }

  set currentIndex(num) {
    Object.values(this.bannerItemDOMs).forEach((item, i) => {
      item.classList.remove('left', 'middle', 'right');
      item.onclick = null;
      this.paginationBoxDOM.children[i].classList.remove('chose');
    });

    if (num < 0) {
      this._currentIndex = this.bannerItemDOMsLen - 1;
    } else if (num >= this.bannerItemDOMsLen) {
      this._currentIndex = 0;
    } else {
      this._currentIndex = num;
    }
    this.paginationBoxDOM.children[this._currentIndex].classList.add('chose');

    if (this._currentIndex === 0) {
      this.showCurrentBanner(this.bannerItemDOMsLen - 1, this._currentIndex, this._currentIndex + 1);
    } else if (this._currentIndex === this.bannerItemDOMsLen - 1) {
      this.showCurrentBanner(this._currentIndex - 1, this._currentIndex, 0);
    } else {
      this.showCurrentBanner(this._currentIndex - 1, this._currentIndex, this._currentIndex + 1);
    }
  }

  showCurrentBanner(leftIndex, middleIndex, rightIndex) {
    this.bannerItemDOMs[leftIndex].classList.add('left');
    this.bannerItemDOMs[middleIndex].classList.add('middle');
    this.bannerItemDOMs[rightIndex].classList.add('right');
    this.bannerItemDOMs[leftIndex].onclick = () => {
      this.currentIndex--;
    };
    this.bannerItemDOMs[rightIndex].onclick = () => {
      this.currentIndex++;
    }
  }

  getBannerItemDOMs() {
    return this.slideBoxDOM.querySelectorAll('.banner-item');
  }

  getBannerItemHTML(imageName) {
    return `<div class="banner-item"><img src="${this.imageUrl+imageName}"></div>`
  }

  drawDOM(banners) {
    this.bannerBoxDOM.innerHTML = banners.reduce((html, item) => {
      return html + this.getBannerItemHTML(item.imageName);
    }, '');

    this.banners.forEach((item,i) => {
      const span = document.createElement('span');
      span.addEventListener('mouseover', () => {
        this.currentIndex = i;
      });
      this.paginationBoxDOM.append(span);
    });
  }

  openTimer() {
    this.timer = setInterval(() => {
      this.currentIndex++;
    }, 5000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  init() {
    this.drawDOM(this.banners);
    this.bannerItemDOMs = this.getBannerItemDOMs();
    this.bannerItemDOMsLen = this.bannerItemDOMs.length;
    this.currentIndex = 0;

    this.slideLeftBtnDOM.addEventListener('click', () => {
      this.currentIndex--;
    });
    this.slideRightBtnDOM.addEventListener('click', () => {
      this.currentIndex++;
    });

    this.openTimer();
    this.slideBoxDOM.addEventListener('mouseover', () => {
      this.stopTimer();
    });
    this.slideBoxDOM.addEventListener('mouseout', () => {
      this.openTimer();
    })
  }
}

new Slide().init();