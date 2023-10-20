import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList, ImageBackground} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Components/CommonUtils/Colors';
import {isANDROID} from '../../Components/CommonUtils/ThemeHelper';
import Buttons from '../../Components/CommonUtils/Button';
import {Data} from '../../Components/DummyData/Ingredients';
import Modal from 'react-native-modal';

const ModalComponent = props => {
  const item = props?.item;
  // console.log('Modal Data...', item);

//alert(JSON.stringify(item))
  return (
    <Modal
      onBackdropPress={props?.onClose}
      onBackButtonPress={props?.onBackButtonPress}
      isVisible={props?.visible}
      animationIn={'slideInUp'}>
      <View style={styles.modalContainer}>
        <ImageBackground
          source={item?.image}
          style={styles.image}
          imageStyle={{borderTopLeftRadius: 20, borderTopRightRadius: 20,resizeMode:'stretch'}}>
          {/* <View style={styles.heartBg}>
            <MaterialIcon
              name="heart-outline"
              color={Colors.blackFirst}
              size={20}
            />
          </View> */}
          <MaterialIcon
            onPress={props?.onClose}
            name="close"
            color={Colors.white}
            size={30}
            style={{alignSelf: 'flex-end'}}
          />
        </ImageBackground>

        <View
          style={{marginHorizontal: wp('4%'), marginTop: hp('1%'), flex: 1}}>
          <View style={styles.flexView}>
            <Text style={styles.HeadTxt}>{item?.name}</Text>
            {/* <Text style={styles.HeadTxt}>{item?.sellprice}</Text> */}
          </View>

          <View style={styles.flexView}>
            {/* <Text style={{fontSize: 14, color: Colors.gray}}>
              {item?.detail}
            </Text>
            <Text style={{fontSize: 14, color: Colors.gray}}>
              {item?.markprice}
            </Text> */}
          </View>

          <View style={styles.line} />

          <Text style={{fontSize: 14, color: Colors.blackSecond}}>
          {/* Shoppers 65+ can enjoy a10% discount off their shopping bill every Thursday when they shop in-store. All you need to do is show your ID to the cashier to receive your discount. No minimum purchase is required.

 {'\n'}{'\n'} It is just our way of helping the elderly community save a little more money. */}
{item?.discrption}
          </Text>

          {/* <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            data={Data}
            contentContainerStyle={styles.FlatListStyle}
            renderItem={({item, index}) => {
              return (
                <View style={styles.IngiView}>
                  <View style={styles.bullet} />
                  <Text style={{fontSize: 14, color: Colors.gray}}>
                    {item?.details}
                  </Text>
                </View>
              );
            }}
          /> */}

          <View style={styles.BtnView}>
            {item?.id==4?null: item?.id==3? null:
            <Buttons label="SHOP NOW" onPress={props.openwebsite} />
}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.white,
    marginTop: isANDROID ? hp('7%') : hp('13%'),
    // marginHorizontal: wp('3%'),
    // marginBottom: hp('8%'),
    borderRadius: 20,
    // top: 0,
    bottom: hp(5),
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
  image: {
    height: 300,
    //resizeMode:'stretch',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
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
    marginTop: hp('1%'),
  },
  HeadTxt: {
    color: Colors.blackFirst,
    fontSize: 21,
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: Colors.gray,
    margin: wp('4%'),
  },
  bullet: {
    backgroundColor: Colors.gray,
    height: wp('1.5%'),
    width: wp('1.5%'),
    borderRadius: 100,
    marginRight: wp('2%'),
  },
  BtnView: {position: 'absolute', bottom: hp('2%'), left: 0, right: 0},
  FlatListStyle: {
    paddingVertical: wp('2%'),
    alignSelf: 'center',
  },
  IngiView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp('1%'),
  },
});
export default ModalComponent;
