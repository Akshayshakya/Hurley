import axios from 'axios';
import {
  fetchGetPastOrderData,
  fetchGetPastOrderDataSuccess,
  fetchGetPastOrderItems,
  fetchGetPastOrderItemsSuccess,
  fetctGetPastOrderItemsError,
fetchGetUserData,fetchGetUserDataSuccess,
fetctGetPastOrderDataError,
fetctGetUserDataError,
fetchGetAllReceipts,
fetchGetAllReceiptsSuccess,
fetctGetAllReceiptsError

} from './PastOrderApiActtion';
import { Config } from '../../../Config/index'

const Mainurl = Config.API_URL;
const url = 'https://api.freshop.com/';

export const getUserDataApiActionCreator = (data) => async dispatch => {
  let UserDataParameters = 
  '2/users?'+'app_key=' +'hurleys'+ '&' +
  'last_name_sort=' + 'asc' + '&' +
  'limit=' + '25' + '&' +
  'sort=' + 'last_name' + '&' +
  'store_id=' + '1873' + '&' +
  'store_id_cascade=' + 'true' + '&' +
  'app_secret=' + '2893224166436113608' + '&' +
  'intent=' + 'admin' + '&' +
  'email=' + data.vEmail 
  dispatch(fetchGetUserData());
  try {
    const res = await axios.get(url + UserDataParameters)
    dispatch(fetchGetUserDataSuccess(res));
    return res;
  }
  catch (error) {
    dispatch(fetctGetUserDataError(error));
    console.log(error);
  }
}



export const getPastOrdersApiActionCreator = (data) => async dispatch => {
  let PastOrdersParameters = 
  '2/store/orders?'+'app_key=' +'hurleys'+ '&' +
  'include_pickers=' + 'true' + '&' +
  'intent=' + 'admin' + '&' +
  'limit=' + '25' + '&' +
  'slot_start_at_sort='+ 'asc' + '&' +
  'sort=' + 'last_name' + '&' +
  'store_id=' + '1874' + '&' +
  'app_secret=' + '2893224166436113608' + '&' +
  'user_id=' + data.user_id 
  dispatch(fetchGetPastOrderData());
  try {
    const res = await axios.get(url + PastOrdersParameters)
    dispatch(fetchGetPastOrderDataSuccess(res));
    return res;
  }
  catch (error) {
    dispatch(fetctGetPastOrderDataError(error));
    console.log(error);
  }
}


export const getPastOrderItemsApiActionCreator = (data) => async dispatch => {
  let PastOrderItemsParameters = 
  '1/store/order_items?'+'app_key=' +'hurleys'+ '&' +
  'order_id=' + data.order_id + '&' +
  'app_secret=' + '2893224166436113608' 
  dispatch(fetchGetPastOrderItems());
  try {
    const res = await axios.get(url + PastOrderItemsParameters)
    dispatch(fetchGetPastOrderItemsSuccess(res));
    return res;
  }
  catch (error) {
    dispatch(fetctGetPastOrderItemsError(error));
    console.log(error);
  }
}



export const getAllReceiptsApiActionCreator= (data) => async dispatch => {
  let _cardnoPayload = 
  'iUserId=' + data.iUserId + '&' +
  'type=' + data.type

  dispatch(fetchGetAllReceipts());
  try {
    //const res = await axios.get(url)
    const res = await axios.post(Mainurl + _cardnoPayload)
    dispatch(fetchGetAllReceiptsSuccess(res));
    return res;
  }
  catch (error) {
    console.log(error);
    dispatch(fetctGetAllReceiptsError(error));
    return error;
  }

}


