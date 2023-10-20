import 'react-native-get-random-values';
import React, {useState} from 'react';
import {View, ActivityIndicator, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import Colors from '../../Components/CommonUtils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const WebComponent = () => {
  const webURL = props?.route?.params?.webURL || '';
  const [isLoading, setLoading] = useState(true);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View renderToHardwareTextureAndroid={true} style={{flex: 1}}>
        <WebView
          source={{uri: webURL ? webURL : 'https://google.com/'}}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
          style={{height: hp('100%'), width: wp('100%')}}
        />
      </View>
      {isLoading && (
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <ActivityIndicator
            animating={isLoading}
            size="large"
            color={Colors.greenAppColor}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
export default WebComponent;
