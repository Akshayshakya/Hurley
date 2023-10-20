import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Text, ImageBackground} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../Components/CommonUtils/Colors';
import Images from '../../Components/CommonUtils/Images';

const LoyalityProgram = props => {
  return (
    <View style={{}}>
      <ImageBackground
        source={Images.LoyalityReward}
        style={styles.BannerImage}
        imageStyle={{borderRadius: 20}}>
        <Text style={styles.imgTxt}>Hurley's{'\n'}Loyalty Program</Text>
      </ImageBackground>
      <Text style={styles.HTxt}>Hurley’s Marketplace</Text>
      
      <Image style={styles.gifBanner} source={require('./../../Assets/VideoFile/Loyalty_App.gif')} />

      {/* <Text 
        style={{fontSize: 12, textAlign: 'justify', color: Colors.blackSecond}}>
        We believe you should be rewarded for being loyal for shopping at your
        local grocery store. That is why we have our Hurley’s Loyalty program!
        {'\n\n'}
        Hurley’s has been operating on the island since 1989, and the Grand
        Harbour store has been serving the community for over 24 years. The
        roots of Hurley’s has always been to provide the residents of the Cayman
        Islands with fresh local produce and to this day this is still our
        ethos.{'\n\n'}Our loyalty program is in place to reward our customers
        for shopping with us. It is super simple to use and anyone can sign up.
        Everytime you shop at Hurley’s you will earn loyalty points. For every
        $1 you spend you will receive 10 loyalty points. These will be
        automatically added to your account when you scan your card or give your
        phone number during checkout.
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  BannerImage: {
    height: hp('13%'),
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: hp('2%'),
    padding: wp('5%'),
  },
  imgTxt: {color: Colors.white, fontSize: 21, fontWeight: 'bold'},
  HTxt: {
    marginLeft: wp('2%'),
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: hp('2%'),
    color: Colors.blackFirst,
  },
  gifBanner:{
    width:"100%",
    alignItems:'center',
  }
});
export default LoyalityProgram;
