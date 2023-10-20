import React, {useContext, useState, useEffect, useCallback} from 'react';

import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import Icon_1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {hp, wp, color, isANDROID} from '../Components/CommonUtils/ThemeHelper';
import Images from '../Components/CommonUtils/Images';
import Colors from '../Components/CommonUtils/Colors';
import  {logoutActionCreator} from '../redux/actions/Authentication/AuthenticationApiCreator'
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
const CustomDrawer = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [IsLogOut, setIsLogOut] = useState(false);
  useEffect(() => {
    setIsLogOut(false)
    //alert(JSON.stringify(loginData.data.message?.isDefault))
  }, [isFocused]);
const loginData = useSelector((state) => state.authenticationReducer.data);
const loading = useSelector((state) => state.authenticationReducer.loading);
  const LogOut = async() => {
    setIsLogOut(true) 
   
   let res= await dispatch(logoutActionCreator())
   navigation.dispatch(StackActions.popToTop());
 //alert(JSON.stringify(res))
   //setIsLogOut(false)
  };
 
  const goToProfile = () => {
    props.navigation.navigate('Profile');
  };

  return (
    <>
      <ImageBackground source={Images.SideMenuBg} style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Icon_1
            onPress={() => {
              props.navigation.closeDrawer();
            }}
            name="close"
            size={40}
            color={Colors.white}
            style={Styles.crossIcon}
          />
          <View style={Styles.bgImageContainer}>
            <View style={{}}>
              <Image source={Images.Profile} style={[Styles.imageContainer]} />
            </View>
            <View style={Styles.nameContaioner}>
              <Text style={Styles.userNameText}>
                {/* Simran Lawrence  */}
                {loginData?.data?.message?.vName}{' '}{loginData?.data?.message?.vLastName}
              </Text>
              <Text style={Styles.useremailText}>
                {/* Simran@gmail.com */}
                {loginData?.data?.message?.vEmail}
                </Text>
              <TouchableOpacity onPress={goToProfile} style={Styles.settingbtn}>
                <Text style={Styles.settingText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={{}} showsVerticalScrollIndicator={false}>
            <View style={{marginTop: -hp(2), marginLeft: wp('5%')}}>
              <DrawerItemList
                {...props}
                activeTintColor={Colors.gray}
                activeBackgroundColor={'transparent'}
                inactiveTintColor={Colors.gray}
                inactiveBackgroundColor={Colors.white}
                style={{backgroundColor: Colors.blackFirst}}
                labelStyle={[
                  {color: Colors.blackFirst, marginTop: -hp(0)},
                  isANDROID ? {fontSize: 14} : {fontSize: 15},
                ]}
              />
            </View>
          </ScrollView>
        </View>
        <View style={Styles.logoutContainer}>
          <TouchableOpacity
            onPress={LogOut}
            style={[Styles.logoutButton, {backgroundColor: Colors.white}]}>
               {IsLogOut ?null:
            <Icon_1 name="power" size={25} color={Colors.appColor} />
               }
            {IsLogOut ?
           <ActivityIndicator size="large" color="red" />  
             :
            <Text
              style={[
                Styles.logoutText,
                isANDROID ? {fontSize: 14} : {fontSize: 16},
              ]}>
              Logout
            </Text>
}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};
export default CustomDrawer;

const Styles = StyleSheet.create({
  flexV1: {
    flex: 1,
  },

  bgImageContainer: {
    borderBottomWidth: 1,
    borderColor: Colors.white,
    flexDirection: 'row',
    marginTop: hp(2),
    marginBottom: wp(2),
    marginHorizontal: wp(2),
    paddingVertical: hp(1.1),
    paddingHorizontal: hp(1.1),
    // marginTop:isANDROID ? hp(2.5) : hp(3.5)
  },

  imageContainer: {
    height: wp(15),
    width: wp(16),
    borderRadius: wp(16) / 2,
  },

  nameContaioner: {marginHorizontal: wp(2), justifyContent: 'center', flex: 1},

  userNameText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.3,
  },

  useremailText: {
    color: Colors.white,
    fontSize: 13,
    marginVertical: hp(1),
    letterSpacing: 0.3,
  },

  roleType: {
    color: 'white',
    fontSize: 12,
    letterSpacing: 0.3,
    marginTop: hp(1),
  },

  settingbtn: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderColor: Colors.white,
    marginBottom: hp(1),
    borderBottomWidth: 1,
  },

  settingText: {
    color: Colors.white,
    marginHorizontal: wp(1),
    marginBottom: wp(0.2),
    alignSelf: 'center',
    fontSize: 12,
  },

  logoutContainer: {
    flex: 0.1,
    marginLeft: wp(3),
    paddingVertical: hp(1.5),
  },
  logoutButton: {
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    // marginRight: wp(20),
  },
  logoutText: {
    color: Colors.appColor,
    alignSelf: 'center',
    marginLeft: wp(2),
    fontWeight: 'bold',
  },
  crossIcon: {
    alignSelf: 'flex-end',
    marginTop: isANDROID ? hp(2) : hp(5.9),
    marginRight: wp(3),
  },
});
