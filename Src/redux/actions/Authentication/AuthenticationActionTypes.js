const AUTHENTICATION_ACTION_TYPES = {
    // for login 
    API_LOGIN:'API_LOGIN',
    API_LOGIN_SUCCESS: 'API_LOGIN_SUCCESS',
    API_LOGIN_ERROR: 'API_LOGIN_ERROR',

    // for Registration 
    API_REGISTRATION:'API_REGISTRATION',
    API_REGISTRATION_SUCCESS: 'API_REGISTRATION_SUCCESS',
    API_REGISTRATION_ERROR: 'API_REGISTRATION_ERROR',

    // for sent OTP
    API_SENT_OTP:'API_SENT_OTP',
    API_SENT_OTP_SUCCESS: 'API_SENT_OTP_SUCCESS',
    API_SENT_OTP_ERROR: 'API_SENT_OTP_ERROR',


    // for verify OTP
    API_VERIFY_OTP:'API_VERIFY_OTP',
    API_VERIFY_OTP_SUCCESS: 'API_VERIFY_OTP_SUCCESS',
    API_VERIFY_OTP_ERROR: 'API_VERIFY_OTP_ERROR',

    // for Save Password of forgot password 
    API_SAVE_PASSWORD:'API_SAVE_PASSWORD',
    API_SAVE_PASSWORD_SUCCESS: 'API_SAVE_PASSWORD_SUCCESS',
    API_SAVE_PASSWORD_ERROR: 'API_SAVE_PASSWORD_ERROR',


    // for logout
    USER_LOGOUT:'USER_LOGOUT',
  };
  export default AUTHENTICATION_ACTION_TYPES;