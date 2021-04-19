import galleryItems from "./gallery-items.js"
console.log(galleryItems);

const cardContainer = document.querySelector(".js-gallery");
const cardsMarkup = createGallaryMarkup(galleryItems);
cardContainer.insertAdjacentHTML("beforeend", cardsMarkup);

function createGallaryMarkup(images) {
  return images.map(({preview, original, description}) => {
    return `<li class="gallery__item">
              <a class="gallery__link"
              href="${original}">
                <img class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}" />
              </a>
            </li>`;
  }).join("");
}

cardContainer.addEventListener("click", onCardContainerClick);
const lightbox = document.querySelector('.js-lightbox');
let lightboxImage = document.querySelector(".lightbox__image");

function onCardContainerClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
   onOpenModal(e);
}

function onOpenModal(e) {
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener("keydown", onCarousel);

  lightbox.classList.add("is-open");

  lightboxImage.src = e.target.dataset.source;
  lightboxImage.alt = e.target.alt;
}

const closeBtn = document.querySelector('[data-action="close-lightbox"]');
closeBtn.addEventListener("click", onCloseModal);

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener("keydown", onCarousel);

  lightbox.classList.remove("is-open");

  lightboxImage.src = "";
  lightboxImage.alt = "";
}

const overlay = document.querySelector('.lightbox__overlay');
overlay.addEventListener("click", onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

const currentArr = galleryItems.map(i => i.original);
const currentArrDesc = galleryItems.map(d => d.description);

function onCarousel(e) {
  console.log(e.code);
  if (e.code != "ArrowLeft" && e.code != "ArrowRight") {
    return
  }
  if (e.code == "ArrowLeft") {
    onArrowLeft();
  }
  if (e.code == "ArrowRight") {
    onArrowRight();
  }
}

function onArrowLeft() {
  let currentImg = currentArr.indexOf(lightboxImage.src);
  let currentDesc = currentArrDesc.indexOf(lightboxImage.alt);

  lightboxImage.src = currentArr[currentImg - 1];
  lightboxImage.alt = currentArrDesc[currentDesc - 1];

    if (currentImg === 0) {
      lightboxImage.src = currentArr[currentArr.length - 1];
      lightboxImage.alt = currentArrDesc[currentArrDesc.length - 1];
    }
}

function onArrowRight() {
  let currentImg = currentArr.indexOf(lightboxImage.src);
  let currentDesc = currentArrDesc.indexOf(lightboxImage.alt);

  lightboxImage.src = currentArr[currentImg + 1];
  lightboxImage.alt = currentArrDesc[currentDesc + 1];
    if (!currentArr.includes(lightboxImage.src)) {
      lightboxImage.src = currentArr[0];
      lightboxImage.alt = currentArrDesc[0];
    }
}