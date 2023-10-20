import * as React from 'react';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Callout,
} from 'react-native-maps';
import {View, Text, Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Colors from '../CommonUtils/Colors';


const MapScreen = props => {
  return (
 
    <MapView
      // region={''}
      onRegionChange={props?.onRegionChange}
      provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      style={props?.style ? props?.style : styles.MapView}
      showsUserLocation={true}
      initialRegion={{
        latitude: props?.Maplat ? parseFloat(props?.Maplat) : 19.282254782258445,
        longitude: props?.Maplng ? parseFloat(props?.Maplng) : -81.34583216969583,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}>
      <Marker
        coordinate={{
          latitude: props?.Maplat ? parseFloat(props?.Maplat) : 19.282254782258445,
          //   latitude: props?.Marklat ? props?.Marklat : 19.313299,
          //   longitude: props?.Marklng ? props?.Marklng : -81.254601,
          longitude: props?.Maplng ? parseFloat(props?.Maplng) : -81.34583216969583,
        }}
        onPress={props?.onPress}>
        <Icon name="location-pin" size={30} color={'red'} />

        <Callout tooltip onPress={props?.onPressTooltip}>
          <View style={styles.tooltipView}>
            <Text style={styles.tooltipText}>
              {props?.ToolTxt ? props?.ToolTxt : 'Cayman island'}
            </Text>
          </View>
        </Callout> 
      </Marker>
    </MapView>
 
  );
};

const styles = StyleSheet.create({
  MapView: {
    height: hp('100%'),
    width: wp('100%'),
  },
  tooltipView: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderRadius: wp('2%'),
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
  },
  //   tooltipImage: {
  //     width: wp("10%"),
  //     height: wp("10%"),
  //     borderRadius: wp("5%"),
  //     alignSelf: "center",
  //     margin: wp("3%"),
  //   },
  tooltipText: {
    textAlign: 'center',
    fontSize: wp('3.9%'),
    alignSelf: 'center',
    width: wp('30%'),
    marginVertical: wp('4%'),
    marginRight: wp('3%'),
    color: Colors.blackFirst,
  },
  searchBar:{
    width:'90%',
    height:40,
    alignSelf:'center',
    marginTop:100,
    backgroundColor:'red'
  }
});

export default MapScreen;
