
const footerReducer = (state = {
  divider: null,
  language: null,
  footer: null,
}, action) => {

  switch(action.type){

    case 'INIT_FOOTER_FULFILLED': {
      state = {
        ...state,
        divider: action.payload.divider,
        language: action.payload.language
      };
      break;
    }

    case 'SUBSCRIBE_FULFILLED': {
      state =  {
        ...state,
        footer: {
          ...state.footer,
          subscribe: action.payload
        }
      };
      break;
    }

    case 'SET_FOOTER_FULFILLED': {
      state = {
        ...state,
        footer: action.payload
      };
      break;
    }

    default: {

      break;
    }
  }

  return state;
};

export default footerReducer;