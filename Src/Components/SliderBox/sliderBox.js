import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Images from '../../Components/CommonUtils/Images';
import {SliderBox} from 'react-native-image-slider-box';
import Colors from '../../Components/CommonUtils/Colors';

const SliderBoxScreen = props => {
  const sliderdata = [
    // Images.TopB1,
    // Images.TopB2,
    // Images.TopB3,
   // Images.slider3,
  ];

  return (
    <View style={[styles.mainSliderView]}>
      <SliderBox
        autoplay={true}
        circleLoop={true}
        autoplayInterval={6000}
        // dotColor={Colors.white}
        dotColor={'transparent'}
        // resizeMode={'contain'}
        inactiveDotColor={'transparent'}
        onCurrentImagePressed={props.onPress}
        resizeMode={'stretch'}
        // inactiveDotColor={Colors.gray}
        style={[styles.Slider]}
        images={props.images ? props.images : sliderdata}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainSliderView: {
    marginVertical: hp(2),
    marginHorizontal: wp(2),
    borderRadius: 20,
    // elevation: 3,
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
  },
  Slider: {
    width: wp(96),
    height: hp(17),
    borderRadius: 20,
    
  },
});

export default SliderBoxScreen;
