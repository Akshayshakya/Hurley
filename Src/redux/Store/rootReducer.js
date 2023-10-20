import {createStore, applyMiddleware, combineReducers} from 'redux';
import apiReducer from './../reducers/GetShopListReducer/ApiReducer';
import authenticationReducer from '../reducers/AuthenticationReducer/AuthenticationReducer'
import userProfileReducer from '../reducers/UserProfileReducer/UserProfileReducer'
import helpLineReducer from '../reducers/HelplineReducer/HelplineReducer'
import eateryReducer from '../reducers/EateryReducer/EateryReducer'
import pastOrderReducer from '../reducers/PastOrderReducer/PastOrderReducer'
// export default combineReducers({
//     apiReducer,
//     authenticationReducer
// })


const appReducers = combineReducers({
  apiReducer,
  authenticationReducer,
  userProfileReducer,
  helpLineReducer,
  eateryReducer,
  pastOrderReducer
});

export const rootReducer = (state, action) =>{ 
if (action.type === 'USER_LOGOUT') {
    return appReducers(undefined, action)
  }

  return appReducers(state, action);

}