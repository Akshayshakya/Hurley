import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Components/CommonUtils/Colors';
import {DealsData} from '../../Components/DummyData/dealsOfDay';

const EateryFavourite = props => {
  const EateryFavouriteItem = ({item, index}) => {
    return (
      <View style={[styles.container]}>
        <Image source={item?.image} style={styles.imageView} />
        <View style={styles.dealsFlex}>
          <View>
            <Text style={styles.Txt3}>{item?.name}</Text>
            <Text style={styles.Txt4}>{item?.detail}</Text>
          </View>
          <MaterialIcon
            name={'heart-outline'}
            size={20}
            color={Colors.grayShade}
          />
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
    <View>
      <FlatList
        numColumns={2}
        keyExtractor={(item, index) => index}
        data={DealsData}
        renderItem={EateryFavouriteItem}
        style={{paddingVertical: hp('1%')}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default EateryFavourite;
