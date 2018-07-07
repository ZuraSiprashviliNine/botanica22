
import Axios from 'axios';

export function INIT_FOOTER(){
  return {
    type: 'INIT_FOOTER',
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

export function SET_FOOTER(){
  return {
    type: 'SET_FOOTER',
    payload: new Promise((resolve, reject) => {
      Axios.get('https://botanica22.ge/data.php', {
        params: {
          footer: 'data'
        }
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}

export function SUBSCRIBE(subscribe, email){
  return {
    type: 'SUBSCRIBE',
    payload: new Promise((resolve, reject) => {
      Axios.get('https://botanica22.ge/data.php', {
        params: {
          subscribe: email
        }
      })
        .then((response) => {
          resolve(subscribe && response.data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}