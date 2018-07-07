
import Axios from 'axios';

export function INIT_FAVOURITES(){
  return {
    type: 'INIT_FAVOURITES',
    payload: new Promise((resolve, reject) => {
      Axios.get('https://botanica22.ge/data.php', {
        params: {
          common: 'locale'
        }
      })
        .then((response) => {
          resolve({
            divider: response.data.divider,
            language: response.data.language
          });
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}

export function ADD_FAVOURITES_FAVOURITE(favourite){
  return {
    type: 'ADD_FAVOURITES_FAVOURITE',
    payload: favourite
  }
}

export function ADD_FAVOURITES_FAVOURITES_BY_ID(id){
  return {
    type: 'ADD_FAVOURITES_FAVOURITES_BY_ID',
    payload: new Promise((resolve, reject) => {
      Axios.get('https://botanica22.ge/data.php', {
        params: {
          product: id
        }
      })
        .then((response) => {
          if(response.data.length !== 0){
            resolve(response.data[0]);
          }
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
}

export function ADD_FAVOURITES_FAVOURITES_BY_IDS(ids){
  return {
    type: 'ADD_FAVOURITES_FAVOURITES_BY_IDS',
    payload: new Promise((resolve, reject) => {
      Axios.get('https://botanica22.ge/data.php', {
        params: {
          favourites: ids.join('_')
        }
      })
        .then((response) => {
          if(response.data.length !== 0){
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
}

export function UNSET_FAVOURITES_FAVOURITES(){
  return {
    type: 'UNSET_FAVOURITES_FAVOURITES',
    payload: []
  }
}

export function UNSET_FAVOURITES_FAVOURITE_ITEM(id){
  return {
    type: 'UNSET_FAVOURITES_FAVOURITE_ITEM',
    payload: id
  }
}