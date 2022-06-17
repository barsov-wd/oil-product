"use strict"

// Menu

const humburger = document.querySelector('.humburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__block-close'),
    closeItem = document.querySelectorAll('.menu__item');

humburger.addEventListener('click', () => {
    menu.classList.add('active');
    menu.style.overflow = 'auto';
    document.body.style.overflow = 'hidden';
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
    document.body.style.overflow = '';
});

closeItem.forEach(item => {
    item.addEventListener('click', () => {
        menu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Modal

const modalTrigger = document.querySelectorAll('[data-modal]'),
    overlay = document.querySelector('.overlay');

modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
});

function openModal() {
    overlay.classList.add('show');
    overlay.classList.remove('hide');
    overlay.style.overflow = 'auto';
    document.body.style.overflow = 'hidden';
}


function closeModal() {
    overlay.classList.add('hide');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
}

overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.getAttribute('data-close') == "") {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code == "Escape" && overlay.classList.contains('show')) {
        closeModal();
    }
});


// ModalText 
const aboutContentTrigger = document.querySelector('.about__content-trigger'),
    modalTextClose = document.querySelector('.modal-text__close'),
    overlayText = document.querySelector('.overlay-text');

aboutContentTrigger.addEventListener('click', () => {
    overlayText.classList.remove('hide');
    overlayText.classList.add('show');
    overlayText.style.overflow = 'auto';
    document.body.style.overflow = 'hidden';
});

modalTextClose.addEventListener('click', () => {
    overlayText.classList.remove('show');
    overlayText.classList.add('hide');
    document.body.style.overflow = '';
});



// Slider

const sliders = (slides, dir, prev, next) => {
    let slideIndex = 1;
    const items = document.querySelectorAll(slides);


    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach(item => {
            item.classList.add('fade');
            item.style.display = 'none';
        });

        items[slideIndex - 1].style.display = 'block';
    }

    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }


    try {
        const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
        });

        nextBtn.addEventListener('click', () => {
            plusSlides(1);
        });

        let initialPoint;
        let finalPoint;
        items.forEach((item) => {
            item.addEventListener('touchstart', (e) => {
                e.stopPropagation();
                initialPoint = e.changedTouches[0];
            }, false);
        });
        items.forEach(item => {
            item.addEventListener('touchend', (e) => {
                e.stopPropagation();
                finalPoint = e.changedTouches[0];
                let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
                let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
                if (xAbs > 20 || yAbs > 20) {
                    if (xAbs > yAbs) {
                        if (finalPoint.pageX < initialPoint.pageX) {
                            plusSlides(-1);
                        } else {
                            plusSlides(1);
                        }
                    }
                }
            }, false);
        });

    } catch (e) {}
};

sliders('.products__slide', '', '.products__arrows-prev', '.products__arrows-next');
sliders('.certificates__image-mobile', '', '.certificates__arrows-prev', '.certificates__arrows-next');
sliders('.customers__image-mobile', '', '.customers__arrows-prev', '.customers__arrows-next');