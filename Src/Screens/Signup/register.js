import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Linking,
  View,
  PermissionsAndroid,
  Image,
  Text,
  TouchableOpacity,
  ScrollView, TextInput,
  ImageBackground,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import SeachPlace from './SeachPlace'
import Geocoder from 'react-native-geocoding';
import CountryPicker from 'react-native-country-picker-modal';
import Colors from '../../Components/CommonUtils/Colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { isANDROID } from '../../Components/CommonUtils/ThemeHelper';
import TextInputs from '../../Components/CommonUtils/TextInput';
import Images from '../../Components/CommonUtils/Images';
import Buttons from '../../Components/CommonUtils/Button';
import CalenderComponent from '../../Components/CommonUtils/Calendar';
import DropdownComponent from '../../Components/CommonUtils/DropDown';
import { useDispatch, useSelector } from 'react-redux';
import { registerApiActionCreator } from './../../redux/actions/Authentication/AuthenticationApiCreator';
import {
  EmailValidation,
  PasswordValidation,
} from '../../Validation/RegExpressionValidation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  _getClientToken,
  CreateNewUserinLoyaltyLane,
  _getLoyaltyCardNumber
} from './../../Services/LoyalityLaneServices';
import Geolocation from 'react-native-geolocation-service';
import GoogleMap from '../../Components/GoogleMap/googleMap';
import InnerHeader from '../../Components/Header/innerHeader';

const Register = props => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Address, setAddress] = useState('');
  const [Gender, setGender] = useState('');
  const [Dob, setDob] = useState('');
  const [Password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [countryCode, setCountryCode] = useState('KY');
  const [country, setCountry] = useState(null);
  const [City, setCity] = useState('Cayman');
  const [callingCode, setCallingCode] = useState('+1345');
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [Fcm_Token, setFCM_Token] = useState('');
  const [Zip_Code, setZip_Code] = useState('KY1');
  // states for errors
  const [FirstNameErrorStatus, setFirstNameErrorStatus] = useState(false);
  const [LastNameErrorStatus, setLastNameErrorStatus] = useState(false);
  const [EmailErrorStatus, setEmailErrorStatus] = useState(false);
  const [PhoneErrorStatus, setPhoneErrorStatus] = useState(false);
  const [AddressErrorStatus, setAddressErrorStatus] = useState(false);
  const [PasswordErrorStatus, setPasswordErrorStatus] = useState(false);
  const [GenderErrorStatus, setGenderErrorStatus] = useState(false);

  const [DobErrorStatus, setDobErrorStatus] = useState(false);
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();
  const dispatch = useDispatch();

  const loading = useSelector(state => state.authenticationReducer.loading);

  const GetFcm_Token = async () => {
    let _Fcm_token = await AsyncStorage.getItem('fcm_token');
    setFCM_Token(_Fcm_token);
    console.log('++++++++++++');
  };
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
            getAddressWithCordinates();
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
  useEffect(() => {
    Geocoder.init("AIzaSyDLWZtQIx0JsQciFm7VLzSKJOS_QqjJsoA", { language: "en" });
    CheckIOSMapPermission()
    GetFcm_Token();
  }, []);

  const checkpermissionlocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        // alert("You can use the location");
        getAddressWithCordinates();
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getAddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        let MainFullAddress = json.results[0].formatted_address;
        var addressComponent2 = json.results[0].address_components[1];
        setCity(addressComponent2.long_name);
        setZip_Code(json.results[1]?.address_components[6]?.long_name)
        setAddress(MainFullAddress);
      })
      .catch(error => console.warn(error));
  };

  const getAddressWithCordinates = () => {

    Geolocation.watchPosition(
      position => {
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
        getAddress(position.coords.latitude, position.coords.longitude);

      },
      error => {
        alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  };

  const onSelect = country => {
    var calling_code =
      country.callingCode != '' ? '+' + country.callingCode : '';
    setCountryCode(country.cca2);
    setCountry(country);
    setCallingCode(calling_code);
  };


  const checkdigit = (card_No) => {
    let g = card_No
    let array = g.split('').reverse();
    let total = 0;
    let i = 1;
    array.forEach(number => {
      number = parseInt(number);
      if (i % 2 === 0) {
        total = total + number;
      }
      else {
        total = total + (number * 3);
      }
      i++;
    });

    return (Math.ceil(total / 10) * 10) - total;
  }

  const _getCardNumber = async (_Client_Token) => {
    let res = await dispatch(_getLoyaltyCardNumber());
    let Final_no = checkdigit(res.data.data[0].virtual_cards)
    let Full_CardNumber = res.data.data[0].virtual_cards + Final_no
    SignUpUserInLoyaltyLane(Full_CardNumber, _Client_Token);
  }

  const getClientToken = async () => {
    let data = {
      adminusername: 'biizyapi',
      adminpassword: 'Smj38yeHZu',
      clientusername: 'hurleys',
    };
    let res = await dispatch(_getClientToken(data));
    if (res.data.data.ClientToken != '' || res.data.data.ClientToken != undefined) {
      let _token = res.data.data.ClientToken;
      _getCardNumber(_token)

    }
    else {
      setIsLoading(false)
      alert(res.data.message)
    }
  };

  const UserHurleysSignUp = async (_Acc_id, LoyaltyCard_Number) => {
    let data = {
      type: 'signup',
      vFirstName: FirstName,
      vLastName: LastName,
      vEmail: Email,
      vPhone: Phone,
      vPassword: Password,
      PhoneCode: callingCode,
      CountryCode: countryCode,
      vDeviceType: Platform.OS == 'android' ? 'Android' : 'ios',
      vInviteCode: '',
      UserType: 'Passenger',
      vCurrency: '',
      vLang: '',
      eGender: Gender,
      dBirthDate: Dob,
      tDestinationAddress: Address,
      // vLatitude: latitude ? latitude : '5657676.88',
      // vLongitude: longitude ? longitude : '577887.88',
      vLatitude:'5657676.88',
      vLongitude:'577887.88',
      fcm_token: Fcm_Token,
      user_city: City,
      iAccountID: _Acc_id,
      user_loyalty_card_number: '',
      card_number: LoyaltyCard_Number
    };
    let res = await dispatch(registerApiActionCreator(data));
    console.log(JSON.stringify(res))
    if (res?.data?.Action == 1) {
      props.navigation.navigate('DrawerStack');
      setIsLoading(false)
    } else {
      setIsLoading(false)
      alert('You already have an account registered with the email address. Please sign in or request a password reset.');
    }

  }

  const SignUpUserInLoyaltyLane = async (LoyaltyCard_Number, _clientToken) => {
    let data = {
      firstname: FirstName,
      lastname: LastName,
      streetaddress1: Address,
      city: City,
      state: 'Mo',
      zipcode: '65301',
      homephone: '',
      mobilephone: Phone,
      email: Email,
      password: Password,
      cardnumber: LoyaltyCard_Number,
      homestore: '1',
      membertype: 'Retail',
      cashiernumber: '1026',
    };
    let res = await dispatch(CreateNewUserinLoyaltyLane(data, _clientToken));
    if (res.data.result == 'OK') {
      let _account_id = res.data.data.full_account.NewAccountShopper.AccountId
      UserHurleysSignUp(_account_id, LoyaltyCard_Number)
      setIsLoading(false)
    }
    else {
      setIsLoading(false)
      alert(res.data.message)
    }
  };

  const handleSignUp = async () => {
    if (FirstName == '') {
      setFirstNameErrorStatus(true);
    } else if (LastName == '') {
      setLastNameErrorStatus(true);
    } else if (Email == '' || EmailErrorStatus == true) {
      setEmailErrorStatus(true);
    } else if (Phone == '' || PhoneErrorStatus == true) {
      setPhoneErrorStatus(true);
    } else if (Address == '') {
      setAddressErrorStatus(true);
    } else if (Dob == '' || DobErrorStatus == true) {
      setDobErrorStatus(true);
    } else if (Gender == '' || GenderErrorStatus == true) {
      setGenderErrorStatus(true);
    } else if (Password == '' || PasswordErrorStatus == true) {
      setPasswordErrorStatus(true);
    } else {
      setIsLoading(true)
      getClientToken()
    }
  };

  const gotoSignin = () => {
    props.navigation.navigate('Login');
  };
  
  const onChangeFirstNameText = text => {
    let FirstN_text = text.replace(/[^a-z]/gi, '')
    setFirstName(FirstN_text);
    setFirstNameErrorStatus(false);
  };
  const onChangeLastNameText = text => {
    let LastN_text = text.replace(/[^a-z]/gi, '')
    setLastName(LastN_text);
    setLastNameErrorStatus(false);
  };
  const GotoPrivacyAndPolicy = () => {
    Linking.openURL('https://loyalty.hurleys.ky/privacy-policy');
  };
  const GotoTermsConditions = () => {
    Linking.openURL('https://loyalty.hurleys.ky/terms-condition');
  };
  const ConfirmAddress = () => {
    setIsMap(false);
  };
  const onChangeEmailText = text => {
    let checkEmailvalidation = EmailValidation(text);
    if (checkEmailvalidation == true) {
      setEmail(text);
      setEmailErrorStatus(false);
    } else {
      setEmail(text);
      setEmailErrorStatus(true);
    }
  };
  const onChangePhoneNoText = text => {
    if (text == '') {
      setPhone(text);
      setPhoneErrorStatus(true);
    }
    else {
      setPhone(text);
      setPhoneErrorStatus(false);
    }

  };
  const onChangeAddressText = text => {
    setAddress(text);
    setAddressErrorStatus(false);
  };
  const onChangeDobText = text => {
    setDob(text);
    setDobErrorStatus(false);
  };
  const onChangeGenderText = text => {
    setGender(text);
    setGenderErrorStatus(false);
  };
  const onChangePasswordText = text => {
    let checkPassValidation = PasswordValidation(text);
    if (checkPassValidation == true) {
      setPassword(text);
      setPasswordErrorStatus(false);
    } else {
      setPassword(text);
      setPasswordErrorStatus(true);
    }
  };


  const openMapandClose = text => {
    setIsMap(false);
    setIsSearch(true)
  };

  const GotoMapScreen = text => {
    Platform.OS == 'ios' ? CheckIOSMapPermission :
      checkpermissionlocation();
    setIsMap(true);
  };
  const onRegionChange = Region => {
    setlatitude(Region.latitude);
    setlongitude(Region.longitude);
    getAddress(Region.latitude, Region.longitude);
  };

  return (
    <View style={styles.mainView}>
      <ImageBackground source={Images.loginBg} style={{ flex: 1 }}>
        <InnerHeader
          IsShadow={true}
          goBack={() => {
            if (IsSearch == true) {
              setIsSearch(false)
            }
            else if (IsMap == true) {
              setIsMap(false)
            }
            else {
              props.navigation.goBack()
            }

          }}
        />
        {IsMap ? (
          <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: 'transparent' }}>
            <View style={{ flexDirection: 'row', width: '100%', paddingVertical: 5 }}>
              <TextInput
                style={{ backgroundColor: 'white', borderColor: '#E5E4E2', borderWidth: 1, borderRadius: 8, width: '100%', height: 45, marginTop: 10 }}
                onFocus={() => openMapandClose()}
                placeholder={'Search Place'}

              />
            </View>
            <GoogleMap
              style={{
                height: hp('100%'),
                width: wp('100%'),
                borderRadius: 20,
                borderWidth: 1,
                borderColor: Colors.greenAppColor,
                alignSelf: 'center',
                marginBottom: 10,

              }}
              onRegionChange={onRegionChange}
              Maplat={latitude}
              Maplng={longitude}
            />
            <TouchableOpacity style={styles.BtnContainer} onPress={ConfirmAddress}>
              <Text style={styles.labeltxt}>Confirm</Text>
            </TouchableOpacity>

          </View>
        ) : IsSearch ?
          (<SeachPlace
            onPress={(data, details = null) => {
              setlatitude(details.geometry.location.lat)
              setlongitude(details.geometry.location.lng)
              setIsSearch(false)
              setIsMap(true)
              setAddress(details.formatted_address)
            }}
          />)
          : (
            <ScrollView contentContainerStyle={styles.scrollcontainer}>
              <View style={styles.logoConatiner}>
                <Image source={Images.logo} style={styles.logoStyle} />
                <Text style={styles.logoTxt}>GET FRESH WITH US.</Text>
              </View>

              <Text style={styles.headTxt}>Register</Text>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <TextInputs
                    placeholder={'First Name'}
                    value={FirstName}
                    borderColor={FirstNameErrorStatus ? 'red' : 'transparent'}
                    onKeyPress={() => {
                      props.navigation.navigate('AddAddress');
                    }}
                    onChangeText={text => onChangeFirstNameText(text)}
                  />
                </View>
                <View style={{ marginHorizontal: wp('1%') }} />
                <View style={{ flex: 1 }}>
                  <TextInputs
                    placeholder={'Last Name'}
                    value={LastName}
                    borderColor={LastNameErrorStatus ? 'red' : 'transparent'}
                    onChangeText={text => onChangeLastNameText(text)}
                  />
                </View>
              </View>
              <TextInputs
                placeholder={'Email Address'}
                value={Email}
                borderColor={EmailErrorStatus ? 'red' : 'transparent'}
                keyboardType={'email-address'}
                onChangeText={text => onChangeEmailText(text)}
              />
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.countryCodeBg}>
                  <CountryPicker
                    {...{
                      countryCode,
                      withFlag,
                      withCallingCode,
                      onSelect,
                    }}
                  />
                  <Image
                    source={Images.arrow_down}
                    style={styles.downArrowIcon}
                  />
                  <Text style={styles.callingCodeTxt}>{callingCode}</Text>
                </View>

                <View style={{ marginHorizontal: wp('1%') }} />
                <View style={{ flex: 1 }}>
                  <TextInputs
                    placeholder={'Phone Number'}
                    keyboardType={'phone-pad'}
                    value={Phone}
                    borderColor={PhoneErrorStatus ? 'red' : 'transparent'}
                    onChangeText={text => onChangePhoneNoText(text)}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <View style={{ width: '100%' }}>
                  <TextInputs
                    placeholder={'Address'}
                    value={Address}
                    // multiline={true}
                   // onFocus={() => setIsSearch(true)}
                    borderColor={AddressErrorStatus ? 'red' : 'transparent'}
                    onChangeText={text => onChangeAddressText(text)}
                  />
                </View>
                {/* <TouchableOpacity
                  onPress={GotoMapScreen}
                  style={{
                    height: hp('7%'),
                    marginTop: 10,
                    width: '14%',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: Colors.grayfade,
                    borderRadius: 5,
                  }}>
                  <Image
                    source={Images.PlaceholderMap}
                    style={{ height: 25, width: 25 }}
                  />
                </TouchableOpacity> */}
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <CalenderComponent
                    FinalValue={Dob}
                    borderColor={DobErrorStatus ? 'red' : 'transparent'}
                    getDate={date => onChangeDobText(date)}
                  />
                </View>
                <View style={{ marginHorizontal: wp('1%') }} />
                <View style={{ flex: 1 }}>
                  <DropdownComponent
                    value={Gender}
                    borderColor={GenderErrorStatus ? 'red' : 'transparent'}
                    onChange={item => onChangeGenderText(item.value)}
                  />
                </View>
              </View>
              <TextInputs
                password
                icon
                placeholder={'Password'}
                value={Password}
                borderColor={PasswordErrorStatus ? 'red' : 'transparent'}
                onChangeText={text => onChangePasswordText(text)}
              />
              <Text style={[{ color: 'gray' }]}>
                {'Password should have combine patterns of small and capital case letters,' +
                  'number and any special character/symbol, and length should be 8 letters'}
              </Text>

              <View style={{ flexDirection: 'row', marginTop: wp('3%') }}>
                <TouchableOpacity
                  onPress={() => setChecked(!checked)}
                  style={{ flexDirection: 'row', marginRight: wp('2%') }}>
                  <MaterialIcon
                    name={
                      checked
                        ? 'checkbox-marked-outline'
                        : 'checkbox-blank-outline'
                    }
                    size={25}
                    color={Colors.gray}
                  />
                </TouchableOpacity>
                <Text
                  style={{ fontSize: 12, color: Colors.gray, alignSelf: 'center' }}>
                  I agree to the{' '}
                  <Text
                    onPress={GotoTermsConditions}
                    style={{ color: Colors.skyblue }}>
                    Terms & Conditions
                  </Text>{' '}
                  and{' '}
                  <Text
                    onPress={GotoPrivacyAndPolicy}
                    style={{ color: Colors.skyblue }}>
                    Privacy Policy
                  </Text>
                </Text>
              </View>
              <View style={{ marginTop: hp('5%') }}>
                {loading ? (
                  <ActivityIndicator size="large" color="red" />
                ) : (
                  <View>
                    {IsLoading ? <ActivityIndicator size="large" color="red" /> :
                      <Buttons label="Sign Up" onPress={handleSignUp} />
                    }
                  </View>
                )}
              </View>
              <View style={styles.line} />
              <Text style={styles.signupTxt}>
                Already have an account?
                <Text
                  onPress={gotoSignin}
                  style={{ color: Colors.appColor, fontWeight: 'bold' }}>
                  {' '}
                  Sign in
                </Text>
              </Text>
            </ScrollView>
          )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logo: {
    alignSelf: 'center',
    height: wp('20%'),
    width: wp('20%'),
  },
  logoConatiner: {
    alignSelf: 'center',
    marginTop: -hp('5%'),
    marginBottom: hp('3%'),
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
  scrollcontainer: {
    paddingBottom: hp('5%'),
    paddingHorizontal: wp('4%'),
  },
  backBtn: {
    backgroundColor: Colors.grayfade,
    marginTop: isANDROID ? hp('2%') : hp('7%'),
    alignSelf: 'flex-start',
    marginBottom: hp('7%'),
    padding: wp('1%'),
    borderRadius: 10,
  },
  headTxt: {
    fontSize: 21,
    color: Colors.blackFirst,
    fontWeight: 'bold',
    marginBottom: hp('3%'),
  },
  callingCodeTxt: {
    fontSize: 17,
    letterSpacing: 0.5,
    alignSelf: 'center',
    color: Colors.blackFirst,
    marginRight: wp('2%'),
  },
  downArrowIcon: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    marginRight: wp('2%'),
    alignSelf: 'center',
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

  countryCodeBg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp('3%'),
    borderRadius: 10,
    // flex: 0.3,
    backgroundColor: Colors.grayfade,
    flexDirection: 'row',
    paddingHorizontal: wp('3%'),
  },
  searchBar: {
    width: '90%',
    height: 40,
    alignSelf: 'center',
    marginTop: 100,
    backgroundColor: 'red'
  },
  BtnContainer: {
    backgroundColor: Colors.appColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: wp('3%'),
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
    bottom: 0,
    marginBottom: 5,
    position: 'absolute',
    borderColor: Colors.appColor,
  },
  labeltxt: { textAlign: 'center', fontSize: 18, color: Colors.white, fontWeight: 'bold' },
});

export default Register;
