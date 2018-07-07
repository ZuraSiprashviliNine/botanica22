
import React from 'react';

import Swiper from 'react-id-swiper';
import {
  Row,
  Container,
  Col
} from 'reactstrap';

import {SliderButton} from "./SliderButton";

import {Link} from 'react-router-dom';
import Translate from '../Containers/Translate';

export class Sales extends React.Component{
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

    this.getSales = this.getSales.bind(this);
  }

  getSales(){
    return this.props.items.map((item) => {
      return (
        <div
          data-aos={'fade-in'}
          key={item.id}
          className={'h-100 item text-center'}
             style={{
               backgroundImage: `url(${item.image})`
             }}>
          <div className={'cover p-md-5 px-3 py-5'}>
            <div className={'text my-5 text-uppercase text-white"'}>
              <Link
                className={'text-light'}
                to={'/flowers/items/item_' + item.id}>
                <h1 className={'m-0 font-weight-light'}>
                  <Translate>
                    sale
                  </Translate>
                </h1>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  render(){
    return (
      <div className={'bg-_grass text-light offers py-md-5'}>
        <Container>
          <Row>
            <Col
              xs={12}
              className="p-1">
              <Swiper {...this.state.params}>
                {this.getSales()}
              </Swiper>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}