
import Axios from 'axios';

export function INIT_LOCALE(){
  return {
    type: 'INIT_LOCALE',
    payload: new Promise((resolve, reject) => {
      Axios.all([
        Axios.get('https://botanica22.ge/data.php', {
          params: {
            locale: 'languages'
          }
        }),
        Axios.get('https://botanica22.ge/data.php', {
          params: {
            locale: 'keywords'
          }
        }),
        Axios.get('https://botanica22.ge/data.php', {
          params: {
            locale: 'reference'
          }
        })
      ])
        .then(Axios.spread((languages, keywords, reference) => {
          let payload = {
            primary: {
              languages: languages.data,
              reference: reference.data,
              keywords: {
                ref: keywords.data[reference.data]
              }
            },
            secondary: {
              keywords: keywords.data
            }
          };
          resolve(payload);
        }))
        .catch((error) => {
          reject(error);
        });
    })
  };
}

export function SET_LOCALE_PRIMARY_LANGUAGES(){
  return {
    type: 'SET_LOCALE_PRIMARY_LANGUAGES',
    payload: new Promise((resolve, reject) => {
      Axios.get('https://botanica22.ge/data.php', {
        params: {
          locale: 'languages'
        }
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  };
}

export function SET_LOCALE_PRIMARY_CURRENT(code = 'en'){
  return {
    type: 'SET_LOCALE_PRIMARY_CURRENT',
    payload: code
  }
}

export function UNSET_LOCALE() {
  return {
    type: 'UNSET_LOCALE',
    payload: null
  }
}

export function SET_LOCALE_PRIMARY_REFERENCE(code = null){
  return code === null ? {
    type: 'SET_LOCALE_PRIMARY_REFERENCE',
    payload: new Promise((resolve, reject) => {
      Axios.get('https://botanica22.ge/data.php', {
        params: {
          locale: 'reference'
        }
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  } : {
    type: 'SET_LOCALE_PRIMARY_DEFAULT',
    payload: code
  };
}

export function SET_LOCALE_PRIMARY_KEYWORDS_REF(code = 'en'){
  return {
    type: 'SET_LOCALE_PRIMARY_KEYWORDS_REF',
    payload: new Promise((resolve, reject) => {
      Axios.get('https://botanica22.ge/data.php', {
        params: {
          locale: 'keywords',
          reference: code
        }
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  };
}

export function SET_LOCALE_PRIMARY_KEYWORDS_RES(code = 'en'){
  return {
    type: 'SET_LOCALE_PRIMARY_KEYWORDS_RES',
    payload: new Promise((resolve, reject) => {
      Axios.get('https://botanica22.ge/data.php', {
        params: {
          locale: 'keywords',
          result: code
        }
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  };
}

export function SET_LOCALE_SECONDARY_KEYWORDS(){
  return {
    type: 'SET_LOCALE_SECONDARY_KEYWORDS',
    payload: new Promise((resolve, reject) => {
      Axios.get('https://botanica22.ge/data.php', {
        params: {
          locale: 'keywords'
        }
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  };
}