import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Text, ImageBackground} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../Components/CommonUtils/Colors';
import Images from '../../Components/CommonUtils/Images';

const SpecialOffer = props => {
  return (
    <View style={{}}>
      <Image source={Images.SpecialOffers} style={styles.BannerImage} />
      <Text
        style={{fontSize: 12, textAlign: 'justify', color: Colors.blackSecond}}>
        Our loyalty program also offers special offers on items in-store
        allowing you to earn extra points when you purchase these items. Keep an
        eye on our special offers in the Hurley’s app to stay up to date on the
        latest offers available at Hurley’s.{'\n\n'}Once you have reached 10,000
        points your account will reflect a $10 redeemable reward on the app.
        When you are at the checkout the cashier will be prompted to ask you if
        you would like to use your reward. You can continue to earn and redeem
        the points at your choosing. Save your loyalty points up and spend them
        all on one big shop, or just use the $10 to cover the cost of your
        lunch. The possibilities are endless when it comes to Hurley’s loyalty
        program.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  BannerImage: {
    height: hp('30%'),
    width: wp('92%'),
    resizeMode: 'contain',
    borderRadius: 20,
  },
  imgTxt: {color: Colors.white, fontSize: 21, fontWeight: 'bold'},
});
export default SpecialOffer;
