import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon_1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon_2 from 'react-native-vector-icons/MaterialIcons';
import {View, Image, StyleSheet, Text} from 'react-native';
import {isANDROID} from '../Components/CommonUtils/ThemeHelper';
import Colors from '../Components/CommonUtils/Colors';
import Images from '../Components/CommonUtils/Images';
import CustomDrawer from './CustomDrawer';

import Splash from '../Screens/Splash/splash';
import Login from '../Screens/Signin/login';
import Register from '../Screens/Signup/register';
import Address from '../Screens/Addresses/address';
import CheckMail from '../Screens/CheckMail/checkMail';
import Eatery from '../Screens/Eatery/eatery';
import ForgotPassword from '../Screens/ForgotPassword/forgot';
import ResetPassword from '../Screens/ResetPassword/reset';
import Home from '../Screens/Home/home';
import Loyality from '../Screens/Loyality/loyality';
import Profile from '../Screens/Profile/profile';
import Shop from '../Screens/Shop/shop';
import VerifyOtpScreen from '../Screens/VerifyOtp/verifyOtp';
import FavouriteScreen from '../Screens/FavouriteScreen/favourite';
import WebComponent from '../Screens/WebView/webview';
import EditProfile from '../Screens/Profile/editProfile';
import AddAddress from '../Screens/Addresses/addAddress';
import ContactUsScreen from '../Screens/ContactUs/contactUs';
import HelpFaqScreen from '../Screens/Help&Faqs/helpfaq';
import PastOrder from '../Screens/PastOrder/pastOrder';
import LiveChat from '../Screens/LiveChat/liveChat';
import SearchScreen from '../Screens/SearchScreen/search';
import NotificationScreen from '../Screens/NotificationScreen/notification';
import CartScreen from '../Screens/CartScreen/cart';
import BuyAgain from '../Screens/BuyAgain/buyAgain';
import DealScreen from '../Screens/Deals/deals';
import LoyalityWebView from "../Screens/Loyality/LoyalityWebView"
import ShopWebComponent from '../Screens/Shop/ShopWeb';
import VideoPlay from './../Screens/Home/videoPlay'
import TestScreen from '../Screens/TestScreen/testScreen'
import webviewNewScreen from './../Components/WebView/webviewNew'
import CateringScreen from './../Screens/catering/CateringScreen'

import PastOrderFromLoyalty from "./../Screens/PastOrder/PastOrderFromLoyalty"
const Auth = createStackNavigator();
const AppNav = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => {

  return (
    <Auth.Navigator headerMode={'none'} initialRouteName={'Login'}>
      <Auth.Screen name={'Login'} component={Login} />
      <Auth.Screen name={'Register'} component={Register} />
      <Auth.Screen name={'CheckMail'} component={CheckMail} />
      <Auth.Screen name={'ForgotPassword'} component={ForgotPassword} />
      <Auth.Screen name={'ResetPassword'} component={ResetPassword} />
      <AppNav.Screen name="VerifyOtp" component={VerifyOtpScreen} />
    </Auth.Navigator>
  );
};

const HomeStack = () => {
  return (
    <AppNav.Navigator headerMode="none" initialRouteName={'Home'}>
      <AppNav.Screen name={'Home'} component={Home} />
    </AppNav.Navigator>
  );
};

const ShopStack = () => {
  return (
    <AppNav.Navigator headerMode="none" initialRouteName={'Shop'}>
      <AppNav.Screen name={'Shop'} component={Shop} />
      <AppNav.Screen name={'ShopWeb'} component={ShopWebComponent} />
    </AppNav.Navigator>
  );
};

const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName=""
      screenOptions={({route}) => ({
        tabBarStyle: styles.tabBarStyle,
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        swipeEnabled: false,
      })}
      tabBarPosition="bottom">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Image
              source={focused ? Images.activeHomeTab : Images.homeTab}
              style={[styles.tabIcon]}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Eatery"
        component={Eatery}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => (
            <Image
              source={focused ? Images.activeEateryTab : Images.eateryTab}
              style={[styles.tabIcon]}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="ShopStack"
        component={ShopStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => (
            <Image
              source={focused ? Images.activeShopTab : Images.shopTab}
              style={[styles.tabIcon]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Deals"
        component={DealScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => (
            <Image
              source={focused ? Images.activeDeals : Images.deals}
              style={[styles.tabIcon]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Loyality"
       // component={Loyality}
       component={LoyalityWebView}
       
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => (
            <Image
              source={focused ? Images.activeLoyalityTab : Images.loyalityTab}
              style={[styles.tabIcon]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: Colors.blackFirst,
        width: isANDROID ? '75%' : '85%',
      }}
      screenOptions={navigation => ({
        drawerItemStyle: {
          borderRadius: 0,
          marginBottom: -wp(1),
        },
      })}
      initialRouteName="TabStack"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="TabStack"
        component={TabStack}
        // initialParams={{ screen: "Dashboard" }}
        options={{
          title: '',
          drawerActiveTintColor: Colors.white,
          drawerInactiveTintColor: Colors.white,
          drawerActiveBackgroundColor: 'transparent',
          headerShown: false,
          // drawerIcon: ({focused, size}) => (
          //   <View style={{marginRight: -wp(5)}}>
          //     <Icon_1 name="home" size={20} color={Colors.white} />
          //     {/* <Image source={Icons.home_Active} style={Styles.imgIcon} /> */}
          //   </View>
          // ),
        }}
      />
      <Drawer.Screen
        name="PastOrders"
        //component={PastOrder}
        component={PastOrderFromLoyalty}
        
        // initialParams={{ screen: "Dashboard" }}
        options={{
          title: 'Past orders',
          drawerActiveTintColor: Colors.white,
          drawerInactiveTintColor: Colors.white,
          drawerActiveBackgroundColor: 'transparent',
          headerShown: false,
          drawerLabelStyle: ({focused}) =>
            focused ? Colors.white : Colors.white,
          drawerIcon: ({focused, size}) => (
            <View style={{marginRight: -wp(5)}}>
              <Icon_1 name="calendar-text" size={20} color={Colors.white} />
              {/* <Image source={Icons.heart_Active} style={Styles.imgIcon} /> */}
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="Loyality"
        component={TabStack}
        initialParams={{screen: 'Loyality'}}
        options={{
          title: 'Scan your card',
          drawerActiveTintColor: Colors.white,
          drawerInactiveTintColor: Colors.white,
          drawerActiveBackgroundColor: 'transparent',
          headerShown: false,
          drawerLabelStyle: ({focused}) =>
            focused ? Colors.white : Colors.white,
          drawerIcon: ({focused, size}) => (
            <View style={{marginRight: -wp(5)}}>
              <Icon_1 name="qrcode-scan" size={20} color={Colors.white} />
              {/* <Image source={Icons.heart_Active} style={Styles.imgIcon} /> */}
            </View>
          ),
        }}
      />

      {/* <Drawer.Screen
        name="Eatery"
        component={TabStack}
        initialParams={{screen: 'Eatery'}}
        options={{
          title: 'Eatery',
          drawerActiveTintColor: Colors.white,
          drawerInactiveTintColor: Colors.white,
          drawerActiveBackgroundColor: 'transparent',
          headerShown: false,
          drawerLabelStyle: ({focused}) =>
            focused ? Colors.white : Colors.white,
          drawerIcon: ({focused, size}) => (
            <View style={{marginRight: -wp(5)}}>
              <Icon_1 name="hamburger" size={20} color={Colors.white} />
              {/* <Image source={Icons.category_Active} style={Styles.imgIcon1} /> */}
            {/* //</View>
          ),
        }}
      /> */}
       {/* */}

      <Drawer.Screen
        name="EateryOrder"
        component={CateringScreen}
        // initialParams={{screen: 'Eatery'}}
        options={{
          title: 'Catering',
          drawerActiveTintColor: Colors.white,
          drawerInactiveTintColor: Colors.white,
          drawerActiveBackgroundColor: 'transparent',
          headerShown: false,
          drawerLabelStyle: ({focused}) =>
            focused ? Colors.white : Colors.white,
          drawerIcon: ({focused, size}) => (
            <View style={{marginRight: -wp(5)}}>
              <Icon_2 name="restaurant" size={20} color={Colors.white} />
              {/* <Image source={Icons.info_Active} style={Styles.imgIcon} /> */}
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="Shop"
        component={Shop}
        initialParams={{screen: ''}}
        options={{
          title: 'Shop Grocery',
          drawerActiveTintColor: Colors.white,
          drawerInactiveTintColor: Colors.white,
          drawerActiveBackgroundColor: 'transparent',
          headerShown: false,
          drawerLabelStyle: ({focused}) =>
            focused ? Colors.white : Colors.white,
          drawerIcon: ({focused, size}) => (
            <View style={{marginRight: -wp(5)}}>
              <Icon_1 name="shopping" size={20} color={Colors.white} />
              {/* <Image source={Icons.info_Active} style={Styles.imgIcon} /> */}
            </View>
          ),
        }}
      />

      {/* <Drawer.Screen
        name="LiveChat"
        component={LiveChat}
        // initialParams={{screen: 'Eatery'}}
        options={{
          title: 'Live Chat',
          drawerActiveTintColor: Colors.white,
          drawerInactiveTintColor: Colors.white,
          drawerActiveBackgroundColor: 'transparent',
          headerShown: false,
          drawerLabelStyle: ({focused}) =>
            focused ? Colors.white : Colors.white,
          drawerIcon: ({focused, size}) => (
            <View style={{marginRight: -wp(5)}}>
              <Icon_1 name="chat-processing" size={20} color={Colors.white} />
              
            </View>
          ),
        }}
      /> */}

      <Drawer.Screen
        name="ContactUs"
        component={ContactUsScreen}
        // initialParams={{screen: 'Eatery'}}
        options={{
          title: 'Contact Us',
          drawerActiveTintColor: Colors.white,
          drawerInactiveTintColor: Colors.white,
          drawerActiveBackgroundColor: 'transparent',
          headerShown: false,
          drawerLabelStyle: ({focused}) =>
            focused ? Colors.white : Colors.white,
          drawerIcon: ({focused, size}) => (
            <View style={{marginRight: -wp(5)}}>
              <Icon_1
                name="card-account-phone"
                size={20}
                color={Colors.white}
              />
              {/* <Image source={Icons.info_Active} style={Styles.imgIcon} /> */}
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="HelpFaq"
        component={HelpFaqScreen}
        // initialParams={{screen: 'Eatery'}}
        options={{
          title: 'FAQs',
          drawerActiveTintColor: Colors.white,
          drawerInactiveTintColor: Colors.white,
          drawerActiveBackgroundColor: 'transparent',
          headerShown: false,
          drawerLabelStyle: ({focused}) =>
            focused ? Colors.white : Colors.white,
          drawerIcon: ({focused, size}) => (
            <View style={{marginRight: -wp(5)}}>
              <Icon_1 name="lightbulb-on" size={20} color={Colors.white} />
              {/* <Image source={Icons.info_Active} style={Styles.imgIcon} /> */}
            </View>
          ),
        }}
      />

      {/* <Drawer.Screen
        name="RewardPartner"
        component={TabStack}

        options={{
          title: `Hurley's +`,
          drawerActiveTintColor: Colors.white,
          drawerInactiveTintColor: Colors.white,
          drawerActiveBackgroundColor: 'transparent',
          headerShown: false,
          drawerLabelStyle: ({focused}) =>
            focused ? Colors.white : Colors.white,
          drawerIcon: ({focused, size}) => (
            <View style={{marginRight: -wp(5)}}>
              <Icon_1 name="seal" size={20} color={Colors.white} />
             
            </View>
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppNav.Navigator headerMode="none" initialRouteName="Splash">
        <AppNav.Screen name="Splash" component={Splash} />
        <AppNav.Screen name="AuthNavigator" component={AuthStack} />
        <AppNav.Screen name="DrawerStack" component={DrawerStack} />
        <AppNav.Screen name="Profile" component={Profile} />
        <AppNav.Screen name="EditProfile" component={EditProfile} />
        <AppNav.Screen name="Address" component={Address} />
        <AppNav.Screen name="AddAddress" component={AddAddress} />
        <AppNav.Screen name="Search" component={SearchScreen} />
        <AppNav.Screen name="Notification" component={NotificationScreen} />
        <AppNav.Screen name="Cart" component={CartScreen} />
        <AppNav.Screen name={'WebComponent'} component={WebComponent} />
        <AppNav.Screen name="BuyAgain" component={BuyAgain} />
        <AppNav.Screen name="VideoPlay" component={VideoPlay} />
        <AppNav.Screen name="webviewNewScreen" component={webviewNewScreen} />

        <AppNav.Screen name="PastOrderFromLoyalty" component={PastOrderFromLoyalty} />
        
      </AppNav.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    height: wp('10%'),
    width: wp('10%'),
    resizeMode: 'contain',
    // borderWidth: 1,
  },
  // tabSecIcon: {
  //   height: wp('6.5%'),
  //   width: wp('6.2%'),
  // },
  // tabIconLast: {
  //   height: wp('5.5%'),
  //   width: wp('6.2%'),
  // },
  tabBarIndicatorStyle: {
    top: 0,
    backgroundColor: Colors.greenAppColor,
    height: wp(1.5),
    // width: wp(12),
    // marginHorizontal: isANDROID ? wp(4) : wp(8),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  tabBarStyle: {
    backgroundColor: Colors.grayfade,
    borderBottomWidth: 0,
    paddingRight: wp(3),
  },
});

export default AppNavigation;
