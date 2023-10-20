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

const InnerHeader = props => {
  const switchItem = right => {
    switch (right) {
      case 'clear':
        return (
          <Text style={styles.clearTxt} onPress={props.clear}>
            Clear
          </Text>
        );
      case 'add':
        return (
          <TouchableOpacity style={[styles.backBtn]} onPress={props.add}>
            <MaterialIcon name={'plus'} color={Colors.blackFirst} size={27} />
          </TouchableOpacity>
        );
      case 'cartNote':
        return (
          <View style={{flexDirection: 'row'}}>
            {/* <TouchableOpacity style={[styles.backBtn]} onPress={props.NotificationScreen}>
              <MaterialIcon name={'bell'} color={Colors.blackFirst} size={27} />
            </TouchableOpacity> */}
            <View style={{marginHorizontal: wp('1%')}} />
            <TouchableOpacity style={[styles.backBtn]} onPress={props.goCart}>
              <MaterialIcon name={'cart'} color={Colors.blackFirst} size={27} />
            </TouchableOpacity>
          </View>
        );
      default:
        return <View style={{marginHorizontal: wp('2%')}} />;
    }
  };
  return (
    <View style={[props.IsShadow?styles.hedadershadow: styles.container,{ backgroundColor: props.backgroundColor?props.backgroundColor: Colors.white,}]}>
      <TouchableOpacity style={styles.backBtn} onPress={props.goBack}>
        <Feather name={'chevron-left'} color={Colors.blackFirst} size={25} />
      </TouchableOpacity>
      <Text style={styles.headerTxt}>{props.headerText}</Text>
      {switchItem(props.right)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingTop: isANDROID ? hp('2%') : hp('7%'),
    paddingBottom: wp('3%'),
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },

  },
  hedadershadow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingTop: isANDROID ? hp('2%') : hp('7%'),
    paddingBottom: wp('3%'),
  },
  headerTxt: {
    fontSize: 14,
    color: Colors.blackFirst,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backBtn: {
    backgroundColor: Colors.grayfade,
    alignSelf: 'flex-start',
    padding: wp('1%'),
    borderRadius: 10,
  },
  clearTxt: {fontSize: 12, color: Colors.appColor},
});

export default InnerHeader;
