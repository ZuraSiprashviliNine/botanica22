
const flowerReducer = (state = {
  divider: null,
  language: null,
  flower: null
}, action) => {
  switch(action.type){

    case 'INIT_FLOWER_FULFILLED': {
      state = {
        ...state,
        divider: action.payload.divider,
        language: action.payload.language
      };
      break;
    }

    case 'SET_FLOWER_COUNT': {
      state = {
        ...state,
        flower: {
          ...state.flower,
          count: action.payload
        }
      };
      break;
    }

    case 'SET_FLOWER_PRICE': {
      state = {
        ...state,
        flower: {
          ...state.flower,
          price: action.payload
        }
      };
      break;
    }

    case 'SET_FLOWER_OLD_PRICE':{
      state = {
        ...state,
        flower: {
          ...state.flower,
          old_price: action.payload
        }
      };
      break;
    }

    case 'SET_FLOWER_SIZE': {
      state = {
        ...state,
        flower: {
          ...state.flower,
          size: action.payload
        }
      };
      break;
    }

    case 'UNSET_FLOWER_FLOWER': {
      state = {
        ...state,
        flower: null
      };
      break;
    }

    case 'SET_FLOWER_FLOWER_FULFILLED': {
      state = {
        ...state,
        flower: {
          ...action.payload,
          old_price: state.flower === null ? action.payload.old_price: state.flower.old_price,
          price: state.flower === null ? action.payload.price : state.flower.price,
          count: state.flower !== null ? state.flower.count : undefined,
          size: state.flower !== null ?  state.flower.size : undefined
        }
      };
      break;
    }

    default: {

      break;
    }
  }

  return state;
};

export default flowerReducer;