import React, {useEffect, useState} from 'react';
import {View,Image, Text, ImageBackground, StyleSheet, Platform,ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../CommonUtils/Colors';
import Images from '../CommonUtils/Images';
import Barcode from 'react-native-barcode-builder';

const LoyalityCard = props => {
  //alert(JSON.stringify(props))
  return (
    <ImageBackground
      source={Images.LoyalityCardBg}
      style={styles.CardImgBg}
      imageStyle={{borderRadius: 20}}>
      <View style={styles.flexView}>
        <View>
          <Text style={styles.CardHTxt}>Your Loyalty Points</Text>
          <Text style={[styles.CardTxt, {alignSelf: 'flex-start'}]}>
            {props.loyaltyPoints?props.loyaltyPoints:"0"}
          </Text>
        </View>
        <View>
          <Text style={styles.CardHTxt}>Redeemable Value</Text>
          <Text style={[styles.CardTxt, {alignSelf: 'flex-end'}]}>
            ${props.redeemPoints}</Text>
        </View>
      </View>
      {/* <Image source={Images.LoyalityBar} style={styles.BarCodeImg} />  */}
{props.IsCardgot==true?
      <Barcode
        value={props.value ? props.value : '0000'}
        format="CODE39"
        height={40}
        text={props.value}
        width={1.1}
        lineColor={Colors.blackFirst}
        background={'transparent'}
      />
      :
      <ActivityIndicator size="large" color="red" />
      }
      <Text style={[styles.CardTxt, {fontSize: 14}]}>{props.userName}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CardImgBg: {
    height: hp('25%'),
    padding: wp('4%'),
    paddingHorizontal: wp('5%'),
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: wp('3%'),
  },
  CardHTxt: {
    color: Colors.grayfade,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: wp('1%'),
  },
  CardTxt: {marginTop:Platform.OS=='ios'?5:0, fontSize: 18, color: Colors.white, fontWeight: 'bold'},
  BarCodeImg: {
    alignSelf: 'center',
    height: wp('10%'),
    width: wp('45%'),
  },
});

export default LoyalityCard;
