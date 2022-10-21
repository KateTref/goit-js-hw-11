import axios from "axios"; 
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30668884-f41149befa5881754e9280132';
export let page = 1;
export let query = null;
export const PER_PAGE = 40;

export async function getPictures(queryParams){
    if (queryParams !== query) {
        page = 1;
        query = queryParams;
      }
    const options = {
        params: {
            key: KEY,
            q: query,
            page: page,
            per_page: PER_PAGE,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        },
    };
const {data} = await axios.get(`${BASE_URL}`, options);
page += 1;
return data;
}