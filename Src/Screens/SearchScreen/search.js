import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../Components/CommonUtils/Colors';
import {isANDROID} from '../../Components/CommonUtils/ThemeHelper';
import Images from '../../Components/CommonUtils/Images';

const SearchScreen = props => {
  const [ListData, setListData] = useState([]);
  const [filterData, setFilterData] = useState([]);

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

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.theme} style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => props.navigation.goBack()}>
            <Feather
              name={'chevron-left'}
              color={Colors.blackFirst}
              size={25}
            />
          </TouchableOpacity>

          <View style={styles.TextInpContainer}>
            <TextInput
              placeholder={'Browse Hurley’s items...'}
              placeholderTextColor={Colors.gray}
              value={filterData}
              onChangeText={text => filterMember(text)}
              style={{paddingVertical: wp('1%')}}
            />
            <MaterialIcon name={'magnify'} size={20} color={Colors.gray} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
    paddingTop: isANDROID ? hp('2%') : hp('7%'),
    paddingBottom: wp('3%'),
    backgroundColor: Colors.white,
    flex: 1,
  },
  backBtn: {
    backgroundColor: Colors.grayfade,
    alignSelf: 'flex-start',
    padding: wp('1%'),
    borderRadius: 10,
  },
  TextInpContainer: {
    backgroundColor: Colors.grayfade,
    paddingVertical: isANDROID ? null : wp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: wp('2%'),
    alignItems: 'center',
  },
});
