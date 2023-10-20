import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Components/CommonUtils/Colors';
import {isANDROID} from '../../Components/CommonUtils/ThemeHelper';
import Buttons from '../../Components/CommonUtils/Button';
import Modal from 'react-native-modal';

const FilterModal = props => {
  return (
    <Modal
      onBackdropPress={props?.onClose}
      backdropColor={Colors.blackFirst}
      backdropOpacity={0.6}
      isVisible={props?.visible}
      animationIn={'slideInUp'}>
      <View style={styles.modalContainer}>
        <View style={{marginHorizontal: wp('4%')}}>
          <View style={styles.flexView}>
            <Text style={styles.HeadTxt}>Filters</Text>
            <MaterialIcon
              onPress={props?.onClose}
              name="close"
              color={Colors.blackFirst}
              size={25}
            />
          </View>
          <View style={styles.line} />
          <Text onPress={props?.All} style={styles.itemTxt}>
            All Orders
          </Text>
          <Text onPress={props?.Open} style={styles.itemTxt}>
            Open Orders
          </Text>
          <Text onPress={props?.Past} style={styles.itemTxt}>
            Past Orders
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.white,
    // marginHorizontal: wp('3%'),
    borderRadius: 20,
    top: hp('70%'),
    left: 0,
    right: 0,
    flex: 1,
    // shadowColor: Colors.blackFirst,
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 20,
    // elevation: 25,
  },
  image: {
    height: hp('30%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp('5%'),
  },
  heartBg: {
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
    padding: wp('2%'),
    borderRadius: 10,
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1.5%'),
    alignItems: 'center',
  },
  HeadTxt: {
    color: Colors.blackFirst,
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: wp('3%'),
  },
  line: {
    height: 1,
    backgroundColor: Colors.gray,
    marginTop: wp('3%'),
  },
  itemTxt: {
    color: Colors.blackSecond,
    fontSize: 14,
    marginLeft: wp('10%'),
    marginTop: wp('5%'),
  },
});
export default FilterModal;
