import axios from "axios"; 
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30668884-f41149befa5881754e9280132';
export const PER_PAGE = 40;

export async function getPictures({query, page}){
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
return data;
}