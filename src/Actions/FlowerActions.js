
import Axios from 'axios';

export function INIT_FLOWER(){
  return {
    type: 'INIT_FLOWER',
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

export function UNSET_FLOWER_FLOWER(){
  return {
    type: 'UNSET_FLOWER_FLOWER',
    payload: null
  }
}

export function SET_FLOWER_COUNT(num){
  return {
    type: 'SET_FLOWER_COUNT',
    payload: num
  }
}

export function SET_FLOWER_SIZE(id){
  return {
    type: 'SET_FLOWER_SIZE',
    payload: id
  }
}

export function SET_FLOWER_PRICE(price){
  return {
    type: 'SET_FLOWER_PRICE',
    payload: price
  };
}

export function SET_FLOWER_OLD_PRICE(price){
  return {
    type: 'SET_FLOWER_OLD_PRICE',
    payload: price
  }
}

export function SET_FLOWER_FLOWER(id){
  return {
    type: 'SET_FLOWER_FLOWER',
    payload: new Promise((resolve, reject) => {
      Axios.get('https://botanica22.ge/data.php', {
        params: {
          product: id
        }
      })
        .then((response) => {
          if (response.data.length !== 0) {
              resolve(response.data[0]);
          }else{
            resolve(null);
          }
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}