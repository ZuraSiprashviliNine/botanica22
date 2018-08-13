
import React from 'react';
import {connect} from 'react-redux';
import {Loading} from "../../Components/Loading";
import {SET_NAVIGATION_CURRENT_PAGE, SET_NAVIGATION_PATH} from "../../Actions/NavigationActions";
import {getPageSlag} from "../../Helpers/Routing";

import {reactLocalStorage as Storage} from "reactjs-localstorage";

import Translate from '../Translate';

import {
  Link
} from 'react-router-dom';

import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {checkPromise} from "../../Helpers/Valid";
import {
  INIT_CART,
  SET_CART_COUNT, SET_CART_ITEM_OLD_PRICE,
  SET_CART_ITEM_PRICE,
  SET_CART_SIZE,
  UNSET_CARTS_CART_ITEM
} from "../../Actions/CartActions";
import {CollectionItemImage, CollectionItemImages} from "../../Components/CollectionsComponent";
import {FlowerInfo} from "./Flower";
import {SET_ORDER} from "../../Actions/OrderActions";
import {SET_FLOWER_COUNT, SET_FLOWER_SIZE} from "../../Actions/FlowerActions";

class Carts extends React.Component{
  constructor(props){
    super(props);

    this.getCarts = this.getCarts.bind(this);

    this.getImage = this.getImage.bind(this);

    this._rm_cart = this._rm_cart.bind(this);

    this._order = this._order.bind(this);

    this.getPrice = this.getPrice.bind(this);
  }

  getPrice(){
    let price = 0;
    this.props.Cart.carts.map((f) => {price += parseFloat(f.price)});
    return price.toPrecision(5);
  }

  _rm_cart(id) {
    if (this.props.Cart.carts.some((f) => f.id == id)) {
      this.props.rmcart(id);
      Storage.set('carts', JSON.stringify(JSON.parse(Storage.get('carts')).filter((f) => f != id)));
      return false;
    } else {
      return true;
    }
  }

  _order(order){
    this.props.setOrder(order);
  }

  getCarts(){
    return this.props.Cart.carts.map((c) => {
      return (
        <Container key={c.id} className={'my-3 bg-white shadow collections-flowers'}>
          <Row className={'collection'}>
            <Col
              md={3}
              className={'p-1 images'}>
              {this.getImage(c)}
            </Col>
            <Col
              md={6}
              className={'info p-1'}>
              <FlowerInfo
                size={c.size}
                count_price={c.count_price}
                real_price={c.real_price}
                size_price={c.size_price}
                size__price={c.size__price}
                setprice={this.props.setPrice}
                setsize={this.props.setsize}
                setcount={this.props.setcount}
                id={c.id}
                hasCount={c.hasCount}
                count={c.count}
                exporter={true}
                carts={this.props.Cart.carts}
                cartadd={() => {}}
                rmcart={() => {}}
                order={() => {}}
                title={c.title}
                price={c.price}
                old_price={c.old_price}
                real_old_price={c.real_old_price}
                setoldprice={this.props.setOldPrice}
                description={c.description}/>
            </Col>
            <Col
              md={3}
              className={'actions p-1 align-self-center'}>
              <button
                onClick={() => {this._rm_cart(c.id)}}
                className={'btn-grass btn my-2 btn-block px-3 py-2 text-uppercase text-white'}>
                <Translate>
                  remove from cart
                </Translate>
              </button>
              <Button
                tag={Link}
                to={'/order'}
                onClick={() => {this._order(c)}}
                className={'btn-__grass btn my-2 btn-block px-3 py-2 text-uppercase text-white'}>
                <Translate>
                  order
                </Translate>
              </Button>
            </Col>
          </Row>
        </Container>
      );
    });
  }

  getImage(cart){
    let element = <CollectionItemImage image={cart.image}/>;
    if(cart.images){
      if(cart.images.length > 0){
        return (
          <CollectionItemImages images={cart.images} image={cart.image}/>
        );
      }
    }
    return element;
  }

  render(){
    return (
      [
        <div
          key={'or'}
          className={'py-1 py-md-0 border shadow animated navbar navbar-expand-md navbar-light bg-white'}>
          <Container>
            <Nav
              className={'mr-auto shadow text-capitalize flex-row justify-content-md-start justify-content-center'}>
              <NavItem>
                <NavLink
                  tag={Button}
                  className={'p-3 bg-transparent text-muted text-capitalize border-0 d-flex flex-row align-items-center h-100'}>
                  <Translate
                    divider={this.props.Cart.divider}>
                    {'current items>>>: ' + this.props.Cart.count}
                  </Translate>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Button}
                  className={'p-3 bg-transparent text-muted text-capitalize border-0 d-flex flex-row align-items-center h-100'}>
                  <Translate
                    divider={this.props.Cart.divider}>
                    {this.getPrice()}
                  </Translate>₾
                </NavLink>
              </NavItem>
            </Nav>
          </Container>
        </div>,
        <Container
          key={'s'}>
          <Row>
            <Col
              xs={12}
              className={'p-1'}>
              <div
                className={'h-100 item'}>
                {this.getCarts()}
              </div>
            </Col>
          </Row>
        </Container>
      ]
    );
  }
}

class NoCarts extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Container>
        <Row>
          <Col
            className={'p-1'}
            xs={12}>
            <div
              className={'bg-white shadow p-md-3 p-1'}>
              <h1 className={'m-0 text-grass text-capitalize t text-center py-2'}>
                <Translate>
                  your cart is empty
                </Translate>
              </h1>
              <div
                className={'text-center py-2'}>
                <Link
                  to={'/flowers'}
                  className={'btn btn-grass text-uppercase text-white shadow font-weight-light'}>
                  <Translate>
                    choose your flower
                  </Translate>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

class Element extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){

    document.title = "Cart * Botanica22.ge";
  }

  render(){
    return (
      <div
        id={'cart_page'}
        className={'page animated fadeIn py-md-5 bg-light'}>
        {this.props.Cart.count > 0 ? (
          <Carts
            {...this.props}/>
        ): (
          <NoCarts />
        )}
      </div>
    )
  }
}

class Cart extends React.Component{
  constructor(props){
    super(props);

    this.init = this.init.bind(this);
  }

  componentDidMount(){
    this.init(this.props);
  }

  init(props){
    if(this.props.Navigation.currentPage !== getPageSlag(this.props.match.path)) {
      this.props.setPage(getPageSlag(this.props.match.path));
    }

    if(checkPromise(props.Cart) === false){
      this.props.initCart();
    }

    if (this.props.match.url !== this.props.Navigation.path) {
      this.props.setPath(this.props.match.url);
    }
  }

  render(){
    if(checkPromise(this.props.Cart)){
      return <Element {...this.props}/>;
    }else{
      return <Loading/>;
    }
  }
}

const states = (state) => {
  return {
    Navigation: state.NavigationReducer,
    Cart: state.CartReducer,
    Order: state.OrderReducer
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
    initCart: () => {
      dispatch(INIT_CART());
    },
    setOrder: (order) => {
      dispatch(SET_ORDER(order));
    },
    rmcart: (id) => {
      dispatch(UNSET_CARTS_CART_ITEM(id))
    },
    setsize: (size, id) => {
      dispatch(SET_CART_SIZE(size, id));
    },
    setcount: (count, id) => {
      dispatch(SET_CART_COUNT(count, id));
    },
    setPrice: (price, id) => {
      dispatch(SET_CART_ITEM_PRICE(price, id));
    },
    setOldPrice: (price, id) => {
      dispatch(SET_CART_ITEM_OLD_PRICE(price, id));
    }
  };
};

export default connect(states, actions)(Cart);
