import galleryItems from './gallery-items';

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const refs = {
    mainGallery: document.querySelector(".js-gallery"),
    galleryImage: document.querySelector('.gallery__image'),
    galleryLink: document.querySelector('.gallery__link'),
    jsLightbox: document.querySelector('.js-lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
    lightboxButton: document.querySelector('[data-action="close-lightbox"]'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
}

const galeryMarkup = createGallery(galleryItems)
refs.mainGallery.insertAdjacentHTML('afterbegin', galeryMarkup);


function createGallery (gallery) {
    return gallery.map(({preview, original, description},index) => {
        return `
        <li class="gallery__item">
        <a
          class="gallery__link"
          href="${preview}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            data-index="${index}"
            alt="${description}"
          />
        </a>
      </li> `
    })
    .join('');
    
}
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.

refs.mainGallery.addEventListener('click', openJsLightbox)
function openJsLightbox (e) {
    //console.log(e)
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    const bigUrl = e.target.dataset.source;
    const imgAlt = e.target.alt;
    const index = e.target.dataset.index;

    refs.jsLightbox.classList.add('is-open');
    refs.lightboxImage.src = bigUrl;
    refs.lightboxImage.alt = imgAlt;
    refs.lightboxImage.dataset.index = index;
    
}

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Закрытие модального окна по клику на div.lightbox__overlay.

refs.lightboxButton.addEventListener('click', closeJsLightbox)
refs.lightboxOverlay.addEventListener('click', closeJsLightbox)
function closeJsLightbox(e) {
    //console.log(e)
    refs.jsLightbox.classList.remove('is-open');
    refs.lightboxImage.src = '';
    refs.lightboxImage.alt = ''
}

//Закрытие модального окна по нажатию клавиши ESC

document.addEventListener('keydown', closeJsWhileEsc)
function closeJsWhileEsc (e) {
    //console.log(e)
    if (e.code === 'Escape') {
        closeJsLightbox()
    }
}

//Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

document.addEventListener('keydown', (e) => scrollGallery(e, galleryItems)); 
function scrollGallery (e, gallery) {
    //console.dir(refs.lightboxImage)
    // console.dir(gallery)
    let index = parseInt(refs.lightboxImage.dataset.index)
    if (e.code === 'ArrowLeft' && index > 0) {
        index -= 1;
        refs.lightboxImage.dataset.index = index;
        refs.lightboxImage.src = gallery[index].original;
        refs.lightboxImage.alt = gallery[index].description;
    }
    if (e.code === 'ArrowRight' && index < gallery.length - 1) {
        index += 1;
        refs.lightboxImage.dataset.index = index;
        refs.lightboxImage.src = gallery[index].original;
        refs.lightboxImage.alt = gallery[index].description;
    }

}
//console.log('hey! this is JS')
