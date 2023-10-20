import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,BackHandler,
  Text,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../Components/CommonUtils/Colors';
import InnerHeader from '../../Components/Header/innerHeader';
import ListComponent from './ListComponent';
import {todaydata, data} from '../../Components/DummyData/notification';
import Images from '../../Components/CommonUtils/Images';

const NotificationScreen = props => {
  const goBack = () => {
    props.navigation.goBack();
  };

  useEffect(() => {

    //  getAllReceipts()
    const backAction = () => {
      props.navigation.goBack()
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  
    return () => backHandler.remove();
  
  }, []);


  return (
    <View style={styles.mainView}>
      <ImageBackground source={Images.theme} style={{flex: 1}}>
        <InnerHeader
          headerText={'Notification'}
          right={'clear'}
          goBack={goBack}
        />
        <ScrollView>
        <Text style={{marginTop:200,fontSize:22,textAlign:'center'}}>No records Found !</Text>
          {/* <Text style={styles.Htxt}>Today</Text>
          <ListComponent data={todaydata} />

          <Text style={styles.Htxt}>Yesterday</Text>
          <ListComponent data={data} /> */}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
export default NotificationScreen;

const styles = StyleSheet.create({
  mainView: {flex: 1, backgroundColor: Colors.white},
  Htxt: {
    fontSize: 14,
    color: Colors.blackFirst,
    fontWeight: 'bold',
    marginLeft: wp('4%'),
    marginTop: hp('2%'),
  },
});
