import React, {useEffect,useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import InnerHeader from '../../Components/Header/innerHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {openInbox} from 'react-native-email-link';
import Colors from '../../Components/CommonUtils/Colors';
import Images from '../../Components/CommonUtils/Images';
import Buttons from '../../Components/CommonUtils/Button';
import AuthHeader from '../../Components/Header/authHeader';

const CheckMail = props => {

 
  const _emailData= props.route.params._Email
  const [Email_, setEmail_] = useState(_emailData);




  const gotoReset = () => {
    props.navigation.navigate('VerifyOtp',{FinalEmailShow:Email_});
  };

  const changeMail = () => {
    props.navigation.navigate('ForgotPassword');
  };

  const goBack = () => {
    props.navigation.goBack();
  };
  return (
    <View style={styles.mainView}>
      <ImageBackground source={Images.loginBg} style={{flex: 1}}>
        {/* <AuthHeader goBack={goBack} help /> */}
        <InnerHeader
          IsShadow={true}
          //headerText={'Edit Profile'}
         // right={'cartNote'}
          goBack={() => props.navigation.goBack()}
          />
        {/* <Image source={Images.round_logo} style={styles.logo} /> */}
        <ScrollView>
        <View style={styles.logoConatiner}>
          <Image source={Images.logo} style={styles.logoStyle} />
          <Text style={styles.logoTxt}>GET FRESH WITH US.</Text>
        </View>

        <View style={{marginHorizontal: wp('4%'), flex: 1}}>
          <View style={{flex: 1}}>
            <Image source={Images.checkMail} style={styles.ElogoStyle} />
            <Text style={styles.headTxt}>Check your mail</Text>
            <Text style={styles.Txt}>
              We have sent a password recover instruction to your email.
            </Text>
            <Buttons label="Open email app" onPress={() => openInbox()} />
            <TouchableOpacity
            onPress={gotoReset}
              style={{
                marginTop: hp('2%'),
               // width:'100%',
               // backgroundColor:'red',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
               
              <Text  style={styles.Txt1}>
                Enter the Code
              </Text>
              <MaterialIcon
                name={'chevron-right'}
                color={Colors.blackFirst}
                size={25}
              />

            </TouchableOpacity>
          </View>

          <View style={{flex: 0.2}}>
            <Text style={styles.signupTxt}>
              Did not receive the email? Check your spam filter, or
              <Text
                onPress={changeMail}
                style={{color: Colors.appColor, fontWeight: 'bold'}}>
                {' '}
                try another email address
              </Text>
            </Text>
          </View>
          
        </View>
        </ScrollView>
      </ImageBackground>
    </View>
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
  // logo: {
  //   alignSelf: 'center',
  //   height: wp('20%'),
  //   width: wp('20%'),
  //   marginBottom: hp('7%'),
  // },
  ElogoStyle: {
    height: wp('35%'),
    width: wp('35%'),
    marginBottom: hp('1%'),
    alignSelf: 'center',
  },
  headTxt: {
    fontSize: 21,
    color: Colors.blackFirst,
    fontWeight: 'bold',
    marginVertical: hp('4%'),
    alignSelf: 'center',
  },
  Txt: {
    color: Colors.blackFirst,
    fontSize: 14,
    marginBottom: hp('5%'),
    marginHorizontal: wp('10%'),
    textAlign: 'center',
  },
  Txt1: {
    color: Colors.blackFirst,
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
  },
  signupTxt: {
    color: Colors.blackFirst,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: hp('3%'),
  },
});

export default CheckMail;
