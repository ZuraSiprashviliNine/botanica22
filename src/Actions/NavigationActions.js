
import Axios from 'axios';

export function SET_NAVIGATION(){
  return {
    type: 'SET_NAVIGATION',
    payload: new Promise((resolve, reject) => {
      Axios.all([
        Axios.get('https://botanica22.ge/data.php', {
          params: {
            common: 'locale'
          }
        }),
        Axios.get('https://botanica22.ge/data.php', {
          params: {
            categories: 'list'
          }
        })
      ])
        .then(Axios.spread((nav, list) => {
          resolve({
            ...nav.data,
            list: list.data
          });
        }))
        .catch((error) => {
          reject(error);
        });
    })
  };
}
export function SET_NAVIGATION_CURRENT_PAGE(slag){
  return {
    type: 'SET_NAVIGATION_CURRENT_PAGE',
    payload: slag
  };
}

export function SET_NAVIGATION_PATH(path){
  return {
    type: 'SET_NAVIGATION_PATH',
    payload: path
  }
}