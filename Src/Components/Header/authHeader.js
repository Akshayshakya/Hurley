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

const AuthHeader = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={props.goBack}>
        <Feather name={'chevron-left'} color={Colors.blackFirst} size={25} />
      </TouchableOpacity>
      {props.help && (
        <TouchableOpacity
          style={[styles.backBtn, {backgroundColor: Colors.white}]}
          onPress={props.goHelp}>
          <MaterialIcon
            name={'help-circle-outline'}
            color={Colors.blackFirst}
            size={25}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    // backgroundColor: Colors.white,
    // elevation: 2,
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
  },
  backBtn: {
    backgroundColor: Colors.grayfade,
    marginTop: isANDROID ? hp('2%') : hp('7%'),
    alignSelf: 'flex-start',
    padding: wp('1%'),
    borderRadius: 10,
  },
});

export default AuthHeader;
