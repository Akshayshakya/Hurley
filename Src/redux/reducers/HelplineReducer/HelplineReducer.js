import HELPLINE_ACTION_TYPES from '../../actions/HelpLine/HelpLineActionTypes';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

const helpLineReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case HELPLINE_ACTION_TYPES.API_GET_ALL_FAQ:
      return {
        ...state,
        loading: true,
      };
    case HELPLINE_ACTION_TYPES.API_GET_ALL_FAQ_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case HELPLINE_ACTION_TYPES.API_GET_ALL_FAQ_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };


    default:
      return state;
  }
};

export default helpLineReducer;