import EATERY_ACTION_TYPES from './EateryActionTypes';

export const fetchGetBannersData = () => ({
  type: EATERY_ACTION_TYPES.API_GET_BANNERS,
});

export const fetchGetBannersSuccess = (data) => ({
  
  type: EATERY_ACTION_TYPES.API_GET_BANNERS_SUCCESS,
  payload: data,
});

export const fetchGetBannersError = (error) => ({
  type: EATERY_ACTION_TYPES.API_GET_BANNERS_ERROR,
  payload: error,
});

// for All eatery

export const fetchGetAllEateryData = () => ({
  type: EATERY_ACTION_TYPES.API_GET_ALL_EATERY,
});

export const fetchGetAllEaterySuccess = (data) => ({
  
  type: EATERY_ACTION_TYPES.API_GET_ALL_EATERY_SUCCESS,
  payload: data,
});

export const fetctGetAllEateryError = (error) => ({
  type: EATERY_ACTION_TYPES.API_GET_ALL_EATERY_ERROR,
  payload: error,
});
