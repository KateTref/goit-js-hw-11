import './css/styles.css';
import { Notify } from 'notiflix';
import { getPictures, PER_PAGE } from './pictures';
import { createPicturesList } from './markup';

const formRef = document.querySelector(".search-form");
const formInputRef = document.querySelector('.search-form [name="searchQuery"]');
const imageListRef = document.querySelector(".image-list");
const loadBtnRef = document.querySelector('.load-more');
let currentPage;
let currentData;
let carrentQuery;

formRef.addEventListener("submit", onSearchPictures);
let inputValue = "";

async function onSearchPictures(event) {
  event.preventDefault();
  clearResultData();
    inputValue = formInputRef.value.trim().toLowerCase();
    if (!inputValue) {
      Notify.warning(`Enter, please, any value in the field.`);
        return;
    };
    return loadingPictures(1, inputValue)();
    };

function clearResultData() {
  imageListRef.innerHTML = "";
}

function renderMarkup(pictures) {
  const markup = pictures.map(createPicturesList).join("");
  imageListRef.insertAdjacentHTML("beforeend", markup);
}

function loadingPictures(page, query){
  currentPage = page;
  return async ()=>{
    let data;
    try{
      data = await getPictures({page, query});
      console.log(data);
      currentData = data;
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
    // if (pagesValue > 0 && page === pagesValue) {
    //   Notify.failure(
    //     `We're sorry, but you've reached the end of search results.`
    //   );
    // }
    renderMarkup(data.hits);
    onMoreLoading({data, page, query});
  }
 };

 function onMoreLoading({data, page, query}){
  const haveMorePicture = getIsVisibleLoadMoreBtn({
    totalHits: data.totalHits,
    page,
  });
  console.log(haveMorePicture);
  if(haveMorePicture){
    addLoadMoreBtn(page, query);
  } else {
    removeLoadMoreBtn();
  }
 }
  
    function addLoadMoreBtn(page, query) {
      loadBtnRef.classList.remove('is-hidden');
      loadBtnRef.addEventListener('click', loadingPictures(page + 1, query));
    };

    function removeLoadMoreBtn() {
      loadBtnRef.classList.add('is-hidden');
    }
    function getIsVisibleLoadMoreBtn({ totalHits, page}) {
      const pages = Math.ceil(totalHits / PER_PAGE);
      return pages > page;
    }