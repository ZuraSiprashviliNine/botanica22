
import React from 'react';
import {connect} from 'react-redux';
import {Loading} from "../../Components/Loading";
import {SET_NAVIGATION_CURRENT_PAGE, SET_NAVIGATION_PATH} from "../../Actions/NavigationActions";
import {getPageSlag} from "../../Helpers/Routing";
import {checkPromise} from "../../Helpers/Valid";
import {INIT_CONTACT, SET_CONTACT} from "../../Actions/ContactActions";

import FontAwesome from 'react-fontawesome';

import {
  Container,
  Row,
  Col
} from 'reactstrap';

import Translate from '../Translate';

class Element extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
      let str = `Contact us`;
      document.title = str;
  }

  render(){
    return (
      <div
        id={'contact_page'}
        className={'page animated fadeIn bg-light'}>
        <div className={'map'}>
          <div
            dangerouslySetInnerHTML={{__html: this.props.Contact.contact.map}}/>
        </div>
        <div className={'clouds'}>
          <div className={'cloud'}/>
          <div className={'cloud'}/>
          <div className={'cloud'}/>
          <div className={'cloud'}/>
          <div className={'cloud'}/>
        </div>
        <div className={'data'}>
          <Container>
            <Row>
              <Col
                xs={12}>
                <Container
                  className={'bg-white shadow border'}>
                  <Row className={'pt-md-5 pt-3 pb-2'}>
                    <Col
                      className={'p-1 text-center'}
                      xs={6}
                      sm={6}
                      md={3}>
                      <div
                        className={'text-grass'}>
                        <h1
                          className={'m-0'}>
                          <FontAwesome
                            name={'phone'}/>
                        </h1>
                      </div>
                      <div
                        className={'text-muted small  py-3 text-capitalize'}>
                        <Translate>
                          {this.props.Contact.contact.phone}
                        </Translate>
                      </div>
                    </Col>
                    <Col
                      className={'p-1 text-center '}
                      xs={6}
                      sm={6}
                      md={3}>
                      <div
                        className={'text-grass'}>
                        <h1
                          className={'m-0'}>
                          <FontAwesome
                            name={'map-marker'}/>
                        </h1>
                      </div>
                      <div
                        className={'text-muted mall py-3 text-capitalize'}>
                        <Translate>
                          {this.props.Contact.contact.address}
                        </Translate>
                      </div>
                    </Col>
                    <Col
                      className={'p-1 text-center'}
                      xs={6}
                      sm={6}
                      md={3}>
                      <div
                        className={' text-grass'}>
                        <h1
                          className={'m-0'}>
                          <FontAwesome
                            name={'envelope'}/>
                        </h1>
                      </div>
                      <div
                        className={'text-muted small py-3 text-capitalize'}>
                        <Translate>
                          {this.props.Contact.contact.email}
                        </Translate>
                      </div>
                    </Col>
                    <Col
                      className={'p-1 text-center'}
                      xs={6}
                      sm={6}
                      md={3}>
                      <div
                        className={'text-grass'}>
                        <h1
                          className={'m-0'}>
                          <FontAwesome
                            name={'clock-o'}/>
                        </h1>
                      </div>
                      <div
                        className={'text-muted py-3 small text-capitalize'}>
                        <Translate>
                          {this.props.Contact.contact.working_hours}
                        </Translate>
                      </div>
                    </Col>
                  </Row>
                  <Row
                    className={'small text-muted'}>
                    <Col
                      xs={12}
                      className={'p-md-4 p-2'}>
                      <Translate>
                        {this.props.Contact.contact.text}
                      </Translate>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

class Contact extends React.Component{
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

    if(checkPromise(this.props.Contact) === false){
      this.props.initContact();
    }

    if(this.props.Contact.contact === null){
      this.props.setContact();
    }

    if (this.props.match.url !== this.props.Navigation.path) {
      this.props.setPath(this.props.match.url);
    }
  }

  render(){
    if(checkPromise(this.props.Contact)){
      return <Element {...this.props} />;
    }else{
      return <Loading/>;
    }
  }
}

const states = (state) => {
  return {
    Contact: state.ContactReducer,
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
    initContact: () => {
      dispatch(INIT_CONTACT());
    },
    setContact: () => {
      dispatch(SET_CONTACT());
    }
  };
};

export default connect(states, actions)(Contact);