import axios from 'axios';
import {

  fetchUpdateProfileData,
  fetchUpdateProfileSuccess,
  fetchUpdateProfileError,
  fetchAddAddressData,
  fetchAddAddressSuccess,
  fetchAddAddressError,
  fetchGetAllAddressData,
  fetchGetAllAddressSuccess,
  fetchGetAllAddressError
} from './UserProfileApiAction';
import {fetchLoginSuccess} from '../Authentication/AuthenticationApiAction'
import { Config } from './../../../Config/index'

const url = Config.API_URL;

export const updateUserProfile = (data) => async dispatch => {
  //alert(data.PhoneCode)
  let UpdateProfileParameters =
    'type=' + data.type + '&' +
    'iMemberId=' + data.iMemberId + '&' +
    'vName=' + data.vName + '&' +
    'vLastName=' + data.vLastName + '&' +
    'vPhone=' + data.vPhone + '&' +
    'vPhoneCode=' + data.PhoneCode + '&' +
    'vCountry=' + data.vCountry + '&' +
    'vEmail=' + data.vEmail + '&' +
    'CurrencyCode=' + data.CurrencyCode + '&' +
    'UserType=' + data.UserType + '&' +
    'vCurrency=' + data.vCurrency + '&' +
    'vLang=' + data.vLang + '&' +
    'eGender=' + data.eGender + '&' +
    'dBirthDate=' + data.dBirthDate +
    '&' + 'tDestinationAddress=' + data.tDestinationAddress + '&' +
    'vLatitude' + data.vLatitude + '&' +
    'vLongitude' + data.vLongitude + '&' +
    'isDefault' +data.isDefault
  dispatch(fetchUpdateProfileData());
  try {
    const res = await axios.get(url + UpdateProfileParameters)
    dispatch(fetchLoginSuccess(res));
    return res;
  }
  catch (error) {
    dispatch(fetchUpdateProfileError(error));
    console.log(error);
  }

}



export const getAllAddressApiActionCreator = (data) => async dispatch => {
  //let getAllAddressParameters = 'type=' + data.type + '&' + 'vEmail=' + data.vEmail + '&' + 'vPassword=' + data.vPassword + '&' + 'vDeviceType=' + data.vDeviceType + '&' + 'UserType=' + data.UserType + '&' + 'vCurrency' + data.vCurrency + '&' + 'vLang' + data.vLang
  let getAllAddressParameters = 'type=' + data.type + '&' + 'iUserId=' + data.iUserId 
  //DisplayUserAddressNew
  dispatch(fetchGetAllAddressData());
  try {
    const res = await axios.get(url + getAllAddressParameters)
    dispatch(fetchGetAllAddressSuccess(res));
    return res;
  }
  catch (error) {
    dispatch(fetchGetAllAddressError(error));
    console.log(error);
  }

}


export const UpdateDefaultAddress = (data) => async dispatch => {

  let updateAddParameters = 'type=' + data.type + '&' + 'iUserId=' + data.iUserId + '&' + 'iUserAddressId=' + data.iUserAddressId
  try {
    const res = await axios.get(url + updateAddParameters)
    return res;
  }
  catch (error) {
    return error;
    console.log(error);
  }

}



