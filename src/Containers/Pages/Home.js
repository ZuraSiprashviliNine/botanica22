
import React from 'react';

import {connect} from 'react-redux';

import {reactLocalStorage as Storage} from 'reactjs-localstorage';

import {SET_NAVIGATION_CURRENT_PAGE, SET_NAVIGATION_PATH} from "../../Actions/NavigationActions";
import {getPageSlag} from "../../Helpers/Routing";

import {Loading} from "../../Components/Loading";

import SliderComponent from '../../Components/SliderComponent';

import {INIT_SLIDER, SET_SLIDER_SLIDES} from "../../Actions/SliderActions";
import {checkPromise} from "../../Helpers/Valid";

import {Sales} from "../../Components/Sales";
import {INIT_SALES, SET_SALES_ITEMS} from "../../Actions/SalesActions";
import {INIT_COLLECTIONS, SET_COLLECTIONS_ITEMS} from "../../Actions/CollectionsActions";

import {CollectionsComponent} from "../../Components/CollectionsComponent";
import {ADD_FAVOURITES_FAVOURITES_BY_ID, UNSET_FAVOURITES_FAVOURITE_ITEM} from "../../Actions/FavouritesActions";
import {ADD_CARTS_CART_BY_ID, UNSET_CARTS_CART_ITEM} from "../../Actions/CartActions";

class Element extends React.Component{
  constructor(props){
    super(props);

    this._add_favourite = this._add_favourite.bind(this);
    this._remove_favourites = this._remove_favourites.bind(this);
    this._add_cart = this._add_cart.bind(this);
    this._rm_cart = this._rm_cart.bind(this);
  }

  componentDidMount(){
      let str = `Botanica22.ge`;
      document.title = str;
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

  render(){
    return (
      <main
        id={'home_page'}
        className={'animated fadeIn page bg-light'}>
        <div
          className={'slider'}>
          <SliderComponent {...this.props.Slider}/>
        </div>

        <Sales {...this.props.Sales}/>

        <div className={'collections-container'}>
          <CollectionsComponent
            favourites={this.props.Favourites.favourites.map((f) => f.id)}
            carts={this.props.Cart.carts.map((f) => f.id)}
            fvrm={this._remove_favourites}
            fvaddid={this._add_favourite}
            addcart={this._add_cart}
            rmcart={this._rm_cart}
            {...this.props.Collections}/>
        </div>

      </main>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.init = this.init.bind(this);
  }

  componentDidMount(){
    this.init(this.props);
  }

  init(props) {
    if (this.props.Navigation.currentPage !== getPageSlag(this.props.match.path)) {
      this.props.setPage(getPageSlag(this.props.match.path));
    }
    if(checkPromise(this.props.Slider) === false){
      this.props.initSlider();
    }
    if(this.props.Slider.slides === null){
      this.props.setSliderSlides();
    }
    if(checkPromise(this.props.Sales) === false){
      this.props.initSales();
    }
    if(checkPromise(this.props.Collections) === false){
      this.props.initCollections();
    }
    if (this.props.match.url !== this.props.Navigation.path) {
      this.props.setPath(this.props.match.url);
    }
  }
  render(){
    if(
      checkPromise(this.props.Slider)
      && checkPromise(this.props.Sales)
      && checkPromise(this.props.Collections)
    ){
      return <Element {...this.props}/>;
    }else{
      return <Loading/>;
    }
  }
}


const states = (state) => {
  return {
    Slider: state.SliderReducer,
    Sales: state.SalesReducer,
    Collections: state.CollectionsReducer,
    Navigation: state.NavigationReducer,
    Favourites: state.FavouritesReducer,
    Cart: state.CartReducer
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
    initSlider: () => {
      dispatch(INIT_SLIDER());
    },
    setSliderSlides: () => {
      dispatch(SET_SLIDER_SLIDES());
    },
    initSales: () => {
      dispatch(INIT_SALES());
      dispatch(SET_SALES_ITEMS());
    },
    initCollections: () => {
      dispatch(INIT_COLLECTIONS());
      dispatch(SET_COLLECTIONS_ITEMS());
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
  }
};

export default connect (states, actions)(Home);