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
const webviewNewScreen = props => {
  const webURL = props?.route?.params?.webURL || '';
  const [isLoading, setLoading] = useState(true);
  const goBack = () => {
    props.navigation.goBack();
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <AuthHeader goBack={goBack} />
      <View renderToHardwareTextureAndroid={true} style={{flex: 1}}>
        <WebView
          source={{
            uri: webURL
            //uri: 'https://cdn.flipsnack.com/widget/v2/widget.html?hash=z9etwoglqb',
            //baseUrl:'https://hurleys.ky/deals/'
          //  uri:'https://hurleys.ky/deals/'
            // html: '<iframe src="https://cdn.flipsnack.com/widget/v2/widget.html?hash=z9etwoglqb" width="100%" height="100%" seamless="seamless" scrolling="no" frameBorder="0" allowFullScreen allow="autoplay"></iframe>',
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
    </SafeAreaView>
  );
};
export default webviewNewScreen;
