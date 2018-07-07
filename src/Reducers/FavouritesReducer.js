
const favouritesReducer = (state = {
  divider: null,
  language: null,
  favourites: [],
  count: 0
}, action) => {
  switch(action.type){

    case 'INIT_FAVOURITES_FULFILLED': {
      state = {
        ...state,
        divider: action.payload.divider,
        language: action.payload.language
      };
      break;
    }

    case 'ADD_FAVOURITES_FAVOURITE': {
      state = {
        ...state,
        favourites: [
          ...state.favourites,
          action.payload
        ],
        count: ++state.count
      };

      break;
    }

    case 'ADD_FAVOURITES_FAVOURITES_BY_ID_FULFILLED': {
      state = {
        ...state,
        favourites: [
          ...state.favourites,
          action.payload
        ],
        count: ++state.count
      };
      break;
    }
    case 'ADD_FAVOURITES_FAVOURITES_BY_IDS_FULFILLED': {
      state = {
        ...state,
        favourites: [
          ...state.favourites,
          ...action.payload
        ],
        count: state.count + action.payload.length
      };
      break;
    }

    case 'UNSET_FAVOURITES_FAVOURITES': {
      state = {
        ...state,
        favourites: action.payload,
        count: 0
      };
      break;
    }

    case 'UNSET_FAVOURITES_FAVOURITE_ITEM': {
      state = {
        ...state,
        favourites: [
          ...state.favourites.filter((f) => f.id !== action.payload)
        ],
        count: --state.count
      };
      break;
    }

    default: {

      break;
    }
  }

  return state;
};

export default favouritesReducer;