import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Components/CommonUtils/Colors';
import {isANDROID} from '../../Components/CommonUtils/ThemeHelper';
import Buttons from '../../Components/CommonUtils/Button';
import Modal from 'react-native-modal';

// const Data = [
//   {
//     name: 'Grocery item 1',
//     prices: '150',
//   },
//   {
//     name: 'Grocery item 1',
//     prices: '15',
//   },
//   {
//     name: 'Grocery item 1',
//     prices: '10',
//   },
//   {
//     name: 'Grocery item 1',
//     prices: '10',
//   },
//   {
//     name: 'Grocery item 1',
//     prices: '150',
//   },
//   {
//     name: 'Grocery item 1',
//     prices: '15',
//   },
//   {
//     name: 'Grocery item 1',
//     prices: '150',
//   },
//   {
//     name: 'Grocery item 1',
//     prices: '10',
//   },
//   {
//     name: 'Grocery item 1',
//     prices: '150',
//   },
//   {
//     name: 'Grocery item 1',
//     prices: '10',
//   },
// ];

const DetailsModal = props => {
  const item = props?.item;
  console.log('Your Orders Data...', item);

  return (
    <Modal
      onBackdropPress={props?.onClose}
      isVisible={props?.visible}
      animationIn={'slideInUp'}
      style={{height: hp('50%')}}>
      <View style={styles.modalContainer}>
        <MaterialIcon
          onPress={props?.onClose}
          name="close"
          color={Colors.gray}
          size={25}
          style={styles.closeIcon}
        />
        <View style={{flex: 1}}>
          <View style={{marginHorizontal: wp('4%')}}>
            <View style={styles.flexView}>
              <Text style={styles.HeadTxt}>Items</Text>
              <Text style={styles.HeadTxt}>Prices</Text>
            </View>
            <View style={styles.line} />

            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              data={props.Data}
              contentContainerStyle={styles.FlatListStyle}
              renderItem={({item, index}) => {
                return (
                  <>
                    <View style={{...styles.flexView}}>
                      <View style={{width:'70%'}}>
                      <Text style={{fontSize: 14, color: Colors.blackSecond}}>
                        {item?.Name}
                      </Text>
                      </View>
                      <View>
                      <Text style={{fontSize: 14, color: Colors.blackSecond}}>
                         {item?.Price}
                      </Text>
                      </View>
                    </View>
                    <View style={styles.line} />
                  </>
                );
              }}
            />
          </View>

          <View style={styles.BtnView}>
            <View style={{marginRight: wp('3%')}}>
              <Text style={{color: Colors.gray, fontSize: 10}}>Items {props.Data.length}</Text>
              <Text
                style={{...styles.HeadTxt, marginLeft: 0, marginTop: wp('3%')}}>
                Total- {props.Final_Total_Amount}
              </Text>
            </View>
            {/* <View style={{flex: 1}}>
              <Buttons label="View Receipt" onPress={props?.onClose} />
            </View> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.white,
    marginTop: isANDROID ? hp('20%') : hp('26%'),
    // marginHorizontal: wp('3%'),
    borderRadius: 20,
    top: 0,
    height: hp('50%'),
    bottom: 0,
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
    // elevation: 5,
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
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
    marginVertical: wp('3%'),
  },
  closeIcon: {
    alignSelf: 'flex-end',
    marginTop: wp('4%'),
    marginRight: wp('4%'),
  },
  BtnView: {
    shadowColor: Colors.blackFirst,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingBottom: hp('3%'),
    paddingTop: wp('3%'),
    paddingHorizontal: wp('4%'),
  },
  FlatListStyle: {
    paddingVertical: wp('2%'),
    paddingBottom: hp('18%'),
  },
});
export default DetailsModal;
