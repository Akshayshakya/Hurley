import React, {useRef,useState,useEffect} from 'react';
import {StyleSheet,BackHandler, Text, View, FlatList,ActivityIndicator,} from 'react-native';
import {hp, isANDROID, wp} from '../../Components/CommonUtils/ThemeHelper';
import Colors from '../../Components/CommonUtils/Colors';
import TextInputs from '../../Components/CommonUtils/TextInput';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DATA} from '../../Components/DummyData/faqsData';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFaqApiActionCreator } from './../../redux/actions/HelpLine/HelpLineApiCreator';
const FaqComponent = props => {
  const [search, setSearch] = useState('');
  const [collapse, seCollapse] = useState(null);
  const [indexV, setIndexV] = useState(false);
  const [ListData, setListData] = useState(DATA);
  const [faqDATA, setfaqDATA] = useState([]);
  const loading = useSelector((state) => state.helpLineReducer.loading);
  const [filterData, setFilterData] = useState([]);
  const dispatch = useDispatch();
  let listViewRef;
  useEffect(() => {
   
    getAllFaqQuestion()

    }, []);
  const downButtonHandler = (index) => {
    setIndexV(!indexV);
    seCollapse(index);
    listViewRef.scrollToOffset({ offset: 100, animated: true });
  };

  const filterMember = text => {
   
    const newData = faqDATA.filter(item => {
      const itemData = `${item.vTitle.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilterData(newData);
    if (text == '') {
  
      setFilterData(faqDATA);
    }
  };

  const getAllFaqQuestion = async() => {
    let data={
      type:'getFAQ',
      iMemberId:'8075',
      appType:'Passenger'
    }
    let res= await dispatch(getAllFaqApiActionCreator(data))
    setFilterData(res.data.message[1].Questions)
    setfaqDATA(res.data.message[1].Questions)
    //alert(JSON.stringify(res.data.message[1].Questions))
  
  };

  const handleCollapse = index => {
 
    setIndexV(!indexV);
    seCollapse(index);
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        <View style={[styles.HeaderView]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.numbView}>
              <Text style={[styles.HeaderTxt, {color: Colors.white}]}>
                {index+1}
              </Text>
            </View>
            <Text style={{...styles.HeaderTxt, width: wp('65%')}}>
            {item?.vTitle}
            </Text>
          </View>
          <MaterialIcon
            onPress={() => {
            if(index==8){
              downButtonHandler(index)
            }
            else{
              handleCollapse(index)
            }
            }}
            name={collapse == index && indexV ? 'chevron-up' : 'chevron-down'}
            size={25}
            color={Colors.blackFirst}
          />
        </View>
        {collapse == index && indexV ? (
          <View style={[styles.ChildView]}>
            <Text style={styles.ChildTxt}>{item?.tAnswer}</Text>
          </View>
        ) : null}
      </>
    );
  };

  return (
    <View style={styles.mainView}>
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
      {/* <Text style={styles.HTxt}>FAQs</Text> */}
      
      {loading ? (
        <View style={{marginTop:200}}>
              <ActivityIndicator size="large" color="red" />
            </View>
            ) :
      <FlatList
        // scrollEnabled={false}
        ref={(ref) => {
          listViewRef = ref;
        }}
        showsVerticalScrollIndicator={false}
        style={{marginTop: wp('3%')}}
        contentContainerStyle={{paddingBottom: hp('15%')}}
        keyExtractor={(item, index) => index}
   data={filterData  ? filterData : faqDATA}
       // data={faqDATA}
        renderItem={renderItem}
      />
}
    </View>
  );
};
export default FaqComponent;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    // backgroundColor: Colors.white,
  },
  HTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.blackFirst,
    marginLeft: wp('4%'),
    marginTop: wp('1%'),
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: wp('4%'),
    marginTop: wp('3%'),
    backgroundColor: Colors.grayfade,
    paddingLeft: wp('3%'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginBottom: wp('1%'),
  },
  ChildView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('4%'),
    paddingHorizontal: wp('7%'),
    paddingVertical: wp('5%'),
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
  HeaderTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.blackFirst,
    // textAlign: 'justify',
  },
  ChildTxt: {
    color: Colors.grayShade,
    // textAlign: 'justify',
    fontSize: 14,
  },
  numbView: {
    backgroundColor: Colors.appColor,
    borderRadius: 100,
    height: wp('6%'),
    width: wp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'),
    alignSelf: 'flex-start',
  },
});
