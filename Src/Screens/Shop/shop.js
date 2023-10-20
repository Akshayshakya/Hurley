import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,BackHandler,
  TextInput,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import InnerHeader from '../../Components/Header/innerHeader';
import Colors from '../../Components/CommonUtils/Colors';
import Header from '../../Components/Header/header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {products} from '../../Components/DummyData/shopData';
import {isANDROID} from '../../Components/CommonUtils/ThemeHelper';
import Images from '../../Components/CommonUtils/Images';
import {useDispatch, useSelector} from 'react-redux';
import {getAllShopsApiActionCreator} from './../../redux/actions/Shops/ShopsApiCreator';

const ShopScreen = props => {
  const [ListData, setListData] = useState(
    // products
    [],
  );
  const [filterData, setFilterData] = useState([]);
  const [shopsData, setShopsData] = useState([]);
  const dispatch = useDispatch();
  //const shopData = useSelector((state) => state.apiReducer.data);
  //const loading = useSelector((state) => state.apiReducer.loading);

  const getAllShops = async () => {
    let res = await dispatch(getAllShopsApiActionCreator());

    if (res?.data?.Action == 1) {
      // alert('ok')
      setFilterData(res?.data?.message);
      setShopsData(res?.data?.message);
    } else {
      //alert('no')
    }
  };

  useEffect(() => {
    getAllShops();

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

  const filterMember = text => {
    const newData = shopsData.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilterData(newData);
    if (text == '') {
      setFilterData(shopsData);
    }
  };

  const RedirecttoWeb = webURL => {
    if (webURL != '') {
      props.navigation.navigate('ShopWeb', {webURL});
    } else {
      alert('Coming soon..');
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.productStyle}
        onPress={() => {
          //RedirecttoWeb(item.webURL);
          RedirecttoWeb(item.url);
        }}>
        <ImageBackground
          imageStyle={{borderRadius: 20}}
          source={{uri: item.image ? item.image : Images.Profile}}
          // source={item?.image ?item?.image:Images.Profile}
          style={[styles.imageView]}>
          {/* <Text numberOfLines={1} style={styles.itemTxt}>
          {item?.name}
        </Text> */}
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainView}>
      <ImageBackground source={Images.theme} style={{flex: 1}}>
      <InnerHeader
          //headerText={'Edit Profile'}
          right={'cartNote'}
          goBack={() => props.navigation.goBack()}
          goCart={() => {
            let webURL='https://hurleys.ky/list/'
            props.navigation.navigate('ShopWeb', {webURL});
 
            //props.navigation.navigate('Cart');
          }}
          NotificationScreen={() => {
            props.navigation.navigate('Notification');
          }}
        />
      {/* <Header
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
        /> */}
        <View style={{flex: 1, marginHorizontal: 5, marginTop: wp(4)}}>
          {/* <View style={styles.container}>
            <TextInput
              placeholder={'Search Product...'}
              placeholderTextColor={'gray'}
              value={filterData}
              onChangeText={text => filterMember(text)}
              style={[styles.txtInput]}
            />
            <MaterialCommunityIcons
              name={'magnify'}
              color={'gray'}
              size={20}
              style={{marginRight: 8}}
            />
          </View> */}
          <View style={{flex: 1, marginHorizontal: 5}}>
            <Text style={styles.HeadTxt}>GROCERY</Text>
            <FlatList
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: hp(0)}}
              keyExtractor={(item, index) => index}
              data={filterData ? filterData : shopsData}
              //data={shopsData}
              renderItem={renderItem}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageView: {
    height: wp('40%'),
    width: wp('45%'),
    alignItems: 'center',
    justifyContent: 'center',
    // resizeMode: 'cover',
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Colors.greenAppColor,
    // resizeMode: 'contain',
  },
  productStyle: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 8,
    // alignSelf: 'center',
    // alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: 'black',
    // opacity: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    // padding: 18,
  },
  itemTxt: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: '700',
    // marginTop: wp('3%'),
    //  width: wp('40%'),
    // textAlign: 'center',
  },
  container: {
    // height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#000',
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: Colors.blackFirst,
    // opacity: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  txtInput: {
    flex: 1,
    paddingLeft: 15,
    color: '#000',
    padding: isANDROID ? 10 : 15,
  },
  HeadTxt: {
    marginVertical: 10,
    marginHorizontal: 10,
    fontWeight: '700',
    fontSize: 14,
    color: Colors.blackFirst,
  },
});

export default ShopScreen;
