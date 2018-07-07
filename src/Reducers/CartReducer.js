
const cartReducer = (state = {
  divider: null,
  language: null,
  carts: [],
  count: 0
}, action) => {
  switch(action.type){

    case 'INIT_CART_FULFILLED': {
      state = {
        ...state,
        divider: action.payload.divider,
        language: action.payload.language
      };
      break;
    }

    case 'SET_CART_CARTS_FULFILLED': {
      state = {
        ...state,
        carts: action.payload,
        count: action.payload.length
      };
      break;
    }

    case 'ADD_CART_CARTS': {
      state = {
        ...state,
        carts: [
          ...state.carts,
          action.payload,
        ],
        count: ++state.count
      };
      break;
    }

    case 'ADD_CARTS_CART_BY_ID_FULFILLED': {
      state = {
        ...state,
        carts: [
          ...state.carts,
          action.payload
        ],
        count: ++state.count
      };
      break;
    }

    case 'UNSET_CARTS_CARTS': {
      state = {
        ...state,
        carts: action.payload,
        count: 0
      };
      break;
    }

    case 'UNSET_CARTS_CART_ITEM': {
      state = {
        ...state,
        carts: [
          ...state.carts.filter((c) => c.id !== action.payload)
        ],
        count: --state.count
      };
      break;
    }

    case 'SET_CART_SIZE': {
      state = {
        ...state,
        carts: [
          ...state.carts.map((cart) => {
            if(cart.id === action.payload.id){
              return {
                ...cart,
                size: action.payload.size
              }
            }else{
              return cart;
            }
          })
        ]
      };
      break;
    }

    case 'SET_CART_ITEM_PRICE': {
      state = {
        ...state,
        carts: [
          ...state.carts.map((cart) => {
            if(cart.id === action.payload.id){
              return {
                ...cart,
                price: action.payload.price
              }
            }else{
              return cart;
            }
          })
        ]
      };
      break;
    }

    case 'SET_CART_ITEM_OLD_PRICE': {
      state = {
        ...state,
        carts: [
          ...state.carts.map((cart) => {
            if(cart.id === action.payload.id){
              return {
                ...cart,
                old_price: action.payload.price
              }
            }else{
              return cart;
            }
          })
        ]
      };
      break;
    }

    case 'SET_CART_COUNT': {
      state = {
        ...state,
        carts: [
          ...state.carts.map((cart) => {
            if(cart.id === action.payload.id){
              return {
                ...cart,
                count: action.payload.count
              }
            }else{
              return cart;
            }
          })
        ]
      };
      break;
    }

    default:{

      break;
    }
  }

  return state;
};

export default cartReducer;