import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,BackHandler,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  _getClientToken,
  CreateNewUserinLoyaltyLane,
  _getLoyaltyCardNumber
} from './../../Services/LoyalityLaneServices';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../Components/CommonUtils/Colors';
import Video from 'react-native-video';
import Header from '../../Components/Header/header';
import Images from '../../Components/CommonUtils/Images';
import LoyalityProgram from './loyalityProgram';
import SpecialOffer from './specialOffer';
import SliderBox from '../../Components/SliderBox/sliderBox';
import FAQComponent from './faqs';
import LoyalityCard from '../../Components/LoyalityCard.js/loyalityCard';
import Videos from '../../Components/CommonUtils/Videos';
import {useDispatch, useSelector} from 'react-redux';
import {_getUserCardDetails} from './../../Services/OtherServices'

const Loyality = props => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('0');
  const [LoyaltyBalance, setLoyaltyBalance] = useState('');
  const videoPlayer = useRef(null);
  const [UserCarddetails, setUserCarddetails] = useState('');
  const [UserFullCard, setUserFullCard] = useState('');
  const [IsCardgot, setIsCardgot] = useState(false);
  const loginData = useSelector((state) => state.authenticationReducer.data);
  const sliderdata = [
    Images.lpslider1,
    Images.lpslider2,
    Images.lpslider3,
   // Images.lpslider4,
  ];
  useEffect(() => {

   getUserCardDetails()


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
const getUserCardDetails=async()=>{
 
  let data={
    iUserId:loginData.data.message?.iUserId,
    type:"getCardDetails"
  }
  let res = await dispatch(_getUserCardDetails(data))

 //alert(JSON.stringify(res))
  if(res.data.Action==1){
    //alert(JSON.stringify(res.data.message[0].card_number.substring(9, 20)))
    let cardNumberlength=res.data.message[0].card_number.length
    if(cardNumberlength>12)
    {

    let _UserCardfromApi=res.data.message[0].card_number.substring(9, 20)
    let Final_no= checkdigit(_UserCardfromApi)

    let ValidCard=_UserCardfromApi+Final_no
    //alert(JSON.stringify(ValidCard))
    setUserFullCard(ValidCard)
    setUserCarddetails(res.data.message[0])
    setIsCardgot(true)
    }
    else{

    let _UserCardfromApi=res.data.message[0].card_number
    let Final_no= checkdigit(_UserCardfromApi)
    let ValidCard=_UserCardfromApi+Final_no
    setUserFullCard(ValidCard)
    setUserCarddetails(res.data.message[0])
    setIsCardgot(true)
    }
  }
  else{

  }
}


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
          goNotification={() => {
            props.navigation.navigate('Notification');
          }}
          goCart={() => {
            let webURL='https://hurleys.ky/list/'
            props.navigation.navigate('ShopWeb', {webURL});
 
            //props.navigation.navigate('Cart');
          }}
        />
        <ScrollView contentContainerStyle={{paddingTop: wp('4%')}}>
          <View style={{marginHorizontal: wp('4%')}}>
            <LoyalityCard 
            IsCardgot={IsCardgot}
          value={UserFullCard}
          userName={loginData?.data?.message?.vName+' '+loginData?.data?.message?.vLastName}
          loyaltyPoints={UserCarddetails.loyality_points}
          //loyaltyPoints={LoyaltyBalance}
          redeemPoints={UserCarddetails.redeem_points_value}
            />
          </View>
          <View>
            {/* <Video
              source={Videos.loyality_video} // Can be a URL or a local file.
              ref={videoPlayer} // Store reference
              onBuffer={() => {
                console.log('onBuffer');
              }} // Callback when remote video is buffering
              onError={() => {
                console.log('onBuffer');
              }} // Callback when video cannot be loaded
              playInBackground={true}
              style={styles.backgroundVideo}
            /> */}
          </View>
          <View style={styles.loyalitySpecialBg}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <TouchableOpacity
                  style={[
                    styles.lsHeadView,
                    {
                      borderBottomColor:
                        selected == '0' ? Colors.greenAppColor : 'transparent',
                    },
                  ]}
                  onPress={() => setSelected('0')}>
                  <Text
                    style={[
                      styles.lsHeadTxt,
                      {
                        color:
                          selected == '0' ? Colors.blackFirst : Colors.gray,
                      },
                    ]}>
                    LOYALTY PROGRAM
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <TouchableOpacity
                  style={[
                    styles.lsHeadView,
                    {
                      borderBottomColor:
                        selected == '1' ? Colors.greenAppColor : 'transparent',
                    },
                  ]}
                  onPress={() => setSelected('1')}>
                  <Text
                    style={[
                      styles.lsHeadTxt,
                      {
                        color:
                          selected == '1' ? Colors.blackFirst : Colors.gray,
                      },
                    ]}>
                    SPECIAL OFFER
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {selected == '0' ? <LoyalityProgram /> : null}
            {selected == '1' ? <SpecialOffer /> : null}
          </View>
          <Text style={styles.HTxt}>HOW TO GET LOYALTY POINTS?</Text>
          <SliderBox autoplayInterval={8000}
           images={sliderdata} />
          <Text style={[styles.HTxt, {marginTop: 0}]}>FAQs</Text>
          <FAQComponent />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CardImgBg: {
    height: hp('25%'),
    padding: wp('4%'),
    paddingHorizontal: wp('5%'),
    marginHorizontal: wp('4%'),
    flex: 1,
    justifyContent: 'space-between',
  },
  CardHTxt: {
    color: Colors.grayfade,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: wp('1%'),
  },
  CardTxt: {fontSize: 18, color: Colors.white, fontWeight: 'bold'},
  BarCodeImg: {
    alignSelf: 'center',
    height: wp('10%'),
    width: wp('45%'),
  },
  loyalitySpecialBg: {
    backgroundColor: Colors.grayfade,
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('2%'),
    paddingBottom: hp('4%'),
    marginTop: hp('1%'),
  },
  lsHeadView: {
    borderBottomWidth: 5,
    borderRadius: 4,
    paddingHorizontal: wp('1%'),
    paddingBottom: wp('1%'),
  },
  lsHeadTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.blackFirst,
  },
  HTxt: {
    marginLeft: wp('4%'),
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: hp('2%'),
    color: Colors.blackFirst,
  },
  backgroundVideo: {
    // position: 'absolute',
    flex: 1,
    height: hp(20),
    width: wp(100),

    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
});

export default Loyality;
