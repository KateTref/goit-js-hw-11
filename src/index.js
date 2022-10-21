import './css/styles.css';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPictures, PER_PAGE , page, query} from './pictures';
import { createPicturesList } from './markup';

const formRef = document.querySelector(".search-form");
const formInputRef = document.querySelector('.search-form [name="searchQuery"]');
const imageListRef = document.querySelector(".gallery");
const loadBtnRef = document.querySelector('.load-more');




formRef.addEventListener("submit", onSearchPictures);
loadBtnRef.addEventListener('click', onLoadMore);

const lightBox = new SimpleLightbox('.wrapper a', {
  captionsData: 'alt',
  captionDelay: 300,
});

async function onSearchPictures(event) {
  clearResaultList();
  event.preventDefault();
  queryParams = formInputRef.value.trim().toLowerCase();
  console.log(queryParams);
  if (!queryParams) {
    Notify.warning(`Enter, please, any value in the field.`);
      return;
  };
  try{
    const searchData = await getPictures(queryParams);
    const {hits, totalHits} = searchData; 
    if(hits.length === 0){
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      loadBtnRef.classList.add("is-hidden");
      return;
    }
      Notify.success(`Hooray! We found ${totalHits} images.`);
      const markup = hits.map(createPicturesList).join("");
      imageListRef.innerHTML = markup;
      if(totalHits > 40){
        loadBtnRef.classList.remove("is-hidden");
      }
      if(totalHits <= 40) {
        loadBtnRef.classList.add("is-hidden");
        const info = ()=>{
          setTimeout(()=>{
            Notify.info("We're sorry, but you've reached the end of search results.");
          }, 2000);
        }  
        info();
      }
      lightBox.refresh();
  } catch(error){
    Notify.failure("Sorry, something went wrong!");
    console.log(error);
  }
};

async function onLoadMore(){
  const newLoadData = await getPictures(query);
  const {hits, totalHits} = newLoadData;
  const markup = hits.map(createPicturesList).join("");
  imageListRef.insertAdjacentHTML("beforeend", markup);
  lightBox.refresh();
  const pagesValue = Math.ceil(totalHits / PER_PAGE);
  console.log(pagesValue);
  console.log(page - 1);
  console.log((page - 1) === pagesValue);
  if(page - 1 === pagesValue){
    loadBtnRef.classList.add("is-hidden");
    const info = ()=>{
      setTimeout(()=>{
        Notify.info("We're sorry, but you've reached the end of search results.");
      }, 2000);
    }  
    info();
  }
} 

function clearResaultList() {
  console.log(imageListRef);
  imageListRef.innerHTML = " ";
}