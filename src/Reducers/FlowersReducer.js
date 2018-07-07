
const flowersReducer = (state = {
  divider: null,
  language: null,
  flowers: null,
  currentCategory: null
}, action) => {
  switch(action.type){
    case 'INIT_FLOWERS_FULFILLED': {
      state = {
        ...state,
        divider: action.payload.divider,
        language: action.payload.language
      };
      break;
    }
    case 'SET_FLOWERS_CURRENT_CATEGORY': {
      state = {
        ...state,
        currentCategory: action.payload
      };
      break;
    }
    case 'SET_FLOWERS_FLOWERS_FULFILLED': {
      state = {
        ...state,
        flowers: [...action.payload]
      };
      break;
    }

    case 'UNSET_FLOWERS_FLOWERS': {
      state = {
        ...state,
        flowers: action.payload
      };
      break;
    }

    default: {
      break;
    }
  }

  return state;
};

export default flowersReducer;