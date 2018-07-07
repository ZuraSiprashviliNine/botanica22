
import React from 'react';
import {checkPromise} from "../Helpers/Valid";
import {Loading} from "../Components/Loading";

import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {SET_NAVIGATION} from "../Actions/NavigationActions";

import FontAwesome from 'react-fontawesome';

import {
  Col,
  Row,
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Button
} from 'reactstrap';

import Translate from './Translate';
import {INIT_SEARCH, SEARCH_SEARCH_ITEMS} from "../Actions/SearchActions";
import {Scrollbar} from "../Components/Scrollbar";

export class Search extends React.Component{
  constructor(props){
    super(props);

      this.state = {
          searchIconClicked: false,
          closed: true
      };

    this._searchClick = this._searchClick.bind(this);

    this._handleChange = this._handleChange.bind(this);

    this.getSearchItems = this.getSearchItems.bind(this);

    this.close = this.close.bind(this);
  }

  close(){
    this.setState({closed: true});
  }

  getSearchItems(){
    return this.props.search_items.map((item) => {
      return (
        <Row key={item.id} className={'align-items-stretch border-bottom '}>
          <Col
            className={'h-100'}
            xs={4}>
            <Link
              key={item.id}
              onClick={this.close}
              className={'h-auto row py-1'}
              to={`/flowers/items/item_${item.id}`}>
              <img src={item.image} className={'w-100'} />
            </Link>
          </Col>
          <Col
            className={'h-100'}
            xs={8}>
            <Link
              key={item.id}
              onClick={this.close}
              className={' p-2 small h-auto row '}
              to={`/flowers/items/item_${item.id}`}>
              <div className={'text-capitalize text-dark font-weight-dark pb-1'}>
                <Translate>
                  {item.title}
                </Translate>
              </div>
              <div className={'text-muted small text-capitalize'}>
                <Translate>
                  {item.description !== null ? item.description.substr(0, 100) : ' '}
                </Translate>
              </div>
            </Link>
          </Col>
        </Row>
      );
    });
  }

  _handleChange(){
    if(this.searchInput.value){
      this.props.search_search_items(this.searchInput.value);
      if(this.props.search_search_items.length > 0){
        if(this.state.closed === true){
          this.setState({closed: false});
        }
      }
    }else{
      this.close();
    }
  }

  _searchClick(){
    if(this.searchInput !== undefined){
      this.setState({searchIconClicked: !this.state.searchIconClicked});
      if(this.searchInput.classList.contains('fadeInRight')){
        this.searchInput.classList.remove('fadeOutRight');
      }else{
        this.searchInput.classList.add('fadeInRight');
        setTimeout(() => {
          this.searchInput.focus();
        }, 1000);
      }
    }
  }

  render(){
    return (
      <ul className="list-unstyled searchUL m-0 d-flex flex-row align-items-center">
        <li className={`search flex-column justify-content-center align-items-center px-1 ${this.state.searchIconClicked === true ? 'd-flex': 'd-none'}`}>
          <input
            ref={(element) => {this.searchInput = element}}
            type="text"
            onChange={this._handleChange}
            className="w-100 animated border-_grass rounded-no bg-transparent my-1 form-control"
            placeholder={'Search...'}/>
          <div
            style={{zIndex: this.state.closed === false && this.props.search_items.length !== 0 ? 99999 : - 100 , visibility: this.state.closed === false && this.props.search_items.length !== 0 ? 'visible' : 'hidden', height: this.props.search_items.length ? this.props.search_items.length * 100 + 'px' : 0}}
            className={`search_results shadow border text-dark bg-white p-1 animated ${this.props.search_items.length !== 0 ? 'fadeIn': 'fadeOut'}`}>
              <Scrollbar>
                <Container className={'searchContainerElement'}>
                    {this.getSearchItems()}
                </Container>
              </Scrollbar>
          </div>
        </li>
        <li>
          <Button
            onClick={this._searchClick}
            ref={(element) => {this.searchIcon = element}}
            className={'btn bg-transparent border-0 px-3 py-3 text-white'}>
            <FontAwesome
              name={'search'}/>
          </Button>
        </li>
      </ul>
    );
  }
}

class NavigationTop extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return (
      <Container>
        <Row
          className={'top'}>
          <Col
            className={'logo-col text-white flex-row align-items-center justify-content-start'}
            sm={6}
            xs={3}>
            <Link
              to={'/'}
              className={'py-1 text-white d-block'}>
              <h1
                className={'m-0 font-weight-bold text-capitalize'}>
                  <img src="/assets/logo.png" alt="" style={{height: 45}}/>
              </h1>
            </Link>
          </Col>
          <Col
            sm={6}
            xs={9}
            className="top-nav text-white d-flex flex-row align-items-center justify-content-end">
            <Search search_search_items={this.props.search_search_items} search_items={this.props.search_items} />
          </Col>
        </Row>
      </Container>
    );
  }
}

class NavigationNavNavItem extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return (
      <NavItem
        className={`${(this.props.current === '/' ? '/' : '/' + this.props.current) === this.props.slag ? 'active' : ''}`}>
        <NavLink
          onClick={this.props.close}
          className={'p-3'}
          tag={Link}
          to={this.props.slag}>
          <Translate>
            {this.props.title}
          </Translate>
        </NavLink>
      </NavItem>
    )
  }
}
class NavigationNavNavItemWithDropdown extends React.Component{
  constructor(props){
    super(props);

    this.getDropdownItems = this.getDropdownItems.bind(this);
  }

  getDropdownItems(){
    return this.props.sub.map((item) => {
      return (
        <DropdownItem
          onClick={this.props.close}
          key={item.slag}
          tag={Link}
          to={item.slag}>
          <Translate>
            {item.title}
          </Translate>
        </DropdownItem>
      );
    })
  }

  render(){
    return (
      <UncontrolledDropdown
        className={`${('/' + this.props.current) === this.props.slag ? 'active' : ''}`}
        nav
        inNavbar>
        <DropdownToggle
          className={'p-3'}
          nav
          caret>
          <Translate>
            {this.props.title}
          </Translate>
        </DropdownToggle>
        <DropdownMenu
          left={'true'}
          className={'rounded-no'}>
          {this.getDropdownItems()}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

class NavigationNav extends React.Component{
  constructor(props){
    super(props);

    this.getNavItems = this.getNavItems.bind(this);
  }

  componentDidMount(){
    this.props.close();
  }

  getNavItems(){
    return this.props.list.map((item, index) => {
      if(item.sub){
        return <NavigationNavNavItemWithDropdown close={this.props.close} current={this.props.currentPage} key={index} {...item}/>;
      }else{
        return <NavigationNavNavItem close={this.props.close} current={this.props.currentPage} {...item} key={index}/>;
      }
    });
  }

  render(){
    return (
      <Nav className="mr-auto text-capitalize" navbar>
        {this.getNavItems()}
      </Nav>
    );
  }
}

class UserFavourites extends React.Component{
  constructor(props){
    super(props);

    this.getLanguageItems = this.getLanguageItems.bind(this);
    this.setLang = this.setLang.bind(this);
  }

  setLang(lang){
    this.props.unsetlocale();
    this.props.setlocale(lang);
    this.props.close();
    if(lang === 'ka'){
      document.getElementsByTagName('body')[0].classList.add('ka');
    }else{
      document.getElementsByTagName('body')[0].classList.remove('ka');
    }
  }

  getLanguageItems(){
    return this.props.languages.map((lang) => {
      return (
        <DropdownItem
          className={`text-capitalize ${this.props.currentlang === lang ? 'bg-grass text-white': ''}`}
          onClick={() => {this.props.currentlang === lang ? null : this.setLang(lang); this.props.close()}}
          key={lang}>
          <Translate>
            {lang}
          </Translate>
        </DropdownItem>
      );
    });
  }

  render(){
    return (
      <Nav className={'ml-auto text-capitalize flex-row justify-content-md-start justify-content-center'} navbar>
        <NavItem>
          <NavLink
            tag={Link}
            to={'/favourites'}
            onClick={() => {this.props.close()}}
            className={'p-3 d-flex flex-row align-items-center h-100'}>
            <FontAwesome
              name={'star-o'}
              className={'text-muted mr-2'}/>
            <Badge
              className={'text-white rounded-no'}
              color={'secondary'}>{this.props.fvcount}</Badge>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag={Link}
            to={'/cart'}
            onClick={() => {this.props.close()}}
            className={'p-3 d-flex flex-row align-items-center h-100'}>
            <FontAwesome
              name={'shopping-cart'}
              className={'text-muted mr-2'}/>
            <Badge
              className={'text-white rounded-no'}
              color={'grass'}>
              {this.props.cartcount}
            </Badge>
          </NavLink>
        </NavItem>
        <UncontrolledDropdown
          nav
          inNavbar>
          <DropdownToggle
            className={'p-3'}
            nav
            caret>
            <Translate>
              {this.props.currentlang}
            </Translate>
          </DropdownToggle>
          <DropdownMenu
            left={'true'}
            className={'rounded-no'}>
            {this.getLanguageItems()}
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );
  }
}

class NavigationNavbar extends React.Component{
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this._toggleNavbar = this._toggleNavbar.bind(this);
    this.state = {
      collapseIsOpen: false
    };
    this.close = this.close.bind(this);
  }

  close(){
    this.setState({collapseIsOpen: false});
  }

  _toggleNavbar() {
    this.setState({
      collapseIsOpen: !this.state.collapseIsOpen
    });
  }

  toggle() {
    this.setState({
      collapseIsOpen: !this.state.collapseIsOpen
    });
  }

  render(){
    return (
      <div
        className={'py-1 py-md-0 animated navbar navbar-expand-md navbar-light bg-white'}
        ref={(element) => {this.navbar = element}}>
        <Container>
          <NavbarBrand
            tag={Link}
            className={`pl-1 text-capitalize text-grass font-weight-bold d-md-none d-lg-none d-xl-none ${this.props.fixed ? 'd-flex flex-column justify-content-center d-sm-flex' : 'd-none'}`}
            to={'/'}>
              <img src="/assets/logo-dark.png"  style={{height: '50px'}} alt="logo"/>
          </NavbarBrand>
          <NavbarToggler
            className={'rounded-no ml-auto'}
            onClick={this._toggleNavbar}/>
          <Collapse isOpen={this.state.collapseIsOpen} navbar>
            <NavigationNav close={this.close} currentPage={this.props.currentPage} list={this.props.list}/>
            <UserFavourites
              close={this.close}
              unsetlocale={this.props.unsetlocale}
              currentlang={this.props.currentlang}
              setlocale={this.props.setlocale}
              languages={this.props.languages}
              fvcount={this.props.fvcount}
              cartcount={this.props.cartcount}/>
          </Collapse>
        </Container>
      </div>

    );
  }
}

class Element extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillReceiveProps(props){
      if(props.fixed){
          setTimeout(() => {
              this.header.classList.add('scrolled');
          }, 500);
      }else{
          setTimeout(() => {
              this.header.classList.remove('scrolled');
          }, 500);
      }
  }

  render(){
    return (
      <header
        className={'bg-grass animated'}
        ref={(element) => {this.header = element}}
        id={'header'}>
        <NavigationTop
          search_items={this.props.Search.results}
          search_search_items={this.props.searchSearchItems}
          title={this.props.title}/>
        <NavigationNavbar
          unsetlocale={this.props.unsetLocale}
          setlocale={this.props.setLocale}
          currentlang={this.props.currentlang}
          languages={this.props.languages}
          fixed={this.props.fixed}
          fvcount={this.props.Favourites.count}
          cartcount={this.props.Cart.count}
          {...this.props.Navigation}/>
      </header>
    );
  }
}

class Navigation extends React.Component{
  constructor(props){
    super(props);

    this.init = this.init.bind(this);
  }

  componentDidMount(){
    this.init(this.props);
  }

  init(props){
    if(checkPromise(this.props.Navigation) === false){
      props.setNavigation();
    }

    if(checkPromise(this.props.Search) === false){
      props.initSearch();
    }
  }

  render(){
    if(checkPromise(this.props.Navigation) && checkPromise(this.props.Search)){
      return <Element {...this.props}/>;
    }else{
      return <Loading />;
    }
  }
}

const states = (state) => {
  return {
    Navigation: state.NavigationReducer,
    Favourites: state.FavouritesReducer,
    Cart: state.CartReducer,
    Search: state.SearchReducer
  };
};

const actions = (dispatch) => {
  return {
    setNavigation: () => {
      dispatch(SET_NAVIGATION());
    },
    initSearch: () => {
      dispatch(INIT_SEARCH());
    },
    searchSearchItems: (data) => {
      dispatch(SEARCH_SEARCH_ITEMS(data))
    }
  };
};

export default connect(states, actions)(Navigation);
