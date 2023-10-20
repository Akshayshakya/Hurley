import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView,StyleSheet,ScrollView, View, Image, Text, ImageBackground} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  EmailValidation,
  FirstValidation,
  PasswordValidation,
} from '../../Validation/RegExpressionValidation';
import InnerHeader from '../../Components/Header/innerHeader';
import Colors from '../../Components/CommonUtils/Colors';
import AuthHeader from '../../Components/Header/authHeader';
import TextInputs from '../../Components/CommonUtils/TextInput';
import Buttons from '../../Components/CommonUtils/Button';
import Images from '../../Components/CommonUtils/Images';
import {savePasswordApiActionCreator} from './../../redux/actions/Authentication/AuthenticationApiCreator';
import {useDispatch, useSelector} from 'react-redux';
const ResetPassword = props => {

  const otp = props.route.params?.otpCode
  const [newPassword, setNewPassword] = useState('');
  const [Password, setPassword] = useState('');
  const [ErrorNewPasswordStatus,setErrorNewPasswordStatus]=useState(false)
  const [ErrorConfPasswordStatus,setErrorConfPasswordStatus]=useState(false)
  const dispatch = useDispatch();
  const handleReset = async() => {
    
    if(newPassword=='')
    {
      setErrorNewPasswordStatus(true)
    }
    else if(Password =='')
    {
      setErrorConfPasswordStatus(true)
    }
    else{
      let data ={
        type:'reset_password_after_verification',
        otp:otp,
        newpassword:newPassword,
        vPassword:Password,
        UserType:'Passenger'
      }
      let res = await dispatch(savePasswordApiActionCreator(data))
      if (res?.data?.Action == 1) {
        alert('Your Password has been changed successfully.')
        props.navigation.navigate('Login')
      }
      else{
        alert('Your passwords do not match, please try again.')
      }
    }
  };
  const onChangeNewPassWordText = (text) => {
    let checkPassValidation = PasswordValidation(text);
    if (checkPassValidation == true) {
      setNewPassword(text)
      setErrorNewPasswordStatus(false)
    } else {
      setNewPassword(text)
      setErrorNewPasswordStatus(true)
    }

  };
  const onChangeConfiPassWordText = (text) => {
    if(text !=newPassword)
    {
      setPassword(text)
      setErrorConfPasswordStatus(true)
    }
else{
  setPassword(text)
  setErrorConfPasswordStatus(false)
}
  };

  const goBack = () => {
    props.navigation.goBack();
  };
  return (
    <KeyboardAvoidingView style={styles.mainView}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground source={Images.loginBg} style={{flex: 1}}>
        {/* <AuthHeader goBack={goBack} help /> */}
        <InnerHeader 
              IsShadow={true}
          //headerText={'Edit Profile'}
         // right={'cartNote'}
          goBack={() => props.navigation.navigate('ForgotPassword')}
          />
        <ScrollView>
        {/* <Image
        source={Images.round_logo}
        style={{
          alignSelf: 'center',
          height: wp('20%'),
          width: wp('20%'),
          marginBottom: hp('5%'),
        }}
      /> */}
        <View style={styles.logoConatiner}>
          <Image source={Images.logo} style={styles.logoStyle} />
          <Text style={styles.logoTxt}>GET FRESH WITH US.</Text>
        </View>

        <View style={{marginHorizontal: wp('4%'), marginTop: hp('5%')}}>
          <Text style={styles.headTxt}>Create Password</Text>
          <Text style={styles.Txt}>
            Your new password must be different from previous used passwords.
          </Text>
          <TextInputs
          password
          icon
            placeholder={'New Password'}
            value={newPassword}
            borderColor={ErrorNewPasswordStatus?'red':'transparent'}
            onChangeText={text => onChangeNewPassWordText(text)}
          />

          <Text style={[styles.label]}>Must be at least 8 characters.</Text>

          <TextInputs
            password
            icon
            placeholder={'Confirm Password'}
            value={Password}
            borderColor={ErrorConfPasswordStatus?'red':'transparent'}
            onChangeText={text => onChangeConfiPassWordText(text)}
          />

          <Text style={[styles.label]}>Both passwords must match.</Text>

          <View style={{marginTop: hp('6%'),marginBottom:20}}>
            <Buttons label="Reset Password" onPress={handleReset} />
          </View>
        </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logoConatiner: {
    alignSelf: 'center',
    marginTop: -hp('3%'),
    marginBottom: hp('5%'),
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
  headTxt: {
    fontSize: 21,
    color: Colors.blackFirst,
    fontWeight: 'bold',
    marginBottom: hp('3%'),
  },
  Txt: {
    color: Colors.blackFirst,
    fontSize: 14,
    marginTop: hp('1%'),
    marginBottom: hp('5%'),
  },

  label: {
    color: Colors.gray,
    fontSize: 14,
    marginVertical: wp('2.5%'),
  },
});

export default ResetPassword;
