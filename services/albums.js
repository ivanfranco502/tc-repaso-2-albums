
const host = 'https://jsonplaceholder.typicode.com';
const toJSON = response => response.json();

export const fetchAll = () => 
  window
    .fetch(`${host}/albums`)
    .then(toJSON);

export const fetchPhotos = albumId => 
  window
    .fetch(`${host}/photos?albumId=${albumId}`)
    .then(toJSON);
