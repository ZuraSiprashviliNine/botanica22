
import React from 'react';

import {connect} from 'react-redux';

import FontAwesome from 'react-fontawesome';

import {Link} from 'react-router-dom';

import {
  Container,
  Row,
  Col
} from 'reactstrap';

import {Loading} from "../Components/Loading";

import Translate from './Translate';
import {INIT_FOOTER, SET_FOOTER, SUBSCRIBE} from "../Actions/FooterActions";
import {checkPromise} from "../Helpers/Valid";

class Top extends React.Component{
  constructor(props){
    super(props);

    this._subscribe = this._subscribe.bind(this);
  }

  _subscribe(event){
    event.preventDefault();
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if(regexEmail.test(this.textInput.value)){
      this.props.subscribe(true, this.textInput.value);
    }else{
      this.textInput.placeholder = 'Not Valid';
    }
    this.textInput.value = '';
  }

  render(){
    return (
      <div className={'pre-footer bg-_grass'}>
        <Container>
        <Row className="pt-1 shadow">
        </Row>
          {/*<Row className={'py-5 top'}>*/}
            {/*<Col*/}
              {/*lg={4}*/}
              {/*sm={6}>*/}
              {/*<div className={'text-uppercase font-weight-light py-3'}>*/}
                {/*<h2 className={'m-0'}>*/}
                  {/*text widget*/}
                {/*</h2>*/}
              {/*</div>*/}
              {/*<div className={'small font-weight-light'}>*/}
                {/*Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime perspiciatis velit maiores impedit*/}
                {/*voluptas totam corporis est, ad neque a molestiae quod alias praesentium! Molestiae, illo molestias.*/}
                {/*Consequatur, recusandae pariatur.*/}
                {/*Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur saepe pariatur, nemo aspernatur*/}
                {/*omnis veritatis earum, optio eos in itaque architecto distinctio, eveniet repellendus nostrum aperiam ea*/}
                {/*quis eaque mollitia.*/}
              {/*</div>*/}
            {/*</Col>*/}
            {/*<Col*/}
              {/*lg={4}*/}
              {/*sm={6}>*/}
              {/*<div className={'text-uppercase font-weight-light py-3'}>*/}
                {/*<h2 className={'m-0'}>*/}
                  {/*facebook widget*/}
                {/*</h2>*/}
              {/*</div>*/}
              {/*<div className={'small font-weight-light'}>*/}
                {/*<div className={'pb-2'}>*/}
                  {/*<b className={'text-light font-weight-bold pr-1'}>News Feed</b>*/}
                  {/*<span>*/}
                            {/*Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio facere dolorum cumque deleniti dolores omnis ex ad voluptas nobis adipisci velit voluptate dolore eveniet soluta incidunt, sit autem, tempora quis.*/}
                  {/*</span>*/}
                {/*</div>*/}
                {/*<div className={'pb-2'}>*/}
                  {/*<b className={'text-light font-weight-bold pr-1'}>News Feed</b>*/}
                  {/*<span>*/}
                    {/*Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio facere dolorum cumque deleniti dolores omnis ex ad voluptas nobis adipisci velit voluptate dolore eveniet soluta incidunt, sit autem, tempora quis.*/}
                  {/*</span>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</Col>*/}
          {/*</Row>*/}
          {/*<Row className={'py-5 bottom'}>*/}
            {/*<Col*/}
              {/*xs={12}>*/}
              {/*<Container>*/}
                {/*<Row className={'align-items-center'}>*/}
                  {/*<div className={'col-lg-4 col-md-6 col-sm-8 b d-flex flex-row align-items-center jutify-content-start'}>*/}
                    {/*<div className={'input-group'}>*/}
                      {/*<input*/}
                        {/*type={'text'}*/}
                        {/*ref={(element) => {this.textInput = element}}*/}
                        {/*className={'rounded-no bg-__grass text-light px-3 py-2 form-control border-0'}*/}
                        {/*placeholder={this.props.subed === true ? 'Subscribed': 'Lets Subscribe'} />*/}
                    {/*</div>*/}
                    {/*<div className={'input-group'} style={{flex: 0}}>*/}
                      {/*<button*/}
                        {/*onClick={this._subscribe}*/}
                        {/*className={'rounded-no btn-white border-white text-grass form-control'}>*/}
                        {/*<FontAwesome name={this.props.subed === true ? 'check' : 'angle-right'}/>*/}
                      {/*</button>*/}
                    {/*</div>*/}
                  {/*</div>*/}
                {/*</Row>*/}
              {/*</Container>*/}
            {/*</Col>*/}
          {/*</Row>*/}
        </Container>
      </div>
    );
  }
}

class Bottom extends React.Component{
  constructor(props){
    super(props);

    this.getNavs = this.getNavs.bind(this);
  }

  getNavs(){
    let navs = this.props.navigation.map((nav) => {
      return (
        <li
          key={nav.id}>
          <Link to={nav.slag} className={'text-light p-1'}>
            <Translate>
              {nav.title}
            </Translate>
          </Link>
        </li>
      );
    });

    navs.push((
      <li
        key={'favourites'}>
        <Link
          to={'/favourites'}
          className={'text-light text-capitalize p-1'}>
          <Translate>
            favourites
          </Translate>
        </Link>
      </li>
    ));
    navs.push((
      <li
        key={'carts'}>
        <Link
          to={'/cart'}
          className={'text-light text-capitalize p-1'}>
          <Translate>
            cart
          </Translate>
        </Link>
      </li>
    ));

    return navs;
  }

  render(){
    return(
      <footer className={'bg-grass'}>
        <Container>
          <Row className={'text-light py-5 align-items-center'}>
            <Col
              md={6}
              className={'p-2'}>
              <div className={'text-capitalize'}>
                <Translate>
                  {this.props.common.title}
                </Translate>
              </div>
              <div className={'text-capitalize small'}>
                <Translate>
                  created by
                </Translate>
                {' ' + this.props.common.copy}
              </div>
            </Col>
            <Col
              md={6}
              className={'p-2 d-none d-sm-none d-md-none d-lg-block d-xl-block'}>
              <ul className={'list-unstyled text-capitalize d-flex flex-row align-items-center justify-content-end'}>
                {this.getNavs()}
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    )
  }
}

class Element extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return [
      <Top subed={this.props.Footer.footer.subscribe} subscribe={this.props.subscribe} key={'top'}/>,
      <Bottom divider={this.props.Footer.divider} navigation={this.props.Footer.footer.navigation} common={this.props.common} key={'bottom'}/>
    ]
  }
}

class Footer extends React.Component{
  constructor(props){
    super(props);

    this.init = this.init.bind(this);
  }

  componentDidMount(){
    this.init(this.props);
  }

  init(props){
    if(checkPromise(this.props.Footer) === false){
      this.props.initFooter();
    }

    if(this.props.Footer.footer === null){
      this.props.setFooter();
    }
  }

  render(){
    if (checkPromise(this.props.Footer)) {
      return <Element {...this.props} />;
    } else {
      return <Loading/>;
    }
  }
}

const states = (state) => {
  return {
    Footer: state.FooterReducer
  };
};

const actions = (dispatch) => {
  return {
    initFooter: () => {
      dispatch(INIT_FOOTER());
    },
    setFooter: () => {
      dispatch(SET_FOOTER());
    },
    subscribe: (sub, email) => {
      dispatch(SUBSCRIBE(sub, email));
    }
  }
};

export default connect (states, actions)(Footer);