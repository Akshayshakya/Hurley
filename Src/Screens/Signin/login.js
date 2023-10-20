import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View, BackHandler,
  Image,
  Text, PermissionsAndroid,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Platform, KeyboardAvoidingView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../Components/CommonUtils/Colors';
import Images from '../../Components/CommonUtils/Images';
import TextInputs from '../../Components/CommonUtils/TextInput';
import Buttons from '../../Components/CommonUtils/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loginApiActionCreator } from './../../redux/actions/Authentication/AuthenticationApiCreator';
import { EmailValidation } from '../../Validation/RegExpressionValidation'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
const Login = props => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ErrorEmailStatus, setErrorEmailStatus] = useState(false);
  const [ErrorPasswordStatus, setErrorPasswordStatus] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authenticationReducer.loading);


  useEffect(() => {
    Platform.OS == 'android' ? checkpermissionlocation() : CheckIOSMapPermission()
    const backAction = () => {
      BackHandler.exitApp()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  const CheckIOSMapPermission = () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:

            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            // getAddressWithCordinates();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const checkpermissionlocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
        // getAddressWithCordinates()
      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }


  const handleSignIn = async () => {

    if (Email == '') {
      setErrorEmailStatus(true)
    }
    else if (Password == '') {
      setErrorPasswordStatus(true)
    }
    else if (ErrorEmailStatus == true) {
      setErrorEmailStatus(true)
    }
    else {
      let data = {
        type: 'signIn',
        vEmail: Email,
        vPassword: Password,
        vDeviceType: Platform.OS == 'android' ? 'Android' : 'Ios',
        UserType: 'Passenger',
        vCurrency: '',
        vLang: ''
      }
      let res = await dispatch(loginApiActionCreator(data))
      if (res?.data?.Action == 1) {
        props.navigation.navigate('DrawerStack');
      }
      else {
        alert('login credential is invalid !.')
      }
    }
  };

  const gotoSignup = () => {

    props.navigation.navigate('Register');
  };

  const gotoForgotPassword = () => {
    props.navigation.navigate('ForgotPassword');
  };
  const onChangeEmailText = (text) => {
    let checkEmailvalidation = EmailValidation(text)
    if (checkEmailvalidation == true) {
      setEmail(text)
      setErrorEmailStatus(false)
    }
    else {
      setEmail(text)
      setErrorEmailStatus(true)
    }
  };
  const onChangePasswordText = (text) => {
    setPassword(text)
    setErrorPasswordStatus(false)
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground
        source={Images.loginBg}
        style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView contentContainerStyle={{ paddingBottom: hp('5%') }}>
          <View style={styles.logoConatiner}>
            <Image source={Images.logo} style={styles.logoStyle} />
            <Text style={styles.logoTxt}>GET FRESH WITH US.</Text>
          </View>

          <View style={{ marginHorizontal: wp('4%') }}>
            <Text style={styles.Headtxt}>Login</Text>
            <TextInputs
              placeholder={'Email Address'}
              value={Email}
              keyboardType={'email-address'}
              borderColor={ErrorEmailStatus ? 'red' : 'transparent'}
              onChangeText={text => onChangeEmailText(text)}
            />
            <TextInputs
              password
              icon
              placeholder={'Password'}
              value={Password}
              borderColor={ErrorPasswordStatus ? 'red' : 'transparent'}
              onChangeText={text => onChangePasswordText(text)}
            />
            <Text onPress={gotoForgotPassword} style={styles.ForgtPassTxt}>
              Forgot Password?
            </Text>
            <View style={{ marginTop: hp('5%') }}>
              {loading ? (
                <ActivityIndicator size="large" color="red" />
              ) : (
                <Buttons label="Sign in" onPress={handleSignIn} />
              )}
            </View>
            <View style={styles.line} />
            <Text style={styles.signupTxt}>
              Don’t have an account?
              <Text
                onPress={gotoSignup}
                style={{ color: Colors.appColor, fontWeight: 'bold' }}>
                {' '}
                Sign Up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  logoConatiner: {
    alignSelf: 'center',
    marginTop: hp('10%'),
    marginBottom: hp('17%'),
  },
  logoStyle: {
    height: wp('45%'),
    width: wp('45%'),
    resizeMode: 'contain',
  },
  logoTxt: {
    textAlign: 'center',
    color: Colors.blackSecond,
    marginTop: -hp('5%'),
    fontSize: 14,
  },
  Headtxt: {
    color: Colors.blackFirst,
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: hp('3%'),
  },
  TxtInpContainer: {
    backgroundColor: Colors.grayfade,
    marginTop: wp('3%'),
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TxtInp: {
    paddingVertical: wp('4%'),
    fontSize: 14,
    paddingLeft: wp('3%'),
  },
  ForgtPassTxt: {
    alignSelf: 'flex-end',
    marginTop: wp('3%'),
    fontSize: 12,
    color: Colors.gray,
  },
  line: {
    backgroundColor: Colors.gray,
    height: 1,
    marginTop: hp('7%'),
  },
  signupTxt: {
    color: Colors.blackFirst,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: hp('3%'),
  },
});

export default Login;



