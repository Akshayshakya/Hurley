import PASTORDERS_ACTION_TYPES from './PastOrderActionTypes';


export const fetchGetUserData = () => ({
    type: PASTORDERS_ACTION_TYPES.API_GET_USERDATA_FRESHSHOPS,
  });
  
  export const fetchGetUserDataSuccess = (data) => ({
    
    type: PASTORDERS_ACTION_TYPES.API_GET_USERDATA_FRESHSHOPS_SUCCESS,
    payload: data,
  });
  
  export const fetctGetUserDataError = (error) => ({
    type: PASTORDERS_ACTION_TYPES.API_GET_USERDATA_FRESHSHOPS_ERROR,
    payload: error,
  });
  

  // //

  export const fetchGetPastOrderData = () => ({
    type: PASTORDERS_ACTION_TYPES.API_GET_ALL_PAST_ORDERS,
  });
  
  export const fetchGetPastOrderDataSuccess = (data) => ({
    
    type: PASTORDERS_ACTION_TYPES.API_GET_ALL_PAST_ORDERS_SUCCESS,
    payload: data,
  });
  
  export const fetctGetPastOrderDataError = (error) => ({
    type: PASTORDERS_ACTION_TYPES.API_GET_ALL_PAST_ORDERS_ERROR,
    payload: error,
  });
  

  //  //

  export const fetchGetPastOrderItems = () => ({
    type: PASTORDERS_ACTION_TYPES.API_GET_PAST_ORDERS_ITEMS,
  });
  
  export const fetchGetPastOrderItemsSuccess = (data) => ({
    
    type: PASTORDERS_ACTION_TYPES.API_GET_PAST_ORDERS_ITEMS_SUCCESS,
    payload: data,
  });
  
  export const fetctGetPastOrderItemsError = (error) => ({
    type: PASTORDERS_ACTION_TYPES.API_GET_PAST_ORDERS_ITEMS_ERROR,
    payload: error,
  });
  

  //FOR RECEIPTS

  export const fetchGetAllReceipts = () => ({
    type: PASTORDERS_ACTION_TYPES.API_GET_ALL_RECEIPTS,
  });
  
  export const fetchGetAllReceiptsSuccess = (data) => ({
    
    type: PASTORDERS_ACTION_TYPES.API_GET_ALL_PAST_ORDERS_SUCCESS,
    payload: data,
  });
  
  export const fetctGetAllReceiptsError = (error) => ({
    type: PASTORDERS_ACTION_TYPES.API_GET_ALL_RECEIPTS_ERROR,
    payload: error,
  });
  