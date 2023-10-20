import React,{useEffect} from 'react';
import AppNavigation from './AppNavigation';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Colors from '../Components/CommonUtils/Colors';
import {Provider} from 'react-redux';
import {SafeAreaView,PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appReducer from '../redux/reducers';

import {PersistGate} from 'redux-persist/integration/react';

import store,{persistor} from './../redux/Store/Store'
import SplashScreen from './../Screens/Splash/splash'
//import PushController from './../pushnotification/pushnotification';
import { notificationListener, requestUserPermission } from './../pushnotification/pushnotification';
//import {persister} from '../redux/Store/Store'
// const PERSIST_CONFIG = {
//   key: 'root',
//   storage: AsyncStorage,
//   timeout: 0,
// };


// const persistConfig={
//   key:'root',
//   storage:AsyncStorage,
// }
// const persitedReducer=persistReducer(persistConfig,rootReducer)
//const PERSIST_REDUCER = persistReducer(PERSIST_CONFIG, appReducer);
// export const STORE = createStore(
//   PERSIST_REDUCER,
//   applyMiddleware(Thunk, logger),
// );
// let PERSIST_STORE = persistStore(STORE);

console.disableYellowBox = true;

const Routes = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.app_color,
      accent: 'yellow',
    },
  };


  useEffect(() => {
 

    
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <SafeAreaView style={{ flex: 1 }}> */}
        <PaperProvider theme={theme}>
          <AppNavigation />
       
          {/* <PushController/> */}
        </PaperProvider>
        {/* </SafeAreaView> */}
       </PersistGate> 
    </Provider>
  );
};

export default Routes;
