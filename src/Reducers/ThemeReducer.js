
const themeReducer = (state = {
    src: null
}, action) => {
    switch(action.type){

        case 'SET_THEME_SRC_FULFILLED': {
            state = {
                ...state,
                src: action.payload
            };
            break;
        }

        default: {

            break;
        }
    }

    return state;
};

export default themeReducer;