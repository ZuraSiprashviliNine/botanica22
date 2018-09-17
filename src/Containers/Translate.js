
import React from 'react';
import { connect } from 'react-redux';

import { Loading } from "../Components/Loading";

class Translate extends React.Component{
  constructor(props){
    super(props);

    this.checkPromises = () => {
      return (
        Object.values(this.props.primary).every((property) => property !== null)
        && Object.values(this.props.primary.keywords).every((keyword) => keyword !== null)
        && Object.values(this.props.secondary).every((property) => property !== null)
        && Object.values(this.props.secondary.keywords).every((keyword) => keyword !== null)
      );
    };
    

    this.word = (text, to = null, from = null) => {
      to = to ? this.props.secondary.keywords[to] : this.props.primary.keywords.res;
      from = from ? this.props.secondary.keywords[from] : this.props.primary.keywords.ref;
      let index = from.indexOf(text);
      return index === -1 ? text : to[index];
    };
    this.translate = (text, to, from) => {
      if(text.constructor === Array){
        let resultString = text.map((word) => {
          return this.word(word, to, from);
        });
        return resultString.join(' ');
      }else if(text.constructor === String){
        return this.word(text, to, from);
      }
    };
    // this.translateInner = (child, to, from) => {
    //     return this.translate(
    //         child.props.dangerouslySetInnerHTML.__html.split(/<\/?[\w\s="/.':;#-\/\?]+>/gi), this.props.to, this.props.from
    //     );
    //     return 'a';
    // };
    this.get = () => {
      // if(this.props.inner){
      // return this.translateInner(this.props.children, this.props.to, this.props.from);
      // }else{
      return this.translate(
        this.props.divider ?
          this.props.children.split(this.props.divider) : this.props.children, this.props.to, this.props.from
      );
      // }

    };

    this.Element = () => {
      return this.get();
    };

    this.getter = this.getter.bind(this);
  }

  getter(str){
    return this.translate(str);
  }

  componentDidMount(){

  }

  render(){
    return this.checkPromises() ? this.Element() : <Loading/>
  }
}

const reducers = (state) => {
  return {
    ...state.LocaleReducer
  };
};
const dispatches = (dispatch) => {
  return {
  }
};

export default connect(reducers, dispatches)(Translate);