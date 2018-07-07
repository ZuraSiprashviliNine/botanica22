
import Axios from 'axios';

export function INIT_SEARCH(){
  return {
    type: 'INIT_SEARCH',
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

export function SEARCH_SEARCH_ITEMS(data){
  return {
    type: 'SEARCH_SEARCH_ITEMS',
    payload: new Promise((resolve, reject) => {
      Axios.get('https://botanica22.ge/data.php', {
        params: {
          search: data
        }
      })
        .then((response) => {
          resolve(response.data.length === 0 ? [] : response.data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}