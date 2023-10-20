import React, { useEffect } from 'react';
import { StyleSheet,Dimensions, View, Image, SafeAreaView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Images from '../../Components/CommonUtils/Images';
import { CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const {width,height} = Dimensions.get('screen');

const Splash = props => {
  const loginData = useSelector((state) => state.authenticationReducer.data);

  useEffect(() => {
    //alert(height)
    setTimeout(() => {
      // alert(loginData?.data?.message?.iUserId)
      if (loginData?.data?.message?.iUserId == '' || loginData?.data?.message?.iUserId == undefined) {
        props.navigation.navigate('AuthNavigator');
      }
      else {
        props.navigation.navigate('DrawerStack');
      }
    }, 3000);
  });



  return (
    <SafeAreaView style={styles.mainView}>
      <Image
        source={Images.splash_screen}
        style={styles.mainIcon}
      // resizeMode={'contain'}
      />
   
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainIcon: {
    height: height,
    width:width,
  resizeMode: 'stretch',
  },
});

export default Splash;
