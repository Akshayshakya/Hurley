import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../Components/CommonUtils/Colors';

const FlatListComponent = props => {
  const [products, setProduct] = useState(props.data);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{marginLeft: wp(3), marginBottom: wp(3)}}
        onPress={() => {}}>
        <ImageBackground
          source={item?.image}
          style={[styles.imagebg]}
          imageStyle={{
            borderRadius: 20,
            resizeMode: item?.id == 5 ? 'contain' : null,
            opacity: item?.name ? 0.6 : null,
            width: item?.id == 5 ? wp('35%') : null,
            marginLeft: item?.id == 5 ? wp('5.5%') : null,
          }}>
          {item?.image_name != '' ? (
            <Image
              source={item?.image_name}
              style={{height: wp('60%'), width: '60%', resizeMode: 'contain'}}
            />
          ) : (
            <Text style={styles.Txt}>{item?.name}</Text>
          )}
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainView}>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={{marginTop: wp(3)}}
        keyExtractor={(item, index) => index}
        data={products}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    //flex: 1,
    // backgroundColor: '#fff',
  },
  imageView: {
    height: wp('30%'),
    width: wp('37%'),
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  imagebg: {
    height: wp('43%'),
    width: wp('45%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.blackFirst,
    borderRadius: 20,
  },
  Txt: {
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default FlatListComponent;
