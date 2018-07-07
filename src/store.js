
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';

import Thunk from 'redux-thunk';
import Promise from 'redux-promise-middleware';
import Logger from 'redux-logger';

import LocaleReducer from './Reducers/LocaleReducer';
import NavigationReducer from './Reducers/NavigationReducer';
import CommonReducer from './Reducers/CommonReducer';

import SliderReducer from './Reducers/SliderReducer';
import SalesReducer from './Reducers/SalesReducer';
import CollectionsReducer from './Reducers/CollectionsReducer';

import FlowersReducer from './Reducers/FlowersReducer';
import FlowerReducer from './Reducers/FlowerReducer';

import OrderReducer from './Reducers/OrderReducer';

import FavouritesReducer from './Reducers/FavouritesReducer';

import CartReducer from './Reducers/CartReducer';

import SearchReducer from './Reducers/SearchReducer';

import ContactReducer from './Reducers/ContactReducer';

import ConditionsReducer from './Reducers/ConditionsReducer';

import FooterReducer from './Reducers/FooterReducer';

import ThemeReducer from './Reducers/ThemeReducer';

export default createStore(
  combineReducers({
    LocaleReducer,
    NavigationReducer,
    SliderReducer,
    CommonReducer,
    SalesReducer,
    CollectionsReducer,
    FlowersReducer,
    FlowerReducer,
    OrderReducer,
    FavouritesReducer,
    CartReducer,
    SearchReducer,
    ContactReducer,
    ConditionsReducer,
    FooterReducer,
    ThemeReducer
  }),
  {},
  applyMiddleware(
    // Logger,
    Promise(),
    Thunk
  )
);