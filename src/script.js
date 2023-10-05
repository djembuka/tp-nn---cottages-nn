window.addEventListener('DOMContentLoaded', () => {
  //marquee
  Marquee3k.init();

  //main
  if (
    document.querySelector('.mainSwiper') &&
    document.querySelectorAll('.mainSwiper .swiper-slide').length > 1
  ) {
    new Swiper('.mainSwiper', {
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }

  function initSwiperGallery(elem, callback) {
    if (elem && elem.querySelectorAll('.swiper-slide').length > 1) {
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (
              !elem.classList.contains('swiper-initialized') &&
              entry.isIntersecting
            ) {
              callback();
            }
          });
        },
        {
          threshold: 0,
        }
      ).observe(elem);
    }
  }

  //about
  initSwiperGallery(document.querySelector('#aboutSwiper .swiper'), () => {
    new Swiper('#aboutSwiper .swiper', {
      slidesPerView: 1,
      autoHeight: false,
      loop: true,
      pagination: {
        el: '#aboutSwiperPagination',
      },
      navigation: {
        nextEl: '#aboutSwiperNext',
        prevEl: '#aboutSwiperPrev',
      },
    });
  });

  //safety
  initSwiperGallery(document.querySelector('.safetySwiper'), () => {
    new Swiper('.safetySwiper', {
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: '#safetySwiperNext',
      },
    });
  });

  //infrastructure
  initSwiperGallery(document.querySelector('.infraSwiper'), () => {
    new Swiper('.infraSwiper', {
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: '#infraSwiperNext',
      },
    });
  });

  //variants
  initSwiperGallery(document.querySelector('#varSwiper .swiper'), () => {
    new Swiper('#varSwiper .swiper', {
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '#varSwiperPagination',
      },
    });
  });

  //tabs
  document.querySelectorAll('.tabs').forEach(function (tabsBlock) {
    var nav = tabsBlock.querySelector('.tabs__nav');
    var navFirstItem = tabsBlock.querySelector(`.tabs__nav__item`);
    var navItems = tabsBlock.querySelectorAll('.tabs__nav__item');
    var underline = tabsBlock.querySelector('.tabs__nav__underline');
    var tabsItems = tabsBlock.querySelectorAll('.tabs__tabs__item');

    navItems.forEach(function (navItem) {
      navItem.addEventListener('click', function (e) {
        e.preventDefault();

        var tab = navItem.getAttribute('data-tab');

        //highlight nav
        navItems.forEach(function (n) {
          n.classList.remove('tab__nav__item--active');
        });
        navItem.classList.add('tab__nav__item--active');

        //highlight tabs
        tabsItems.forEach(function (t) {
          t.classList.remove('tabs__tabs__item--active');
        });
        tabsBlock
          .querySelector(`.tabs__tabs__item[data-tab=${tab}]`)
          .classList.add('tabs__tabs__item--active');

        //underline
        underline.style.width = `${navItem.clientWidth}px`;
        underline.style.left = `${
          navItem.getBoundingClientRect().left +
          nav.scrollLeft -
          nav.getBoundingClientRect().left
        }px`;
      });
    });

    //first load
    navFirstItem.click();
  });

  //projects
  if (
    document.querySelector('.projectThumbsSwiper') &&
    document.querySelectorAll('.projectThumbsSwiper .swiper-slide').length > 1
  ) {
    document.querySelectorAll('.projectImageSwiper').forEach((sw) => {
      const thumbs = sw.parentNode.querySelector('.projectThumbsSwiper');
      let thumbsSwiper = new Swiper(thumbs, {
        spaceBetween: 10,
        slidesPerView: 8.5,
        freeMode: true,
        watchSlidesProgress: true,
      });
      new Swiper(sw.querySelector('.swiper'), {
        slidesPerView: 1,
        loop: true,
        thumbs: {
          swiper: thumbsSwiper,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    });
  }

  //detail
  if (
    document.querySelector('#projectImageSwiper') &&
    document.querySelectorAll('.projectThumbsSwiper .swiper-slide').length > 1
  ) {
    let sw = document.querySelector('#projectImageSwiper');
    const thumbs = sw.parentNode.querySelector('.projectThumbsSwiper');
    let thumbsSwiper = new Swiper(thumbs, {
      spaceBetween: 10,
      slidesPerView: 8.5,
      freeMode: true,
      watchSlidesProgress: true,
    });
    new Swiper(sw.querySelector('.swiper'), {
      slidesPerView: 1,
      loop: true,
      thumbs: {
        swiper: thumbsSwiper,
      },
      navigation: {
        nextEl: '#projectImageSwiperNext',
        prevEl: '#projectImageSwiperPrev',
      },
    });
  }

  //genplan
  const genplan = document.querySelector('.genplan');
  const gc = genplan.parentNode.querySelector('.genplan-card');
  const genplanCard = {
    card: gc,
    img: gc.querySelector('img'),
    title: gc.querySelector('b'),
    land: gc.querySelectorAll('.genplan-card__text div')[0],
    house: gc.querySelectorAll('.genplan-card__text div')[1],
    status: gc.querySelector('em'),
    price: gc.querySelector('i'),
    oldPrice: gc.querySelector('s'),
    btn: gc.querySelector('a'),
  };

  function genplanRemoveShown() {
    genplanCard.card.classList.remove('genplan-card--show');
    setTimeout(() => {
      genplanCard.img.setAttribute('src', '');
      genplanCard.title.textContent = '';
      genplanCard.land.textContent = '';
      genplanCard.house.textContent = '';
      genplanCard.status.textContent = '';
      genplanCard.price.textContent = '';
      genplanCard.oldPrice.textContent = '';
      genplanCard.btn.setAttribute('href', '');
      //coords
      genplanCard.card.removeAttribute('style');
    }, 500);
  }
  genplan.querySelector('.genplan-image').addEventListener('click', (e) => {
    e.preventDefault();
    genplanRemoveShown();
  });
  genplan.querySelectorAll('.genplan-num').forEach((num) => {
    num.addEventListener('click', (e) => {
      e.preventDefault();
      genplanCard.card.classList.add('genplan-card--show');
      //data
      const data = JSON.parse(num.getAttribute('data-object'));
      genplanCard.card.classList.remove(
        'genplan-card--soled',
        'genplan-card--tosale'
      );
      genplanCard.card.classList.add(`genplan-card--${data.status}`);
      genplanCard.img.setAttribute('src', data.img);
      genplanCard.title.textContent = data.title;
      genplanCard.land.textContent = data.land;
      genplanCard.house.textContent = data.house;
      genplanCard.status.textContent = data.statusText;
      genplanCard.price.textContent = data.price;
      genplanCard.oldPrice.textContent = data['old-price'];
      genplanCard.btn.setAttribute('href', data.href);
      //coords
      if (window.matchMedia('(min-width: 768px)').matches) {
        const wrapperCoords = genplan.parentNode.getBoundingClientRect();
        const numCoords = num.getBoundingClientRect();
        genplanCard.card.style.left = `${
          numCoords.left - wrapperCoords.left + num.clientWidth / 2
        }px`;
        genplanCard.card.style.top = `${
          numCoords.top - wrapperCoords.top - num.clientHeight / 2
        }px`;
      }
    });
  });

  //input
  document.querySelectorAll('.input').forEach((block) => {
    let control = block.querySelector('input');
    if (control.value.trim() !== '') {
      block.classList.add('input--active');
    }

    control.addEventListener('focus', () => {
      block.classList.add('input--active');
    });

    control.addEventListener('blur', () => {
      if (control.value.trim() !== '') {
        block.classList.add('input--active');
      } else {
        block.classList.remove('input--active');
      }
    });
  });

  //modal form
  const body = document.querySelector('body');
  const modalForm = document.querySelector('.modal-form');

  function showModal(type) {
    body.classList.add(`show-modal-${type}`);
    body.classList.add(`z-modal-${type}`);
  }

  function hideModal(type) {
    body.classList.remove(`show-modal-${type}`);
    setTimeout(() => {
      body.classList.remove(`z-modal-${type}`);
      //form
      if (type === 'form') {
        //clear controls
        modalForm.querySelectorAll('input').forEach((control) => {
          control.value = '';
        });
        //clear result
        modalForm.querySelector('.result').innerHTML = '';
        //form mode
        modalForm.classList.remove('modal-form--result');
      }
      //video
      if (type === 'video') {
        stopVideo();
      }
    }, 500);
  }

  modalForm.addEventListener('click', (e) => {
    e.preventDefault();
    hideModal('form');
  });

  document.querySelector('.modal-body').addEventListener('click', (e) => {
    e.stopPropagation();
  });

  document.querySelectorAll('.btn--send').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showModal('form');
      //object hidden
      if (btn.getAttribute('data-object')) {
        document.getElementById('objectId').value =
          btn.getAttribute('data-object');
      }
    });
  });

  //send form
  const form = modalForm.querySelector('form');
  const resultBlock = modalForm.querySelector('.result');

  form.addEventListener('submit', async (e) => {
    //validation
    let focusElement = formValidation(form);

    //focus
    if (focusElement) {
      e.preventDefault();
      return false;
    }

    //send form data
    e.preventDefault();
    let formData = new FormData();
    form.querySelectorAll('input').forEach((input) => {
      formData.set(input.getAttribute('name'), input.value);
    });

    try {
      const response = await fetch(form.getAttribute('action'), {
        method: form.getAttribute('method'),
        body: formData,
      });

      const result = await response.json();

      if (result && typeof result === 'object') {
        if (result.STATUS === 'Y') {
          resultBlock.innerHTML = result.HTML;
          modalForm.classList.add('modal-form--result');
          //close button
          resultBlock.querySelector('.btn').addEventListener('click', (e) => {
            e.preventDefault();
            hideModal('form');
          });
        }
      }
    } catch (err) {
      throw err;
    }
  });

  function formValidation(form) {
    let focusElement;

    //required
    form.querySelectorAll('[required]').forEach((reqInput) => {
      if (reqInput.value.trim() === '') {
        if (!focusElement) {
          focusElement = reqInput;
        }
        reqInput.closest('.input').classList.add('input--invalid');
      } else {
        reqInput.closest('.input').classList.remove('input--invalid');
      }
    });

    if (focusElement) {
      focusElement.focus();
    }

    return focusElement;
  }

  //modal video
  if (
    document.querySelector('.modal-video') &&
    document.querySelector('.video-icon')
  ) {
    const modalVideo = document.querySelector('.modal-video');

    document.querySelector('.video-icon').addEventListener('click', (e) => {
      e.preventDefault();
      showModal('video');
    });

    modalVideo.addEventListener('click', (e) => {
      e.preventDefault();
      hideModal('video');
    });
  }

  //header mobile menu
  let headerAnimationId;
  const header = document.querySelector('header');

  document.getElementById('iconMenu').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    header.classList.toggle('header--mobile-menu');
    headerZIndexAnimation();
  });

  document.documentElement.addEventListener('click', () => {
    header.classList.remove('header--mobile-menu');
    headerZIndexAnimation();
  });

  document.getElementById('iconHideMenu').addEventListener('click', () => {
    header.classList.remove('header--mobile-menu');
    headerZIndexAnimation();
  });

  function headerZIndexAnimation() {
    clearTimeout(headerAnimationId);
    header.classList.add('header--mobile-menu-animation');
    headerAnimationId = setTimeout(() => {
      header.classList.remove('header--mobile-menu-animation');
    }, 500);
  }

  document
    .querySelector('.header-mobile-menu__wrapper')
    .addEventListener('click', (e) => {
      e.stopPropagation();
    });

  //gallery parallax efferct
  function parallaxEffect() {
    ['#aboutSwiper' /*'#varSwiper' , '.projectImageSwiper'*/].forEach(
      (selector) => {
        document.querySelectorAll(`${selector}`).forEach((elem) => {
          swiperElem = elem.querySelector('.swiper');
          let percentage =
            ((swiperElem.getBoundingClientRect().y + swiperElem.clientHeight) /
              window.innerHeight) *
            15;

          swiperElem.style.transform = `translateY(-${percentage}%)`;
        });
      }
    );
  }
  window.addEventListener('scroll', (e) => {
    parallaxEffect();
  });
  parallaxEffect();

  if (document.querySelector('.location')) {
    document
      .querySelector('.location')
      .querySelectorAll('.location-item')
      .forEach((item) => {
        item.addEventListener('click', (e) => {
          e.preventDefault();

          const tab = item;
          tab
            .closest('dl')
            .querySelectorAll('.location-item--active')
            .forEach((activeTab) => {
              activeTab.classList.remove('location-item--active');
            });
          tab.classList.add('location-item--active');

          tab
            .closest('.fluid-container')
            .querySelector(`.location-tab.active`)
            .classList.remove('active');
          tab
            .closest('.fluid-container')
            .querySelector(
              `.location-tab[data-tab="${tab.getAttribute('data-tab')}"]`
            )
            .classList.add('active');
        });
      });
  }
});

//youTube
if (document.querySelector('.video-icon')) {
  let tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';

  let firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.videoId =
    document.querySelector('.video-icon').getAttribute('data-id') ||
    'S9YfpMpgoo0';
}

let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: window.videoId,
    playerVars: {
      showinfo: 0,
      rel: 0,
    },
  });
}

function stopVideo() {
  player.stopVideo();
}
