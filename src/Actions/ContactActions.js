
import Axios from 'axios';

export function INIT_CONTACT(){
  return {
    type: 'INIT_CONTACT',
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

export function SET_CONTACT(){
  return {
    type: 'SET_CONTACT',
    payload: new Promise((resolve, reject) => {
      Axios.get('https://botanica22.ge/data.php', {
        params: {
          contact: 'page'
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
