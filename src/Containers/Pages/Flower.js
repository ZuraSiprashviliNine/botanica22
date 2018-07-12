
import React from 'react';

import {connect} from 'react-redux';
import {checkPromise} from "../../Helpers/Valid";
import {Loading} from "../../Components/Loading";
import {
  INIT_FLOWER,
  SET_FLOWER_COUNT,
  SET_FLOWER_FLOWER, SET_FLOWER_OLD_PRICE, SET_FLOWER_PRICE,
  SET_FLOWER_SIZE,
  UNSET_FLOWER_FLOWER
} from "../../Actions/FlowerActions";
import {getPageSlag} from "../../Helpers/Routing";
import {SET_NAVIGATION_CURRENT_PAGE, SET_NAVIGATION_PATH} from "../../Actions/NavigationActions";

import {Link} from 'react-router-dom';

import Translate from '../Translate';

import FontAwesome from 'react-fontawesome';

import Swiper from 'react-id-swiper';

import {CollectionItemImage, CollectionsComponent} from '../../Components/CollectionsComponent';

import {SliderButton} from "../../Components/SliderButton";

import {reactLocalStorage as Storage} from 'reactjs-localstorage';

import MetaTags from 'react-meta-tags';

import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
    ButtonDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem
} from 'reactstrap';
import {SET_ORDER} from "../../Actions/OrderActions";
import {ADD_FAVOURITES_FAVOURITES_BY_ID, UNSET_FAVOURITES_FAVOURITE_ITEM} from "../../Actions/FavouritesActions";
import {ADD_CARTS_CART_BY_ID, UNSET_CARTS_CART_ITEM} from "../../Actions/CartActions";

class FlowerSwiper extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      gallerySwiper: null,
      thumbnailSwiper: null
    };


    this.gallerySwiperParams = {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      renderPrevButton: () => <SliderButton to={'left'}/>,
      renderNextButton: () => <SliderButton to={'right'}/>

    };

    this.thumbnailSwiperParams = {
      paceBetween: 0,
      centeredSlides: true,
      slidesPerView: 3,
      touchRatio: 0.2,
      clickable: true,
      slideToClickedSlide: true,
    };


    this.galleryRef = this.galleryRef.bind(this);
    this.thumbRef = this.thumbRef.bind(this);

    this.getSlides = this.getSlides.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    //
    // if(nextProps.image !== this.props.image){
    //   this.forceUpdate();
    //   alert('x');
    // }
    if (nextState.gallerySwiper && nextState.thumbnailSwiper) {
      const { gallerySwiper, thumbnailSwiper } = nextState;

      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }

  galleryRef(ref) {
    if (ref) this.setState({ gallerySwiper: ref.swiper })
  }

  thumbRef(ref) {
    if (ref) this.setState({ thumbnailSwiper: ref.swiper })
  }

  getSlides(slides){
    return slides.map((image, index) => {
      return (
        <div key={index} className={'h-100'}>
          <CollectionItemImage
            image={image}/>
        </div>
      )
    })
  }

  getContent(slides){
    return [
      <Swiper key={'top'} {...this.gallerySwiperParams} ref={this.galleryRef}>
        {this.getSlides(slides)}
      </Swiper>,
      <Swiper key={'bot'} {...this.thumbnailSwiperParams} ref={this.thumbRef}>
        {this.getSlides(slides)}
      </Swiper>
    ];
  }

  render(){
    return (
      <div>
        {this.getContent(this.props.images.length > 0 ? [this.props.image, ...this.props.images] : [this.props.image])}
      </div>
    );
  }
}


class Radios extends React.Component{
  constructor(props){
    super(props);

    this._handleSelect = this._handleSelect.bind(this);
  }

  _handleSelect(id){
    this.props.setsize(id);
  }

  render(){
    return (
      <div
        className={'py-3 text-capitalize'}>
        <FormGroup check>
          <Label check>
            <Input checked={this.props.size == 0} onChange={() => {this._handleSelect(0)}} name={`size_${this.props.id}`} type={'radio'} />
            <span className="text-dark">
                <Translate>
                  large
                </Translate>
              </span>
          </Label>
        </FormGroup>
        {this.props.size_price != 0 ? (
          <FormGroup check>
            <Label check>
              <Input checked={this.props.size == 1} onChange={() => {this._handleSelect(1)}} name={`size_${this.props.id}`} type={'radio'} />
              <span className="text-dark">
                <Translate>
                  medium
                </Translate>
              </span>
            </Label>
          </FormGroup>
        ): null}
        {this.props.size__price != 0 ? (
          <FormGroup check>
            <Label check>
              <Input checked={this.props.size == 2} onChange={() => {this._handleSelect(2)}} name={`size_${this.props.id}`} type={'radio'} />
              <span className="text-dark">
                <Translate>
                  small
                </Translate>
              </span>
            </Label>
          </FormGroup>
        ): null}
      </div>
    );
  }
}

class Counts extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      broken: false
    };

    this._handleMin = this._handleMin.bind(this);
    this._handlePlu = this._handlePlu.bind(this);

    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(event){
    let val = parseInt(this.ccount.value);
    if(val >= 9 && val <= 101){
      this.props.setcount(val);
      this.setState({
          broken: false
      });
    }else{
      if(!isNaN(val)){
          this.setState({
              broken: true
          })
      }else{
          this.setState({
              broken: false
          });
      }
    }
  }

  _handleMin(){
    if(this.props.count > 9){
      this.props.setcount(parseInt(this.props.count) - 1);
    }
  }

  _handlePlu(){
    if(this.props.count < 101){
        this.props.setcount(parseInt(this.props.count) + 1);
    }
  }

  render(){
    return (
      <div>
        <div className={'py-1 text-center'}>
          <h3
            className={'m-0  font-weight-light text-capitalize'}>
            <Translate>
              count
            </Translate>
          </h3>
        </div>
        <div className={'py-1'}>
          <div className="actioners">
            <button
              type={'button'}
              onClick={this._handleMin}
              ref={(element) => {this.actMin = element}}
              className={'btn text-dark shadow bg-white'}>
              <FontAwesome
                name={'minus'}/>
            </button>
            <div
              ref={(element) => {this.count = element}}
              className={'shadow bg-white  py-2 border text-center form-control w-100'}>
              {this.props.count}
            </div>
            <button
              type={'button'}
              onClick={this._handlePlu}
              ref={(element) => {this.actPlu = element}}
              className={'btn text-dark shadow bg-white'}>
              <FontAwesome
                name={'plus'}/>
            </button>
          </div>
        </div>
        <div className="py-1 text-center">
            <h3
                className={'m-0  font-weight-light text-capitalize'}>
                <Translate>
                    custom count
                </Translate>
            </h3>
        </div>
        <div className="py-1">
          <div className="actioners">
            <input
              type={'number'}
              min={'9'}
              max={'101'}
              step={'1'}
              ref={(element) => {this.ccount = element}}
              onChange={this._handleChange}
              placeholder={this.props.count || 9}
              style={{
                transition: '0.5s'
              }}
              className={`py-2 border shadow form-control w-100 text-center text-dark ${this.state.broken === true ? 'border-danger' : ' bg-white'}`}/>
          </div>
        </div>
      </div>
    );
  }
}

export class FlowerInfo extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            carted: this.props.carts.includes(this.props.id)
        };

        this._handle_cart = this._handle_cart.bind(this);
        this.setAllSize = this.setAllSize.bind(this);
        this.setAllCount = this.setAllCount.bind(this);
    }

  _toggleCurrency(){
    this.setState({
        ...this.state,
        isCurrencyOpen: !this.state.isCurrencyOpen
    })
  }


  _handle_cart(){
    this.setState({
      carted: this.state.carted === true ? this.props.rmcart(this.props.id) : this.props.addcart(this.props.id)
    });
  }

  setAllCount(count) {
    // let storageCount = Storage.get('count');
    // if(storageCount === undefined){
    //   Storage.set('count', JSON.stringify([{id: this.props.id, count: count}]));
    // }else{
    //   storageCount = JSON.parse(storageCount);
    //   let thatData = storageCount.find((sc) => sc.id == this.props.id);
    //   if(thatData){
    //     Storage.set('count', JSON.stringify(storageCount.map((sc) => {
    //       if(sc.id == this.props.id){
    //         return {
    //           id: this.props.id,
    //           count: count
    //         };
    //       }else{
    //         return sc;
    //       }
    //     })));
    //   }else{
    //     Storage.set('count', JSON.stringify([...storageCount, {id: this.props.id, count: count}]));
    //   }
    // }

    let datPrice;
    let ddoldprice = parseFloat(this.props.real_old_price) - parseFloat(this.props.real_price);
    if(this.props.size == 0){
      datPrice = this.props.real_price;
    }else if(this.props.size == 1){
      datPrice = this.props.size_price;
    }else if(this.props.size == 2){
      datPrice = this.props.size__price;
    }else{
      datPrice = this.props.real_price;
    }

    this.props.setcount(count, this.props.id);
    this.props.setprice(parseInt(count) * parseFloat(this.props.count_price) + parseFloat(datPrice), this.props.id);
    this.props.setoldprice(parseInt(count) * parseFloat(this.props.count_price) + parseFloat(datPrice) + ddoldprice, this.props.id);
  }

  setAllSize(size){
    this.props.setcount(0, this.props.id);
    // let storageSize = Storage.get('sizes');
    // if(storageSize === undefined){
    //   Storage.set('sizes', JSON.stringify([{id: this.props.id, size: size}]));
    // }else{
    //   storageSize = JSON.parse(storageSize);
    //   let thatData = storageSize.find((ss) => ss.id == this.props.id);
    //   if(thatData){
    //     Storage.set('sizes', JSON.stringify(storageSize.map((ss) => {
    //       if(ss.id == this.props.id){
    //         return {
    //           id: this.props.id,
    //           size: size
    //         };
    //       }else{
    //         return ss;
    //       }
    //     })));
    //   }else{
    //     Storage.set('sizes', JSON.stringify([...storageSize, {id: this.props.id, size: size}]));
    //   }
    // }
    this.props.setsize(size, this.props.id);

    let dp = 0;
    if (size == 0) {
      dp = this.props.real_price;
    } else if (size == 1) {
      dp = this.props.size_price;
    } else if (size == 2) {
      dp = this.props.size__price;
    }else{
      dp = this.props.real_price;
    }
    dp = parseFloat(dp);
    let olddprice = this.props.real_old_price - this.props.real_price;
    this.props.setprice(dp, this.props.id);
    this.props.setoldprice(dp + olddprice, this.props.id);
  }

  componentDidMount(){
    this.setAllSize(this.props.size || 0);
    if(this.props.hasCount){
        this.setAllCount(this.props.count || 9);
        this.props.setprice(parseFloat(this.props.real_price) + parseInt(this.props.count || 9) * parseFloat(this.props.count_price));
      this.props.setoldprice(parseFloat(this.props.real_old_price) + parseInt(this.props.count || 9) * parseFloat(this.props.count_price));
    }else{
        this.setAllCount(this.props.count || 0);
    }
  }

  render(){
    return [
      <div
        key={'title'}
        className={'border-bottom py-3 px-1 px-md-2'}>
        <Container>
          <Row
            className={'align-items-center'}>
            <Col
              lg={7}>
                <h1
                    className={'text-capitalize font-weight-light m-9'}>
                    <Translate>
                        {this.props.title}
                    </Translate>
                </h1>
            </Col>
            <Col
              lg={5}>
                <a
                    target="popup"
                    onClick={(event) => {
                        window.open(event.target.href,'popup','width=600,height=600'); return false;
                    }}
                    href={'https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&u=https://botanica22.ge/flowers/items/item_'+this.props.id+'&display=popup&ref=plugin&src=share_button'}
                    className={'btn btn-grass btn-block text-capitalize text-white shadow rounded-no d-flex flex-row align-items-center justify-content-between'}>
                  <FontAwesome
                    name={'facebook'}/>
                  <div
                    className={'flex-fill d-flex flex-row align-items-center font-weight-bold justify-content-center'}>
                    share
                  </div>
                </a>
            </Col>
          </Row>
        </Container>

      </div>,
      <div
        key={'price'}
        className={'py-3 px-1 px-md-2 border-bottom'}>
        <Container>
          <Row
            className={'align-items-center'}>
            <Col
              className={'p-0'}
              xs={4}>
              <h2 className={'text-capitalize m-0 font-weight-light'}>
                <Translate>
                  price
                </Translate>
              </h2>
            </Col>
            <Col
              className={'p-0'}
              xs={8}>
              <h3
                className={'font-weight-light m-0 text-capitalize'}>
                  <img src="/assets/lari.png" alt="lari" style={{width: '35px',height:'35px'}}/> {parseFloat(this.props.price).toPrecision(5)}
                {this.props.old_price > this.props.price ? (
                  <sub
                    style={{textDecoration: 'line-through'}}
                    className={'text-grass ml-1'}>₾ {parseFloat(this.props.old_price).toPrecision(5)}</sub>
                ) : null}
              </h3>
            </Col>
          </Row>
        </Container>
      </div>,
      <div
        key={'description'}
        className={'py-3 px-1 px-md-2 border-bottom'}>
        {this.props.description ? [
          <div
            key={'t'}
            className={'py-3'}>
            <h3
              className={'text-capitalize m-0 font-weight-light'}>
              <Translate>
                description
              </Translate>
            </h3>
          </div>,
          <div
            key={'d'}
            className={'small text-muted'}>
            <Translate>
            {this.props.description}
          </Translate>
          </div>
        ]: null}
        <Container>
          <Row
            className={''}>
            <Col
              className={'p-1'}
              sm={6}>
              <Radios
                size={this.props.size}
                size_price={this.props.size_price}
                real_price={this.props.real_price}
                size__price={this.props.size__price}
                setsize={this.setAllSize}
                id={this.props.id}/>
            </Col>
            <Col
              className={'p-1'}
              sm={6}>
              {this.props.hasCount ? (
                <Counts
                  count={this.props.count}
                  setcount={this.setAllCount}
                  id={this.props.id} />
              ): null}
            </Col>
          </Row>
        </Container>
      </div>,
      this.props.exporter ? null :
        <div key={'buttons'} className={'py-3 px-1 px-md-2'}>
          <Container>
            <Row
              className={'align-items-center'}>
              <Col
                className={'p-1'}
                sm={6}>
                <Button
                  tag={Link}
                  to={'/cart'}
                  onClick={this._handle_cart}
                  className={'btn text-light btn-_grass btn-block rounded-no text-capitalize font-weight-light'}>
                  <div
                    className={'d-flex flex-row align-items-center between'}>
                    <div
                      className={'align-self-start'}>
                      <FontAwesome
                        name={'shopping-cart'}/>
                    </div>
                    <div
                      style={{flex: 1}}
                      className={'text-center align-self-center'}>
                      <Translate>
                        add to cart
                      </Translate>
                    </div>
                  </div>
                </Button>
              </Col>
              <Col
                className={'p-1'}
                sm={6}>
                <Link
                  to={'/order'}
                  onClick={this.props.order}
                  className={'btn text-light btn-grass btn-block rounded-no text-capitalize font-weight-light'}>
                  <div
                    className={'d-flex flex-row align-items-center between'}>
                    <div
                      className={'align-self-start'}>
                      <FontAwesome
                        name={'star-o'}/>
                    </div>
                    <div
                      style={{flex: 1}}
                      className={'text-center align-self-center'}>
                      <Translate>
                        order
                      </Translate>
                    </div>
                  </div>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
    ];
  }
}

class FlowerWarr extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Container className={'py-md-3'}>
        <Row>
          <Col
            xs={12}>
            <h1
              className={'font-weight-light text-capitalize m-0'}>
              <Translate>
                warranty
              </Translate>
            </h1>
            <div
              className={'small text-muted p-md-2 p-1'}>
              <Translate>
                Your bouquet,which is prepared with fresh flowers, will be delivered at an arranged time. Provided we are informed about any fault of your bouquet within 24 hours from the purchase we will change the bouquet in question.
              </Translate>
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
    this._add_favourite = this._add_favourite.bind(this);
    this._remove_favourites = this._remove_favourites.bind(this);
    this._add_cart = this._add_cart.bind(this);
    this._rm_cart = this._rm_cart.bind(this);
  }

  componentDidMount(){
    if(this.props.Flower){
      if(this.props.Flower.flower){
          let str = this.props.Flower.flower.title;
          document.title = str;
      }
    }
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
      <div
        id={'flower_page'}
        className={'page animated fadeIn'}>
        <MetaTags>
          <title>
              {this.props.Flower.flower.title}
          </title>
          <meta name={'description'} content={this.props.Flower.flower.description}/>
          <meta name={'og:url'} content={window.location.href}/>
          <meta name={'og:type'} content={'article'}/>
          <meta name={'og:title'} content={`botanica22.ge Flower - (${this.props.Flower.flower.title})`}/>
          <meta name={'og:description'} content={this.props.Flower.flower.description}/>
          <meta name={'og:image'} content={this.props.Flower.flower.image}/>
        </MetaTags>
        <Container className={'py-md-3 border-bottom'}>
          <Row className={'align-items-stretch'}>
            <Col
              lg={6}
              md={7}
              className={'images p-md-1 p-0'}>
              <FlowerSwiper image={this.props.Flower.flower.image} images={this.props.Flower.flower.images}/>
            </Col>
            <Col
              lg={6}
              md={5}
              className={'data h-100 d-flex flex-column justify-content-around'}>
              <FlowerInfo
                count_price={this.props.Flower.flower.count_price}
                size={this.props.Flower.flower.size}
                real_price={this.props.Flower.flower.real_price}
                size_price={this.props.Flower.flower.size_price}
                size__price={this.props.Flower.flower.size__price}
                setprice={this.props.setFlowerPrice}
                setsize={this.props.setFlowerSize}
                setcount={this.props.setFlowerCount}
                hasCount={this.props.Flower.flower.hasCount}
                count={this.props.Flower.flower.count}
                id={this.props.Flower.flower.id}
                carts={this.props.Cart.carts}
                addcart={this._add_cart}
                rmcart={this._rm_cart}
                order={this.props.order}
                title={this.props.Flower.flower.title}
                price={this.props.Flower.flower.price}
                setoldprice={this.props.setOldPrice}
                real_old_price={this.props.Flower.flower.real_old_price}
                old_price={this.props.Flower.flower.old_price}
                description={this.props.Flower.flower.description}/>
            </Col>
          </Row>
        </Container>

        {/*<FlowerWarr />*/}

        <div className={'collections-container'}>
          <CollectionsComponent
            carts={this.props.Cart.carts}
            addcart={this._add_cart}
            rmcart={this._rm_cart}
            favourites={this.props.Favourites.favourites.map((f) => f.id)} fvrm={this._remove_favourites} fvaddid={this._add_favourite}  {...this.props.Flower.flower.collection}/>
        </div>
      </div>
    );
  }
}

class Flower extends React.Component{
  constructor(props){
    super(props);

    this.init = this.init.bind(this);
    this._order = this._order.bind(this);
  }

  _order(){
    this.props.setOrder(this.props.Flower.flower);
  }

  componentDidMount(){
    this.init(this.props);
  }

  componentDidUpdate(props){
    this.init(props);
  }

  componentWillUnmount(){
    this.props.unset();
  }

  init(props){
    if (this.props.Navigation.currentPage !== getPageSlag(this.props.match.path)) {
      this.props.setPage(getPageSlag(this.props.match.path));
    }
    if(checkPromise(this.props.Flower, ['flower']) === false){
      this.props.initFlower();
    }

    if(this.props.Flower.flower == null){
      this.props.setFlower(parseInt(this.props.match.params.flower_id.substring(this.props.match.params.flower_id.lastIndexOf('_') + 1)));
    }else{
      if (this.props.Flower.flower.id != parseInt(this.props.match.params.flower_id.substring(this.props.match.params.flower_id.lastIndexOf('_') + 1))) {
        this.props.unset();
        this.props.setFlower(parseInt(this.props.match.params.flower_id.substring(this.props.match.params.flower_id.lastIndexOf('_') + 1)));
      }
    }

    if (this.props.match.url !== this.props.Navigation.path) {
      this.props.setPath(this.props.match.url);
    }
  }

  render(){
    if(checkPromise(this.props.Flower)){
      return <Element
        order={this._order}
        {...this.props} />;
    }else{
      return <Loading/>;
    }
  }
}

const states = (state) => {
  return {
    Flower: state.FlowerReducer,
    Navigation: state.NavigationReducer,
    Order: state.OrderReducer,
    Favourites: state.FavouritesReducer,
    Cart: state.CartReducer
  };
};
const actions = (dispatch) => {
  return {
    setPage: (slag) => {
      dispatch(SET_NAVIGATION_CURRENT_PAGE(slag));
    },
    unset: () => {
      dispatch(UNSET_FLOWER_FLOWER());
    },
    setPath: (path) => {
      dispatch(SET_NAVIGATION_PATH(path));
    },
    initFlower: ()=> {
      dispatch(INIT_FLOWER());
    },
    setFlower: (id) => {
      dispatch(SET_FLOWER_FLOWER(id));
    },
    setOrder: (order) => {
      dispatch(SET_ORDER(order));
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
    },
    setFlowerSize: (size) => {
      dispatch(SET_FLOWER_SIZE(size));
    },
    setFlowerCount: (count) => {
      dispatch(SET_FLOWER_COUNT(count));
    },
    setFlowerPrice: (price) => {
      dispatch(SET_FLOWER_PRICE(price));
    },
    setOldPrice: (price) => {
      dispatch(SET_FLOWER_OLD_PRICE(price));
    }
  };
};


export default connect(states, actions)(Flower);