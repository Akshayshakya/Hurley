import USER_PROFILE_ACTION_TYPES from './UserProfileActionTypes';


export const fetchUpdateProfileData = () => ({
    type: USER_PROFILE_ACTION_TYPES.API_UPDATE_USER_PROFILE,
  });
  
  export const fetchUpdateProfileSuccess = (data) => ({
    
    type: USER_PROFILE_ACTION_TYPES.API_UPDATE_USER_PROFILE_SUCCESS,
    payload: data,
  });
  
  export const fetchUpdateProfileError = (error) => ({
    type: USER_PROFILE_ACTION_TYPES.API_UPDATE_USER_PROFILE_ERROR,
    payload: error,
  });


  //for add PaymentAddress
  export const fetchAddAddressData = () => ({
    type: USER_PROFILE_ACTION_TYPES.API_ADD_ADDRESS,
  });
  
  export const fetchAddAddressSuccess = (data) => ({
    
    type: USER_PROFILE_ACTION_TYPES.API_ADD_ADDRESS_SUCCESS,
    payload: data,
  });
  
  export const fetchAddAddressError = (error) => ({
    type: USER_PROFILE_ACTION_TYPES.API_ADD_ADDRESS_ERROR,
    payload: error,
  });


    //for Get All Address
    export const fetchGetAllAddressData = () => ({
      type: USER_PROFILE_ACTION_TYPES.API_GET_ALL_ADDRESS,
    });
    
    export const fetchGetAllAddressSuccess = (data) => ({
      
      type: USER_PROFILE_ACTION_TYPES.API_GET_ALL_ADDRESS_SUCCESS,
      payload: data,
    });
    
    export const fetchGetAllAddressError = (error) => ({
      type: USER_PROFILE_ACTION_TYPES.API_GET_ALL_ADDRESS_ERROR,
      payload: error,
    });