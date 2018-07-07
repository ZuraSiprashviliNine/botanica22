
import React from 'react';
import {connect} from 'react-redux';
import {Loading} from "./Components/Loading";

import App from './Containers/App';

// import {SET_THEME_SRC} from "./Actions/ThemeActions";

class Application extends React.Component{

    componentDidMount(){
        // if(this.props.Theme.src === null){
        //     this.props.setTheme();
        // }
    }

    render(){
        return <App {...this.props}/>;
        // return this.props.Theme.src !== null ? <App theme={this.props.Theme.src} {...this.props}/> : <Loading/>;
    }
}

const states = (state) => {
    return {
        // Theme: state.ThemeReducer
    };
};

const actions = (dispatch) => {
    return {
        // setTheme: () => {
        //     dispatch(SET_THEME_SRC());
        // }
    };
};

export default connect(states, actions)(Application);