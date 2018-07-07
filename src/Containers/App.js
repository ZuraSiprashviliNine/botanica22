
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import {connect} from 'react-redux';
import {reactLocalStorage as Storage} from 'reactjs-localstorage';

import {checkPromise} from "../Helpers/Valid";

import {Loading} from "../Components/Loading";

import {
  INIT_LOCALE,
  SET_LOCALE_PRIMARY_CURRENT,
  SET_LOCALE_PRIMARY_KEYWORDS_RES, UNSET_LOCALE
} from "../Actions/LocaleActions";

import {Scrollbar} from "../Components/Scrollbar";

import 'font-awesome/css/font-awesome.min.css';
import '../Stylesheet/loading.css';
import 'animate.css/animate.min.css';
import 'swiper/dist/css/swiper.min.css';

import '../Stylesheet/bootstrap.css';
import '../Stylesheet/style.css';

import Navigation from './Navigation';
import Footer from './Footer';

import Pages from './Pages';
import {INIT_COMMON_REDUCER} from "../Actions/CommonActions";
import {ADD_FAVOURITES_FAVOURITES_BY_IDS} from "../Actions/FavouritesActions";
import {ADD_CARTS_CART_BY_ID} from "../Actions/CartActions";

class Element extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      navbarIsFixed: false,
    };
  }

  // componentDidMount(){
  //   if(this.props.theme){
  //     console.log(this.props.theme);
  //     alert('x');
  //       // require(this.props.theme.src);
  //       // require(this.props.theme.src_2);
  //       require('/assets/bootstrap_2.css');
  //       require('/assets/style_2.css');
  //   }else{
  //     require('../Stylesheet/bootstrap.css');
  //     require('../Stylesheet/style.css');
  //   }
  // }

  render(){
    return (
      <div
        id={'App'}
        className={'Application'}>
        <Scrollbar
          currentpath={this.props.Navigation.path}
          onScroll={(event) => {
            if (event.target.scrollTop > 5) {
              if (!this.state.navbarIsFixed) {
                this.setState({navbarIsFixed: true});
              }
            } else {
              if (this.state.navbarIsFixed) {
                this.setState({navbarIsFixed: false});
              }
            }
          }}>
          <Router>
            <div
              id={'RouterContainer'}>
              <Navigation
                fixed={this.state.navbarIsFixed}
                setLocale={this.props.setLocale}
                unsetLocale={this.props.unsetLocale}
                currentlang={this.props.Locale.primary.current}
                languages={this.props.Locale.primary.languages}/>
              <Switch>
                <Route
                  path={'/'}
                  exact={true}
                  component={Pages.Home}/>
                <Route
                  path={'/flowers/:flower_category'}
                  exact={true}
                  component={Pages.Flowers}/>
                <Route
                  path={'/flowers/items/:flower_id'}
                  exact={true}
                  component={Pages.Flower}/>
                <Route
                  path={'/order'}
                  exact={true}
                  component={Pages.Order}/>
                <Route
                  path={'/favourites'}
                  exact={true}
                  component={Pages.Favourites}/>
                <Route
                  path={'/cart'}
                  exact={true}
                  component={Pages.Cart}/>
                <Route
                  path={'/contact'}
                  exact={true}
                  component={Pages.Contact}/>
                <Route
                  path={'/conditions'}
                  exact={true}
                  component={Pages.Conditions}/>
                <Route
                  component={() => <Redirect to={'/'}/>}/>
              </Switch>
              <Footer
                common={this.props.Common}/>
            </div>
          </Router>
        </Scrollbar>
      </div>
    );
  }
}
class App extends React.Component{
  constructor(props){
    super(props);


    this.state = {
      ready: () =>
        checkPromise(this.props.Locale.primary) && this.props.Locale.primary.ref !== null
        && checkPromise(this.props.Common)
    };

  }

  componentDidMount(){
    this.props.checkFavourites();
    this.props.checkCarts();
    this.props.initCommon();
    this.props.initLocale(() => {
      if(!this.props.Locale.current){
        this.props.setLocale('ka');
      }
    });
  }

  render(){
    return this.state.ready() ? <Element {...this.props} /> : <Loading/>;
  }
}

const states = (state) => {
  return {
    Locale: state.LocaleReducer,
    Common: state.CommonReducer,
    Navigation: state.NavigationReducer,
  };
};

const actions = (dispatch) => {
  return {
    initLocale: (callback) => {
      dispatch(INIT_LOCALE());
      callback();
      let storageLocale = Storage.get('locale');
      if(storageLocale){
        if(storageLocale == 'ka'){
          document.getElementsByTagName('body')[0].classList.add('ka');
        }else{
          document.getElementsByTagName('body')[0].classList.remove('ka');
        }
      }
    },
    setLocale: (code) => {
      let storageLocale = Storage.get('locale');
      if(!code){
        code = storageLocale;
        dispatch(SET_LOCALE_PRIMARY_CURRENT(code));
        dispatch(SET_LOCALE_PRIMARY_KEYWORDS_RES(code));
      }
      if(storageLocale !== code){
        dispatch(SET_LOCALE_PRIMARY_CURRENT(code));
        dispatch(SET_LOCALE_PRIMARY_KEYWORDS_RES(code));
        // Storage.set('locale', 'ka');
      }

    },
    unsetLocale: () => {
      dispatch(UNSET_LOCALE());
    },
    initCommon: () => {
      dispatch(INIT_COMMON_REDUCER());
    },
    checkFavourites: () => {
      let favStorageLocale = JSON.parse(Storage.get('favourites') || null);
      if(favStorageLocale !== null){
        let ids = favStorageLocale.map((f) => parseInt(f));
        dispatch(ADD_FAVOURITES_FAVOURITES_BY_IDS(ids));
      }
    },
    checkCarts: () => {
      let cartStorageLocale = JSON.parse(Storage.get('carts') || null);
      if(cartStorageLocale !== null){
        let ids = cartStorageLocale.map((c) => parseInt(c));
        ids.map((id) => {
          dispatch(ADD_CARTS_CART_BY_ID(id));
        });
      }
    }
  };
};

export default connect(states, actions)(App);