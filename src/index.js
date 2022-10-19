import './css/styles.css';
import { Notify } from 'notiflix';
import { getPictures, PER_PAGE } from './pictures';
import { createPicturesList } from './markup';

const formRef = document.querySelector(".search-form");
const formInputRef = document.querySelector('.search-form [name="searchQuery"]');
const imageListRef = document.querySelector(".image-list");
let currentPage;
let currentData;
let carrentQuery;

formRef.addEventListener("submit", onSearchPictures);
let inputValue = "";

function clearResultData() {
  imageListRef.innerHTML = "";
}

function renderMarkup(pictures) {
  const markup = pictures.map(createPicturesList).join("");
  imageListRef.insertAdjacentHTML("beforeend", markup);
}

function loadingImages(page, query){
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
    renderMarkup(data.hits);
  }
  
 };

async function onSearchPictures(event) {
  event.preventDefault();
  clearResultData();
    inputValue = formInputRef.value.trim().toLowerCase();
    if (!inputValue) {
      Notify.warning(`Enter, please, any value in the field.`);
        return;
    };
    return loadingImages(1, inputValue)();
    };

  
