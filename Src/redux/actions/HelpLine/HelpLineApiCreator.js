import axios from 'axios';
import {

    fetchGetAllFaqData,
    fetchGetAllFaqSuccess,
    fetchGetAllFaqError,

} from './HelpLineApiAction';
import { Config } from './../../../Config/index'

const url = Config.API_URL;

export const getAllFaqApiActionCreator = (data) => async dispatch => {
  let faqParameters = 'type=' + data.type + '&' + 'iMemberId=' + data.iMemberId + '&' + 'appType=' + data.appType 
  dispatch(fetchGetAllFaqData());
  try {
    const res = await axios.get(url + faqParameters)
    dispatch(fetchGetAllFaqSuccess(res));
    return res;
  }
  catch (error) {
    dispatch(fetchGetAllFaqError(error));
    console.log(error);
  }

}