import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../CommonUtils/Colors';
import {isANDROID} from '../CommonUtils/ThemeHelper';

const Header = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={props.openDrawer || props.goBack}>
        {props.goBack ? (
          <Feather name={'chevron-left'} color={Colors.blackFirst} size={25} />
        ) : (
          <>
            <View style={styles.iconView1} />
            <View style={styles.iconView1} />
            <View style={styles.iconView2} />
          </>
        )}
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={[styles.backBtn]} onPress={props.search}>
          <MaterialIcon name={'magnify'} color={Colors.blackFirst} size={27} />
        </TouchableOpacity>
        <View style={{marginHorizontal: wp('1%')}} />
        {/* <TouchableOpacity
          style={[styles.backBtn]}
          onPress={props.goNotification}>
          <MaterialIcon name={'bell'} color={Colors.blackFirst} size={27} />
        </TouchableOpacity> */}
        <View style={{marginHorizontal: wp('1%')}} />
        <TouchableOpacity style={[styles.backBtn]} onPress={props.goCart}>
          <MaterialIcon name={'cart'} color={Colors.blackFirst} size={27} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    backgroundColor: Colors.white,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  backBtn: {
    backgroundColor: Colors.grayfade,
    marginTop: isANDROID ? hp('2%') : hp('7%'),
    alignSelf: 'flex-start',
    marginBottom: hp('1%'),
    padding: wp('2%'),
    borderRadius: 10,
  },

  iconView1: {
    backgroundColor: Colors.blackFirst,
    height: hp('0.7%'),
    width: wp('8%'),
    borderRadius: 10,
    marginBottom: wp('1%'),
  },
  iconView2: {
    backgroundColor: Colors.greenAppColor,
    height: hp('0.7%'),
    width: wp('4%'),
    borderRadius: 10,
  },
});

export default Header;
