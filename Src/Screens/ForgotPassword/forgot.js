import React, {useEffect, useState} from 'react';
import {StyleSheet,KeyboardAvoidingView,ActivityIndicator, View, Image, Text, ImageBackground, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../Components/CommonUtils/Colors';
import AuthHeader from '../../Components/Header/authHeader';
import TextInputs from '../../Components/CommonUtils/TextInput';
import Buttons from '../../Components/CommonUtils/Button';
import Images from '../../Components/CommonUtils/Images';
import {useDispatch, useSelector} from 'react-redux';
import {sentOtpApiActionCreator} from './../../redux/actions/Authentication/AuthenticationApiCreator';
import {EmailValidation} from '../../Validation/RegExpressionValidation'
import InnerHeader from '../../Components/Header/innerHeader';
const ForgotPassword = props => {
  const [Email, setEmail] = useState('');
  const [ErrorEmailStatus,setErrorEmailStatus]=useState(false)
  const [IsEmailSent,setIsEmailSent]=useState(false)
  
  const dispatch = useDispatch();


const handleForgot = async() => {
  setIsEmailSent(true)
  if(Email =='' || ErrorEmailStatus == true)
  {
    setErrorEmailStatus(true)
    setIsEmailSent(false)
  }

  else{
    let data ={
      type:'requestResetPassword',
      //vEmail:'div@mailinator.com',
      vEmail:Email,
      UserType:'Passenger'
    }


    let res = await  dispatch(sentOtpApiActionCreator(data))
    if (res?.data?.Action == 1) {
      alert('Your OTP has been sent successfully.')
      setIsEmailSent(false)
      props.navigation.navigate('CheckMail',{_Email:Email});
    }
    else{
      alert('You have entered wrong account details.')
      setIsEmailSent(false)
    }
   
    
  }
    
  };
 
  const onChangeEmailText = (text) => {
    let checkEmailvalidation=EmailValidation(text)
    if(checkEmailvalidation==true)
    {
      setEmail(text)
      setErrorEmailStatus(false)
    }
    else{
      setEmail(text)
      setErrorEmailStatus(true)
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
        backgroundColor={'transparent'}
              IsShadow={true}
          //headerText={'Edit Profile'}
         // right={'cartNote'}
          goBack={() => props.navigation.goBack()}
          />
        {/* <Image
        source={Images.round_logo}
        style={{
          alignSelf: 'center',
          height: wp('20%'),
          width: wp('20%'),
          marginBottom: hp('7%'),
        }}
      /> */}
      <ScrollView>
        <View style={styles.logoConatiner}>
          <Image source={Images.logo} style={styles.logoStyle} />
          <Text style={styles.logoTxt}>GET FRESH WITH US.</Text>
        </View>

        <View style={{marginHorizontal: wp('4%'), marginTop: hp('5%')}}>
          <Text style={styles.headTxt}>Forgot Password</Text>
          <Text style={styles.Txt}>
            Enter the email associated with your account and we’ll send an email
            with instructions to reset your password.
          </Text>
          <TextInputs
            placeholder={'Email Address'}
            value={Email}
            borderColor={ErrorEmailStatus?'red':'transparent'}
            keyboardType={'email-address'}
            onChangeText={text => onChangeEmailText(text)}
          />
          <View style={{marginTop: hp('8%')}}>
          {IsEmailSent ? <ActivityIndicator size="large" color="red" />
          :
            <Buttons label="Send Instructions" onPress={handleForgot} />
    }
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
    marginBottom: hp('2%'),
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
});

export default ForgotPassword;
