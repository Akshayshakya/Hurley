import axios from 'axios';
import {
fetchGetAllShopsData,
fetchGetAllShopsSuccess,
fetctGetAllShopsError

} from './ShopsApiAction';
import { Config } from './../../../Config/index'

const url = Config.API_URL;




export const getAllShopsApiActionCreator = (data) => async dispatch => {
  let allShopParameters = 'type=' +'getExternalShops'
  dispatch(fetchGetAllShopsData());
  try {
    const res = await axios.get(url + allShopParameters)
    dispatch(fetchGetAllShopsSuccess(res));
    return res;
  }
  catch (error) {
    dispatch(fetctGetAllShopsError(error));
    console.log(error);
  }
}
