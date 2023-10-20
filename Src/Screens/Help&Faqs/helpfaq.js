import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,BackHandler,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {hp, isANDROID, wp} from '../../Components/CommonUtils/ThemeHelper';
import Colors from '../../Components/CommonUtils/Colors';
import InnerHeader from '../../Components/Header/innerHeader';
import HelpComponent from './help';
import FaqComponent from './faq';
import Images from '../../Components/CommonUtils/Images';

const HelpFaqScreen = props => {
  const [select, setSelect] = useState('help');

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

  return (
    <View style={styles.mainView}>
      <ImageBackground source={Images.theme} style={{flex: 1}}>
        <InnerHeader goBack={goBack} headerText={'FAQs'} />

        <FaqComponent />

        {/* <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setSelect('help')}
          style={{
            ...styles.tabStyle,
            borderBottomColor:
              select == 'help' ? Colors.greenAppColor : 'transparent',
          }}>
          <Text
            style={{
              ...styles.tabTxt,
              color: select == 'help' ? Colors.blackFirst : Colors.gray,
            }}>
            Help
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelect('faq')}
          style={{
            ...styles.tabStyle,
            borderBottomColor:
              select == 'faq' ? Colors.greenAppColor : 'transparent',
          }}>
          <Text
            style={{
              ...styles.tabTxt,
              color: select == 'faq' ? Colors.blackFirst : Colors.gray,
            }}>
            FAQs
          </Text>
        </TouchableOpacity>
      </View> */}
        {/* {select == 'help' && <HelpComponent />}
      {select == 'faq' && <FaqComponent />} */}
      </ImageBackground>
    </View>
  );
};
export default HelpFaqScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('15%'),
    marginTop: hp('2%'),
  },
  tabStyle: {
    borderBottomWidth: 5,

    padding: wp('1%'),
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  tabTxt: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
