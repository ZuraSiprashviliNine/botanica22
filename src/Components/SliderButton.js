
import React from 'react';

import FontAwesome from 'react-fontawesome';

export class SliderButton extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <button {...this.props} className={`swiper-button-${this.props.to === 'left' ? 'prev' : 'next'} text-grass border-0 bg-transparent h1 m-0`}>
        <FontAwesome name={'angle-' + this.props.to}/>
      </button>
    )
  }
}