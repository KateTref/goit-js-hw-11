import './css/styles.css';
import { Notify } from 'notiflix';
import { getPictures } from './pictures';
import { createPicturesList } from './markup';


const formRef = document.querySelector(".search-form");
const imageListRef = document.querySelector(".image-list");

formRef.addEventListener("submit", onSearchPictures);
let inputValue = "";


async function onSearchPictures(event) {
    inputValue = event.target.value.trim().toLowerCase().join("+");
    console.log(inputValue);
    if (!inputValue) {
        return;
    }
    try{
       const data = await getPictures(inputValue);
       const markup = await [...data.hits].map(createPicturesList).join("");
       imageListRef.insertAdjacentHTML("beforeend", markup);
    }
    catch ({ message }) {
        Notify.failure(message);
      } 
    };
