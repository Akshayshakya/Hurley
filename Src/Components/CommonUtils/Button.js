import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from './Colors';

const ButtonContainer = props => {
  return (
    <TouchableOpacity style={styles.BtnContainer} onPress={props.onPress}>
      <Text style={styles.labeltxt}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  BtnContainer: {
    backgroundColor: Colors.appColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp('3%'),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.appColor,
  },
  labeltxt: {fontSize: 18, color: Colors.white, fontWeight: 'bold'},
});

export default ButtonContainer;
