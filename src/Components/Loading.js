
import React from 'react';

import FontAwesome from 'react-fontawesome';

export class Loading extends React.Component{

  render(){
    return (
      <div className={'loading'}>
        <FontAwesome
          name={'spinner'}/>
      </div>
    );
  }
}