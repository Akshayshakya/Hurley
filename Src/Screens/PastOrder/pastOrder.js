import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {hp, isANDROID, wp} from '../../Components/CommonUtils/ThemeHelper';
import Colors from '../../Components/CommonUtils/Colors';
import InnerHeader from '../../Components/Header/innerHeader';
import GroceryOrders from './groceryOrder';
import EateryOrders from './eateryOrder';
import Images from '../../Components/CommonUtils/Images';

const PastOrder = props => {
  const [select, setSelect] = useState('0');

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.mainView}>
      <ImageBackground source={Images.theme} style={{flex: 1}}>
        <InnerHeader goBack={goBack} />

        <View style={styles.tabContainer}>
          {/* <TouchableOpacity
            onPress={() => setSelect('0')}
            style={{
              ...styles.tabStyle,
              borderBottomColor:
                select == '0' ? Colors.greenAppColor : 'transparent',
            }}>
            <Text
              style={{
                ...styles.tabTxt,
                color: select == '0' ? Colors.blackFirst : Colors.gray,
              }}>
              EATERY ORDERS
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => setSelect('1')}
            style={{
              ...styles.tabStyle,
              borderBottomColor:
                select == '1' ? Colors.greenAppColor : 'transparent',
            }}>
            <Text
              style={{
                ...styles.tabTxt,
                color: select == '1' ? Colors.blackFirst : Colors.gray,
              }}>
              GROCERY ORDERS
            </Text>
          </TouchableOpacity>
        </View>
        <GroceryOrders {...props} />
        {/* {select == '0' && <EateryOrders {...props} />}
        {select == '1' && <GroceryOrders {...props} />} */}
      </ImageBackground>
    </View>
  );
};
export default PastOrder;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('8%'),
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
