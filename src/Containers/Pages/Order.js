
import React from 'react';

import {connect} from 'react-redux';
import {Loading} from "../../Components/Loading";
import {SET_NAVIGATION_CURRENT_PAGE, SET_NAVIGATION_PATH} from "../../Actions/NavigationActions";
import {getPageSlag} from "../../Helpers/Routing";
import {checkPromise} from "../../Helpers/Valid";
import {
    INIT_ORDER,
    SET_ORDER_COUNT, SET_ORDER_FLOWER_OLD_PRICE,
    SET_ORDER_FLOWER_PRICE,
    SET_ORDER_SIZE,
    UNSET_ORDER
} from "../../Actions/OrderActions";

import Translate from '../Translate';

import FontAwesome from 'react-fontawesome';

import{
    Link
} from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Button
} from 'reactstrap';
import {FlowerInfo} from "./Flower";

import Axios from 'axios';

class OrderProduct extends React.Component{
    constructor(props) {
        super(props);


        this._onChangeNames = this._onChangeNames.bind(this);

        this._order = this._order.bind(this);

        this.state = {
            pending: false,
            dateIsOkay: true
        };

        this.checkFunc = (date, time) => {
            // if (date == "" || time == "")
            //     return false;

            // let year = parseInt(date.substring(0, 4));
            // let month = parseInt(date.substring(5, 7));
            // let day = parseInt(date.substring(8, 10));

            // let h = parseInt(time.substring(0, 2));
            // let m = parseInt(time.substring(3, 5));

            // let ctime = new Date();

            // // calculate time 5 h earlyer. mindfuck
            // let hh = h;
            // h -= 5;
            // if (h < 0) {
            //     h = 24 + h;
            //     day--;
            //     if (day < 0) {
            //         month--;
            //         if (month < 0) {
            //             month = 11;
            //             year--;
            //         }
            //         day = new Date(year, month, 0).getDate();
            //     }
            // }

            // if (year < ctime.getFullYear()) {
            //     return false;
            // }

            // if (month < ctime.getMonth() + 1 && year == ctime.getFullYear())
            //     return false;

            // if (day < ctime.getDate() && month == ctime.getMonth() + 1 && year == ctime.getFullYear())
            //     return false;

            // if (h < ctime.getHours() && day == ctime.getDate() && month == ctime.getMonth() + 1 && year == ctime.getFullYear())
            //     return false;

            // if (m < ctime.getMinutes() && h == ctime.getHours() && day == ctime.getDate() && month == ctime.getMonth() + 1 && year == ctime.getFullYear())
            //     return false;

            // if ((hh < 10 && hh > 0) || (hh == 0 && m > 0))
            //     return false;
            // return true;


            // let nDate = new Date();
            // nDate.setDate(date.getDate());
            // nDate.setFullYear(date.getFullYear());
            // nDate.setMonth(date.getMonth());

            // console.log(nDate, date);

            let _d = new Date(date +' ' + time);

            let __d = new Date(this.getDateMin() + ' ' + this.getTimeMin());

            if(__d.getTime() > _d.getTime()){
                return false;
            }else{
                return true;
            }
        };


        this.getDateMin = this.getDateMin.bind(this);
        this.getTimeMin = this.getTimeMin.bind(this);

        this.pend = this.pend.bind(this);
        this.unpend = this.unpend.bind(this);
        this._onDateChange = this._onDateChange.bind(this);
        this._onTimeChange = this._onTimeChange.bind(this);
        this.checkTimes = this.checkTimes.bind(this);
    }

    getDateMin(){
        let x;
        let _dd = ((gmt = 4) => {
            let d = new Date();
        
            let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
            
            let nd = new Date(utc + (3600000 * gmt));
            
            return nd;
        })();
        if(_dd.getHours() < 10 && _dd.getHours() > 0){
            let d = _dd;
            d.setDate(d.getDate() + 1);
            x=  d.getFullYear() + '-' + (() => {
                if(d.getMonth().toString().length === 1){
                    return '0' + (d.getMonth() + 1);
                }else{
                    return d.getMonth() + 1;
                }
            })() + '-' + (() => {
                if(d.getDate().toString().length === 1){
                    return '0' + (d.getDate());
                }else{
                    return d.getDate();
                }
            })();
        }else{
            let d = _dd;
            d.setDate(d.getDate());
            x= d.getFullYear() + '-' + (() => {
                if(d.getMonth().toString().length === 1){
                    return '0' + (d.getMonth() + 1);
                }else{
                    return d.getMonth() + 1;
                }
            })() + '-' + (() => {
                if(d.getDate().toString().length === 1){
                    return '0' + (d.getDate());
                }else{
                    return d.getDate();
                }
            })();
        }
        return x;
    }

    getTimeMin(){
        let _dd = ((gmt = 4) => {
            let d = new Date();
        
            let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
            
            let nd = new Date(utc + (3600000 * gmt));
            
            return nd;
        })();
        let d = _dd;
        let x;
        if(d.getHours() > 0 && d.getHours() < 10){
            x = {
                h: 10,
                m: '00'
            };
        }else{
            d.setHours(d.getHours() + 2);
            x = {
                h: d.getHours().toString().length === 1 ? '0' + d.getHours() : d.getHours(),
                m: (d.getMinutes() + 5).toString().length === 1 ? '0' + (d.getMinutes() + 5) : (d.getMinutes() + 5)
            };
        }

        return x.h + ':' + x.m;
    }

    _onDateChange(){
        this.checkTimes();
    }

    _onTimeChange(){
        this.checkTimes();
    }

    checkTimes(event){
        if(event){
            event.preventDefault();
        }
        if(this.checkFunc(this.delivery_date.value, this.delivery_time.value)){
            this.setState({
                ...this.state,
                dateIsOkay: true
            });
        }else{
            this.setState({
                ...this.state,
                dateIsOkay: false
            });
        }

    }

    pend(){
        this.setState({pending: true});
    }

    unpend(){
        this.setState({pending: false});
    }

    _onChangeNames(event) {
        if (event.target.value) {
            if (event.target.value.search(/^[a-zA-Z]*$/gi)) {
                event.target.value = event.target.value.replace(/[0-9]/gi, '');
            }
        }
    }

    _onChangePhone(event){
        if(event.target.value){
            if(event.target.value.search(/^[0-9]*$/gi)){
                event.target.value = event.target.value.replace(/[a-zA-Z]/gi, '');
            }
        }
    }

    _order(event){
        event.preventDefault();

        let something = false;
        let errors = [];
        this.o_firstName.classList.remove('broken');
        this.o_lastName.classList.remove('broken');
        this.o_email.classList.remove('broken');
        this.o_phone_one.classList.remove('broken');
        this.a_firstName.classList.remove('broken');
        this.delivery_address.classList.remove('broken');
        if(this.o_firstName.value.length ===0){
            errors.push('o_firstName');
        }
        if(this.o_lastName.value.length === 0){
            errors.push('o_lastName');
        }
        if(this.o_email.value.length === 0){
            errors.push('o_email');
        }
        if(this.o_phone_one.value.length === 0){
            errors.push('o_phone_one');
        }

        if(this.delivery_address.value.length === 0){
            errors.push('delivery_address');
        }

        if(errors.length === 0){
            something = true;
        }

        if(something){

            if(this.state.dateIsOkay){
                console.log({
                    orderIt: true,
                        o_firstName: this.o_firstName.value,
                        o_lastName: this.o_lastName.value,
                        o_email: this.o_email.value.length === 0 ? 'zura.siprashvili.four@gmail.com' : this.o_email.value,
                        o_phone_one: this.o_phone_one.value.length === 0 ? '' : '+995' + this.o_phone_one.value,
                        o_phone_two: this.o_phone_two.value,
                        message: this.message.value,
                        price: this.props.price,
                        a_firstName: this.a_firstName.value,
                        a_lastName: this.a_lastName.value,
                        a_phone: this.a_phone.value.length === 0 ? '' : '+995' + this.a_phone.value,
                        d_date: this.delivery_date.value,
                        d_time: this.delivery_time.value,
                        d_city: this.delivery_city.value,
                        d_anony: this.delivery_anony.value,
                        d_addr: this.delivery_address.value,
                        d_info: this.additional_info.value,
                        product_id: this.props.id,
                        count: parseInt(this.props.count) || -1
                })
                this.pend();
                Axios.get('https://botanica22.ge/data/pay.php', {
                    params: {
                        orderIt: true,
                        o_firstName: this.o_firstName.value,
                        o_lastName: this.o_lastName.value,
                        o_email: this.o_email.value.length === 0 ? 'zura.siprashvili.four@gmail.com' : this.o_email.value,
                        o_phone_one: this.o_phone_one.value.length === 0 ? '' : '+995' + this.o_phone_one.value,
                        o_phone_two: this.o_phone_two.value,
                        message: this.message.value,
                        price: this.props.price,
                        a_firstName: this.a_firstName.value,
                        a_lastName: this.a_lastName.value,
                        a_phone: this.a_phone.value.length === 0 ? '' : '+995' + this.a_phone.value,
                        d_date: this.delivery_date.value,
                        d_time: this.delivery_time.value,
                        d_city: this.delivery_city.value,
                        d_anony: this.delivery_anony.value,
                        d_addr: this.delivery_address.value,
                        d_info: this.additional_info.value,
                        product_id: this.props.id,
                        count: parseInt(this.props.count) || -1
                    }
                })
                    .then((response) => {
                        if(response.data.id !== undefined && response.data.action !== undefined){
                            let form = document.createElement('form');
                            form.setAttribute('method', 'post');
                            form.setAttribute('action', response.data.action);

                            let hiddenField = document.createElement('input');
                            hiddenField.setAttribute('name', 'trans_id');
                            hiddenField.setAttribute('type', 'hidden');
                            hiddenField.setAttribute('value', response.data.id);
                            form.appendChild(hiddenField);
                            document.body.appendChild(form);
                            form.submit();

                        }
                        this.unpend();
                    })
                    .catch((error) => {
                        console.log(error);
                        alert('Sorry but there was an error try again :)');
                        this.unpend();
                    });
            }else{
                this.delivery_time.classList.add('broken');
                this.props.up();
            }
        }else{
            errors.map(error => {
                this[error].classList.add('broken');
                this.props.up();
            });
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.delivery_date.value = this.getDateMin();
            this.delivery_time.value = this.getTimeMin();
        }, 300);
    }
    
    render(){
        return (
            <Container>
                <Row>
                    <Col
                        xs={12}
                        className={`p-1 ${this.state.pending ? 'pending' : ''}`}>
                        <form
                            onSubmit={this._order}
                            className={'h-100 bg-white shadow p-2'}>
                            <Container>
                                <Row
                                    className={'py-3'}>
                                    <Col
                                        className={'p-1'}
                                        md={6}>
                                        <div className="p-2 text-capitalize font-weight-light">
                                            <h3
                                                className={'font-weight-light m-0'}>
                                                <Translate>
                                                    orderer
                                                </Translate>
                                            </h3>
                                        </div>
                                        <div
                                            className={'p-2'}>
                                            <div className="py-1">
                                                <Container>
                                                    <Row>
                                                        <Col
                                                            className={'p-1'}
                                                            lg={6}>
                                                            <div
                                                                className={'py-1 text-capitalize'}>
                                                                <h5
                                                                    className={'font-weight-light m-0'}>
                                                                    <Translate>
                                                                        first name
                                                                    </Translate>
                                                                </h5>
                                                            </div>
                                                            <div
                                                                className={'p-1'}>
                                                                <input
                                                                    ref={(element) => {this.o_firstName = element}}
                                                                    readOnly={this.state.pending}
                                                                    onChange={this._onChangeNames}
                                                                    
                                                                    type="text"
                                                                    className={'form-control rounded-no bg-white px-2 py-1 text-muted'}
                                                                    name={'orderer_firstName'}
                                                                    />
                                                            </div>
                                                        </Col>
                                                        <Col
                                                            className={'p-1'}
                                                            md={6}>
                                                            <div
                                                                className={'py-1 text-capitalize'}>
                                                                <h5
                                                                    className={'font-weight-light m-0'}>
                                                                    <Translate>
                                                                        last name
                                                                    </Translate>
                                                                </h5>
                                                            </div>
                                                            <div
                                                                className={'p-1'}>
                                                                <input
                                                                    ref={(element) => {this.o_lastName = element}}
                                                                    onChange={this._onChangeNames}
                                                                    readOnly={this.state.pending}
                                                                    type="text"
                                                                    name={'orderer_lastName'}
                                                                    
                                                                    className={'form-control rounded-no bg-white px-2 py-1 text-muted'}
                                                                    />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col
                                                            className={'p-1'}
                                                            lg={6}>
                                                            <div
                                                                className={'py-1 text-capitalize'}>
                                                                <h5
                                                                    className={'font-weight-light m-0'}>
                                                                    <Translate>
                                                                        phone number
                                                                    </Translate>
                                                                </h5>
                                                            </div>
                                                            <div
                                                                className={'p-1 d-flex flex-row'}>
                                                                <input
                                                                    style={{width: '60px', height: '100%', borderRight:'0'}}
                                                                    type="text"
                                                                    className="form-control rounded-no bg-white px-2 py-2 text-muted"
                                                                    readOnly="true"
                                                                    value="+995"/>
                                                                <input
                                                                    type="text"
                                                                    readOnly={this.state.pending}
                                                                    ref={(element) => {this.o_phone_one = element}}
                                                                    onChange={this._onChangePhone}
                                                                    name={'orderer_phoneOne'}
                                                                    className={'form-control rounded-no bg-white px-2 py-1 text-muted'}
                                                                    />
                                                            </div>
                                                            <input
                                                                    ref={(element) => {this.o_phone_two = element}}
                                                                    onChange={this._onChangePhone}
                                                                    readOnly={this.state.pending}
                                                                    type="hidden"
                                                                    name={'orderer_phoneTwo'}
                                                                    className={'form-control rounded-no bg-white px-2 py-1 text-muted'}
                                                                    />

                                                        </Col>
                                                        {/* <Col
                                                            className={'p-1'}
                                                            md={6}>
                                                            <div
                                                                className={'py-1 text-capitalize'}>
                                                                <h5
                                                                    className={'font-weight-light m-0'}>
                                                                    <Translate>
                                                                        phone number
                                                                    </Translate> 2
                                                                </h5>
                                                            </div>
                                                            <div
                                                                className={'p-1'}>
                                                                <input
                                                                    ref={(element) => {this.o_phone_two = element}}
                                                                    onChange={this._onChangePhone}
                                                                    readOnly={this.state.pending}
                                                                    type="text"
                                                                    name={'orderer_phoneTwo'}
                                                                    className={'form-control rounded-no bg-white px-2 py-1 text-muted'}
                                                                    />
                                                            </div>
                                                        </Col> */}
                                                        
                                                    </Row>
                                                    <Row>
                                                        <Col
                                                            className={'p-1'}
                                                            xs={12}>
                                                            <div
                                                                className={'py-1 text-capitalize'}>
                                                                <h5
                                                                    className={'font-weight-light m-0'}>
                                                                    <Translate>
                                                                        email
                                                                    </Translate>
                                                                </h5>
                                                            </div>
                                                            <div
                                                                className={'p-1'}>
                                                                <input
                                                                    ref={(element) => {this.o_email = element}}
                                                                    onChange={this._onChangeEmail}
                                                                    readOnly={this.state.pending}
                                                                    type="email"
                                                                    name={'orderer_email'}
                                                                    className={'form-control rounded-no bg-white px-2 py-1 text-muted'}
                                                                    />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col
                                                            className={'p-1'}
                                                            xs={12}>
                                                            <div
                                                                className={'py-1 text-capitalize'}>
                                                                <h5
                                                                    className={'font-weight-light m-0'}>
                                                                    <Translate>
                                                                        message
                                                                    </Translate>
                                                                </h5>
                                                                <div className={'text-muted p-1 small'}>
                                                                    <Translate>
                                                                        *please, fill in this gap carefully, since the text written by you will be copied on the card without editing.
                                                                    </Translate>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={'p-1'}>
                                <textarea
                                    name={'orderer_message'}
                                    readOnly={this.state.pending}
                                    ref={(element) => {this.message = element}}
                                    className={'form-control rounded-no bg-white px-2 py-1 text-muted'}/>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col
                                                            xs={12}>
                                                            <FlowerInfo
                                                                size={this.props.size}
                                                                count_price={this.props.count_price}
                                                                real_price={this.props.real_price}
                                                                size_price={this.props.size_price}
                                                                size__price={this.props.size__price}
                                                                setprice={this.props.setPrice}
                                                                setcount={this.props.setcount}
                                                                setsize={this.props.setsize}
                                                                id={this.props.id}
                                                                hasCount={this.props.hasCount}
                                                                count={this.props.count}
                                                                exporter={true}
                                                                order={() => {}}
                                                                cartadd={()=>{}}
                                                                rmcart={()=>{ }}
                                                                carts={this.props.carts}
                                                                title={this.props.title}
                                                                price={this.props.price}
                                                                real_old_price={this.props.real_old_price}
                                                                setoldprice={this.props.setOldPrice}
                                                                old_price={this.props.old_price}
                                                                description={this.props.description}/>
                                                        </Col>
                                                        <input
                                                                    ref={(element) => {this.that = element}}
                                                                    className={''}
                                                                    name={'orderer_trust'}
                                                                    type={'hidden'}
                                                                    defaultChecked={true}
                                                                    readOnly={this.state.pending}
                                                                    
                                                                    value={''}/>
                                                    </Row>
                                                    <Row className="d-none">
                                                        <Col
                                                            xs={12}>
                                                            <div className={'px-3 py-2'}>
                                                                
                                                                <label
                                                                    className={'ml-2 form-check-label  small text-muted'}>
                                                                    <Translate>
                                                                        yes that's the flower i want
                                                                    </Translate>
                                                                </label>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col
                                        className={'p-1'}
                                        md={6}>
                                        <Container>
                                            <Row>
                                                <Col
                                                    xs={12}>
                                                    <div className="p-2 text-capitalize font-weight-light">
                                                        <h3
                                                            className={'font-weight-light m-0'}>
                                                            <Translate>
                                                                addresser
                                                            </Translate>
                                                        </h3>
                                                    </div>
                                                    <div
                                                        className={'p-2'}>
                                                        <div className="py-1">
                                                            <Container>
                                                                <Row>
                                                                    <Col
                                                                        className={'p-1'}
                                                                        lg={6}>
                                                                        <div
                                                                            className={'py-1 text-capitalize'}>
                                                                            <h5
                                                                                className={'font-weight-light m-0'}>
                                                                                <Translate>
                                                                                    first name
                                                                                </Translate>
                                                                            </h5>
                                                                        </div>
                                                                        <div
                                                                            className={'p-1'}>
                                                                            <input
                                                                                type="text"
                                                                                name={'addresser_firstName'}
                                                                                readOnly={this.state.pending}
                                                                                ref={(element) => {this.a_firstName = element}}
                                                                                onChange={this._onChangeNames}
                                                                                className={'form-control rounded-no bg-white px-2 py-1 text-muted'}
                                                                                />
                                                                        </div>
                                                                    </Col>
                                                                    <Col
                                                                        className={'p-1'}
                                                                        md={6}>
                                                                        <div
                                                                            className={'py-1 text-capitalize'}>
                                                                            <h5
                                                                                className={'font-weight-light m-0'}>
                                                                                <Translate>
                                                                                    last name
                                                                                </Translate>
                                                                            </h5>
                                                                        </div>
                                                                        <div
                                                                            className={'p-1'}>
                                                                            <input
                                                                                type="text"
                                                                                name={'addresser_lastName'}
                                                                                readOnly={this.state.pending}
                                                                                ref={(element) => {this.a_lastName = element}}
                                                                                onChange={this._onChangeNames}
                                                                                className={'form-control rounded-no bg-white px-2 py-1 text-muted'}
                                                                                />
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col
                                                                        className={'p-1'}
                                                                        lg={12}>
                                                                        <div
                                                                            className={'py-1 text-capitalize'}>
                                                                            <h5
                                                                                className={'font-weight-light m-0'}>
                                                                                <Translate>
                                                                                    phone number
                                                                                </Translate>
                                                                            </h5>
                                                                        </div>
                                                                        <div
                                                                            className={'p-1 d-flex flex-row'}>
                                                                            <input
                                                                                style={{width: '60px', height: '100%', borderRight:'0'}}
                                                                                type="text"
                                                                                className="form-control rounded-no bg-white px-2 py-2 text-muted"
                                                                                readOnly="true"
                                                                                value="+995"/>
                                                                            <input
                                                                                type="text"
                                                                                name={'addresser_phone'}
                                                                                ref={(element) => {this.a_phone = element}}
                                                                                onChange={this._onChangePhone}
                                                                                readOnly={this.state.pending}
                                                                                className={'form-control rounded-no bg-white px-2 py-1 text-muted'}
                                                                                />
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col
                                                    xs={12}>
                                                    <div className="p-2 text-capitalize font-weight-light">
                                                        <h3
                                                            className={'font-weight-light m-0'}>
                                                            <Translate>
                                                                delivery
                                                            </Translate>
                                                        </h3>
                                                    </div>
                                                    <div
                                                        className={'p-2'}>
                                                        <div className="py-1">
                                                            <Container>
                                                                <Row>
                                                                    <Col
                                                                        className={'p-1'}
                                                                        lg={6}>
                                                                        <div
                                                                            className={'py-1 text-capitalize'}>
                                                                            <h5
                                                                                className={'font-weight-light m-0'}>
                                                                                <Translate>
                                                                                    date
                                                                                </Translate>
                                                                            </h5>
                                                                        </div>
                                                                        <div
                                                                            className={'p-1'}>
                                                                            <input
                                                                                type="date"
                                                                                name={'delivery_date'}
                                                                                ref={(element) => {this.delivery_date = element}}
                                                                                onChange={this._onDateChange}
                                                                                readOnly={this.state.pending}
                                                                                className={'form-control rounded-no bg-white px-2 py-1 text-muted'}/>
                                                                        </div>
                                                                        <div
                                                                            className={'p-1'}>
                                                                            <div className="text-muted font-italics small">
                                                                                {this.state.dateIsOkay === true ? (
                                                                                    <Translate>
                                                                                        good time to delivery
                                                                                    </Translate>
                                                                                ) : (
                                                                                    <Translate>
                                                                                        we can't deliver at that time
                                                                                    </Translate>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col
                                                                        className={'p-1'}
                                                                        md={6}>
                                                                        <div
                                                                            className={'py-1 text-capitalize'}>
                                                                            <h5
                                                                                className={'font-weight-light m-0'}>
                                                                                <Translate>
                                                                                    time
                                                                                </Translate>
                                                                            </h5>
                                                                        </div>
                                                                        <div
                                                                            className={'p-1'}>
                                                                            <input
                                                                                type="time"
                                                                                name={'delivery_time'}
                                                                                readOnly={this.state.pending}
                                                                                ref={(element) => {this.delivery_time = element}}
                                                                                onChange={this._onTimeChange}
                                                                                className={'form-control rounded-no bg-white px-2 py-1 text-muted'}/>
                                                                        </div>
                                                                        <div
                                                                            className={'p-1'}>
                                                                            <Button
                                                                                type={'reset'}
                                                                                onClick={this.checkTimes}
                                                                                className={'btn-block h-100 text-light text-capitalize font-weight-light shadow btn-grass'}>
                                                                                <Translate>
                                                                                    check availability
                                                                                </Translate>
                                                                            </Button>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col
                                                                        className={'p-1'}
                                                                        lg={6}>
                                                                        <div
                                                                            className={'py-1 text-capitalize'}>
                                                                            <h5
                                                                                className={'font-weight-light m-0'}>
                                                                                <Translate>
                                                                                    city
                                                                                </Translate>
                                                                            </h5>
                                                                        </div>
                                                                        <div
                                                                            className={'p-1'}>
                                                                            <select
                                                                                ref={(element) => {this.delivery_city = element}}
                                                                                name={'delivery_city'}
                                                                                readOnly={this.state.pending}
                                                                                className={'form-control'}>
                                                                                <option value="tbilisi">
                                                                                    <Translate>
                                                                                        tbilisi
                                                                                    </Translate>
                                                                                </option>
                                                                            </select>
                                                                        </div>
                                                                    </Col>

                                                                    <Col
                                                                        className={'p-1'}
                                                                        lg={6}>
                                                                        <div
                                                                            className={'py-1 text-capitalize'}>
                                                                            <h5
                                                                                className={'font-weight-light m-0'}>
                                                                                <Translate>
                                                                                    anony order
                                                                                </Translate>
                                                                            </h5>
                                                                        </div>
                                                                        <div
                                                                            className={'p-1'}>
                                                                            <select
                                                                                ref={(element) => {
                                                                                    this.delivery_anony = element
                                                                                }}
                                                                                name={'anony_order'}
                                                                                readOnly={this.state.pending}
                                                                                className={'form-control'}>
                                                                                <option value="yes">
                                                                                    <Translate>
                                                                                        yes
                                                                                    </Translate>
                                                                                </option>
                                                                                <option value="no">
                                                                                    <Translate>
                                                                                        no
                                                                                    </Translate>
                                                                                </option>
                                                                            </select>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col
                                                                        className={'p-1'}
                                                                        lg={6}>
                                                                        <div
                                                                            className={'py-1 text-capitalize'}>
                                                                            <h5
                                                                                className={'font-weight-light m-0'}>
                                                                                <Translate>
                                                                                    full address
                                                                                </Translate>
                                                                            </h5>
                                                                        </div>
                                                                        <div
                                                                            className={'p-1'}>
                                                                            <input
                                                                                type="text"
                                                                                name={'full_address'}
                                                                                readOnly={this.state.pending}
                                                                                ref={(element) => {this.delivery_address = element}}
                                                                                
                                                                                className={'form-control rounded-no bg-white px-2 py-1 text-muted'}
                                                                                />
                                                                        </div>
                                                                    </Col>
                                                                    <Col
                                                                        className={'p-1'}
                                                                        lg={6}>
                                                                        <div
                                                                            className={'py-1 text-capitalize'}>
                                                                            <h5
                                                                                className={'font-weight-light m-0'}>
                                                                                <Translate>
                                                                                    additional info
                                                                                </Translate>
                                                                            </h5>
                                                                        </div>
                                                                        <div
                                                                            className={'p-1'}>
                                      <textarea
                                          ref={(element) => {
                                              this.additional_info = element
                                          }}
                                          name={'additional_info'}
                                          readOnly={this.state.pending}
                                          className={'form-control rounded-no bg-white px-2 py-1 text-muted'}/>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Col>
                                </Row>
                                <Row className={'pt-md-3 border-top'}>
                                    <Col
                                        className={'p-1'}
                                        md={{
                                            size: 6,
                                            offset: 6
                                        }}>
                                        <Container>
                                            <Row>
                                                <Col
                                                    className={'p-1 h-100'}
                                                    xs={6}>
                                                    <Button
                                                        type={'reset'}
                                                        className={'btn-block h-100 text-light text-capitalize font-weight-light shadow btn-__grass'}>
                                                        <h3>
                                                            <Translate>
                                                                reset
                                                            </Translate>
                                                        </h3>
                                                    </Button>
                                                </Col>
                                                <Col
                                                    className={'p-1 h-100'}
                                                    xs={6}>
                                                    <Button
                                                        type={'submit'}
                                                        name={'order_it'}
                                                        className={'btn-block h-100 text-light text-capitalize font-weight-bold shadow btn-grass'}>
                                                        <h3>
                                                            {
                                                                this.state.pending === true ? (
                                                                    <FontAwesome
                                                                        name={'spinner'}
                                                                        spin={true}/>
                                                                ): <Translate>
                                                                    send
                                                                </Translate>
                                                            }
                                                        </h3>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Col>
                                </Row>
                            </Container>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

class NoProduct extends React.Component{
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
                        <div className={'h-100 bg-white shadow p-2'}>
                            <div
                                className={'text-center'}>
                                <h1
                                    className={'font-weight-light m-0 text-capitalize p-3'}>
                                    <Translate>
                                        you haven't selected the product
                                    </Translate>
                                </h1>
                                <Link
                                    to={'/'}
                                    className={'btn btn-_grass text-light text-capitalize px-3 py-1'}>
                                    <Translate>
                                        return previous page
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
    }


    componentDidMount(){
        document.title = "შეკვეთა - Botanica22 • ყვავილების მაღაზია Botanica22"
    }


    render(){
        return (
            <div
                id={'order_page'}
                className={'page bg-light animated fadeIn py-md-5'}>
                {this.props.Order.product ? (
                    <OrderProduct
                        up={() => {
                            this.props.setPath();
                            setTimeout(() => {
                                this.props.setPath(this.props.match.url);
                            }, 100);
                        }}
                        setsize={this.props.setsize}
                        setcount={this.props.setcount}
                        carts={this.props.Cart.carts}
                        setPrice={this.props.setPrice}
                        setOldPrice={this.props.setOldPrice}
                        {...this.props.Order.product}/>
                ): <NoProduct />}
            </div>
        )
    }
}

class Order extends React.Component{
    constructor(props){
        super(props);

        this.init = this.init.bind(this);
    }

    componentDidMount(){
        this.init(this.props);
    }

    componentWillUnmount(){
        this.props.unsetOrder();
    }

    init(props){
        if (this.props.Navigation.currentPage !== getPageSlag(this.props.match.path)) {
            this.props.setPage(getPageSlag(this.props.match.path));
        }

        if(checkPromise(this.props.Order, ['product']) === false){
            this.props.initOrder();
        }

        if (this.props.match.url !== this.props.Navigation.path) {
            this.props.setPath(this.props.match.url);
        }
    }

    render(){
        if(
            checkPromise(this.props.Order, ['product'])
        ){
            return <Element {...this.props}/>;
        }else{
            return <Loading/>;
        }
    }
}

const states = (state) => {
    return {
        Order: state.OrderReducer,
        Navigation: state.NavigationReducer,
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
        initOrder: () => {
            dispatch(INIT_ORDER());
        },
        unsetOrder: () => {
            dispatch(UNSET_ORDER());
        },
        setsize: (size) => {
            dispatch(SET_ORDER_SIZE(size));
        },
        setcount: (count) => {
            dispatch(SET_ORDER_COUNT(count));
        },
        setPrice: (price) => {
            dispatch(SET_ORDER_FLOWER_PRICE(price));
        },
        setOldPrice: (price) => {
            dispatch(SET_ORDER_FLOWER_OLD_PRICE(price));
        }
    };
};

export default connect(states, actions)(Order);