import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../Components/CommonUtils/Colors';

const ListComponent = props => {
  return (
    <FlatList
      keyExtractor={(item, index) => index}
      data={props.data}
      scrollEnabled={false}
      //   style={{marginBottom: hp('1%')}}
      renderItem={({item, index}) => {
        return (
          <View style={{...styles.container}}>
            <View style={{flexDirection: 'row'}}>
              <Image source={item?.image} style={styles.image} />
              <View style={{marginLeft: wp('5%')}}>
                <Text style={styles.Htxt}>{item?.name}</Text>
                <Text style={styles.txt}>{item?.details}</Text>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};
export default ListComponent;

const styles = StyleSheet.create({
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
  image: {
    height: wp('15%'),
    width: wp('15%'),
    borderRadius: 100,
  },
  Htxt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.blackFirst,
    marginBottom: wp('2%'),
  },
  txt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.gray,
    width: wp('70%'),
  },
});
