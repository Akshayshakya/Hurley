import 'react-native-gesture-handler';
import * as React from 'react';
import Routes from './Src/AppNavigation/Routes';
import LocationTest from './Src/Components/DummyData/GeoLocation/geolocation';
import LocationDemo from './Src/Components/DummyData/GeoLocation/geolocationservices';
import GoogleMap from './Src/Components/GoogleMap/googleMap';
import GooglePlaceScreen from './Src/Components/GooglePlaceAutoSearch/googlePlace';
import PlayVideo from './Src/Components/VideoPlayer/Videos';

const App = () => {
  return (
    <>
      <Routes />
      {/* <PlayVideo /> */}
      {/* <GooglePlaceScreen /> */}
    </>
  );
};
export default App;
// updated ios
