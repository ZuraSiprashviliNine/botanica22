
import Axios from 'axios';

export function SET_THEME_SRC(){
    return {
        type: 'SET_THEME_SRC',
        payload: new Promise((resolve, reject) => {
            Axios.get('https://botanica22.ge/data.php', {
                params: {
                    theme: true
                }
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }
}