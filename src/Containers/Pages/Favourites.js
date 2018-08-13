
import React from 'react';

import {connect} from 'react-redux';
import {SET_NAVIGATION_CURRENT_PAGE, SET_NAVIGATION_PATH} from "../../Actions/NavigationActions";
import {checkPromise} from "../../Helpers/Valid";
import {Loading} from "../../Components/Loading";
import {
  ADD_FAVOURITES_FAVOURITES_BY_ID,
  INIT_FAVOURITES,
  UNSET_FAVOURITES_FAVOURITE_ITEM, UNSET_FAVOURITES_FAVOURITES
} from "../../Actions/FavouritesActions";
import {getPageSlag} from "../../Helpers/Routing";
import {Link} from 'react-router-dom';

import Translate from '../Translate';

import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  Badge
} from 'reactstrap';

import {FlowerItem} from "./Flowers";
import {reactLocalStorage as Storage} from "reactjs-localstorage";
import {ADD_CARTS_CART_BY_ID, UNSET_CARTS_CART_ITEM} from "../../Actions/CartActions";


class NoFavourites extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    return (
      <Container>
        <Row>
          <Col
            className={'p-1 my-3'}
            xs={12}>
            <div
              className={'bg-white shadow p-md-3 p-1'}>
              <h1 className={'m-0 text-grass text-capitalize t text-center py-2'}>
                <Translate>
                    your favourite's cart is empty
                </Translate>
              </h1>
              <div
                className={'text-center py-2'}>
                <Link
                  to={'/flowers'}
                  className={'btn btn-grass text-uppercase text-white shadow font-weight-light'}>
                  <Translate>
                    choose your favourites
                  </Translate>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

class Element extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      totalPrice: null
    };

    this.getItems = this.getItems.bind(this);
    this._add_favourite = this._add_favourite.bind(this);
    this._remove_favourites = this._remove_favourites.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this._add_cart = this._add_cart.bind(this);
    this._rm_cart = this._rm_cart.bind(this);
  }

  _add_cart(id){
    if(this.props.Cart.carts.every((f) => f.id != id)){
      this.props.addcartid(id);
      Storage.set('carts', Storage.get('carts') === undefined ? JSON.stringify([id]) : JSON.stringify([...JSON.parse(Storage.get('carts')), id]));
      return true;
    }else{
      return false;
    }
  }

  _rm_cart(id){
    if(this.props.Cart.carts.some((f) => f.id == id)){
      this.props.rmcart(id);
      Storage.set('carts', JSON.stringify(JSON.parse(Storage.get('carts')).filter((f) => f != id)));
      return false;
    }else{
      return true;
    }
  }

  getPrice(){
    let price = 0;
    this.props.Favourites.favourites.map((f) => {
      if(parseFloat(f.real_price) < 11){
          price += parseFloat(f.real_price) + parseInt(f.count || 9) * parseFloat(f.count_price);
      }else{
          price += parseFloat(f.price);
      }
    });
    return price.toPrecision(5);
  }

  _add_favourite(id) {
    if(this.props.Favourites.favourites.every((f) => f.id != id)){
      this.props.fvaddid(id);
      Storage.set('favourites', Storage.get('favourites') === undefined ? JSON.stringify([id]) : JSON.stringify([...JSON.parse(Storage.get('favourites')), id]));
      return true;
    }else{
      return false;
    }
  }

  _remove_favourites(id){
    if(this.props.Favourites.favourites.some((f) => f.id == id)){
      this.props.fvrm(id);
      Storage.set('favourites', JSON.stringify(JSON.parse(Storage.get('favourites')).filter((f) => f != id)));
      return false;
    }else{
      return true;
    }
  }

  getItems(){
    return this.props.Favourites.favourites.map((favourite) => {
      return (
        <Col
          key={favourite.id}
          lg={3}
          md={4}
          sm={6}
          className={'flowers_flower_col h-100 p-2 collection'}>
          <FlowerItem
            carts={this.props.Cart.carts.map((c) => c.id)}
            fvrm={this._remove_favourites}
            addcart={this._add_cart}
            rmcart={this._rm_cart}
            fvaddid={this._add_favourite}
            images={favourite.images !== undefined ? favourite.images : []}
            favourites={this.props.Favourites.favourites.map((f) => f.id)}
            {...favourite}/>
        </Col>
      );
    });
  }

  componentDidMount(){
    document.title = `Favourite flowers * Botanica22.ge`;
  }

  render(){
    return (
      <div
        id={'favourites_page'}
        className={'page animated fadeIn'}>

        {this.props.Favourites.count === 0 ? (
          <NoFavourites />
        ) : <div
          className={'flowers my-md-5'}>
          <div
            className={'info bg-white shadow my-md-5'}>
            <div
              className={'py-1 py-md-0 shadow animated navbar navbar-expand-md navbar-light bg-white'}>
              <Container>
                <Nav
                  className={'mr-auto text-capitalize flex-row justify-content-md-start justify-content-center'}>
                  <NavItem>
                    <NavLink
                      tag={Button}
                      className={'p-3 bg-transparent text-muted text-capitalize border-0 d-flex flex-row align-items-center h-100'}>
                      <Translate
                        divider={this.props.Favourites.divider}>
                        {'current items>>>: ' + this.props.Favourites.count}
                      </Translate>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag={Button}
                      className={'p-3 bg-transparent text-muted text-capitalize border-0 d-flex flex-row align-items-center h-100'}>
                      <Translate
                        divider={this.props.Favourites.divider}>
                        {'total price>>>: ' + this.getPrice()}
                      </Translate>₾
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to={'/cart'}
                      className={'p-3 bg-transparent text-muted text-capitalize border-0 d-flex flex-row align-items-center h-100'}>
                      <Translate
                        divider={this.props.Favourites.divider}>
                        {'view cart'}
                      </Translate>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Container>
            </div>
          </div>
          <Container>
            <Row className={'collections-flowers'}>
              {this.getItems()}
            </Row>
          </Container>
        </div>}
      </div>
    )
  }
}

class Favourites extends React.Component{
  constructor(props) {
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

    if(checkPromise(props.Favourites) === false){
      this.props.initFavourites();
    }

    if (this.props.match.url !== this.props.Navigation.path) {
      this.props.setPath(this.props.match.url);
    }
  }

  render(){
    if(checkPromise(this.props.Favourites)){
      return <Element {...this.props}/>;
    }else{
      return <Loading/>;
    }
  }
}

const states = (state) => {
  return {
    Navigation: state.NavigationReducer,
    Favourites: state.FavouritesReducer,
    Cart: state.CartReducer
  };
};

const actions = (dispatch) => {
  return {
    setPage: (page) => {
      dispatch(SET_NAVIGATION_CURRENT_PAGE(page));
    },
    setPath: (path) => {
      dispatch(SET_NAVIGATION_PATH(path));
    },
    initFavourites: () => {
      dispatch(INIT_FAVOURITES());
    },
    fvaddid: (id) => {
      dispatch(ADD_FAVOURITES_FAVOURITES_BY_ID(id));
    },
    fvrm: (id) => {
      dispatch(UNSET_FAVOURITES_FAVOURITE_ITEM(id));
    },
    addcartid: (id) => {
      dispatch(ADD_CARTS_CART_BY_ID(id));
    },
    rmcart: (id) => {
      dispatch(UNSET_CARTS_CART_ITEM(id));
    }
  };
};

export default connect(states, actions)(Favourites);