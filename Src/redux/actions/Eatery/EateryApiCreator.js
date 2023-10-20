import axios from 'axios';
import {
  fetchGetBannersData, fetchGetBannersSuccess,
  fetchGetBannersError, fetchGetAllEateryData,
  fetchGetAllEaterySuccess,fetctGetAllEateryError

} from './EateryApiAction';
import { Config } from './../../../Config/index'

const url = Config.API_URL;

export const getBannersApiActionCreator = (data) => async dispatch => {
  //let getBannersParameters = 'type=' + data.type + '&' + 'iMemberId=' + data.iMemberId + '&' + 'appType=' + data.appType
  let getBannersParameters = 'type=' + data.type
  dispatch(fetchGetBannersData());
  try {
    const res = await axios.get(url + getBannersParameters)
    dispatch(fetchGetBannersSuccess(res));
    return res;
  }
  catch (error) {
    dispatch(fetchGetBannersError(error));
    console.log(error);
  }

}


export const getAllEateryApiActionCreator = (data) => async dispatch => {
  let allEateryParameters = 'type=' + data.type + '&' + 'PassengerLat=' + data.PassengerLat + '&' + 'PassengerLon=' + data.PassengerLon + '&' + 'fOfferType=' + data.fOfferType + '&' + 'iUserId=' + data.iUserId + '&' + 'cuisineId=' + data.cuisineId + '&' + 'sortby' + data.sortby
  dispatch(fetchGetAllEateryData());
  try {
    const res = await axios.get(url + allEateryParameters)
    dispatch(fetchGetAllEaterySuccess(res));
    return res;
  }
  catch (error) {
    dispatch(fetctGetAllEateryError(error));
    console.log(error);
  }
}

