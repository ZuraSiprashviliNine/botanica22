
import Axios from 'axios';

export function INIT_COMMON_REDUCER(){
  return {
    type: 'INIT_COMMON_REDUCER',
    payload: new Promise((resolve, reject) => {
      Axios.get('https://botanica22.ge/data.php', {
        params: {
          common: 'locale'
        }
      })
        .then((response) => {
          resolve({
            title: response.data.title,
            description: response.data.description,
            copy: response.data.copy
          });
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}