import React, {Component, useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,BackHandler,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  PermissionsAndroid,
  ImageBackground,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Communications from 'react-native-communications';
import Colors from '../../Components/CommonUtils/Colors';
import {wp, hp, isANDROID} from '../../Components/CommonUtils/ThemeHelper';
import InnerHeader from '../../Components/Header/innerHeader';
import Images from '../../Components/CommonUtils/Images';
import Buttons from '../../Components/CommonUtils/Button';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmailForm from './emailForm';
import Contacts from '../../Components/CommonUtils/Strings';
import GoogleMap from '../../Components/GoogleMap/googleMap';
import Geolocation from "react-native-geolocation-service";
import { set } from 'lodash';
const ContactUsScreen = props => {
  const [defaultRating, setDefaultRating] = useState(1);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [sendMail, setSendMail] = useState(false);
  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();
  const [coordinates, setcoordinates] = useState([]);


  const goBack = () => {
    props.navigation.goBack();
  };
  useEffect(()=>{
   // Geocoder.init("AIzaSyDLWZtQIx0JsQciFm7VLzSKJOS_QqjJsoA");
    Geocoder.init("AIzaSyDLWZtQIx0JsQciFm7VLzSKJOS_QqjJsoA", {language : "en"});
    //requestPermissions()
  //   this.setTimeout( () => {
  //     checkpermissionlocation();
  //  },2500);
   // checkpermissionlocation()
   const backAction = () => {
    props.navigation.goBack()
    return true;
  };
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();
    },[])


  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
       authorizationLevel: 'whenInUse',
     });
     getAddressWithCordinates()
    }
  
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

    }
  }

  const getAddress=(latitude,longitude)=>{
    Geocoder.from(27.149994, 79.499901)
		.then(json => {
		var addressComponent = json.results[0].address_components[3];
			console.log(addressComponent);
      //alert(JSON.stringify(addressComponent))
		})
		.catch(error => console.warn(error));
  }

  const getAddressWithCordinates=()=>{
    Geolocation.watchPosition(
      position => {
        //alert(JSON.stringify(position))
        setlatitude(position.coords.latitude)
        setlongitude(position.coords.longitude,)
        getAddress(position.coords.latitude,position.coords.longitude)
        // this.setState({
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        //   coordinates:coordinates.concat({
        //     latitude: position.coords.latitude,
        //     longitude: position.coords.longitude
        //   })
       // });
      },
      error => {
        alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      }
    );
  }
  const GotoReview = () => {
    Linking.openURL('https://g.page/r/CfqqFCzdo3Y-EAg/review');
   
 }
  const makePhoneCall = () => {
   // Communications.phonecall('+' + Contacts.code + Contacts.phone, true);
  // Communications.phonecall('+' + 1 + '(345)9393001', true);
  let phoneNumber=('+' + 1 + '(345)9393001', true)
  Linking.openURL(`tel:${'+1(345)9393001'}`)
  };
  const checkpermissionlocation= async()=>{
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
       // alert("You can use the location");
       getAddressWithCordinates()
      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }
  const initiateWhatsApp = () => {
    props.navigation.navigate('LiveChat');
    // let url =
    //   'whatsapp://send?text=' +
    //   '' +
    //   '&phone=' +
    //   Contacts.code +
    //   Contacts.whatsApp;
    // Linking.openURL(url)
    //   .then(data => {
    //     console.log('WhatsApp Opened');
    //   })
    //   .catch(() => {
    //     alert('Make sure Whatsapp installed on your device');
    //   });
  };

  return (
    <View style={styles.mainView}>
      <ImageBackground source={Images.theme} style={{flex: 1}}>
        <InnerHeader goBack={goBack} headerText={'Contact Us'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp('10%')}}>
          {/* <Text style={styles.Htxt}>FIND US</Text> */}
          <Text style={styles.Htxt}>GET IN TOUCH</Text>
          <TouchableOpacity onPress={()=>{
                         let webURL='https://hurleys.ky/contact-us/'
                         props.navigation.navigate('webviewNewScreen', {webURL});

          }} style={{...styles.container, marginTop: wp('4%'),backgroundColor: Colors.appColor,}}>
          <View
              //  onPress={initiateWhatsApp}
                style={styles.callBtn}>
                <Text style={{color: Colors.white, fontSize: 12}}>
                 Contact Us
                </Text>
              </View>
              </TouchableOpacity>
          {/* <View style={{...styles.container, alignItems: null}}> */}
            {/* <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.callIcon}>
                  <MaterialIcon
                    name={'phone'}
                    size={18}
                    color={Colors.appColor}
                  />
                </View>
                <Text style={styles.callTxt}>
                  +{Contacts.code} {Contacts.phone}
                </Text>
              </View>
              <TouchableOpacity onPress={makePhoneCall} style={styles.callBtn}>
                <Text style={{color: Colors.white, fontSize: 12}}>
                  Call Now
                </Text>
              </TouchableOpacity>
            </View> */}

            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: wp('2%'),
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.callIcon}>
                  <MaterialIcon
                    name={'whatsapp'}
                    size={18}
                    color={Colors.appColor}
                  />
                </View>
                <Text style={styles.callTxt}>
                  +{Contacts.code} {Contacts.whatsApp}
                </Text>
              </View>
              <TouchableOpacity
                onPress={initiateWhatsApp}
                style={styles.callBtn}>
                <Text style={{color: Colors.white, fontSize: 12}}>
                  Live Chat
                </Text>
              </TouchableOpacity>
            </View> */}

            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: wp('2%'),
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.callIcon}>
                  <MaterialIcon
                    name={'email'}
                    size={18}
                    color={Colors.appColor}
                  />
                </View>
                <Text style={styles.callTxt}>hurley@gmail.com</Text>
              </View>
              <TouchableOpacity
                onPress={() => setSendMail(!sendMail)}
                style={styles.callBtn}>
                {sendMail ? (
                  <Text style={{color: Colors.white, fontSize: 12}}>
                    Cancel
                  </Text>
                ) : (
                  <Text style={{color: Colors.white, fontSize: 12}}>
                    Send Mail
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            {sendMail ? <EmailForm /> : null} */}
          {/* </View> */}

          <View style={{...styles.container, marginTop: wp('4%')}}>
            <Text style={styles.TxtB}>OPENING HOURS:</Text>
            <Text style={{...styles.Txt, marginTop: wp('4%')}}>
              Monday-Saturday: <Text style={{fontWeight: 'bold'}}>7am-9pm</Text>
            </Text>
            <Text style={{...styles.Txt, marginVertical: wp('3%')}}>
              Bank Holidays: <Text style={{fontWeight: 'bold'}}>9am-6pm</Text>
            </Text>
            <Text style={{...styles.Txt, fontWeight: 'bold'}}>
              Closed Good Friday, Christmas and New Year’s Day
            </Text>
          </View>

          <View style={{...styles.container, marginTop: wp('4%')}}>
            <Text style={styles.TxtB}>VISIT OUR STORE:</Text>
            <Text style={{...styles.Txt, marginTop: wp('4%')}}>
              Hurley’s 1053 Crewe Rd, Grand Harbour, {'\n'}Cayman Islands
            </Text>
            {/* <Image source={Images.GoogleMap} style={styles.map} /> */}
            {/* <GoogleMap style={styles.map} /> */}
            <GoogleMap style={styles.map} />
            {/* <MapView
    provider={PROVIDER_GOOGLE}

    style={{height:100,width:200}}
    initialRegion={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421
        }}></MapView> */}
          </View>

          <TouchableOpacity onPress={GotoReview} style={{marginTop: wp('4%'), alignSelf: 'center'}}>
            <Image
              source={Images.GoogleReview}
              style={{borderRadius: 20, width: wp('92%')}}
            />
          </TouchableOpacity>

          


        </ScrollView>
      </ImageBackground>
    </View>
  );
};
export default ContactUsScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  Htxt: {
    fontSize: 14,
    color: Colors.blackFirst,
    fontWeight: 'bold',
    marginLeft: wp('4%'),
    marginTop: hp('2%'),
  },
  map: {
    height: hp('20%'),
    width: wp('88%'),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.greenAppColor,
    marginTop: wp('3%'),
    alignSelf: 'center',
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
    alignItems: 'center',
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
  callBtn: {
    backgroundColor: Colors.appColor,
    paddingVertical: wp('1%'),
    borderRadius: 10,
    alignSelf: 'center',
    //width: wp('100%'),
    alignItems: 'center',
  },
  Txt: {color: Colors.blackFirst, fontSize: 12, textAlign: 'center'},
  TxtB: {
    fontSize: 14,
    color: Colors.blackFirst,
    fontWeight: 'bold',
  },
});
