import USER_PROFILE_ACTION_TYPES from '../../actions/UserProfile/UserProfileActionTypes';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

const userProfileReducer = (state = initialState, action) => {
  //alert(action.type)
  switch (action.type) {
    
    case USER_PROFILE_ACTION_TYPES.API_UPDATE_USER_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case USER_PROFILE_ACTION_TYPES.API_UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case USER_PROFILE_ACTION_TYPES.API_UPDATE_USER_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };


      case USER_PROFILE_ACTION_TYPES.API_GET_ALL_ADDRESS:
        return {
          ...state,
          loading: true,
        };
      case USER_PROFILE_ACTION_TYPES.API_GET_ALL_ADDRESS_SUCCESS:
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      case USER_PROFILE_ACTION_TYPES.API_GET_ALL_ADDRESS_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
    default:
      return state;
  }
};

export default userProfileReducer;