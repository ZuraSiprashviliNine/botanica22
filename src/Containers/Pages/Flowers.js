
import React from 'react';

import {connect} from 'react-redux';
import {Loading} from "../../Components/Loading";
import {SET_NAVIGATION_CURRENT_PAGE, SET_NAVIGATION_PATH} from "../../Actions/NavigationActions";
import {getPageSlag} from "../../Helpers/Routing";

import Translate from '../Translate';
import {Link} from 'react-router-dom';

import{
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import {
  INIT_FLOWERS,
  SET_FLOWERS_CURRENT_CATEGORY,
  SET_FLOWERS_FLOWERS,
  UNSET_FLOWERS_FLOWERS
} from "../../Actions/FlowersActions";
import {checkPromise} from "../../Helpers/Valid";
import {CollectionItemImage, CollectionItemImages} from "../../Components/CollectionsComponent";
import {AnimatedAndMetas} from "../../Components/CollectionsComponent";
import {ADD_FAVOURITES_FAVOURITES_BY_ID, UNSET_FAVOURITES_FAVOURITE_ITEM} from "../../Actions/FavouritesActions";
import {reactLocalStorage as Storage} from "reactjs-localstorage";
import {ADD_CARTS_CART_BY_ID, UNSET_CARTS_CART_ITEM} from "../../Actions/CartActions";

export class FlowerItem extends React.Component {
  constructor(props) {
    super(props);

    this.getImage = this.getImage.bind(this);
  }

  getImage(){
    if(this.props.images.length === 0){
      return <CollectionItemImage link={'/flowers/items/item_' + this.props.id} image={this.props.image}/>
    }else {
        // return <CollectionItemImages image={this.props.image} images={this.props.images}/>
        return null;
    }
  }

  render() {
    return (
      <div className={'h-100 collection shadow'}>
        <AnimatedAndMetas
          id={this.props.id}
          favourites={this.props.favourites}
          fvrm={this.props.fvrm}
          fvaddid={this.props.fvaddid}
          carts={this.props.carts}
          addcart={this.props.addcart}
          rmcart={this.props.rmcart}
          slag={`/flowers/items/item_${this.props.id}`} description={this.props.description}/>
        {this.getImage()}
        <div className={'bg-white'}>
          <Container>
            <Row className={'align-items-center'}>
              <Col
                xs={4}
                className={'pr-0 price'}>
                <div className={'bg-grass py-2 lie'}></div>
                <div className={'bg-grass text-center text-white font-weight-bold pt-3 pb-4'}>
                    <img src="/assets/lari_white.png" alt="lari" style={{width: '20px',height:'20px'}}/>
                  <i>
                      { (parseFloat(this.props.price) < 2 ?  parseFloat(this.props.price) + 9 * parseFloat(this.props.count_price)  : parseFloat(this.props.real_price)).toPrecision(4)}
                  </i>
                </div>
              </Col>
              <Col
                xs={8}
                className={'pl-1 h-100 text-capitalize text-muted'}>
                <h5 className={'m-0 py-3 font-weight-light'}>
                  <Link
                    className={'text-muted d-block'}
                    to={'/flowers/items/item_' + this.props.id}>
                    <Translate
                      divider={' - '}
                      language={'en'}>
                      {this.props.title}
                    </Translate>
                  </Link>
                </h5>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

class FlowerBar extends React.Component{
  constructor(props){
    super(props);

    this.getCategories = this.getCategories.bind(this);
  }

  getCategories(){
    return this.props.categories.map((cat) => {
      return (
        <ListGroupItem
          tag={Link}
          key={cat.slag}
          className={`text-grass rounded-no text-capitalize ${('/flowers/'+ this.props.current)=== cat.slag ? 'active' : ''}`}
          to={cat.slag}>
          <Translate>
            {cat.title}
          </Translate>
        </ListGroupItem>
      );
    });
  }

  render(){
    return (
      <div
        className={'bg-white border animated fadeIn flowerBar'}>
        <div
          className={'py-3 px-2 shadow-grass border-bottom border-5 border-grass'}>
          <h2
            className={'m-0 text-capitalize text-grass'}>
            <i>
              <Translate>
                categories
              </Translate>
            </i>
          </h2>
        </div>
        <ListGroup className={'lists'}>
          {this.getCategories()}
        </ListGroup>
      </div>
    );
  }
}

class Element extends React.Component{
  constructor(props) {
    super(props);

    this.getFlowers = this.getFlowers.bind(this);
    this._add_favourite = this._add_favourite.bind(this);
    this._remove_favourites = this._remove_favourites.bind(this);
    this._add_cart = this._add_cart.bind(this);
    this._rm_cart = this._rm_cart.bind(this);
  }

  componentDidMount(){
    let cat = this.props.Flowers.currentCategory.replace(new RegExp('_', 'g'), ' ');
    cat = cat.trim();
    switch(cat){
      case 'bouquets': {
        cat = 'თაიგულები';
        break;
      }
      case 'mixed bouquets': {
        cat = 'შერეული თაიგულები';
        break;
      }
      case 'compositions': {
        cat = 'კომპოზიციები ყუთში';
        break;
      }
      case 'Bouquets with vase': {
        cat =  'ყვავილები ლარნაკით';
        break;
      }
      case 'wedding bouquets': {
        cat = 'საქორწინო თაიგულები';
        break;
      }
      case 'bouquet of the day': {
        cat = 'დღის თაიგული';
        break;
      }
      case 'funeral flowers': {
        cat = 'სამგლოვიარო ფლორისტიკა';
        break;
      }
      case 'Plants': {
        cat = 'ქოთნის ყვავილები';
        break;
      }
      default: {
        break;
      }
    }

    document.title = `Botanica’22 ყვავილების მაღაზია - ${cat}`;
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

  getFlowers(){
    return this.props.Flowers.flowers.map((flower) => {
      return (
        <Col
          key={flower.id}
          lg={4}
          md={6}
          sm={6}
          className={'flowers_flower_col h-100 p-2 collection'}>
          <FlowerItem
            carts={this.props.Cart.carts.map((c) => c.id)}
            addcart={this._add_cart}
            rmcart={this._rm_cart}
            favourites={this.props.Favourites.favourites.map((f) => f.id)}
            fvrm={this._remove_favourites}
            fvaddid={this._add_favourite}
            {...flower} />
        </Col>
      );
    });
  }

  render() {
    return (
      <main
        id={'flower_page'}
        className={'animated fadeIn page bg-light'}>
        <div
          className={'py-md-5 bg-light'}>
          <Container>
            <Row>
              <Col
                md={3}
                className={'flowers_sidebar p-md-2 p-1'}>
                <FlowerBar
                  current={this.props.Flowers.currentCategory}
                  categories={this.props.Navigation.list.find((l) => l.slag === '/flowers').sub}/>
              </Col>
              <Col
                className={'flowers p-md-2'}
                md={9}>
                <Container>
                  <Row className={'collections-flowers'}>
                    {this.getFlowers()}
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    );
  }
}

class Flowers extends React.Component{
  constructor(props){
    super(props);

    this.init = this.init.bind(this);
  }

  componentDidMount(){
    this.init(this.props);
  }

  componentDidUpdate(props){
    this.init(props);
  }

  init(props){
    if(this.props.Navigation.currentPage !== getPageSlag(this.props.match.path)){
      this.props.setPage(getPageSlag(this.props.match.path));
    }
    if(checkPromise(this.props.Flowers, ['flowers']) === false){
      this.props.initFlowers();
    }
    if (props.Flowers.currentCategory !== this.props.match.params.flower_category) {
      this.props.unset();
      this.props.setFlowersCurrentCategory(this.props.match.params.flower_category);
      this.props.setFlowers(this.props.match.params.flower_category);
    }

    if (this.props.match.url !== this.props.Navigation.path) {
      this.props.setPath(this.props.match.url);
    }
  }

  render(){
    if(
      checkPromise(this.props.Flowers, ['flowers'])
      && checkPromise(this.props.Navigation)
    ){
      if(this.props.Flowers.flowers.length === 0){
        return <Loading/>;
      }else{
        return <Element {...this.props}/>;
      }
    }else{
      return <Loading/>;
    }
  }
}

const states = (state) => {
  return {
    Flowers: state.FlowersReducer,
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
    initFlowers: () => {
      dispatch(INIT_FLOWERS());
    },
    setFlowers: (category) => {
      dispatch(SET_FLOWERS_FLOWERS(category));
    },
    setFlowersCurrentCategory: (category) => {
      dispatch(SET_FLOWERS_CURRENT_CATEGORY(category));
    },
    unset: () => {
      dispatch(UNSET_FLOWERS_FLOWERS());
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

export default connect(states, actions)(Flowers);
