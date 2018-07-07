
const conditionsReducer = (state = {
  divider: null,
  language: null,
  conditions: null
}, action) => {
  switch(action.type){

    case 'INIT_CONDITIONS_FULFILLED': {
      state = {
        ...state,
        divider: action.payload.divider,
        language: action.payload.language
      };
      break;
    }

    case 'SET_CONDITIONS_FULFILLED': {
      state = {
        ...state,
        conditions: action.payload
      };
      break;
    }

    default: {
      break;
    }
  }

  return state;
};

export default conditionsReducer;