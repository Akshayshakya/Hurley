import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import {WebView} from 'react-native-webview';
import {hp, isANDROID, wp} from '../../Components/CommonUtils/ThemeHelper';
import Colors from '../../Components/CommonUtils/Colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Communications from 'react-native-communications';

const HelpComponent = props => {
  const initiateWhatsApp = () => {
    let url = 'whatsapp://send?text=' + '' + '&phone=1' + '(345) 516 4084';
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  };

  const makePhoneCall = () => {
    Communications.phonecall('0123456789', true);
  };
  return (
    <View style={styles.mainView}>
      <View style={{...styles.container, marginTop: hp('3%')}}>
        <Text style={{...styles.HTxt, textAlign: 'center'}}>Hi</Text>
        <TouchableOpacity
          onPress={initiateWhatsApp}
          style={{...styles.chatBtn}}>
          <MaterialIcon name="whatsapp" size={16} color={Colors.white} />
          <Text style={{...styles.chatTxt}}>Chat With Us</Text>
        </TouchableOpacity>
      </View>

      <Text style={{...styles.OrTxt}}>Or</Text>

      <View style={{...styles.container}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.callIcon}>
              <MaterialIcon name={'phone'} size={18} color={Colors.appColor} />
            </View>
            <Text style={styles.callTxt}>+1 (345) 516 4084</Text>
          </View>
          <TouchableOpacity onPress={makePhoneCall} style={styles.callBtn}>
            <Text style={{color: Colors.white, fontSize: 12}}>Call Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={{...styles.Headtxt}}>HURLEY’S – GET FRESH WITH US</Text>
      <Text style={styles.Txt}>
        Hurley’s has certainly earned its reputation as Cayman’s finest grocery
        store for its fresh ingredients and wide variety of organic produce.
        It’s the perfect local spot for gourmet meals on-the-go and hassle-free
        food options for the whole family! {'\n\n'}Our departments include Meats
        and Poultry, Local Seafood, Fresh Produce, a Gourmet Deli that boasts
        some of the best cheese and charcuterie in Cayman, and a Bakery that
        offers hundreds of fresh loaves of bread, breakfast pastries and
        desserts daily. {'\n\n'}We also bake and decorate the best sheet cakes
        on the island, perfect for any occasion, and offer catering services for
        large or small events. With Hurley’s catering services, you can rest
        assured knowing that quality is our priority and convenience is both
        tasty and healthy!
      </Text>
    </View>
  );
};
export default HelpComponent;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    // backgroundColor: Colors.white,
  },
  container: {
    borderRadius: 20,
    marginHorizontal: wp('4%'),
    marginTop: wp('2%'),
    padding: wp('4%'),
    backgroundColor: Colors.white,
    shadowColor: Colors.blackFirst,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  OrTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.gray,
    marginLeft: wp('4%'),
    marginVertical: hp('2%'),
    textAlign: 'center',
  },
  HTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.blackFirst,
  },
  Headtxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.blackFirst,
    marginVertical: hp('2%'),
    marginLeft: wp('4%'),
  },
  Txt: {
    fontSize: 12,
    color: Colors.grayShade,
    textAlign: 'justify',
    marginHorizontal: wp('4%'),
  },
  callBtn: {
    backgroundColor: Colors.appColor,
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 10,
    alignSelf: 'center',
  },
  callIcon: {
    backgroundColor: Colors.grayfade,
    alignSelf: 'flex-start',
    padding: wp('2%'),
    borderRadius: 10,
    marginRight: wp('4%'),
  },
  callTxt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.blackFirst,
    alignSelf: 'center',
  },
  chatBtn: {
    backgroundColor: Colors.appColor,
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('5%'),
  },
  chatTxt: {color: Colors.white, fontSize: 12, marginLeft: wp('2%')},
});
