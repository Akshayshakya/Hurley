import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Components/CommonUtils/Colors';
import {DealsData} from '../../Components/DummyData/dealsOfDay';
import TextInputs from '../../Components/CommonUtils/TextInput';
import InnerHeader from '../../Components/Header/innerHeader';
import Images from '../../Components/CommonUtils/Images';
import Buttons from '../../Components/CommonUtils/Button';

const BuyAgain = props => {
  const [checked, setChecked] = useState(false);
  const [ListData, setListData] = useState(DealsData);
  const [filterData, setFilterData] = useState(DealsData);

  const filterMember = text => {
    const newData = ListData.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilterData(newData);
    if (text == '') {
      setFilterData(ListData);
    }
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const BuyItem = ({item, index}) => {
    return (
      <View style={[styles.container]}>
        <Image source={item?.image} style={styles.imageView} />
        <View style={styles.dealsFlex}>
          {/* <View> */}
          <Text style={styles.Txt3}>{item?.name}</Text>
          <Text style={styles.Txt4}>{item?.detail}</Text>
          {/* </View>
          <MaterialIcon
            name={'heart-outline'}
            size={20}
            color={Colors.grayShade}
          /> */}
        </View>
        <View style={styles.dealsFlex}>
          <View>
            <Text style={styles.Txt3}>{item?.sellprice}</Text>
            <Text style={styles.markedPricetxt}>{item?.markprice}</Text>
          </View>
          <View>
            <View style={styles.viewBtn}>
              <Text style={{color: Colors.white, fontSize: 12}}>Add</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainView}>
      <ImageBackground source={Images.theme} style={{flex: 1}}>
        <InnerHeader goBack={goBack} headerText={'Buy Again'} />
        {/* <View style={styles.searchContainer}>
          <MaterialIcon name={'magnify'} size={20} color={Colors.gray} />
          <View style={{flex: 1}}>
            <TextInputs
              placeholder={'Search...'}
              value={filterData}
              onChangeText={text => filterMember(text)}
              notMargin
            />
          </View>
        </View> */}
        <View style={styles.addAllV}>
          <Text style={{...styles.Txt3, fontSize: 14}}>
            Add all items to cart
          </Text>
          <MaterialIcon
            onPress={() => setChecked(!checked)}
            name={
              checked ? 'checkbox-marked-outline' : 'checkbox-blank-outline'
            }
            size={23}
            color={Colors.appColor}
          />
        </View>
        <FlatList
          numColumns={2}
          keyExtractor={(item, index) => index}
          data={filterData ? filterData : ListData}
          renderItem={BuyItem}
          style={{paddingVertical: hp('1%')}}
        />
        {checked ? (
          <View style={styles.contBtn}>
            <Buttons label="Continue" />
          </View>
        ) : null}
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
    marginLeft: wp('4%'),
    backgroundColor: Colors.white,
    shadowColor: Colors.blackFirst,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: wp('4%'),
  },
  addAllV: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5%'),
    marginHorizontal: wp('4%'),
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: wp('4%'),
    backgroundColor: Colors.white,
    shadowColor: Colors.blackFirst,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: wp('4%'),
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
  imageView: {
    height: wp(35),
    width: wp(44),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dealsFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: wp(1),
    paddingHorizontal: wp(2),
  },
  Txt3: {color: Colors.blackFirst, fontSize: 12, fontWeight: 'bold'},
  Txt4: {color: Colors.grayShade, fontSize: 12},
  markedPricetxt: {
    color: Colors.gray,
    fontSize: 8,
    alignSelf: 'flex-end',
    marginTop: wp('1%'),
  },
  viewBtn: {
    backgroundColor: Colors.appColor,
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 10,
  },
  contBtn: {
    position: 'absolute',
    bottom: hp('3%'),
    left: wp('4%'),
    right: wp('4%'),
  },
});
export default BuyAgain;
