
const searchReducer = (state = {
  divider: null,
  language: null,
  results: []
}, action) => {
  switch(action.type){

    case 'INIT_SEARCH_FULFILLED': {
      state = {
        ...state,
        divider: action.payload.divider,
        language: action.payload.language
      };
      break;
    }

    case 'SEARCH_SEARCH_ITEMS_FULFILLED': {
      state = {
        ...state,
        results: action.payload
      };
      break;
    }

    default: {
      break;
    }
  }

  return state;
};

export default searchReducer;