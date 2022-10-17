import axios from "axios"; 
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30668884-f41149befa5881754e9280132';

export async function getPictures(query){
const data = await axios.get(`${BASE_URL}?key=${KEY}&q=${query}&image_type=photo`);
console.log(data.data);
return data.data;
}