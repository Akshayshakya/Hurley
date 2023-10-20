import React, {useLayoutEffect,useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Linking,
  BackHandler,
  ImageBackground,
  Alert,
} from 'react-native';
import Barcode from 'react-native-barcode-builder';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  _getClientToken,
  CreateNewUserinLoyaltyLane,
  _getLoyaltyCardNumber
} from './../../Services/LoyalityLaneServices';
import VideoPlay from './videoPlay'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Components/CommonUtils/Colors';
import Header from '../../Components/Header/header';
import SliderBox from '../../Components/SliderBox/sliderBox';
import {DealsData} from '../../Components/DummyData/dealsOfDay';
import {TopPickWeek} from '../../Components/DummyData/topPicksWeek';
import {FreshSavingData} from '../../Components/DummyData/freshSavings';
import Images from '../../Components/CommonUtils/Images';
import {useIsFocused} from '@react-navigation/native';
import {isANDROID} from '../../Components/CommonUtils/ThemeHelper';
import ModalComponent from './modalComponent';
import LoyalityCard from '../../Components/LoyalityCard.js/loyalityCard';
import Contacts from '../../Components/CommonUtils/Strings';
import PlayVideo from '../../Components/VideoPlayer/Videos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {getBannersApiActionCreator} from '../../redux/actions/Eatery/EateryApiCreator'
import {_getFreshDeals,_getUserCardDetails} from './../../Services/OtherServices'
import {_getLoyaltyCardBalance} from './../../Services/LoyalityLaneServices'
import {getAllReceiptsApiActionCreator} from "./../../redux/actions/PastOrders/PastOrderApiCreator"
const Home = props => {
  const dispatch = useDispatch();
  const [showLoyalityCard, setShowLoyalityCard] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [dealsDay, setDealsDay] = useState(DealsData);
  const [PickWeek, setTopPickWeek] = useState(TopPickWeek);
  const [freshSavings, setfreshSavings] = useState(FreshSavingData);
  const [banners, setbanners] = useState([]);
  const [Middlebanners, Middlesetbanners] = useState([]);
  const [Bottombanners, Bottomsetbanners] = useState([]);
  const [urls, seturls] = useState('');
  const [Bannersurls, setBannersurls] = useState([]);
  const [FreshDealItemsData, setFreshDealItemsData] = useState([]);

  const [LoyaltyBalance, setLoyaltyBalance] = useState('');
  const [UserCarddetails, setUserCarddetails] = useState('');
  const [UserFullCard, setUserFullCard] = useState('');
  const [IsCardgot, setIsCardgot] = useState(false);
  const focused = useIsFocused();
  const loginData = useSelector((state) => state.authenticationReducer.data);

//alert(JSON.stringify(PData.data.message[0].card_number))

  // useLayoutEffect(() => {
  //   getUserCardDetails()
  // }, []);
  useEffect(() => {

 //alert(JSON.stringify(loginData.data.message?.iUserId))
 //alert(JSON.stringify(loginData.data.message?.iAccountId))
 
  getBanners()
   getFreshDeals()
   getUserCardDetails()
   //getClientToken()
   //getLoyaltyCardBalance()
 
   const backAction = () => {
    BackHandler.exitApp()
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();


    }, []);
    const getClientToken = async () => {
    
      let data = {
        adminusername: 'biizyapi',
        adminpassword: 'Smj38yeHZu',
        clientusername: 'hurleys',
      };
      let res = await dispatch(_getClientToken(data));
     // alert(JSON.stringify(res.data.data.ClientToken));
      if(res.data.result=='OK')
      {
       
      //  _getCardNumber(res.data.data.ClientToken)
        getLoyaltyCardBalance(res.data.data.ClientToken)
      }
      else
      {
       // setIsLoading(false)
        alert(res.data.message)
      }
      
    };
  
    const getLoyaltyCardBalance=async(ClientToken)=>{
     console.log(JSON.stringify(loginData.data.message))
      let data={
        accountid:loginData.data.message?.iAccountId,
        phone:loginData.data.message?.vPhone
      }
      let res = await dispatch(_getLoyaltyCardBalance(data,ClientToken))
      
      if(res.data.result=='OK'){

        setLoyaltyBalance(res.data.data.balances[0].BalanceAmount)
      //alert(JSON.stringify(res.data.data.balances[0].BalanceAmount))
      }
    }
    
    const getFreshDeals=async()=>{
      
      let res = await dispatch(_getFreshDeals())
      //let ToptenDeals=res.data.items.slice(0, 10);
      let ToptenDeals=res.data.items
      setFreshDealItemsData(ToptenDeals)
     // alert(JSON.stringify(res.data.items[0].base_price))
    }

    const getUserCardDetails=async()=>{
     
      let data={
        iUserId:loginData.data.message?.iUserId,
        type:"getCardDetails"
      }
      let res = await dispatch(getAllReceiptsApiActionCreator(data))

     // alert(JSON.stringify(res))
      if(res.data.Action==1){
       // alert(JSON.stringify(res.data.message[0].card_number.length))
        let cardNumberlength=res.data.message[0].card_number.length
        if(cardNumberlength>12)
        {
          let _UserCardfromApi=res.data.message[0].card_number.substring(9, 20)
          let Final_no= checkdigit(_UserCardfromApi)
  
          let ValidCard=_UserCardfromApi+Final_no
       //   alert(JSON.stringify(res.data.message[0]))
          setUserFullCard(ValidCard)
          setUserCarddetails(res.data.message[0])
          setIsCardgot(true)
        }
        else{
          let _UserCardfromApi=res.data.message[0].card_number
          let Final_no= checkdigit(_UserCardfromApi)
  
          let ValidCard=_UserCardfromApi+Final_no
          //alert(JSON.stringify(ValidCard))
          setUserFullCard(ValidCard)
          setUserCarddetails(res.data.message[0])
          setIsCardgot(true)
        }

      }
      else{

      }
    }


    const checkdigit = (card_No) => {
      let g=card_No
      let array = g.split('').reverse();
  
      let total = 0;
      let i = 1;
      array.forEach(number => {
          number = parseInt(number);
          if (i % 2 === 0) {
              total = total + number;
          }
          else
          {
              total = total + (number * 3);
          }
          i++;
      });
      
      return (Math.ceil(total / 10) * 10) - total;
  }
const getBanners=async()=>{
  // let data = {
  //   type: 'getBanners',
  //   iMemberId: '8075',
  //   appType: 'Passenger'
  // }
  let data = {
    type: 'getBannerImages'
  }
  let res = await dispatch(getBannersApiActionCreator(data))
  //alert(JSON.stringify(res))
  if(res.data.Action==1){
    setBannersurls(res.data.message)
    var top_banners_images = res.data.message.top_banners.map(a => a.image);
    setbanners(top_banners_images)
    var middle_banners_images = res.data.message.middle_banners.map(a => a.image);
    Middlesetbanners(middle_banners_images)
    //Middlesetbanners(res.data.message.middle_banners)
    var bottom_banners_images = res.data.message.bottom_banners.map(a => a.image);
    Bottomsetbanners(bottom_banners_images)
    // {res.data.message.map((user) => (
      
    //   banners.push(user.top_banners)
    // ))}
  }
  else{

  }
}
const gotoshopssite = (productUrl) => {
//alert(productUrl)
  //props.navigation.navigate('webviewNewScreen',{webURL:'https://hurleys.ky/deals/'});
  props.navigation.navigate('webviewNewScreen',{webURL:productUrl});
};

const openwebsite = () => {
  collapseModal()
 // props.navigation.navigate('webviewNewScreen',{webURL:urls});
  RedirecttoWeb(urls)
};

  const collapseModal = () => {
    setModal(false);
  };
  const expandModal = () => {
    setModal(true);
  };
  const RedirecttoWeb = webURL => {
    if (webURL != '') {
      props.navigation.navigate('ShopWeb', {webURL});
    } else {
      alert('Coming soon..');
    }
  };
  const initiateWhatsApp = () => {
    let url =
      'whatsapp://send?text=' +
      '' +
      '&phone=' +
      Contacts.code +
      Contacts.whatsApp;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  };

  const WeeklyFeaturesItem = ({item, index}) => {
    return (
      <View style={[styles.container, {borderWidth: 0}]}>
        <Image source={item?.image} style={styles.imageView} />
        <View style={styles.dealsFlex}>
          <View>
            <Text style={styles.Txt3}>{item?.name}</Text>
            <Text style={styles.Txt4}>{item?.detail}</Text>
          </View>
          {/* <MaterialIcon
            name={'heart-outline'}
            size={20}
            color={Colors.grayShade}
          /> */}
          <View>
            <TouchableOpacity
              onPress={() => {
                expandModal();
                setModalItem(item);
              }}
              style={styles.viewBtn}>
              <Text style={{color: Colors.white, fontSize: 12}}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.dealsFlex}>
          <View>
            <Text style={styles.Txt3}>{item?.sellprice}</Text>
            <Text style={styles.markedPricetxt}>{item?.markprice}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                expandModal();
                setModalItem(item);
              }}
              style={styles.viewBtn}>
              <Text style={{color: Colors.white, fontSize: 12}}>View</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    );
  };

  const TopWeekPicksItem = ({item, index}) => {
    return (
      <View style={[styles.container,{width:200,}]}>
        <Image source={item?.image} style={{borderTopLeftRadius:8,borderTopRightRadius:8,width:'100%',height:200,resizeMode:'cover'}} />
        <View style={styles.dealsFlex}>
          <View>
            <Text style={styles.Txt3}>{item?.name}</Text>
            {/* <Text style={styles.Txt4}>{item?.detail}</Text> */}
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                expandModal();
                setModalItem(item);
                seturls(item.url)
              }}
              style={styles.viewBtn}>
              <Text style={{color: Colors.white, fontSize: 12}}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const FreshSavingItem = ({item, index}) => {
    return (
      <View style={[styles.FreshDealscontainer,]}>
        <View style={{flexDirection: 'row',width:'100%'}}>
          <View style={styles.imagemainView}>
            <Image source={{
          uri: `https://images.freshop.com/${item.cover_image}_large.png`,
        }}
             style={styles.imageView1} />
            {/* <Text style={styles.freshNameTxt}>{item?.name}</Text> */}
          </View>
          <View style={styles.freshRightViewContainer}>
            <View style={styles.flexView}>
              <Text style={styles.freshtitle}>{item?.name}</Text>
              {/* <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text style={{fontSize: 14, color: Colors.grayShade}}>
                  {item?.like}
                </Text>
                <MaterialIcon
                  name={'heart'}
                  size={20}
                  color={Colors.grayShade}
                  style={{marginLeft: wp('1%')}}
                />
              </View> */}
            </View>
            <Text numberOfLines={3} style={styles.Txt4}>
{item?.description}
            </Text>
            <View style={[styles.dealsFlex,{paddingHorizontal:0}]}>
              <View style={{backgroundColor:'transparent'}}>
                <Text style={styles.Txt3}>Sale Price:{item?.sale_price}</Text>
                <Text style={[styles.markedPricetxt,{color:'black',fontSize:12,alignSelf:'flex-start'}]}>Base price:${item?.base_price}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={()=>{
                   props.navigation.navigate('Deals')
                }
                  //()=>gotoshopssite(item.canonical_url)
                 // ()=>RedirecttoWeb("https://hurleys.ky/deals/")
               
                  } style={styles.addBtn}>
                  <Text style={{color: Colors.white, fontSize: 10}}>Shop Deals</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainView}>
      <ImageBackground source={Images.theme} style={{flex: 1}}>
        <Header
          openDrawer={() => {
            props.navigation.toggleDrawer();
          }}
          search={() => {
            let webURL='https://hurleys.ky/shop/'
            props.navigation.navigate('ShopWeb', {webURL});
           // props.navigation.navigate('Search');
          }}
          // goNotification={() => {
          //   props.navigation.navigate('Notification');
          // }}
          goCart={() => {
            let webURL='https://hurleys.ky/list/'
            props.navigation.navigate('ShopWeb', {webURL});
 
            //props.navigation.navigate('Cart');
          }}
        />
        {/* <TouchableOpacity onPress={initiateWhatsApp} style={styles.floatChat}>
          <MaterialIcon name="whatsapp" size={26} color={Colors.white} />
          <Text style={styles.floatChatTxt}>Chat</Text>
        </TouchableOpacity> */}
        <ScrollView contentContainerStyle={{paddingBottom: hp(0)}}>
          {/* {showVideo ? (
            <View
              style={{
                flex: 1,
                height: hp('30%'),
                // margin: hp('1%'),
               
                borderRadius: 20,
              }}> */}
              {/* <PlayVideo
             
                onPress={() => {
                  setShowVideo(false);
                }}
              /> */}
           
            {/* </View>
          ) : ( */}
            <SliderBox
            images={banners}
            //images={sliderdata}
              onPress={(index) => {
               // alert(JSON.stringify(Bannersurls.top_banners[0].url))
               if(index==0)
                {
                  props.navigation.navigate('webviewNewScreen',{webURL:Bannersurls.top_banners[0].url}); 
                }
                else if(index==1)
                {
                  props.navigation.navigate('webviewNewScreen',{webURL:Bannersurls.top_banners[1].url}); 
                }
                else if(index==2)
                {
                  props.navigation.navigate('webviewNewScreen',{webURL:Bannersurls.top_banners[2].url}); 
                }
                else if(index==3)
                {
                  props.navigation.navigate('webviewNewScreen',{webURL:Bannersurls.top_banners[3].url}); 
                }
               // props.navigation.navigate('webviewNewScreen',{webURL:''});
                //setShowVideo(true);
              }}
            />
          {/* )} */}

          <View
            style={{
              paddingHorizontal: wp(3),
              backgroundColor: Colors.grayfade,
              paddingTop: wp('3%'),
            }}>
            {/* <View style={{...styles.loyalityPointsCard}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.iconBg}>
                  <FontAwesome name={'tag'} size={18} color={Colors.white} />
                </View>
                <Text style={styles.Txt1}>Loyalty Points</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.Txt2}>
                {loginData?.data?.message?.loyality_points}
                  </Text>
                <Feather
                  onPress={() => {
                    setShowLoyalityCard(!showLoyalityCard);
                  }}
                  name={showLoyalityCard ? 'chevron-up' : 'chevron-down'}
                  size={25}
                  color={Colors.appColor}
                />
              </View>
            </View> */}
            {showLoyalityCard ?
             <View></View>
             : null}
          </View> 
          <View style={{paddingHorizontal:10}}>
          <LoyalityCard 
          IsCardgot={IsCardgot}
          //Oldvalue={loginData?.data?.message?.card_number}
             value={IsCardgot ?UserFullCard:null}
             userName={loginData?.data?.message?.vName+' '+loginData?.data?.message?.vLastName}
             loyaltyPoints={UserCarddetails.loyality_points}
            // loyaltyPoints={LoyaltyBalance}
             redeemPoints={UserCarddetails.redeem_points_value}
             />
             </View>
{/* {IsCardgot ==true?
             <Barcode
        value={UserFullCard?UserFullCard:'0'}
        format="CODE39"
        height={40}
        text={UserFullCard}
        width={1.1}
        lineColor={Colors.blackFirst}
        background={'transparent'}
      />
      :null
} */}
          {/* <Text style={{...styles.HeadTxt, paddingLeft: wp('4%')}}>
       EATERY WEEKLY FEATURES
          </Text> */}
          {/* <View style={{backgroundColor: Colors.grayfade, marginTop: hp('1%')}}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              data={dealsDay}
              renderItem={WeeklyFeaturesItem}
              style={{marginVertical: hp('1%')}}
            />
          </View> */}

          {/* <View style={styles.BannerView1}>
            <Image source={Images.Banner1} style={styles.bannerImage} />
          </View> */}

          <SliderBox
            images={Middlebanners}
            
              // onPress={(index) => {
              //   if(index==0)
              //   {
              //     props.navigation.navigate('webviewNewScreen',{webURL:Bannersurls.middle_banners[0].url}); 
              //   }
              //   else if(index==1)
              //   {
              //     props.navigation.navigate('webviewNewScreen',{webURL:Bannersurls.middle_banners[1].url}); 
              //   }
              // }}
            />
          <View style={{paddingHorizontal: wp(3)}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.HeadTxt}>Fresh Deals</Text>
              {/* <Text style={[styles.HeadTxt, {color: Colors.appColor}]}>
            </Text> */}
            </View>
          </View>
          <View style={{backgroundColor: Colors.grayfade, marginTop: hp('1%')}}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index}
             // data={freshSavings}
              data= {FreshDealItemsData}
              renderItem={FreshSavingItem}
              style={{paddingVertical: wp('4%'), paddingLeft: wp(3)}}
            />
          </View>

          <View style={{}}>
            <Text style={{...styles.HeadTxt, paddingLeft: wp('4%')}}>
              {/* TOP PICKS THIS WEEK */}
              What’s On
            </Text>
            <View
              style={{backgroundColor: Colors.grayfade, marginTop: hp('1%')}}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                data={PickWeek}
                renderItem={TopWeekPicksItem}
                style={{paddingVertical: hp('1%')}}
              />
            </View>
          </View>
          {/* <View style={{alignSelf: 'center', marginTop: hp('3%')}}>
            <Image source={Images.Banner2} style={styles.bannerImage} />
          </View> */}
          <SliderBox
            images={Bottombanners}
            onPress={(index) => {
              if(index==0)
              {
                props.navigation.navigate('webviewNewScreen',{webURL:Bannersurls.bottom_banners[0].url}); 
              }
              else if(index==1)
              {
                props.navigation.navigate('webviewNewScreen',{webURL:Bannersurls.bottom_banners[1].url}); 
              }
            }}
            />
        </ScrollView>
 
        <ModalComponent
        onBackButtonPress={collapseModal}
          onClose={collapseModal}
          openwebsite={openwebsite}
          visible={modal}
          item={modalItem}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loyalityPointsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('3%'),
    marginBottom: wp('3%'),
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: Colors.blackFirst,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  iconBg: {
    backgroundColor: Colors.appColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp('8%') / 2,
    width: wp('8%'),
    height: wp('8%'),
    marginRight: wp('3%'),
  },
  Txt1: {
    color: Colors.gray,
    fontSize: 14,
    fontWeight: 'bold',
  },
  Txt2: {
    color: Colors.blackFirst,
    fontSize: 14,
    marginRight: wp('3%'),
    fontWeight: 'bold',
  },
  Txt3: {color: Colors.blackFirst, fontSize: 12, fontWeight: 'bold'},
  Txt4: {color: Colors.grayShade, fontSize: 12},
  HeadTxt: {
    fontSize: 14,
    color: Colors.blackFirst,
    fontWeight: 'bold',
    marginTop: wp('4%'),
  },
  container: {
 
    borderRadius: 20,
    marginHorizontal: 7,
    marginVertical: wp('2%'),
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
  FreshDealscontainer: {
 height:170,
    borderRadius: 20,
    marginHorizontal: 7,
    marginVertical: wp('2%'),
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
  imagemainView: {
   // backgroundColor: Colors.grayShade,
   padding:5,
   flexDirection:'column',
   justifyContent:'center',
alignSelf:'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  imageView: {
    height: wp(35),
    width: wp(40),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageView1: {
    height: wp(40),
    width: wp(40),
    marginLeft:5,
    alignSelf:'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius:20
  },
  dealsFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: wp('3%'),
    paddingHorizontal: wp(2),
  },
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
  addBtn: {
    backgroundColor: Colors.appColor,
    paddingVertical: wp('1%'),
    borderRadius: 5,
    width:65,
    marginRight:8,
    marginTop:3,
  alignItems:'center'  
  },
  BannerView1: {
    // backgroundColor: Colors.grayfade,
    padding: wp('4%'),
    marginTop: wp('2%'),
  },
  bannerImage: {height: wp('40%'), width: wp('92%'), borderRadius: 20},
  freshNameTxt: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: wp('3%'),
    fontWeight: 'bold',
  },
  freshRightViewContainer: {
 //   flex: 1,
 //backgroundColor:'green',
    justifyContent: 'space-between',
    width: 185,
    paddingHorizontal: wp('1%'),
    paddingVertical: wp('2%'),
  },
  freshtitle: {
    color: Colors.blackFirst,
    fontSize: 14,
    fontWeight: 'bold',
  },
  flexView: {flexDirection: 'row', justifyContent: 'space-between'},
  floatChat: {
    position: 'absolute',
    bottom: hp(1),
    right: wp(4),
    backgroundColor: Colors.greenAppColor,
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    zIndex: 10,
  },
  floatChatTxt: {
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: wp('2%'),
    fontSize: 18,
  },
});

export default Home;
