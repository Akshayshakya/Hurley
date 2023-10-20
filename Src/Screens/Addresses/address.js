import React, {useEffect, useState} from 'react';
import {StyleSheet,BackHandler, View, ImageBackground,Image, Text, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import InnerHeader from '../../Components/Header/innerHeader';
import TextInputs from '../../Components/CommonUtils/TextInput';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Components/CommonUtils/Colors';
import Buttons from '../../Components/CommonUtils/Button';
import Images from '../../Components/CommonUtils/Images';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import {getAllAddressApiActionCreator,UpdateDefaultAddress} from '../../redux/actions/UserProfile/UserProfileApiCreator'
const AddressData = [
  {
    id: 1,
    title: 'Home',
    address:
      'P.O. Box 178, Grand Cayman KY1-1104, Poindexter Rd Prospect \nCayman Islands',
    mobile: '+1 - (345) 949-5764',
  },
  {
    id: 2,
    title: 'Office',
    address:
      'P.O. Box 178, Grand Cayman KY1-1104, Poindexter Rd Prospect \nCayman Islands',
    mobile: '+1 - (345) 949-5764',
  },
];

const AddressScreen = props => {
  const [select, setSelect] = useState(0);
  const [ListData, setListData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isDefaultAddressselected, setisDefaultAddressselected] = useState(false);
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.authenticationReducer.data);
  const isFocused = useIsFocused();


  const filterMember = text => {
    const newData = ListData.filter(item => {
      const itemData = `${item.address.toUpperCase()}`;
      const textData = text.toUpperCase();
     // alert(item.address)
      return itemData.indexOf(textData) > -1;
    });
    //alert(JSON.stringify(newData))
   setFilterData(newData);

    if (text == '' || text==null) {
      setFilterData(ListData);
    }
  };
 

  useEffect(() => {
    _getAllAddress()
    //alert(JSON.stringify(loginData.data.message?.isDefault))

    const backAction = () => {
      props.navigation.goBack()
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  
    return () => backHandler.remove();

  }, [isFocused]);

  const _getAllAddress = async() => {
    let data = {
      type: 'DisplayUserAddressNew',
      iUserId:loginData.data.message?.iUserId,
    } 
    let res = await dispatch(getAllAddressApiActionCreator(data))
   //alert(JSON.stringify(res?.data.message.address))
    if (res?.data?.Action == 1) {
      setFilterData(res?.data.message.address)
     setListData(res?.data.message.address)
    // alert(JSON.stringify(res?.data.message.address))
    }
    else{
      alert('something went wrong.')
    }
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const goAddAddress = () => {
    props.navigation.navigate('AddAddress');
  };

  const _UpdateDefaultAddress=async()=>{
   // alert(select)
    let data = {
      type: 'updateDefaultAddress',
      iUserId:loginData.data.message?.iUserId,
      iUserAddressId:select,
    } 
    let res = await dispatch(UpdateDefaultAddress(data))
  
    if (res?.data?.Action == 1) {

      alert('Default address is updated successfully.')
_getAllAddress()
    }
  }

  return (
    <View style={styles.mainView}>
      <ImageBackground source={Images.theme} style={{flex: 1}}>
        <InnerHeader
          headerText={'Addresses'}
          //right={'add'}
          add={goAddAddress}
          goBack={goBack}
        />

        <View style={[styles.searchContainer]}>
          <MaterialIcon name={'magnify'} size={20} color={Colors.blackFirst} />
          <View style={{flex: 1}}>
            <TextInputs
              placeholder={'Find your address...'}
              value={filterData}
              onChangeText={text => filterMember(text)}
              notMargin
              borderColor={'transparent'}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: wp('4%'),flexDirection:'row',justifyContent:'flex-end'}}>
          <View style={{width:200}}>
        <Buttons 
        
        onPress={goAddAddress}
         label="Add new address" />
         </View>
        </View>

        {/* <View style={{...styles.container}}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={{color: Colors.grayShade, fontSize: 12}}>
                      {loginData.data.message?.tDestinationAddress}
                    </Text>
                    <View style={styles.flexView}>
                      <View style={{flexDirection: 'row',justifyContent:'flex-start'}}>
                        <MaterialIcon
                          onPress={() => {
                           // alert(index)
                            //setSelect(item?.iUserAddressId);
                          }} 
                          name={
                            loginData.data.message?.isDefault==1
                              ? 'circle-slice-8'
                              : 'circle-outline'
                          }
                          size={20}
                          color={Colors.blackFirst}
                          style={{marginRight: wp('2%')}}
                        />
                        <Text
                          style={{
                            color: Colors.greenAppColor,
                            fontSize: 12,
                            alignSelf: 'center',
                          }}>
                          Make default Address
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View> */}

        <FlatList
          keyExtractor={(item, index) => index}
          //data={ListData}
         // contentContainerStyle={{height:'100%'}}
          data={filterData ? filterData : ListData}
          style={{marginBottom:isDefaultAddressselected? 60:0}}
          renderItem={({item, index}) => {
            //alert(JSON.stringify(item))
            return (
              <View style={{...styles.container}}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={{color: Colors.appColor, fontSize: 14}}>
                      {/* {item?.address_type} */}
                    </Text>
                    <Text style={{color: Colors.grayShade, fontSize: 12}}>
                      {item?.address}
                    </Text>
                    <View style={styles.flexView}>
                      {/* <Text style={{color: Colors.grayShade, fontSize: 12}}>
                        {item?.mobile}
                      </Text> */}
                      <View style={{flexDirection: 'row',justifyContent:'flex-start'}}>
                        <MaterialIcon
                          onPress={() => {
                            setisDefaultAddressselected(true)
                            setSelect(item?.iUserAddressId);
                          }}
                          name={
                            select == item?.iUserAddressId
                              ? 'circle-slice-8'
                              : 'circle-outline'
                          }
                          size={20}
                          color={Colors.blackFirst}
                          style={{marginRight: wp('2%')}}
                        />
                        <Text
                          style={{
                            color: Colors.greenAppColor,
                            fontSize: 12,
                            alignSelf: 'center',
                          }}>
                          Make default Address
                        </Text>
                        {item.isDefault==1?
                        <Image source={Images.defaultAddress} style={{height:25,width:25,marginLeft:10}} />
                        :null}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />

{isDefaultAddressselected?
        <View
          style={{
            ...styles.buttonView,
            bottom: 10,
          }}>
        <Buttons onPress={_UpdateDefaultAddress} label="Done" /> 
        </View>
        :null
}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: wp('4%'),
    marginVertical: wp('3%'),
    backgroundColor: Colors.grayfade,
    paddingLeft: wp('3%'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderRadius: 20,
    marginHorizontal: wp('4%'),
    marginVertical: wp('3%'),
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
  buttonView: {
    position: 'absolute',
    left: wp('4%'),
    right: wp('4%'),
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp('2%'),
  },
});

export default AddressScreen;
