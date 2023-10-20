import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../Components/CommonUtils/Colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from '../../Components/CommonUtils/Images';

const HorizontalFlat = props => {
  const [products, setProduct] = useState(props.data);

  const renderItem = ({item, index}) => {
    return (
      <View style={[styles.container]}>
        <Image source={item?.image} style={styles.imageView} />
        <View style={styles.flexView}>
          <View style={{width: wp('17%')}}>
            <Text
              style={{color: Colors.blackFirst, fontSize: 12}}
              numberOfLines={1}>
              {item?.name}
            </Text>
            <Text style={{color: Colors.gray, fontSize: 12}} numberOfLines={1}>
              {item?.detail}
            </Text>
          </View>
          {/* <MaterialIcon
            name={'heart-outline'}
            size={20}
            color={Colors.grayShade}
          /> */}
          {/* <View style={{flex: 1}}> */}
          <TouchableOpacity style={styles.viewBtn}>
            <Text style={{color: Colors.white, fontSize: 12}}>Add</Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainView}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.Flatcontainer}
        keyExtractor={(item, index) => index}
        data={products}
        renderItem={renderItem}
        ListHeaderComponent={
          <Image
            source={Images.ChefNelly}
            style={{height: hp('20%'), width: wp('74%'), borderRadius: 20}}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    // backgroundColor: '#fff',
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: wp(1),
    paddingHorizontal: wp(2),
  },
  container: {
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: Colors.white,
  },
  imageView: {
    height: wp(30),
    width: wp(35),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  Flatcontainer: {
    backgroundColor: Colors.grayfade,
    paddingVertical: wp(5),
  },
  viewBtn: {
    backgroundColor: Colors.appColor,
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
});

export default HorizontalFlat;
