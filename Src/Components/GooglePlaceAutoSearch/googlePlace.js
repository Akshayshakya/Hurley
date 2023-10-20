import React, {useState} from 'react';
import {View, Text, Platform, StyleSheet, SafeAreaView} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import color from '../CommonUtils/Colors';
import Strings from '../CommonUtils/Strings';
import MapScreen from '../GoogleMap/googleMap';

const GooglePlaceScreen = () => {
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
  });
  return (
    <SafeAreaView>
      <GooglePlacesAutocomplete
        placeholder="Search Location"
        onPress={(data1, details = null) => {
          console.log('data1', data1);
          console.log('details', details);
          setLocation({
            latitude: details?.geometry?.location?.lat,
            longitude: details?.geometry?.location?.lng,
            // latitude: 19.076,
            // longitude: 72.8777,
          });
        }}
        onFail={err => {
          console.log(err);
        }}
        keyboardShouldPersistTaps={'handled'}
        fetchDetails={true}
        // currentLocation={true}
        // currentLocationLabel={'Current location'}
        //AIzaSyAnJlTtY4qRykN6CJB_hHpuQw6sKI75fuQ

        // Original One
        // query={{
        //     key: 'AIzaSyCMbSENH0eV1icMhB3FN6lJqe2HyR01CEY',
        //     language: 'en',
        // }}
        query={{
          key: 'AIzaSyDLWZtQIx0JsQciFm7VLzSKJOS_QqjJsoA',
          // key: Strings.place_api_key,
          language: 'en',
        }}
        styles={{
          textInputContainer: {
            borderWidth: 2,
            // paddingHorizontal: 10,
            borderRadius: 10,
            height: hp(6.5),
            marginTop: hp(1),
            borderColor: 'silver',
            backgroundColor: 'white',
            borderBottomWidth: 2,
            // width: wp(75),
            alignSelf: 'center',
          },
          textInput: {
            fontSize: wp(4),
            color: color.blackFirst,
            // color: "black",
            height: '99%',
            // width: wp(75),
            textAlignVertical: 'center',
            backgroundColor: color.white,
          },
          row: {
            backgroundColor: color.blackFirst,
          },
          description: {
            color: color.white,
          },
          poweredContainer: {
            backgroundColor: color.blackFirst,
          },
        }}
      />
    </SafeAreaView>
  );
};
export default GooglePlaceScreen;
