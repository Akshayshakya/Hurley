import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {hp, isANDROID, wp} from '../../Components/CommonUtils/ThemeHelper';
import Colors from '../../Components/CommonUtils/Colors';
import InnerHeader from '../../Components/Header/innerHeader';
import TextInputs from '../../Components/CommonUtils/TextInput';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {EateryData} from '../../Components/DummyData/pastorders';
import DetailsModal from './detailModal';
import FilterModal from './filterModal';

const EateryOrders = props => {
  const [modal, setModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modalfilter, setModalfilter] = useState(false);
  const [showFilter, setShowFilter] = useState('All Orders');
  const [ListData, setListData] = useState(EateryData);
  const [filterData, setFilterData] = useState(EateryData);

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

  const collapseDetails = () => {
    setModal(false);
  };
  const expandDetail = () => {
    setModal(true);
  };

  const collapsefilter = () => {
    setModalfilter(false);
  };
  const expandfilter = () => {
    setModalfilter(true);
  };

  const goBuyAgain = () => {
    props.navigation.navigate('BuyAgain');
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.CardView}>
        <Text style={styles.Headtxt}>{item?.name}</Text>
        <Text style={styles.txt}>
          Delivered- {item?.delivered}, {item?.date}
        </Text>

        <View style={styles.flexView}>
          <Text style={{...styles.HTxt, fontWeight: 'bold', marginLeft: 0}}>
            ${item?.price}/{item?.items} items
          </Text>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={goBuyAgain} style={{...styles.chatBtn}}>
              <Text style={{...styles.chatTxt}}>Buy Again</Text>
            </TouchableOpacity>
            <View style={{marginHorizontal: wp('1%')}} />
            <TouchableOpacity
              onPress={expandDetail}
              style={{...styles.chatBtn}}>
              <Text style={{...styles.chatTxt}}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainView}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.searchContainer}>
          <MaterialIcon name={'magnify'} size={20} color={Colors.gray} />
          <View style={{flex: 1}}>
            <TextInputs
              placeholder={'Search...'}
              value={filterData}
              borderColor={'transparent'}
              onChangeText={text => filterMember(text)}
              notMargin
            />
          </View>
        </View>
        <TouchableOpacity onPress={expandfilter} style={{...styles.filter}}>
          <MaterialIcon name={'filter-variant'} size={20} color={Colors.gray} />
        </TouchableOpacity>
      </View>

      <Text style={styles.HTxt}>
        Showing- <Text style={{fontWeight: 'bold'}}>{showFilter}</Text>
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{marginTop: wp(3)}}
        keyExtractor={(item, index) => index}
        data={filterData ? filterData : ListData}
        renderItem={renderItem}
      />

      <DetailsModal
        onClose={collapseDetails}
        visible={modal}
        item={modalItem}
      />
      <FilterModal
        onClose={collapsefilter}
        visible={modalfilter}
        All={() => {
          setShowFilter('All Orders');
          collapsefilter();
        }}
        Open={() => {
          setShowFilter('Open Orders');
          collapsefilter();
        }}
        Past={() => {
          setShowFilter('Past Orders');
          collapsefilter();
        }}
      />
    </View>
  );
};
export default EateryOrders;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    // backgroundColor: Colors.white,
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
    flex: 1,
  },
  filter: {
    backgroundColor: Colors.grayfade,
    borderRadius: 10,
    paddingHorizontal: wp('5%'),
    marginVertical: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4%'),
  },
  HTxt: {
    fontSize: 14,
    color: Colors.blackFirst,
    marginLeft: wp('4%'),
    marginTop: wp('1%'),
  },
  CardView: {
    paddingHorizontal: wp('4%'),
    marginHorizontal: wp('4%'),
    marginVertical: wp('1%'),
    paddingVertical: wp('3%'),
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: Colors.blackFirst,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  Headtxt: {
    color: Colors.blackFirst,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: wp('1%'),
  },
  txt: {
    color: Colors.gray,
    fontSize: 12,
    marginBottom: wp('1%'),
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('3%'),
  },
  chatBtn: {
    backgroundColor: Colors.appColor,
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  chatTxt: {color: Colors.white, fontSize: 12, marginLeft: wp('2%')},
});
