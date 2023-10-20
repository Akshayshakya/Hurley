import React from 'react';
import { Text, View } from 'react-native';
import VideoPlayer from 'react-native-video-controls';

const VideoPlay = props => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      <VideoPlayer
  
  toggleResizeModeOnFullscreen={true}
source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}

onBack={()=>props.navigation.navigate('Home')}
/>
    </View>
  );
}

export default VideoPlay;