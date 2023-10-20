import HELPLINE_ACTION_TYPES from './HelpLineActionTypes';


export const fetchGetAllFaqData = () => ({
    type: HELPLINE_ACTION_TYPES.API_GET_ALL_FAQ,
  });
  
  export const fetchGetAllFaqSuccess = (data) => ({
    
    type: HELPLINE_ACTION_TYPES.API_GET_ALL_FAQ_SUCCESS,
    payload: data,
  });
  
  export const fetchGetAllFaqError = (error) => ({
    type: HELPLINE_ACTION_TYPES.API_GET_ALL_FAQ_ERROR,
    payload: error,
  });
