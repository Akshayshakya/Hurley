import React, {useEffect, useRef,useState} from 'react';
import {StyleSheet,KeyboardAvoidingView, View, Image, Text, ImageBackground, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import InnerHeader from '../../Components/Header/innerHeader';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Colors from '../../Components/CommonUtils/Colors';
import AuthHeader from '../../Components/Header/authHeader';
import TextInputs from '../../Components/CommonUtils/TextInput';
import Buttons from '../../Components/CommonUtils/Button';
import {color, isANDROID} from '../../Components/CommonUtils/ThemeHelper';
import Images from '../../Components/CommonUtils/Images';
import CountDown from 'react-native-countdown-component';
import {useDispatch, useSelector} from 'react-redux';
import {verifyOtpApiActionCreator,sentOtpApiActionCreator} from './../../redux/actions/Authentication/AuthenticationApiCreator';
import CountDownTimer from 'react-native-countdown-timer-hooks';
 
const VerifyOtpScreen = props => {
  const _emailData= props.route.params.FinalEmailShow

  const [IsCounterOver, setIsCounterOver] = useState(false);
  const refTimer = useRef();
  const [otpCode, setOtpCode] = useState('');
  const [Timerwatch, setTimerwatch] = useState(60);
  const [ErrorOtpCodeStatus,setErrorOtpCodeStatus]=useState(false)
  const [IsTimeOver,setIsTimeOver]=useState(false)
  
  const dispatch = useDispatch();

  const handleVerify = async() => {
    if(otpCode=='')
    { 
      setErrorOtpCodeStatus(true)
    }
    else{
      let data ={
        type:'verify_otp_reset_password',
        otp:otpCode,
        newpassword:'',
        vPassword:'',
        UserType:'Passenger'
      }
      let res = await dispatch(verifyOtpApiActionCreator(data))
     //alert(JSON.stringify(res))
      if (res?.data?.Action == 1) {
        alert('Your OTP has been verified successfully.')
        props.navigation.navigate('ResetPassword',{otpCode});
      }
      else{
        alert('You have entered wrong OTP.')
      }
    }
    //props.navigation.navigate('ResetPassword');
  };

  useEffect(() => {

 
   },[] );

   const timerCallbackFunc = (timerFlag) => {
    // Setting timer flag to finished
    setIsTimeOver(true)
    setTimerwatch(0)

  };
   const handleForgot = async() => {
    
    // setIsEmailSent(true)
    // if(Email =='' || ErrorEmailStatus == true)
    // {
    //   setErrorEmailStatus(true)
    //   setIsEmailSent(false)
    // }
  
    // else{
      let data ={
        type:'requestResetPassword',
        //vEmail:'div@mailinator.com',
        vEmail:_emailData,
        UserType:'Passenger'
      }
  
  
      let res = await  dispatch(sentOtpApiActionCreator(data))
      if (res?.data?.Action == 1) {
        alert('Your OTP has been sent successfully.')
        setIsTimeOver(false)
        setTimerwatch(60)
        refTimer.current.resetTimer();
    
     
        //props.navigation.navigate('CheckMail',{_Email:Email});
      }
      else{
        alert('please go back and retry.')
        ///setIsEmailSent(false)
        setTimerwatch(0)
      }
     
      
    //}
      
    };

  const goBack = () => {
    props.navigation.goBack();
  };
  const onChangeOtpCodeText = (text) => {
    setOtpCode(text)
    setErrorOtpCodeStatus(false)
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
          goBack={() => props.navigation.goBack()}
          />
          <ScrollView>
        {/* <Image source={Images.round_logo} style={styles.logo} /> */}
        <View style={styles.logoConatiner}>
          <Image source={Images.logo} style={styles.logoStyle} />
          <Text style={styles.logoTxt}>GET FRESH WITH US.</Text>
        </View>

        <View style={{marginHorizontal: wp('4%'), marginTop: hp('10%')}}>
          <Text style={styles.headTxt}>Enter Verification code</Text>
          <Text style={styles.Txt}>
            Kindly enter the code which you have received at {" "}
            {/* Simranlawrence@gmail.com */}
            {_emailData}
          </Text>
          {/* <OTPInputView
            style={styles.otpStyle}
            pinCount={4}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
            }}
            code={otpCode}
            onCodeChanged={code => {
              setOtpCode(code);
            }}
          /> */}
          <TextInputs
            placeholder={'Enter OTP Code'}
            value={otpCode}
            borderColor={ErrorOtpCodeStatus?'red':'transparent'}
            //keyboardType={'email-address'}
            onChangeText={text => onChangeOtpCodeText(text)}
          />
          <View style={{marginTop: hp('8%')}}>
            <Buttons label="Verify" onPress={handleVerify} />
          </View>
 
          <View style={styles.resendView}>

            <Text style={{color: Colors.blackFirst, fontSize: 12}}>Didn't receive OTP? </Text>
            {IsTimeOver ?
             <Text onPress={handleForgot} style={{fontWeight:'bold',color: Colors.blackFirst,fontWeight:'bold', fontSize: 12}}>Resend</Text>

            :
            
<CountDownTimer
          ref={refTimer}
          timestamp={Timerwatch}
          timerCallback={timerCallbackFunc}
          containerStyle={{
            height: 30,
            width: 75,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 35,
            backgroundColor: '#FFFFFF',
          }}
          textStyle={{
            fontSize: 17,
            color: 'black',
            fontWeight: '500',
            letterSpacing: 0.25,
          }}
        />
}
            <Text style={{color: Colors.blackFirst, fontSize: 12}}>{IsTimeOver ?null: "Sec"}</Text>
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
  logo: {
    alignSelf: 'center',
    height: wp('20%'),
    width: wp('20%'),
  },
  logoConatiner: {
    alignSelf: 'center',
    marginTop: -hp('3%'),
    // marginBottom: hp('5%'),
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
  otpStyle: {
    height: wp(12),
    marginTop: wp(5),
    marginHorizontal: wp(12),
  },
  underlineStyleBase: {
    width: wp(14),
    height: isANDROID ? hp(7) : hp(6),
    backgroundColor: Colors.grayfade,
    borderWidth: 1,
    borderColor: Colors.grayfade,
    color: Colors.blackFirst,
    borderRadius: 15,
    fontSize: 18,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.gray,
  },
  resendView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp('4%'),
    alignItems: 'center',
  },
  resendTxtView: {
    width: 1,
    height: hp(1.5),
    backgroundColor: Colors.blackFirst,
    marginHorizontal: wp('1%'),
    alignSelf: 'center',
  },
});

export default VerifyOtpScreen;
