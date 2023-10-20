import * as React from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDLWZtQIx0JsQciFm7VLzSKJOS_QqjJsoA'; // never save your real api key in a snack!

const SeachPlace = (props) => {
  return (
    <View style={styles.container}>
    <GooglePlacesAutocomplete
      placeholder='Search'
      fetchDetails={true}
      minLength={2}
      // currentLocation={true}
      // currentLocationLabel
     // styles={color:'red'}
      textInputProps={{color:'black'}}
      onPress={props.onPress}
    //   onPress={(data, details = null) => {
    //     // 'details' is provided when fetchDetails = true
    //     //alert(JSON.stringify(details.formatted_address) , details);
    //     alert(JSON.stringify(details.geometry.location.lng) , details);
    //   }}
      onFail={(error) => alert(error)}
      query={{
        key: 'AIzaSyDLWZtQIx0JsQciFm7VLzSKJOS_QqjJsoA',
        language: 'en',
      }}
      styles={{
      
        textInput: {
          height: 38,
          color: '#5d5d5d',
          fontSize: 16,
          backgroundColor: '#CCCCCC',
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 15,
    backgroundColor: '#ecf0f1',
  },
});

export default SeachPlace;
