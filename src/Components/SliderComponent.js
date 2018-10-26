
import React from 'react';

import {
  Container,
  Row,
  Col
} from 'reactstrap';

import FontAwesome from 'react-fontawesome';

import Swiper from 'react-id-swiper';

import Translate from '../Containers/Translate';

import {SliderButton} from "./SliderButton";

import {Link} from 'react-router-dom';

class SliderSlide extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Container
        className={'h-100'}>
        <Row className={'h-100'}>
          <Col
            className={'data d-flex flex-column justify-content-around animated fadeInRight py-5'}
            lg={{
              size: 6,
              offset: 6
            }}>
            <div className={'py-5'}>
              <div className={'text-light text-capitalize'}>
                <h1 className={'m-0'}>
                  <Translate>
                    {this.props.title}
                  </Translate>
                </h1>
              </div>
              <div className={'py-3 small text-light pr-lg-5 mr-lg-5'}>
                <Translate>
                  {this.props.description}
                </Translate>
              </div>
              <div
                className={'my-3 d-none'}>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                        <Link
                            to={this.props.route}
                            className="btn-block btn btn-grass text-capitalize text-white">
                          <Translate>
                            read more
                          </Translate>
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/*<div className={'rects d-flex flex-row align-items-center-justify-content-start'}>*/}
                {/*<a href="#" className={'m-1 rect text-muted bg-light rounded-no'}>*/}
                  {/*<FontAwesome*/}
                    {/*name={'eye'}/>*/}
                {/*</a>*/}
                {/*<a href="#" className={'m-1 rect text-muted bg-light rounded-no'}>*/}
                  {/*<FontAwesome*/}
                    {/*name={'facebook'}/>*/}
                {/*</a>*/}
                {/*<a href="#" className={'m-1 rect text-muted bg-light rounded-no'}>*/}
                  {/*<FontAwesome*/}
                    {/*name={'instagram'}/>*/}
                {/*</a>*/}
                {/*<a href="#" className={'m-1 rect text-muted bg-light rounded-no'}>*/}
                  {/*<FontAwesome*/}
                    {/*name={'twitter'}/>*/}
                {/*</a>*/}
              {/*</div>*/}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default class Slider extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      swiper: null,
      activeIndex: 0,
      params: {
        spaceBetween: 0,
        slidesPerView: 'auto',
        shortSwipes: false,
        slideToClickedSlide: true,
        preventClicksPropagation: false,
        preventClicks: false,
        initialSlide: 0,
        touchRatio: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // renderPrevButton: () => <SliderButton onClick={this.updated} to={'left'}/>,
        // renderNextButton: () => <SliderButton onClick={this.updated} to={'right'}/>
      }
    };

    this.getSliderSlides = this.getSliderSlides.bind(this);

    this.getThumbs = this.getThumbs.bind(this);

    this.changeSliderTo = this.changeSliderTo.bind(this);

    this.updated = this.updated.bind(this);

  }

  componentDidMount(){
    this.setState({activeIndex: 0});
  }

  updated(){
    console.log(this.state.activeIndex,this.state.swiper.swiper.activeIndex);
    this.setState({activeIndex: this.state.swiper.swiper.activeIndex - 3});
  }

  getSliderSlides() {
    if(this.props.slides){
      return this.props.slides.map((slide) => {
        return (
          <div
            key={slide.id}
            style={{backgroundImage: `url(${slide.image})`}}
            className={'h-100'}>
            <SliderSlide {...slide}/>
          </div>
        );
      });
    }
  }

  changeSliderTo(index){
    this.state.swiper.swiper.slideTo(index);
    this.setState({activeIndex: index});
  }

  getThumbs(){
    if(this.props.slides && this.state.swiper){
      return this.props.slides.map((slide, index) => {
        return (
          <Col
            key={index}
            md={6}
            lg={3}
            onClick={() => {this.changeSliderTo(index)}}
            className={`p-2 text-center ${this.state.activeIndex == index ? 'active' : ''}`}>
            <div className={'rounded py-1'}></div>
            <div className={'py-2 px-xl-4 text-white px-lg-3 text-capitalize'}>
              <h5 className={'font-weight-light m-0'}>
                <Translate>
                  {slide.title}
                </Translate>
              </h5>
            </div>
            {/*<div className={'text-light text-capitalize'}>*/}
                {/*
                  parseFloat(slide.price) == 0 ? (
                      ' '
                  ):(
                      <small>
                          <Translate divider={this.props.divider}>
                              {'now from'}
                          </Translate>{' '}
                          <img src="/assets/lari_white.png" alt="lari" style={{width: '20px',height:'20px'}}/>{slide.price}
                      </small>
                  )
                */}
            {/*</div>*/}
          </Col>
        );
      });
    }
  }

  render(){
    return [
      <Swiper
        key={'slides'}
        className={'slider-main'}
        ref={(element) => {
          if (this.state.swiper === null) {
            this.setState({swiper: element, activeIndex: element.swiper.activeIndex})
          }
        }}
        {...this.state.params}>
        {this.getSliderSlides()}
      </Swiper>,
      <div key={'thumbs'} className={'bg-grass text-light thumbKinds'}>
        <Container>
          <Row className={'thumbsRow'}>
            {this.getThumbs()}
          </Row>
        </Container>
      </div>
    ];
  }
}