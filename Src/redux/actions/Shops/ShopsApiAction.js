import SHOPS_ACTION_TYPES from './ShopsActionTypes';


export const fetchGetAllShopsData = () => ({
    type: SHOPS_ACTION_TYPES.API_GET_ALL_SHOPS,
  });
  
  export const fetchGetAllShopsSuccess = (data) => ({
    
    type: SHOPS_ACTION_TYPES.API_GET_ALL_SHOPS_SUCCESS,
    payload: data,
  });
  
  export const fetctGetAllShopsError = (error) => ({
    type: SHOPS_ACTION_TYPES.API_GET_ALL_SHOPS_ERROR,
    payload: error,
  });
  