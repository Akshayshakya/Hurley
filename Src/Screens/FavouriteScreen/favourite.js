import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../Components/CommonUtils/Colors';
import Header from '../../Components/Header/header';
import {DealsData} from '../../Components/DummyData/dealsOfDay';
import EateryFavourite from './eateryfav';
import Images from '../../Components/CommonUtils/Images';

const FavouriteScreen = props => {
  return (
    <View style={styles.mainView}>
      <ImageBackground source={Images.theme} style={{flex: 1}}>
        <Header
          openDrawer={() => {
            props.navigation.toggleDrawer();
          }}
          search={() => {
            props.navigation.navigate('Search');
          }}
          goNotification={() => {
            props.navigation.navigate('Notification');
          }}
          goCart={() => {
            props.navigation.navigate('Cart');
          }}
        />
        <ScrollView contentContainerStyle={{paddingBottom: hp('10%')}}>
          <Text style={styles.HeadTxt}>GROCERY'S FAVOURITES</Text>
          <EateryFavourite />

          <Text style={styles.HeadTxt}>EATERY'S FAVOURITES</Text>
          <EateryFavourite />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  HeadTxt: {
    fontSize: 14,
    color: Colors.blackFirst,
    fontWeight: 'bold',
    marginTop: wp('4%'),
    marginLeft: wp('4%'),
  },
});

export default FavouriteScreen;
