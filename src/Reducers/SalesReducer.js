
const salesReducer = (state = {
  language: null,
  divider: null,
  items: null
}, action) => {
  switch(action.type){

    case 'INIT_SALES_FULFILLED': {
      state = {
        ...state,
        language: action.payload.language,
        divider: action.payload.divider
      };
      break;
    }

    case 'SET_SALES_ITEMS_FULFILLED': {
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

export default salesReducer;