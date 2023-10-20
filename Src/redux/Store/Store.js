import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import apiReducer from './../reducers/GetShopListReducer/ApiReducer';
import authenticationReducer from '../reducers/AuthenticationReducer/AuthenticationReducer'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import {rootReducer} from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  
};
const persistedReducer=persistReducer(persistConfig,rootReducer)
// const appReducers = combineReducers({
//   apiReducer,
//   authenticationReducer
// });

//const rootReducer = (state, action) => appReducers(state, action);

const logger = createLogger();

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, logger)
  );
export const persistor =persistStore(store);
export default store;