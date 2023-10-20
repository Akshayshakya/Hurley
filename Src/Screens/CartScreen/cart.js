import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../Components/CommonUtils/Colors';
import {isANDROID} from '../../Components/CommonUtils/ThemeHelper';
import InnerHeader from '../../Components/Header/innerHeader';
import Images from '../../Components/CommonUtils/Images';

const CartScreen = props => {
  const goBack = () => {
    props.navigation.goBack();
  };
  return (
    <View style={styles.mainView}>
      <ImageBackground source={Images.theme} style={{flex: 1}}>
        <InnerHeader headerText={'Cart'} goBack={goBack} />
      </ImageBackground>
    </View>
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  mainView: {flex: 1, backgroundColor: Colors.white},
});
