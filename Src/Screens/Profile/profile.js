import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,BackHandler,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Components/CommonUtils/Colors';
import InnerHeader from '../../Components/Header/innerHeader';
import Images from '../../Components/CommonUtils/Images';
import {useDispatch, useSelector} from 'react-redux';
const ProfileScreen = props => {
  const loginData = useSelector((state) => state.authenticationReducer.data);
  const goEditProfile = () => {
    props.navigation.navigate('EditProfile');
  };
  const goBack = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
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
  //alert(JSON.stringify(loginData?.data.message))
  return (
    <View style={styles.mainView}>
      <ImageBackground source={Images.theme} style={{flex: 1}}>
        <InnerHeader
          headerText={'Profile'}
          right={'cartNote'}
          goBack={goBack}
          goCart={() => {
            let webURL='https://hurleys.ky/list/'
            props.navigation.navigate('ShopWeb', {webURL});
 
            //props.navigation.navigate('Cart');
          }}
          NotificationScreen={() => {
            props.navigation.navigate('Notification');
          }}
        /> 
        <ScrollView>
          <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
              <Image source={Images.Profile} style={styles.ImgStyle} />
              <Text style={styles.nametxt}> {loginData?.data.message.vName}{' '}{loginData?.data.message.vLastName}</Text>
              <TouchableOpacity onPress={goEditProfile} style={styles.editBtn}>
                <Text style={{color: Colors.white, fontSize: 12}}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={{...styles.nametxt, marginLeft: wp('4%')}}>
            Basic Details
          </Text>

          <View style={{...styles.container, marginTop: 0}}>
            <View style={styles.flexView}>
              <Text style={styles.LightTxt}>Email Address</Text>
              <Text style={styles.DarkTxt}>{loginData?.data.message.vEmail}</Text>
            </View>

            <View style={styles.flexView}>
              <Text style={styles.LightTxt}>Phone Number</Text>
              <Text style={styles.DarkTxt}>{loginData?.data.message.vPhone}</Text>
            </View>

            <View style={styles.flexView}>
              <Text style={styles.LightTxt}>DOB</Text>
              <Text style={styles.DarkTxt}>{loginData?.data.message.dBirthDate}</Text>
            </View>

            <View style={styles.flexView}>
              <Text style={styles.LightTxt}>Gender</Text>
              <Text style={styles.DarkTxt}>{loginData?.data.message.eGender}</Text>
            </View>

            <View style={styles.flexView}>
              <Text style={styles.LightTxt}>Language</Text>
              <Text style={styles.DarkTxt}>English</Text>
            </View>
          </View>

          {/* <View style={styles.container}>
            <View style={{...styles.flexView, marginBottom: 0}}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.iconBg}>
                  <MaterialIcon
                    name={'map-marker'}
                    size={20}
                    color={Colors.white}
                  />
                </View>
                <Text style={{...styles.LightTxt}}>Manage Addresses</Text>
              </View>
              <MaterialIcon
                onPress={() => {
                 props.navigation.navigate('Address');
                }}
                name={'chevron-right'}
                size={25}
                color={Colors.blackFirst}
                style={{alignSelf: 'center'}}
              />
            </View>
          </View> */}

          {/* <View style={styles.line} /> */}
{/* 
          <View style={styles.container}>
            <View style={{...styles.flexView, marginBottom: 0}}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.iconBg}>
                  <MaterialIcon
                    name={'note-text'}
                    size={20}
                    color={Colors.white}
                  />
                </View>
                <Text style={{...styles.LightTxt}}>Add Billing Details</Text>
              </View>
              <MaterialIcon
                name={'chevron-right'}
                size={25}
                color={Colors.blackFirst}
                style={{alignSelf: 'center'}}
              />
            </View>
          </View> */}
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
  container: {
    borderRadius: 20,
    marginHorizontal: wp('4%'),
    marginVertical: wp('2%'),
    padding: wp('4%'),
    backgroundColor: Colors.white,
    shadowColor: Colors.blackFirst,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  ImgStyle: {
    height: wp('20%'),
    width: wp('20%'),
    borderRadius: wp('20%') / 2,
    borderWidth: 5,
    borderColor: Colors.greenAppColor,
  },
  nametxt: {
    color: Colors.blackFirst,
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: hp('1%'),
  },
  editBtn: {
    backgroundColor: Colors.appColor,
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 10,
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: wp('3%'),
  },
  LightTxt: {
    color: Colors.grayShade,
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  DarkTxt: {
    color: Colors.blackFirst,
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  iconBg: {
    height: wp('8%'),
    width: wp('8%'),
    borderRadius: wp('8%') / 2,
    backgroundColor: Colors.appColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'),
  },
  line: {
    height: 0.5,
    backgroundColor: Colors.grayShade,
    marginVertical: wp('3%'),
    marginHorizontal: wp('4%'),
  },
});

export default ProfileScreen;
