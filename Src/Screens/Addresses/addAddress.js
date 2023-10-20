import React, {useEffect, useState} from 'react';
import {
  StyleSheet,BackHandler,
  View,
  Image,KeyboardAvoidingView,
  PermissionsAndroid,
  Text,ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import SeachPlace from './../Signup/SeachPlace'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  
} from 'react-native-responsive-screen';
import {AddNewAddress} from './../../Services/OtherServices'
import Geocoder from 'react-native-geocoding';
import AuthHeader from '../../Components/Header/authHeader';
import Images from '../../Components/CommonUtils/Images';
import Colors from '../../Components/CommonUtils/Colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputs from '../../Components/CommonUtils/TextInput';
import Buttons from '../../Components/CommonUtils/Button';
import GoogleMap from '../../Components/GoogleMap/googleMap';
import Geolocation from "react-native-geolocation-service";
import {useDispatch, useSelector} from 'react-redux';
import InnerHeader from '../../Components/Header/innerHeader';

const AddAddress = props => { 
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [loadingL, setloadingL] = useState(false);
  const loginData = useSelector((state) => state.authenticationReducer.data);
  const [IsSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [landmark, setLandmark] = useState('');
  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();
  const [Address, setAddress] = useState('');
  const [City, setCity] = useState('');
  const [Zip_Code, setZip_Code] = useState('');
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');

  const goBack = () => {
    props.navigation.goBack();
  };



const getAddressWithCordinates = () => {
    
  Geolocation.watchPosition(
    position => {
     // alert(JSON.stringify(position.coords.latitude))
      setlatitude(position.coords.latitude);
      setlongitude(position.coords.longitude);
      getAddress(position.coords.latitude, position.coords.longitude);
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
      maximumAge: 0,
    },
  );
};

async function requestPermissions() {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization();
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
     authorizationLevel: 'whenInUse',
   });
  }

  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

  }
}
// useEffect(() => {
//   Geocoder.init("AIzaSyDLWZtQIx0JsQciFm7VLzSKJOS_QqjJsoA");
//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'ios') {
//       getOneTimeLocation();
//       subscribeLocationLocation();
//     } else {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Access Required',
//             message: 'This App needs to Access your location',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           //To Check, If Permission is granted
//           getOneTimeLocation();
//           subscribeLocationLocation();
//         } else {
//           setLocationStatus('Permission Denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     }
//   };
//   requestLocationPermission();
//   return () => {
//     Geolocation.clearWatch(watchID);
//   };
//}, []);
useEffect(() => {
  Geocoder.init("AIzaSyDLWZtQIx0JsQciFm7VLzSKJOS_QqjJsoA", {language : "en"}); 
  checkpermissionlocation();

  const backAction = () => {
    props.navigation.goBack()
    return true;
  };
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();

 }, []);
 const onRegionChange = Region => {
  //alert(JSON.stringify(Region.latitude))
  setlatitude(Region.latitude);
  setlongitude(Region.longitude);
  getAddress(Region.latitude, Region.longitude);
};
 const checkpermissionlocation = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Example App',
        message: 'Example App access to your location ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      // alert("You can use the location");
      getAddressWithCordinates();
    } else {
      console.log('location permission denied');
      alert('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
const getAddress = (latitude, longitude) => {
  //alert(longitude)
  Geocoder.from(latitude, longitude)
    .then(json => {
      // alert(JSON.stringify(json.results))

      let MainFullAddress = json.results[0].formatted_address;
      var addressComponent2 = json.results[0].address_components[1];

      setCity(addressComponent2.long_name);

      setZip_Code(json.results[1]?.address_components[6]?.long_name)
      setAddress(MainFullAddress);
     // alert(JSON.stringify(Address))
    })
    .catch(error => console.warn(error));
};


const getOneTimeLocation = () => {
  setLocationStatus('Getting Location ...');
  Geolocation.getCurrentPosition(
    //Will give you the current location
    (position) => {
     // alert(JSON.stringify(position))
      setLocationStatus('You are Here');

      //getting the Longitude from the location json
      const currentLongitude = 
        JSON.stringify(position.coords.longitude);

      //getting the Latitude from the location json
      const currentLatitude = 
        JSON.stringify(position.coords.latitude);

      //Setting Longitude state
      setCurrentLongitude(currentLongitude);
      
      //Setting Longitude state
      setCurrentLatitude(currentLatitude);
      getAddress()
    },
    (error) => {
      setLocationStatus(error.message);
    },
    {
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 1000
    },
  );
};

const subscribeLocationLocation = () => {
  watchID = Geolocation.watchPosition(
    (position) => {
      //Will give you the location on location change
      
      setLocationStatus('You are Here');
      console.log(position);

      //getting the Longitude from the location json        
      const currentLongitude =
        JSON.stringify(position.coords.longitude);

      //getting the Latitude from the location json
      const currentLatitude = 
        JSON.stringify(position.coords.latitude);

      //Setting Longitude state
      setCurrentLongitude(currentLongitude);

      //Setting Latitude state
      setCurrentLatitude(currentLatitude);
    },
    (error) => {
      setLocationStatus(error.message);
    },
    {
      enableHighAccuracy: false,
      maximumAge: 1000
    },
  );
};

const _AddAddress=async()=>{
  if(Address=='')
  {
    alert('please search any address or pick your address from map.')
  }
  else if(landmark=='')
  {
    alert('please enter a land mark')
  }
 
  else{

  setloadingL(true)
  let data = {
    type: 'UpdateUserAddressDetails',
    iUserId:loginData.data.message?.iUserId,
    eUserType: 'passenger',
    vServiceAddress: 'qwerty',
    vBuildingNo: '123',
    vLandmark: '',
    vAddressType: 'Work',
    vLatitude: '12.12.12.12',
    vLongitude: '1.12.1.212',
    vTimeZone: 'vTimeZone',
    address_type: 'Work',
    address: Address+' '+landmark,
  };
  let res = await dispatch(AddNewAddress(data));
  // alert(JSON.stringify(res));
   if(res?.data.Action==1)
   {
    alert('Addresss Added Successfully')
    setloadingL(false)
    props.navigation.goBack()
    //props.navigation.navigate('Profile');
  }
   
   else
   {
    setloadingL(false)
  }
      
}
   }
   


  return (
    <KeyboardAvoidingView style={styles.mainView}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground source={Images.loginBg} style={{flex: 1}}>
      <InnerHeader
      IsShadow={true}
          goBack={() => props.navigation.goBack()}
          />
        
        {IsSearch ? 
        <SeachPlace  
        placeholderTextColor='red'
            onPress={(data, details = null) => {
              setlatitude(details.geometry.location.lat)
              setlongitude(details.geometry.location.lng)
              setIsSearch(false)
             // setIsMap(true)
              setAddress(details.formatted_address)
              
        // 'details' is provided when fetchDetails = true
        //alert(JSON.stringify(details.formatted_address) , details);
        //alert(JSON.stringify(details.geometry.location.lat) , details);
      }}
        />
        :
        <ScrollView contentContainerStyle={styles.scrollcontainer}>


          <Text style={styles.headTxt}>Your Address({longitude})</Text>

          {/* <View style={{...styles.container, borderRadius: 10}}>
            <TouchableOpacity 
            onPress={requestPermissions}
            style={styles.locatetouch}>
              <MaterialIcon
                name="crosshairs-gps"
                size={20}
                color={Colors.greenAppColor}
              />
              <Text style={styles.txt}>Use my current location</Text>
            </TouchableOpacity>
          </View> */}

          {/* <View style={styles.searchContainer}>
            <MaterialIcon
              name={'map-marker-outline'}
              size={20}
              color={Colors.gray}
            />
            <View style={{flex: 1}}>
              <TextInputs
                placeholder={'Title of Address'}
                value={title}
                onChangeText={text => setTitle(text)}
                notMargin
                borderColor={'transparent'}
              />
            </View>
          </View> */}

          <View style={styles.searchContainer}>
            <MaterialIcon name={'magnify'} size={20} color={Colors.gray} />
            <View style={{flex: 1}}>
              <TextInputs
                placeholder={'Search Address'}
                value={search}
                onFocus={()=> setIsSearch(true)}
               // onChangeText={text => setSearch(text)}
                notMargin
                borderColor={'transparent'}
              />
            </View>
          </View>

          {/* <Image source={Images.GoogleMap} style={styles.map} /> */}
          {/* <GoogleMap style={styles.map} /> */}
          <GoogleMap
              style={{
                height: hp('40%'),
                width: wp('94%'),
                borderRadius: 20,
                borderWidth: 1,
                borderColor: Colors.greenAppColor,
                //marginTop: wp('10%'),
                alignSelf: 'center',
                marginBottom: 10,
                
              }}
              onRegionChange={onRegionChange}
              Maplat={latitude}
              Maplng={longitude}
            />
           
          {/* <View
            style={{
              ...styles.container,
              padding: wp('3%'),
              paddingLeft: wp('8%'),
            }}>
            <Text style={{color: Colors.appColor, fontSize: 14}}>Office</Text>
            <Text style={{color: Colors.grayShade, fontSize: 12}}>
              {
                'P.O. Box 178, Grand Cayman KY1-1104, Poindexter Rd Prospect \nCayman Islands'
              }
            </Text>
          </View> */}

          <View style={{flex: 1}}>
            <TextInputs
              placeholder={'Land Mark'}
              value={landmark}
              onChangeText={text => setLandmark(text)}
              multiline={true}
              borderColor={'transparent'}
            />
          </View>

          <View style={{marginVertical: hp('5%')}}>
          {loadingL ? (
                <ActivityIndicator size="large" color="red" />
              ) : (
                <View>
                   <Buttons onPress={_AddAddress} label="Save" />
                  </View>
              )}
          </View>
        </ScrollView>
}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logoimage: {
    alignSelf: 'center',
    height: wp('20%'),
    width: wp('20%'),
  },
  logoConatiner: {
    alignSelf: 'center',
    marginTop: -hp('5%'),
    marginBottom: hp('3%'),
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
  scrollcontainer: {
    paddingBottom: hp('5%'),
    paddingHorizontal: wp('4%'),
  },
  headTxt: {
    fontSize: 21,
    color: Colors.blackFirst,
    fontWeight: 'bold',
    marginVertical: hp('1%'),
  },
  container: {
    borderRadius: 20,
    marginTop: wp('3%'),
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
  searchContainer: {
    flexDirection: 'row',
    marginTop: wp('1%'),
    marginBottom:10,
    backgroundColor: Colors.grayfade,
    paddingLeft: wp('3%'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 14,
    color: Colors.blackFirst,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: wp('4%'),
  },
  locatetouch: {
    paddingHorizontal: wp('5%'),
    flexDirection: 'row',
    paddingVertical: wp('3.2%'),
  },
  map: {
    height: hp('30%'),
    width: wp('92%'),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.greenAppColor,
    marginTop: wp('3%'),
  },
});

export default AddAddress;
