import React, {Component, useState, useEffect} from 'react';

import {StyleSheet, Text, View, SafeAreaView} from 'react-native';

import Geocoder from 'react-native-geocoding';

import Geolocation from 'react-native-geolocation-service';
import Strings from '../../CommonUtils/Strings';

const LocationDemo = () => {
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [error, seterror] = useState(null);
  const [Address, setAddress] = useState(null);

  console.log('Address', Address);
  console.log('latitude', latitude);
  console.log('longitude', longitude);
  console.log('error', error);

  useEffect(() => {
    Geocoder.init(Strings.google_api_key, {language: 'en'});

    Geolocation.getCurrentPosition(
      position => {
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            console.log(json);
            var addressComponent = json.results[0].address_components[0];
            setAddress(addressComponent);
            console.log(addressComponent);
          })
          .catch(error => console.warn(error));
      },
      error => {
        seterror(error.message);
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 100000,
      },
    );
  }, []);

  return (
    <SafeAreaView>
      {error ? <Text> Error : {error} </Text> : null}
      <Text>{Address ? Address : 'Not Found'}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
    padding: 11,
  },

  text: {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
});
export default LocationDemo;
