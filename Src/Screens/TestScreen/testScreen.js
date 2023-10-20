import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, FlatList, ActivityIndicator } from 'react-native';

const TestScreen = () => {
  const [loading, setloading] = useState(false)
  const [data, setData] = useState([
    { name: 'AAPL', rightpriceupdate: '-3.07%', leftpriceupdate: '-4.92', mainPrice: '$160.50', Disc: 'Apple inc .Communication', logo: require('./download.png') },
    { name: 'NFLX', rightpriceupdate: '-2.90%', leftpriceupdate: '-4.92', mainPrice: '$230.50', Disc: 'Netflex inc .Communication', logo: require('./netfl.png') },
    { name: 'GOOG', rightpriceupdate: '-1.57%', leftpriceupdate: '-4.92', mainPrice: '$2390.22', Disc: 'Alphabetic inc .Communication', logo: require('./al.jpeg') },
    { name: 'AMZN', rightpriceupdate: '-3.77%', leftpriceupdate: '-4.92', mainPrice: '$2882.00', Disc: 'Amazon inc .Communication', logo: require('./amzon.jpeg') },
    { name: 'TSLA', rightpriceupdate: '-2.07%', leftpriceupdate: '-4.92', mainPrice: '$1000.70', Disc: 'Tesla inc .Communication', logo: require('./tes.jpeg') },
    { name: 'FB', rightpriceupdate: '-1.17%', leftpriceupdate: '-4.92', mainPrice: '$160.50', Disc: 'Facebook inc .Communication', logo: require('./fb.jpeg') }
  ])
  useEffect(() => {
    // call Api here 
  }, []);

  const ItemDivider = () => {
    return (
      <View style={styles.flatlistSeperator} />
    );
  }

  const _RenderItems = (item) => {
    return (
      <View style={styles.listMainView}>
        <View style={styles.mainSubView}>
          <View style={styles.mainLogoView}>
            <View style={styles.imageBorder}>
              <Image resizeMode='cover' style={styles.imageLogo}
                source={item.logo}
              />
            </View>
          </View>
          <View style={styles.middleView}>
            <Text style={styles.boldText}>{item.name}</Text>
            <Text numberOfLines={1}>{item.Disc}</Text>
          </View>

          <View style={styles.middleView}>
            <Text style={styles.boldText}>{item.mainPrice}</Text>
            <View style={styles.rightView}>
              <Text style={styles.textColor} >{item.rightpriceupdate}</Text>
              <Text style={styles.textColor} >{item.rightpriceupdate}</Text>
            </View>
          </View>
        </View>

      </View>
    );
  }
  return (
    <View style={styles.mainView}>
      {loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          data={data}
          ItemSeparatorComponent={ItemDivider}
          renderItem={({ item }) => _RenderItems(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  listMainView: {
    marginTop: 10,
    flexDirection: "column",
    justifyContent: 'center'
  },
  mainSubView: {
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center'
  },
  imageLogo: {
    width: 55,
    height: 55,
    borderRadius: 50 / 2
  },
  mainLogoView: {
    width: '20%',
    flexDirection: 'column',
    justifyContent: "center"
  },
  imageBorder: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    marginLeft: 5,
    borderWidth: 2,
    borderColor: '#DCDCDC'
  },
  middleView: {
    width: '40%',
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  boldText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22
  },
  rightView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textColor: {
    color: 'red'
  },
  flatlistSeperator: {
    height: 1,
    width: "95%",
    backgroundColor: "#DCDCDC",
    marginTop: 5
  }
});

export default TestScreen;