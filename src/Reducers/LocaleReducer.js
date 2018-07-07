
const LocaleReducer = (state = {
  primary: {
    languages: null,
    current: null,
    reference: null,
    keywords: {
      ref: null,
      res: null
    }
  },
  secondary: {
    keywords: null
  }
}, action) => {
  switch(action.type){
    case 'INIT_LOCALE_FULFILLED': {
      state = {
        ...state,
        primary: {
          ...state.primary,
          ...action.payload.primary,
          keywords: {
            ...state.primary.keywords,
            ...action.payload.primary.keywords
          }
        },
        secondary: {
          ...state.secondary,
          keywords: {
            ...state.secondary.keywords,
            ...action.payload.secondary.keywords
          }
        }
      };
      break;
    }

    case 'SET_LOCALE_PRIMARY_LANGUAGES_FULFILLED': {
      state = {
        ...state,
        primary: {
          ...state.primary,
          languages: action.payload
        }
      };
      break;
    }

    case 'SET_LOCALE_PRIMARY_CURRENT': {
      state = {
        ...state,
        primary: {
          ...state.primary,
          current: action.payload
        }
      };
      break;
    }

    case 'SET_LOCALE_PRIMARY_REFERENCE_FULFILLED': {
      state = {
        ...state,
        primary: {
          ...state.primary,
          reference: action.payload
        }
      };
      break;
    }

    case 'SET_LOCALE_PRIMARY_KEYWORDS_REF_FULFILLED': {
      state = {
        ...state,
        primary: {
          ...state.primary,
          keywords: {
            ...state.primary.keywords,
            ref: action.payload
          }
        }
      };
      break;
    }

    case 'SET_LOCALE_PRIMARY_KEYWORDS_RES_FULFILLED': {
      state = {
        ...state,
        primary: {
          ...state.primary,
          keywords: {
            ...state.primary.keywords,
            res: action.payload
          }
        }
      };
      break;
    }

    case 'SET_LOCALE_SECONDARY_KEYWORDS_FULFILLED': {
      state = {
        ...state,
        secondary: {
          ...state.secondary,
          keywords: action.payload
        }
      };
      break;
    }

    case 'UNSET_LOCALE': {
      state = {
        ...state,
        primary: {
          ...state.primary,
          keywords: {
            ...state.primary.keywords,
            res: null
          }
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

export default LocaleReducer;