import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../Components/CommonUtils/Colors';
import Header from '../../Components/Header/header';
//import {SliderBox} from 'react-native-image-slider-box';
import FlatListComponent from './FlatListComponent';
import HorizontalFlat from './HorizontalFlat';
import {ScrollView} from 'react-native-gesture-handler';
import {isANDROID} from '../../Components/CommonUtils/ThemeHelper';
import SliderBox from '../../Components/SliderBox/sliderBox';
import {
  products,
  productSecond,
  productHorizontal,
} from '../../Components/DummyData/eateryData';
import Images from '../../Components/CommonUtils/Images';
import PlayVideo from '../../Components/VideoPlayer/Videos';
import { useDispatch, useSelector } from 'react-redux';
import {getBannersApiActionCreator} from '../../redux/actions/Eatery/EateryApiCreator'
const EateryScreen = props => {
  const [name, setName] = useState('');
  const [banners, setbanners] = useState([]);
  
  const [showVideo, setShowVideo] = useState(false);
  const dispatch = useDispatch();

const getBanners=async()=>{
  let data = {
    type: 'getBanners',
    iMemberId: '8075',
    appType: 'Passenger'
  }


  let res = await dispatch(getBannersApiActionCreator(data))

  if(res.data.Action==1){
    //setbanners(res.data.message)
    //alert(JSON.stringify(res.data.message))
    //let finalimages=[];
    {res.data.message.map((user) => (
      banners.push(user.vImage)
     
    ))}
    //alert(JSON.stringify(banners))

    
  }
  else{

  }
  
}

  useEffect(() => {
    getBanners()
  },[])

  return (
    <View style={styles.mainView}>
      <ImageBackground source={Images.theme} style={{flex: 1}}>
        <Header
          openDrawer={() => {
            props.navigation.toggleDrawer();
          }}
          search={() => {
            props.navigation.navigate('Search');
          }}
          goNotification={() => {
            props.navigation.navigate('Notification');
          }}
          goCart={() => {
            props.navigation.navigate('Cart');
          }}
        />

        <ScrollView contentContainerStyle={{paddingBottom: hp(0)}}>
          {showVideo ? (
            <View style={{flex: 1, height: hp('30%')}}>
              <PlayVideo
                onPress={() => {
                  setShowVideo(false);
                }}
              />
            </View>
          ) : (
            <SliderBox
            images={banners}
              onPress={() => {
                setShowVideo(true);
              }}
            />
          //   <SliderBox
          //   autoplay={true}
          //   circleLoop={true}
            
          //   dotColor={'transparent'}
         
          //   inactiveDotColor={'transparent'}
          //   //onCurrentImagePressed={props.onPress}
            
          //   style={[styles.Slider]}
          //   images={banners}
          // />
   
          )}

          <View style={{marginHorizontal: 5, justifyContent: 'center'}}>
          <FlatListComponent data={products} />
            <HorizontalFlat data={productHorizontal} />
            <FlatListComponent data={productSecond} />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Slider: {
    width: wp(96),
    height: hp(17),
    borderRadius: 20,
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
});

export default EateryScreen;
