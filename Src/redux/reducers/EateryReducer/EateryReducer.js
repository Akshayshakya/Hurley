import EATERY_ACTION_TYPES from '../../actions/Eatery/EateryActionTypes';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

const eateryReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case EATERY_ACTION_TYPES.API_GET_BANNERS:
      return {
        ...state,
        loading: true,
      };
    case EATERY_ACTION_TYPES.API_GET_BANNERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case EATERY_ACTION_TYPES.API_GET_BANNERS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      case EATERY_ACTION_TYPES.API_GET_ALL_EATERY:
        return {
          ...state,
          loading: true,
        };
      case EATERY_ACTION_TYPES.API_GET_ALL_EATERY_SUCCESS:
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      case EATERY_ACTION_TYPES.API_GET_ALL_EATERY_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
  

    default:
      return state;
  }
};

export default eateryReducer;