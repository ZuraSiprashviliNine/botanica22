
import Axios from 'axios';

export function INIT_CONDITIONS(){
  return {
    type: 'INIT_CONDITIONS',
    payload: new Promise((resolve, reject) => {
      Axios.get('https://botanica22.ge/data.php', {
        params: {
          common: 'locale'
        }
      })
        .then((response) => {
          resolve({
            language: response.data.language,
            divider: response.data.divider
          });
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}

export function SET_CONDITIONS(){
  return {
    type: 'SET_CONDITIONS',
    payload: new Promise((resolve, reject) => {
      Axios.get('https://botanica22.ge/data.php', {
        params: {
          conditions: 'page'
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
