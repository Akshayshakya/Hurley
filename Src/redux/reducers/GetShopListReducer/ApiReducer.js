import ACTION_TYPES from './../../actions/ActionTypes';
import SHOPS_ACTION_TYPES from '../../actions/Shops/ShopsActionTypes'
const initialState = {
  loading: false,
  data: '',
  error: '',
};

const apiReducer = (state = initialState, action) => {
  
  switch (action.type) {
    
    case ACTION_TYPES.API_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.API_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ACTION_TYPES.API_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
// for getting All shops

case SHOPS_ACTION_TYPES.API_GET_ALL_SHOPS:
  return {
    ...state,
    loading: true,
  };
case SHOPS_ACTION_TYPES.API_GET_ALL_SHOPS_SUCCESS:
  return {
    ...state,
    data: action.payload,
    loading: false,
  };
case SHOPS_ACTION_TYPES.API_GET_ALL_SHOPS_ERROR:
  return {
    ...state,
    error: action.payload,
    loading: false,
  };


    default:
      return state;
  }
};

export default apiReducer;