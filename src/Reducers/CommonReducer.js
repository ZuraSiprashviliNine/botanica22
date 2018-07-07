
const commonReducer = (state = {
  title: null,
  copy: null,
  description: null
}, action) => {
  switch(action.type){
    case 'INIT_COMMON_REDUCER_FULFILLED': {
      state = {
        ...state,
        title: action.payload.title,
        copy: action.payload.copy,
        description: action.payload.description
      };
      break;
    }
    default: {
      break;
    }
  }

  return state;
};

export default commonReducer;