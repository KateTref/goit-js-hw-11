export function createPicturesList({webformatURL, largeImageURL, tags, likes, views, comments, downloads}){
    return `
    <div class=wrapper>
    <a class="photo-card link" href="${largeImageURL}">
  <img class="photo-card__img" src="${webformatURL}" alt="${tags}" width="280px" height="200px" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</a></div>`;
}