import React, {useEffect, useState} from 'react';
import {
  Linking,
  TouchableOpacity,
  Text,BackHandler,
  View,
  ImageBackground,
  StyleSheet,
  FlatList,
} from 'react-native';
import {hp, isANDROID, wp} from '../../Components/CommonUtils/ThemeHelper';
import {useIsFocused} from '@react-navigation/native';
import Header from '../../Components/Header/header';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Components/CommonUtils/Colors';
import Images from '../../Components/CommonUtils/Images';
import Contacts from '../../Components/CommonUtils/Strings';
import {DATA} from '../../Components/DummyData/liveChatData';

const LiveChat = props => {
  let listViewRef;
  const [whatsAppMsg, setWhatsAppMsg] = useState('');
  const focused = useIsFocused();
  const [collapse, seCollapse] = useState(null);
  const [show, setshow] = useState(false);

  const handleCollapse = index => {
    setshow(!show);
    seCollapse(index);


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

  const upButtonHandler = () => {
    //alert('hi')
    //OnCLick of Up button we scrolled the list to top
    listViewRef.scrollToOffset({ offset: 100, animated: true });
  };
  const FlatListItem = ({item, index}) => {
    return (
      <View style={[styles.HeaderView]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.numbView}>
              <Text style={[styles.HeaderTxt, {color: Colors.white}]}>
                {item.id}
              </Text>
            </View>
            <Text style={{...styles.HeaderTxt, width: wp('65%')}}>
              {item.title}
            </Text>
          </View>
          <MaterialIcon
            onPress={() =>{
              if(index==4)
              {
                setshow(!show);
                seCollapse(index);
                upButtonHandler()
              }
              else{
                handleCollapse(index)
              }
            } }
            name={collapse == index && show ? 'chevron-up' : 'chevron-down'}
            size={25}
            color={Colors.blackFirst}
          />
        </View>
        {collapse == index && show ? (
          <View style={[styles.ChildView]}>
            <Text style={styles.ChildTxt}>{item.data}</Text>
          </View>
        ) : null}
      </View>
    );
  };

  const initiateWhatsApp = () => {
    let url =
      'whatsapp://send?text=' +
      whatsAppMsg +
      '&phone=' +
      Contacts.code +
      Contacts.whatsApp;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={Images.theme} style={{flex: 1}}>
      <Header
          openDrawer={() => {
            props.navigation.toggleDrawer();
          }}
          search={() => {
            let webURL='https://hurleys.ky/shop/'
            props.navigation.navigate('ShopWeb', {webURL});
           // props.navigation.navigate('Search');
          }}
          goNotification={() => {
            props.navigation.navigate('Notification');
          }}
          goCart={() => {
            let webURL='https://hurleys.ky/list/'
            props.navigation.navigate('ShopWeb', {webURL});
 
            //props.navigation.navigate('Cart');
          }}
        />
        <Text style={[styles.HTxt]}>FAQs</Text>
        <FlatList
          scrollEnabled={true}
          style={{marginTop: wp(3),marginBottom:50,}}
          keyExtractor={(item, index) => index}
          data={DATA}
          contentContainerStyle={{paddingBottom: hp('15%')}}
          renderItem={FlatListItem}
          ref={(ref) => {
            listViewRef = ref;
          }}
        />

        <View style={{...styles.container}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.TxtB}>OPENING HOURS:</Text>
              <Text style={{...styles.Txt, marginTop: wp('4%')}}>
                Monday-Saturday:{' '}
                <Text style={{fontWeight: 'bold'}}>7am-9pm</Text>
              </Text>
              <Text style={{...styles.Txt, marginVertical: wp('3%')}}>
                Bank Holidays: <Text style={{fontWeight: 'bold'}}>9am-6pm</Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={initiateWhatsApp}
              style={styles.whatsAppView}>
              <MaterialIcon name="whatsapp" size={26} color={Colors.white} />
              <Text style={styles.Txt1}>Chat</Text>
            </TouchableOpacity>
          </View>

          <Text style={{...styles.Txt, fontWeight: 'bold'}}>
            Closed Good Friday, Christmas and New Year’s Day
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};
export default LiveChat;

const styles = StyleSheet.create({
  whatsAppView: {
    // position: 'absolute',
    // bottom: hp(10),
    // right: wp(10),
    backgroundColor: Colors.greenAppColor,
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 20,
  },
  Txt1: {
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: wp('2%'),
    fontSize: 18,
  },
  HeaderView: {
    paddingHorizontal: wp('4%'),
    marginHorizontal: wp('4%'),
    marginTop: wp('2%'),
    paddingVertical: wp('3%'),
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: Colors.blackFirst,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: wp('1%'),
  },
  ChildView: {
    paddingTop: wp('4%'),
  },
  HeaderTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.blackFirst,
  },
  ChildTxt: {
    color: Colors.grayShade,
    // textAlign: 'justify',
    fontSize: 14,
  },
  numbView: {
    backgroundColor: Colors.appColor,
    borderRadius: 100,
    height: wp('6%'),
    width: wp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'),
    alignSelf: 'flex-start',
  },
  HTxt: {
    marginLeft: wp('4%'),
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: hp('2%'),
    color: Colors.blackFirst,
  },
  container: {
    borderRadius: 20,
    marginHorizontal: wp('4%'),
    // marginTop: wp('2%'),
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
    bottom: hp('5%'),
    // alignItems: 'center',
  },
  Txt: {
    color: Colors.blackFirst,
    fontSize: 12,
    // textAlign: 'center'
  },
  TxtB: {
    fontSize: 14,
    color: Colors.blackFirst,
    fontWeight: 'bold',
  },
});
