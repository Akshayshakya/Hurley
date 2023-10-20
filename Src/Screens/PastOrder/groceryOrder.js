import React, {useState,useEffect} from 'react';
import {StyleSheet,BackHandler, Text, View,ActivityIndicator,
   TouchableOpacity, FlatList} from 'react-native';
import {hp, isANDROID, wp} from '../../Components/CommonUtils/ThemeHelper';
import Colors from '../../Components/CommonUtils/Colors';
import InnerHeader from '../../Components/Header/innerHeader';
import TextInputs from '../../Components/CommonUtils/TextInput';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GroceryData} from '../../Components/DummyData/pastorders';
import DetailsModal from './detailModal';
import FilterModal from './filterModal';
import {getUserDataApiActionCreator,
  getPastOrderItemsApiActionCreator,
  getPastOrdersApiActionCreator} from '../../redux/actions/PastOrders/PastOrderApiCreator'
import {useDispatch, useSelector} from 'react-redux';
import PastOrder from './pastOrder';
import Buttons from '../../Components/CommonUtils/Button';
const GroceryOrders = props => {
  const loginData = useSelector((state) => state.authenticationReducer.data);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modalfilter, setModalfilter] = useState(false);
  const [showFilter, setShowFilter] = useState('All Orders');
  const [ListData, setListData] = useState(GroceryData);
  const [filterData, setFilterData] = useState([]);
  const [PasrOrders, setPasrOrdersData] = useState([]);
  const [PasrOrdersItems, setPasrOrdersItemsData] = useState([]);
  const [loading, setloading] = useState(false);
  const [T_Amount, setT_Amount] = useState();


  const filterMember = text => {
    const newData = PasrOrders.filter(item => {
      const itemData = `${item.id.toUpperCase()} ${item.item_total.toUpperCase()} ${item.order_slot.date.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    }); 
    setFilterData(newData);
    if (text == '') {
      setFilterData(PasrOrders);
    }
  };

  useEffect(() => {
  
    getUserData()
    const backAction = () => {
      props.navigation.goBack()
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  
    return () => backHandler.remove();
  
  }, []);

  



  const getUserData=async()=>{
    setloading(true)
    let data = {
 
      vEmail: loginData?.data.message.vEmail,
      //vEmail: "tamara.siemens@remax.ky"
      
   
    }

    let res = await dispatch(getUserDataApiActionCreator(data))
    if(res.data.total==1){
     // alert(JSON.stringify(res.data.items[0].id))
      
      getAllPastOrders(res.data.items[0].id)
      setloading(false)
    }
    else{
      setloading(false)
    }
  }
  


  const getAllPastOrders=async(user_Id_token)=>{
    //alert(user_Id_token)
    let data = {
      user_id: user_Id_token,

    }

    let res = await dispatch(getPastOrdersApiActionCreator(data))
    if(res.data.total > 0){
      //alert(JSON.stringify(res.data.items))
      setFilterData(res.data.items)
      setPasrOrdersData(res.data.items)
     // alert(JSON.stringify(PasrOrders))
    }
    else{
  
    }
  }

  const getAllPastOrdersItems=async(order_id)=>{
   
    let data = {
      order_id: order_id,

    }
    let res = await dispatch(getPastOrderItemsApiActionCreator(data))

    if(res.data.total > 0){
     // alert(JSON.stringify(res.data.items))
      setPasrOrdersItemsData(res.data.items)
      // alert(JSON.stringify(PasrOrders))
    }
    else{
  
    }
  }

  const collapseDetails = () => {
    setModal(false);
  };
  const expandDetail = (order_id,Total_Amount) => {
    setT_Amount(Total_Amount)
    getAllPastOrdersItems(order_id)
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
        <Text style={styles.Headtxt}>{item?.id}</Text>
        <Text style={styles.txt}>
          Delivered- {item?.delivered}, {item?.order_slot.date}
        </Text>

        <View style={styles.flexView}>
          <Text style={{...styles.HTxt, fontWeight: 'bold', marginLeft: 0}}>
            {item?.item_total}/{item?.ordered_item_count} items
          </Text>

          <View style={{flexDirection: 'row'}}>
            {/* <TouchableOpacity onPress={goBuyAgain} style={{...styles.chatBtn}}>
              <Text style={{...styles.chatTxt}}>Buy Again</Text>
            </TouchableOpacity> */}
            <View style={{marginHorizontal: wp('1%')}} />
            <TouchableOpacity
              onPress={()=> expandDetail(item?.id,item?.item_total)}
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
              placeholder={'Search by order id,amount and date'}
              value={filterData}
              borderColor={'transparent'}
              onChangeText={text => filterMember(text)}
              notMargin
            />
          </View>
        </View>
        {/* <TouchableOpacity onPress={expandfilter} style={{...styles.filter}}>
          <MaterialIcon name={'filter-variant'} size={20} color={Colors.gray} />
        </TouchableOpacity> */}
      </View>
  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={styles.HTxt}>
        Showing- <Text style={{fontWeight: 'bold'}}>{showFilter}</Text>
      </Text>
      <TouchableOpacity 
      
       style={{height:40,backgroundColor:Colors.appColor, flexDirection:'row', alignItems:'center',marginRight:10,borderRadius:8,paddingHorizontal:5}}>
<View style={{flexDirection:'row',alignItems:'center'}}>
<Text style={{fontWeight: 'bold',color:'white'}}>View Receipts </Text>
</View>
              </TouchableOpacity>
      </View>
      {/* <View style={{flex: 1}}>
        
            </View> */}
      {loading ? (
        <View style={{marginTop:200}}>
              <ActivityIndicator size="large" color="red" />
            </View>
            ) :
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{marginTop: wp(3)}}
        keyExtractor={(item, index) => index}
        data={filterData ? filterData : PasrOrders}
       //data={PasrOrders}
        renderItem={renderItem}
      />
      }
      <DetailsModal
        onClose={collapseDetails}
        visible={modal}
        Final_Total_Amount={T_Amount}
       // item={PasrOrdersItems}
        Data={PasrOrdersItems}
        //item={modalItem}
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
export default GroceryOrders;

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
