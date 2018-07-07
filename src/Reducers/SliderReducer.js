
const sliderReducer = (state = {
  divider: null,
  language: null,
  slides: null
}, action) => {
  switch (action.type) {
    case 'INIT_SLIDER_FULFILLED': {
      state = {
        ...state,
        divider: action.payload.divider,
        language: action.payload.language
      };
      break;
    }

    case 'SET_SLIDER_SLIDES_FULFILLED': {
      state = {
        ...state,
        slides: [...action.payload]
      };
      break;
    }

    default: {
      break;
    }
  }

  return state;
};

export default sliderReducer;