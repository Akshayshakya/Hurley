import axios from 'axios';
import {
  fetchLoginData, fetchLoginSuccess,
  fetchLoginError, fetchRegistrationData,
  fetchRegistrationSuccess, fetchRegistrationError,
  fetchSendOtp, fetchSendOtpSuccess,
  fetchSendOtpError, fetchVerifyOtp,
  fetchVerifyOtpSuccess, fetchVerifyOtpError,
  fetchLogout,fetchSavePassword,
  fetchSavePasswordSuccess,fetchSavePasswordError
} from './AuthenticationApiAction';
import { Config } from './../../../Config/index'

const url = Config.API_URL;

export const loginApiActionCreator = (data) => async dispatch => {
  let loginParameters = 'type=' + data.type + '&' + 'vEmail=' + data.vEmail + '&' + 'vPassword=' + data.vPassword + '&' + 'vDeviceType=' + data.vDeviceType + '&' + 'UserType=' + data.UserType + '&' + 'vCurrency' + data.vCurrency + '&' + 'vLang' + data.vLang
  dispatch(fetchLoginData());
  try {
    const res = await axios.get(url + loginParameters)
    dispatch(fetchLoginSuccess(res));
    return res;
  }
  catch (error) {
    dispatch(fetchLoginError(error));
    console.log(error);
  }

}


export const registerApiActionCreator = (data) => async dispatch => {

  let registrationParameters = 
  'type=' + data.type + '&' +
  'vFirstName=' + data.vFirstName + '&' +
  'vLastName=' + data.vLastName + '&' +
   'vEmail=' + data.vEmail + '&' +
   'vPhone=' + data.vPhone + '&' +
    'vPassword=' + data.vPassword + '&' +
    'PhoneCode=' + data.PhoneCode + '&' +
    'CountryCode=' + data.CountryCode + '&' +
     'vDeviceType=' + data.vDeviceType + '&' +
     'vInviteCode=' + data.vInviteCode + '&' +
      'UserType=' + data.UserType + '&' +
       'vCurrency=' + data.vCurrency + '&' +
        'vLang=' + data.vLang+ '&' +
        'eGender=' + data.eGender + '&' +
        'dBirthDate=' + '12-04-1995' + '&' +
        'tDestinationAddress=' + data.tDestinationAddress + '&' +
        'vLatitude=' + data.vLatitude + '&' +
        'vLongitude=' + data.vLongitude + '&' +
        'fcm_token=' + data.fcm_token + '&' +
        'user_city=' + data.user_city + '&' +
        'iAccountID=' + data.iAccountID + '&' +
        'user_loyalty_card_number=' + data.user_loyalty_card_number  + '&' +
        'card_number=' + data.card_number 
        
        
        
  dispatch(fetchRegistrationData()); 
  try {
    const res = await axios.get(url + registrationParameters)
    dispatch(fetchRegistrationSuccess(res));
    return res;
  }
  catch (error) {
    dispatch(fetchRegistrationError(error));
    console.log(error);
  }

}


export const sentOtpApiActionCreator = (data) => async dispatch => {

  let sendOtpParameters = 'type=' + data.type + '&' + 'vEmail=' + data.vEmail + '&' + 'UserType=' + data.UserType
  dispatch(fetchSendOtp());
  try {
    const res = await axios.get(url + sendOtpParameters)
    dispatch(fetchSendOtpSuccess(res));
    return res;
  }
  catch (error) {
    dispatch(fetchSendOtpError(error));
    console.log(error);
  }
};


export const verifyOtpApiActionCreator = (data) => async dispatch => {
  let verifyOtpParameters = 'type=' + data.type + '&' + 'otp=' + data.otp + '&' + 'newpassword=' + data.newpassword + '&' + 'vPassword=' + data.vPassword + '&' + 'userType=' + data.UserType
  dispatch(fetchVerifyOtp());
  console.log(url + verifyOtpParameters)
  try {
    const res = await axios.get(url + verifyOtpParameters)
    dispatch(fetchVerifyOtpSuccess(res));
    //alert(JSON.stringify(res))
    return res;
  }
  catch (error) {
    dispatch(fetchVerifyOtpError(error));
    console.log(error);
  }
};

export const savePasswordApiActionCreator = (data) => async dispatch => {
//alert('hi')
  let savePasswordParameters = 'type=' + data.type + '&' + 'otp=' + data.otp + '&' + 'newpassword=' + data.newpassword + '&' + 'vPassword=' + data.vPassword + '&' + 'userType=' + data.UserType
  dispatch(fetchSavePassword());
  try {
    const res = await axios.get(url + savePasswordParameters)
    dispatch(fetchSavePasswordSuccess(res));
    return res;
  }
  catch (error) {
    dispatch(fetchSavePasswordError(error));
    console.log(error);
  }
};

export const logoutActionCreator = () => async dispatch => {
  try {
    dispatch(fetchLogout());
  } 
  catch (error) {
    console.log(error);
  }
}

