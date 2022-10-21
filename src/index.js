import './css/styles.css';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPictures, PER_PAGE } from './pictures';
import { createPicturesList } from './markup';

const formRef = document.querySelector(".search-form");
const formInputRef = document.querySelector('.search-form [name="searchQuery"]');
const imageListRef = document.querySelector(".gallery");
const loadBtnRef = document.querySelector('.load-more');

// let currentPage;
let onClickLoadMoreBtn = null;


formRef.addEventListener("submit", onSearchPictures);
// loadBtnRef.addEventListener('click', addLoadMoreBtn);

async function onSearchPictures(event) {
  clearResaultList();
  event.preventDefault();

    let inputValue = formInputRef.value.trim().toLowerCase();
    if (!inputValue) {
      Notify.warning(`Enter, please, any value in the field.`);
        return;
    };
    return loadingPictures(1, inputValue)();
    };

    function clearResaultList() {
      console.log(imageListRef);
      imageListRef.innerHTML = " ";
      
  }

function renderMarkup(pictures) {
  const markup = pictures.map(createPicturesList).join("");
  imageListRef.insertAdjacentHTML("beforeend", markup);
  lightBox.refresh();
}

function loadingPictures(page, query){
  
  return async ()=>{
    let data = [];
    try{
      data = await getPictures({page, query});
      console.log(data);
    }
    catch(event){
      Notify.failure(event.message)
    }
    const pagesValue = Math.ceil(data.totalHits / PER_PAGE);
    if(data.totalHits === 0 && page === 1){
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    if(data.totalHits > 0 && page === 1){
      Notify.success(`Hooray! We found ${data.totalHits} images.`)
    }
    if (pagesValue > 0 && page === pagesValue) {
      Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
    }
    renderMarkup(data.hits);
    onMoreLoading({data, page, query});
  }
 };

 function onMoreLoading({data, page, query}){
  const haveMorePicture = getIsVisibleLoadMoreBtn({
    totalHits: data.totalHits,
    page,
  });

  if(haveMorePicture){
    addLoadMoreBtn(page, query);
  } else {
    removeLoadMoreBtn();
  }
 }
  
    function addLoadMoreBtn(page, query) {
      loadBtnRef.classList.remove('is-hidden');
      onClickLoadMoreBtn = loadingPictures(page += 1, query);
      loadBtnRef.addEventListener('click', onClickLoadMoreBtn);
    };

    function removeLoadMoreBtn() {
      loadBtnRef.classList.add('is-hidden');
    };

    function getIsVisibleLoadMoreBtn({ totalHits, page}) {
      const pages = Math.ceil(totalHits / PER_PAGE);
      return pages > page;
    };

    const lightBox = new SimpleLightbox('.wrapper a', {
      captionsData: 'alt',
      captionDelay: 300,
    });