
const contactReducer = (state = {
  divider: null,
  language: null,
  contact: null
}, action) => {
  switch(action.type){

    case 'INIT_CONTACT_FULFILLED': {
      state = {
        ...state,
        divider: action.payload.divider,
        language: action.payload.language
      };
      break;
    }

    case 'SET_CONTACT_FULFILLED': {
      state = {
        ...state,
        contact: action.payload
      };
      break;
    }

    default: {

      break;
    }
  }

  return state;
};

export default contactReducer;