
const orderReducer = (state = {
  divider: null,
  language: null,
  product: null
}, action) => {

  switch(action.type){

    case 'INIT_ORDER_FULFILLED': {
      state = {
        ...state,
        divider: action.payload.divider,
        language: action.payload.language
      };
      break;
    }

    case 'SET_ORDER': {
      state = {
        ...state,
        product: action.payload
      };
      break;
    }

    case 'SET_ORDER_COUNT': {
      state = {
        ...state,
        product: {
          ...state.product,
          count: action.payload
        }
      };
      break;
    }

    case 'SET_ORDER_SIZE': {
      state = {
        ...state,
        product: {
          ...state.product,
          size: action.payload
        }
      };
      break;
    }

    case 'UNSET_ORDER': {
      state = {
        ...state,
        product: action.payload
      };
      break;
    }

    case 'SET_ORDER_FLOWER_PRICE': {
      state = {
        ...state,
        product: {
          ...state.product,
          price: action.payload
        }
      };
      break;
    }

    case 'SET_ORDER_FLOWER_OLD_PRICE': {
      state = {
        ...state,
        product: {
          ...state.product,
          old_price: action.payload
        }
      };
      break;
    }

    case 'SET_ORDER_PRODUCT': {
      state = {
        ...state,
        product: action.payload
      };
      break;
    }

    default: {
      break;
    }
  }

  return state;
};

export default orderReducer;