import axios from 'axios';
import {fetchData, fetchSuccess, fetchError} from './ApiAction';
import {Config} from './../../Config/index'

const url =Config.API_URL;

const apiActionCreator = () => (dispatch) => {

    dispatch(fetchData());
  return new Promise(() => {
    axios
      .get(url)
      .then((response) => {
        //alert(JSON.stringify(response))
        dispatch(fetchSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
        console.log(error);
      });
  });
};

export default apiActionCreator;