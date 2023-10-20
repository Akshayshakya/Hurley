import React, { useEffect, useState } from 'react';
import {
  StyleSheet, BackHandler, View, Image, Text, ImageBackground,
  ActivityIndicator
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  _getClientToken,
  UpdateUserinLoyaltyLane,
} from './../../Services/LoyalityLaneServices';
import Colors from '../../Components/CommonUtils/Colors';
import InnerHeader from '../../Components/Header/innerHeader';
import Images from '../../Components/CommonUtils/Images';
import Buttons from '../../Components/CommonUtils/Button';
import TextInputs from '../../Components/CommonUtils/TextInput';
import CountryPicker from 'react-native-country-picker-modal';
import ImagePicker from 'react-native-image-crop-picker';
import CalenderComponent from '../../Components/CommonUtils/Calendar';
import DropdownComponent from '../../Components/CommonUtils/DropDown';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from './../../redux/actions/UserProfile/UserProfileApiCreator';
import { EmailValidation } from '../../Validation/RegExpressionValidation';
const EditProfile = props => {
  const dispatch = useDispatch();
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Gender, setGender] = useState('');
  const [Dob, setDob] = useState();
  const [withFlag, setWithFlag] = useState(true);
  const [countryCode, setCountryCode] = useState('US');
  const [country, setCountry] = useState(null);
  const [callingCode, setCallingCode] = useState('+1');
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [image, setImage] = useState(null);
  const [IsUpdateloading, setIsUpdateloading] = useState(false);

  const [ErrorFirstNameStatus, setErrorFirstNameStatus] = useState(false)
  const [ErrorLastNameStatus, setErrorLastNameStatus] = useState(false)
  const [ErrorEmailStatus, setErrorEmailStatus] = useState(false)
  const [ErrorPhoneStatus, setErrorPhoneStatus] = useState(false)
  const [ErrorDobStatus, setErrorDobStatus] = useState(false)
  const [ErrorGenderStatus, setErrorGenderStatus] = useState(false)

  const loginData = useSelector((state) => state.authenticationReducer.data);
  const onSelect = country => {
    var calling_code =
      country.callingCode != '' ? '+' + country.callingCode : '';
    setCountryCode(country.cca2);
    setCountry(country);
    setCallingCode(calling_code);
  };

  const getClientToken = async () => {
    let data = {
      adminusername: 'biizyapi',
      adminpassword: 'Smj38yeHZu',
      clientusername: 'hurleys',
    };
    let res = await dispatch(_getClientToken(data));
    if (res.data.data.ClientToken != '' || res.data.data.ClientToken != undefined) {
      let _token = res.data.data.ClientToken;
      _UpdateUserinLoyaltyLaneDB(_token)

    }
    else {
      setIsUpdateloading(false)
      alert(res.data.message)
    }

  };
  const _UpdateUserinLoyaltyLaneDB = async (_CToken) => {
    let data = {
      accountid: loginData.data.message?.iAccountId,
      firstname: FirstName,
      lastname: LastName,
      homephone: '',
      mobilephone: Phone,
      email: Email,
      homestore: '1',
      membertype: 'Retail',
      cashiernumber: '1026',
      home_store_id: "0",
      shopper_level_id: "0"
    };
    let res = await dispatch(UpdateUserinLoyaltyLane(data, _CToken));
    if (res.data.result == 'OK') {
      alert('User updated Successfully.')
      setIsUpdateloading(false)
    }
    else {
      setIsUpdateloading(false)
      alert(res.data.message)
    }
  }


  const handleEdit = async () => {
    if (FirstName == '' || ErrorFirstNameStatus == true) {
      setErrorFirstNameStatus(true)
    }
    else if (LastName == '' || ErrorLastNameStatus == true) {
      setErrorLastNameStatus(true)
    }
    else if (Email == '' || ErrorEmailStatus == true) {
      setErrorEmailStatus(true)
    }
    else if (Phone == '' || ErrorPhoneStatus == true) {
      setErrorPhoneStatus(true)
    }
    else {
      setIsUpdateloading(true)
      let data = {
        type: 'updateUserProfileDetail',
        iMemberId: loginData.data.message?.iUserId,
        vName: FirstName,
        vLastName: LastName,
        vPhone: Phone,
        PhoneCode: callingCode,
        vCountry: countryCode,
        vEmail: Email,
        CurrencyCode: "",
        UserType: 'Passenger',
        vCurrency: '',
        vLang: '',
        eGender: Gender,
        dBirthDate: Dob,
        tDestinationAddress: loginData.data.message?.tDestinationAddress,
        vLatitude: '',
        vLongitude: '',
        isDefault: '1'
      }


      let res = await dispatch(updateUserProfile(data))
      if (res?.data?.Action == 1) {
        getClientToken()
      }
      else {
        setIsUpdateloading(false)
        alert('Something went wrong.')
      }
    }
  };

  const handleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image?.path);
    });
  };

  useEffect(() => {

    console.log(JSON.stringify(loginData.data.message?.vCountry))
    let _Country_Code = loginData.data.message?.vCountry;
    let intergerCountryCode = Number.parseInt(_Country_Code)
    console.log(JSON.stringify(Number.isInteger(intergerCountryCode)))

    setFirstName(loginData?.data?.message?.vName)
    setLastName(loginData?.data?.message?.vLastName)
    setEmail(loginData?.data?.message?.vEmail)
    setPhone(loginData?.data?.message?.vPhone)
    setDob(loginData?.data?.message?.dBirthDate)
    setGender(loginData?.data?.message?.eGender)
    setCallingCode(loginData?.data?.message?.vPhoneCode)
    if (Number.isInteger(intergerCountryCode) == true) {
      setCountryCode('KY')
    }
    else {
      setCountryCode(loginData?.data?.message?.vCountry)
    }
    const backAction = () => {
      props.navigation.goBack()
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [])

  return (
    <View style={styles.mainView}>
      <ImageBackground source={Images.theme} style={{ flex: 1 }}>
        <InnerHeader
          headerText={'Edit Profile'}
          right={'cartNote'}
          goBack={() => props.navigation.goBack()}
          goCart={() => {
            let webURL = 'https://hurleys.ky/list/'
            props.navigation.navigate('ShopWeb', { webURL });
          }}
          NotificationScreen={() => {
            props.navigation.navigate('Notification');
          }}
        />
        <Image
          source={image ? { uri: image } : Images.Profile}
          style={styles.ImgStyle}
        />
        <Text style={{ ...styles.nametxt, marginLeft: wp('4%') }}>
          Basic Details
        </Text>
        <View style={{ paddingHorizontal: wp('4%') }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TextInputs
                placeholder={'First Name'}
                value={FirstName}
                borderColor={ErrorFirstNameStatus ? 'red' : 'transparent'}
                onChangeText={text => {
                  let FirstN_text = text.replace(/[^a-z]/gi, '')
                  if (FirstN_text == '') {
                    setErrorFirstNameStatus(true)
                    setFirstName(FirstN_text)
                  }
                  else {
                    setErrorFirstNameStatus(false)
                    setFirstName(FirstN_text)
                  }

                }}
              />
            </View>
            <View style={{ marginHorizontal: wp('1%') }} />
            <View style={{ flex: 1 }}>
              <TextInputs
                placeholder={'Last Name'}
                value={LastName}
                borderColor={ErrorLastNameStatus ? 'red' : 'transparent'}
                onChangeText={text => {
                  let LastN_text = text.replace(/[^a-z]/gi, '')
                  if (LastN_text == '') {
                    setErrorLastNameStatus(true)
                    setLastName(LastN_text)
                  }
                  else {
                    setErrorLastNameStatus(false)
                    setLastName(LastN_text)
                  }
                }
                }
              />
            </View>
          </View>

          <TextInputs
            placeholder={'Email Address'}
            value={Email}
            borderColor={ErrorEmailStatus ? 'red' : 'transparent'}
            keyboardType={'email-address'}
            onChangeText={text => {
              let checkEmailvalidation = EmailValidation(text);
              if (checkEmailvalidation == true) {
                setEmail(text);
                setErrorEmailStatus(false);
              } else {
                setEmail(text);
                setErrorEmailStatus(true);
              }
            }

            }
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
              <Image source={Images.arrow_down} style={styles.downArrowIcon} />
              <Text style={styles.callingCodeTxt}>{callingCode}</Text>
            </View>
            <View style={{ marginHorizontal: wp('1%') }} />
            <View style={{ flex: 1 }}>
              <TextInputs
                placeholder={'Phone Number'}
                keyboardType={'phone-pad'}
                value={Phone}
                borderColor={ErrorPhoneStatus ? 'red' : 'transparent'}
                onChangeText={text => {
                  if (text == '') {
                    setPhone(text);
                    setErrorPhoneStatus(true);
                  }
                  else {
                    setPhone(text);
                    setErrorPhoneStatus(false);
                  }
                }}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row', height: 55 }}>
            <View style={{ flex: 1 }}>
              <CalenderComponent
                FinalValue={Dob}
                borderColor={ErrorDobStatus ? 'red' : 'transparent'}
                getDate={date => setDob(date)} />
            </View>
            <View style={{ marginHorizontal: wp('1%') }} />
            <View style={{ flex: 1 }}>
              <DropdownComponent
                placeholder={Gender}
                value={Gender}
                borderColor={ErrorGenderStatus ? 'red' : 'transparent'}
                onChange={item => setGender(item.value)}
              />
            </View>
          </View>


          {IsUpdateloading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <View style={{ marginTop: hp('15%') }}>
              <Buttons label="Save" onPress={handleEdit} />
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  ImgStyle: {
    height: wp('20%'),
    width: wp('20%'),
    borderRadius: wp('20%') / 2,
    borderWidth: 5,
    borderColor: Colors.greenAppColor,
    alignSelf: 'center',
    marginTop: wp('4%'),
  },
  iconBg: {
    height: wp('8%'),
    width: wp('8%'),
    borderRadius: wp('8%') / 2,
    backgroundColor: Colors.appColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'),
    alignSelf: 'center',
    marginLeft: wp('18%'),
    marginTop: -hp('3.5%'),
  },
  nametxt: {
    color: Colors.blackFirst,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: hp('4%'),
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
});

export default EditProfile;
