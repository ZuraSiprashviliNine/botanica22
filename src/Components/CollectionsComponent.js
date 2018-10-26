
import React from 'react';

import Swiper from 'react-id-swiper';

import {SliderButton} from "./SliderButton";
import FontAwesome from 'react-fontawesome';

import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';

import Translate from '../Containers/Translate';

import {Link} from 'react-router-dom';
import {Loading} from "./Loading";


export class AnimatedAndMetas extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      question: false,
      fvadded: this.props.favourites.includes(this.props.id),
      carted: this.props.carts.includes(this.props.id)
    };

    this._handleQuestion = this._handleQuestion.bind(this);

    this._handleFavourite = this._handleFavourite.bind(this);
    this._handleCart = this._handleCart.bind(this);
  }

  _handleQuestion(){
    this.setState({
      question: !this.state.question
    });
  }

  _handleFavourite(){
    this.setState({
      fvadded: this.state.fvadded === true ? this.props.fvrm(this.props.id) : this.props.fvaddid(this.props.id)
    });
  }

  _handleCart(){
    this.setState({
      carted: this.state.carted === true ? this.props.rmcart(this.props.id) : this.props.addcart(this.props.id)
    });
  }

  render(){
    return [
      <div
        key={'animateeds'}
        className={`question animated ${this.state.question === true ? 'open': 'closed'}`}>
        <Button
          onClick={this._handleQuestion}
          className={'bg-transparent closeBtn animated'}>
          <div
            className={'h1 m-0'}>
            <FontAwesome
              className={'text-grass'}
              name={'times'}/>
          </div>
        </Button>
        <div
          className={'cover p-2'}>
            {this.props.description ? (
              <div className={'border small text p-2'}>
                <Translate>
                  {this.props.description}
                </Translate>
              </div>
            ): null}
          <div className={'mt-3 d-flex flex-row readMoreDiv align-items-center justify-content-end'}>
            <Link
              to={this.props.slag}
              className={'btn d-flex flex-row align-items-center btn-__grass animated readMoreBtn'}>
              <span className={'text-light text-capitalize mr-2'}>
                  <Translate>
                    read more
                  </Translate>
                </span>
              <h2
                className={'m-0'}>
                <FontAwesome
                  name={'angle-right'}/>
              </h2>
            </Link>
          </div>
        </div>
      </div>,
      <div
        key={'metas'}
        className={'metas'}>
        <Container>
          <Row>
            <Col
              sm={6}
              className={'p-1 item'}>
              <Button
                onClick={this._handleFavourite}
                color={'grass'}
                className={`btn-block animated shadow itemb ${this.state.fvadded === true ? 'active': ''}` }>
                <FontAwesome
                  className={'text-white'}
                  name={this.state.fvadded === true ? 'star' : 'star-o'}/>
              </Button>
            </Col>
            <Col
              sm={6}
              className={'p-1 item'}>
              <Button
                onClick={this._handleCart}
                color={'info'}
                className={`btn-block animated shadow itemb ${this.state.carted === true ? 'active': ''}`}>
                <FontAwesome
                  name={this.state.carted === true ? 'shopping-cart' : 'cart-plus'}/>
              </Button>
            </Col>
            <Col
              sm={{
                size: 6,
                offset: 6
              }}
              className={'p-1 item'}>
              <Button
                onClick={this._handleQuestion}
                color={'__grass'}
                className={'btn-block animated shadow itemb'}>
                <FontAwesome
                  name={'question'}/>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    ]
  }
}

export class CollectionItemImage extends React.Component{
  constructor(props){
    super(props);
  }

  // render(){
  //   return (
  //     <Link
  //       className="d-block image"
  //       style={{backgroundImage: `url(${this.props.image})`}}
  //       to={this.props.link || '/'}>
  //         <img
  //           src={'/assets/ideal.jpg'}
  //           alt={'image'}
  //           className={'w-100'}
  //           style={{visibility: 'hidden'}}/>
  //     </Link>
  //   )
  // }
  
  render(){
    return (
      <div
        className={'image'}
        style={{backgroundImage: `url(${this.props.image})`}}>
        <img
          src={'/assets/ideal.jpg'}
          alt={'image'}
          className={'w-100'}
          style={{visibility: 'hidden'}}/>
      </div>
    )
  }
}

export class CollectionItemImages extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      params: {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        renderPrevButton: () => <SliderButton to={'left'}/>,
        renderNextButton: () => <SliderButton to={'right'}/>
      }
    };

    this.getSlides = this.getSlides.bind(this);
  }

  getSlides(){
    return this.props.images.map((image) => {
      return (
        <div key={image + 'x'}>
          <CollectionItemImage image={image}/>
        </div>
      );
    })
  }

  // render(){
  //   return (
  //     <Link
  //       to={this.props.link || '/'}>
  //       <Swiper
  //         {...this.state.params}>
  //         <div
  //           className={'image'}
  //           style={{backgroundImage: `url(${this.props.image})`}}>
  //           <img
  //             src={'/assets/ideal.jpg'}
  //             alt={'image'}
  //             className={'w-100'}
  //             style={{visibility: 'hidden'}}/>
  //         </div>
  //         {this.getSlides()}
  //       </Swiper>  
  //     </Link>
  //   )
  // }

  render(){
    return (
      <Swiper
        {...this.state.params}>
        <div
          className={'image'}
          style={{backgroundImage: `url(${this.props.image})`}}>
          <img
            src={'/assets/ideal.jpg'}
            alt={'image'}
            className={'w-100'}
            style={{visibility: 'hidden'}}/>
        </div>
        {this.getSlides()}
      </Swiper>
    )
  }
}

export class CollectionItem extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className={'h-100 collection shadow'}>
        <AnimatedAndMetas
          addcart={this.props.addcart}
          rmcart={this.props.rmcart}
          carts={this.props.carts}
          id={this.props.id}
          favourites={this.props.favourites}
          fvrm={this.props.fvrm}
          fvaddid={this.props.fvaddid}
          slag={`/flowers/items/item_${this.props.id}`}
          description={this.props.description}/>
          <Link
            to={`/flowers/items/item_${this.props.id}`}>
            <CollectionItemImage image={this.props.image}/>
          </Link>
        <div className={'bg-white'}>
          <Container>
            <Row className={'align-items-center'}>
              <Col
                xs={4}
                className={'pr-0 price'}>
                <div className={'bg-grass py-2 lie'}></div>
                <div className={'bg-grass text-center text-white font-weight-bold pt-3 pb-4'}>
                  <i>

                      <img src="/assets/lari_white.png" alt="lari" style={{width: '20px',height:'20px'}}/>
                    { (parseFloat(this.props.price) < 11 ?  parseFloat(this.props.price) + 9 * parseFloat(this.props.count_price)  : parseFloat(this.props.real_price)).toPrecision(4)}
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
                      language={'en'}
                      divider={' - '}>
                      {this.props.title}
                    </Translate>
                  </Link>
                </h5>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

class Collections extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      params: {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        renderPrevButton: () => <SliderButton to={'left'}/>,
        renderNextButton: () => <SliderButton to={'right'}/>,
        breakpoints: {
          992: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 1,
          }
        }
      }
    };

    this.getItems = this.getItems.bind(this);
  }

  getItems(){
    return this.props.data.map((item) => {
      return (
        <div key={item.id}>
          <CollectionItem
            favourites={this.props.favourites}
            addcart={this.props.addcart}
            rmcart={this.props.rmcart}
            carts={this.props.carts}
            fvrm={this.props.fvrm}
            fvaddid={this.props.fvaddid} {...item}/>
        </div>
      );
    })
  }

  render(){
    return (
      <div className={'py-md-5 collections'}>
        <Container>
          <Row>
            <Col
              xs={12}
              className={'d-flex flex-sm-row flex-column align-items-center justify-content-center justify-content-sm-between'}>
              <div className={'title'}>
                <h1 className={'font-weight-light text-capitalize m-0'}>
                  <Translate>
                    {this.props.title}
                  </Translate>
                </h1>
              </div>
              <div className={'collection-button'}>
                <Link to={this.props.slag} className={'btn btn-outline-_grass text-capitalize'}>
                  <Translate>
                    show all
                  </Translate>
                </Link>
              </div>
            </Col>
            <Col
              xs={12}
              className={'py-3 coll-row'}>
              <Container>
                <Row>
                  <Col
                    xs={12}>
                    <Swiper {...this.state.params}>
                      {this.getItems()}
                    </Swiper>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


export class CollectionsComponent extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    if(this.props.items){
      return this.props.items.map((item, index) => {
        return <Collections
          favourites={this.props.favourites}
          addcart={this.props.addcart}
          rmcart={this.props.rmcart}
          carts={this.props.carts}
          fvrm={this.props.fvrm}
          fvaddid={this.props.fvaddid}
          key={index} {...item}/>;
      });
    }else{
      return <Loading/>;
    }
  }
}