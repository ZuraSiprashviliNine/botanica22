
import React from 'react';
import {connect} from 'react-redux';
import {Loading} from "../../Components/Loading";
import {SET_NAVIGATION_CURRENT_PAGE, SET_NAVIGATION_PATH} from "../../Actions/NavigationActions";
import {getPageSlag} from "../../Helpers/Routing";
import {checkPromise} from "../../Helpers/Valid";
import {INIT_CONDITIONS, SET_CONDITIONS} from "../../Actions/ConditionsActions";

import Translate from '../Translate';

import {
  Container,
  Row,
  Col
} from 'reactstrap';

class Element extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
      document.title = "Delivery Conditions * Botanica22.ge";
  }

  render(){
    return (
      <div
        id={'conditions_page'}
        className={'page animated fadeIn py-md-5 py-3 px-1'}>
        <Container>
          <Row>
            <Col
              className={'p-1 bg-white border shadow'}
              xs={12}>
              <Container>
                <Row>
                  <Col
                    className={'p-1 border-bottom'}
                    xs={12}>
                    <div
                      className={'text-center py-3 text-capitalize'}>
                      <h3
                        className={'text-grass m-0'}>
                        <Translate>
                          {this.props.Conditions.conditions.title}
                        </Translate>
                      </h3>
                    </div>
                  </Col>
                  <Col
                    className={'p-1 text-muted small p-md-4 p-2'}>
                    <Translate>
                      {this.props.Conditions.conditions.text}
                    </Translate>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

class Conditions extends React.Component{
  constructor(props){
    super(props);

    this.init = this.init.bind(this);
  }

  componentDidMount(){
    this.init(this.props);
  }

  init(props){
    if (this.props.Navigation.currentPage !== getPageSlag(this.props.match.path)) {
      this.props.setPage(getPageSlag(this.props.match.path));
    }

    if(checkPromise(this.props.Conditions) === false){
      this.props.initConditions();
    }

    if(this.props.Conditions.conditions === null){
      this.props.setConditions();
    }

    if (this.props.match.url !== this.props.Navigation.path) {
      this.props.setPath(this.props.match.url);
    }
  }

  render(){
    if(checkPromise(this.props.Conditions)){
      return <Element {...this.props}/>;
    }else{
      return <Loading/>;
    }
  }
}


const states = (state) => {
  return {
    Conditions: state.ConditionsReducer,
    Navigation: state.NavigationReducer
  };
};

const actions = (dispatch) => {
  return {
    setPage: (slag) => {
      dispatch(SET_NAVIGATION_CURRENT_PAGE(slag));
    },
    setPath: (path) => {
      dispatch(SET_NAVIGATION_PATH(path));
    },
    initConditions: () => {
      dispatch(INIT_CONDITIONS());
    },
    setConditions: () => {
      dispatch(SET_CONDITIONS());
    }
  };
};

export default connect(states, actions)(Conditions);