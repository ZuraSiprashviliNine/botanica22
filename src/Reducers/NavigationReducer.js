
const navigationReducer = (state = {
  divider: null,
  language: null,
  title: null,
  list: null,
  path: null,
  currentPage: null
}, action) => {
  switch(action.type){
    case 'SET_NAVIGATION_FULFILLED': {
      state = {
        ...state,
        ...action.payload
      };
      break;
    }

    case 'SET_NAVIGATION_PATH': {
      state = {
        ...state,
        path: action.payload
      };
      break;
    }

    case 'SET_NAVIGATION_CURRENT_PAGE': {
      state = {
        ...state,
        currentPage: action.payload
      };
      break;
    }

    default: {
      break;
    }
  }

  return state;
};

export default navigationReducer;