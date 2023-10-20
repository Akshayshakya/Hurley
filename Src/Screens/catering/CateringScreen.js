import 'react-native-get-random-values';
import React, {useState} from 'react';
import {View, ActivityIndicator, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import Colors from '../../Components/CommonUtils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AuthHeader from '../../Components/Header/authHeader';
import InnerHeader from '../../Components/Header/innerHeader';
const CateringScreen = props => {
  const [isLoading, setLoading] = useState(true);


  
  const goBack = () => {
    props.navigation.goBack();
  };
  return ( 
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <InnerHeader
      IsShadow={true}
      //backgroundColor={'transparent'}
          //headerText={'Edit Profile'}
         // right={'cartNote'}
          goBack={() => props.navigation.goBack()}
          />
      <View renderToHardwareTextureAndroid={true} style={{flex: 1}}>
        <WebView
          source={{
           // uri: 'https://hurleys.ky/shop/#!/?department_id=396362'
            uri:'https://catering.hurleys.ky'
          }}
          allowsFullscreenVideo={true}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
          style={{height: '100%', width: wp('100%')}}
        />
      </View>
      {/* {isLoading && (
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <ActivityIndicator
            animating={isLoading}
            size="large"
            color={Colors.greenAppColor}
          />
        </View>
      )} */}
    </View>
  );
};
export default CateringScreen;
