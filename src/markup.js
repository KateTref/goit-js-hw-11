export function createPicturesList({webformatURL, largeImageURL, tags, likes, views, comments, downloads}){
    return`
    <li class="image-list__item">
    <img class="image-list__picture" src="${webformatURL}" width="60px" height="40px"/>
    <ul class="description-list">
    <li class="description-list__likes">
    <p class=description-list__likes-title">Likes</p>
    <p class=description-list__likes-value">${likes}</p>
    </li>
    <li class="description-list__views">
    <p class=description-list__views-title">Likes</p>
    <p class=description-list__views-value">${views}</p>
    </li>
    <li class="description-list__comments">
    <p class=description-list__comments-title">Likes</p>
    <p class=description-list__comments-value">${comments}</p>
    </li>
    <li class="description-list__downloads">
    <p class=description-list__downloads-title">Likes</p>
    <p class=description-list__downloads-value">${downloads}</p>
    </li>
    </ul>
    </li>
    `
}