
const collectionsReducer = (state = {
  divider: null,
  language: null,
  items: null
}, action) => {
  switch(action.type){
    case 'INIT_COLLECTIONS_FULFILLED': {
      state = {
        ...state,
        divider: action.payload.divider,
        language: action.payload.language
      };
      break;
    }

    case 'SET_COLLECTIONS_ITEMS_FULFILLED':{
      state = {
        ...state,
        items: [...action.payload]
      };
      break;
    }

    default: {

      break;
    }
  }

  return state;
};

export default collectionsReducer;