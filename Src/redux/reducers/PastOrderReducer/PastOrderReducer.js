import PASTORDERS_ACTION_TYPES from '../../actions/PastOrders/PastOrderActionTypes';

const initialState = {
  loading: false,
  data: [],
  CardData:[],
  error: '',
};

const pastOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case PASTORDERS_ACTION_TYPES.API_GET_USERDATA_FRESHSHOPS:
      return {
        ...state,
        loading: true,
      };
    case PASTORDERS_ACTION_TYPES.API_GET_USERDATA_FRESHSHOPS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case PASTORDERS_ACTION_TYPES.API_GET_USERDATA_FRESHSHOPS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      case PASTORDERS_ACTION_TYPES.API_GET_ALL_PAST_ORDERS:
        return {
          ...state,
          loading: true,
        };
      case PASTORDERS_ACTION_TYPES.API_GET_ALL_PAST_ORDERS_SUCCESS:
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      case PASTORDERS_ACTION_TYPES.API_GET_ALL_PAST_ORDERS_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
  //for receipts
  case PASTORDERS_ACTION_TYPES.API_GET_ALL_RECEIPTS:
    return {
      ...state,
      loading: true,
    };
  case PASTORDERS_ACTION_TYPES.API_GET_ALL_RECEIPTS_SUCCESS:
    return {
      ...state,
      CardData: action.payload,
      loading: false,
    };
  case PASTORDERS_ACTION_TYPES.API_GET_ALL_RECEIPTS_ERROR:
    return {
      ...state,
      error: action.payload,
      loading: false,
    };

    default:
      return state;
  }
};

export default pastOrderReducer;