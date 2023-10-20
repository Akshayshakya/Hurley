import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AccordionList} from 'accordion-collapse-react-native';
import Colors from '../../Components/CommonUtils/Colors';
import Images from '../../Components/CommonUtils/Images';
import {DATA} from '../../Components/DummyData/faqsData';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFaqApiActionCreator } from '../../redux/actions/HelpLine/HelpLineApiCreator';
const FaqScreen = () => {
  const [collapse, seCollapse] = useState(null);
  const [show, setshow] = useState(false);
  const [faqDATA, setfaqDATA] = useState([]);
  const loading = useSelector((state) => state.helpLineReducer.loading);
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    getAllFaqQuestion()
  }, []);

  const getAllFaqQuestion = async() => {
    let data={
      type:'getFAQ',
      iMemberId:'8075',
      appType:'Passenger'
    }
    let res= await dispatch(getAllFaqApiActionCreator(data))

    setfaqDATA(res.data.message[1].Questions)
    //alert(JSON.stringify(res.data.message[1].Questions))
  
  };

  const handleCollapse = index => {

    setshow(!show);
    seCollapse(index);
  };

  const FlatListItem = ({item, index}) => {
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
            onPress={() => handleCollapse(index)}
            name={collapse == index && show ? 'chevron-up' : 'chevron-down'}
            size={25}
            color={Colors.blackFirst}
          />
        </View>
        {collapse == index && show ? (
          <View style={[styles.ChildView]}>
            <Text style={styles.ChildTxt}>{item?.tAnswer}</Text>
          </View>
        ) : null}
      </>
    );
  };

  const HeaderItem = (item, index) => {
    return (
      <>
        <View style={[styles.HeaderView]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.numbView}>
              <Text style={[styles.HeaderTxt, {color: Colors.white}]}>
              {index+1}
              </Text>
            </View>
            <Text style={styles.HeaderTxt}>
            {item?.vTitle}</Text>
          </View>
          <MaterialIcon
            name={collapse == index && show ? 'chevron-up' : 'chevron-down'}
            size={25}
            color={Colors.blackFirst}
          />
        </View>
      </>
    );
  };

  const BodyItem = (item, index) => {
    return (
      <>
        <View style={[styles.ChildView]}>
          <Text style={styles.ChildTxt}>{item.data}</Text>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        style={{marginTop: wp(3)}}
        keyExtractor={(item, index) => index}
        data={faqDATA}
        renderItem={FlatListItem}
      />
      {/* <AccordionList
        list={DATA}
        header={HeaderItem}
        // onToggle={index => handleCollapse(index)}
        body={BodyItem}
        keyExtractor={(item, index) => index}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.white,
  },
  HeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    marginHorizontal: wp('4%'),
    marginTop: wp('2%'),
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
    paddingHorizontal: wp('7%'),
    paddingVertical: wp('5%'),
    marginHorizontal: wp('4%'),
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

export default FaqScreen;
