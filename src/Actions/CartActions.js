
import Axios from 'axios';

export function INIT_CART(){
  return {
    type: 'INIT_CART',
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
          })
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}

export function ADD_CARTS_CART_BY_ID(id){
  return {
    type: 'ADD_CARTS_CART_BY_ID',
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
export function UNSET_CARTS_CARTS(){
  return {
    type: 'UNSET_CARTS_CARTS',
    payload: []
  }
}

export function SET_CART_SIZE(size, id){
  return {
    type: 'SET_CART_SIZE',
    payload: {size, id}
  };
}

export function SET_CART_COUNT(count, id){
  return {
    type: 'SET_CART_COUNT',
    payload: {count, id}
  };
}

export function SET_CART_ITEM_PRICE(price, id){
  return {
    type: 'SET_CART_ITEM_PRICE',
    payload: {price, id}
  }
}

export function SET_CART_ITEM_OLD_PRICE(price, id){
  return {
    type: 'SET_CART_ITEM_OLD_PRICE',
    payload: {price, id}
  }
}

export function UNSET_CARTS_CART_ITEM(id){
  return {
    type: 'UNSET_CARTS_CART_ITEM',
    payload: id
  }
}