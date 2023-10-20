import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {

  const authStatus = await messaging().requestPermission();
  alert(JSON.stringify(authStatus))
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken()
  }
}


const getFcmToken = async () => {
    let token = await messaging().getToken();
    console.log(token);
    console.log('++++++++++++++++++++++_________________');
}

export const notificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
        if (remoteMessage) {
            console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
            );
        }
    });
}

const getHeaders = () => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAA7sPYarA:APA91bFfnjzBF29knkdi5snZzUEnvrQtZQ8LvhlikVPHpGawCaoFwTpX6_aXaYPDVZ07TC2HM_70-QcSAr8Ejwov-gIsShUpzIDX2PkK8bBSTdkJcASaQv-3nlFMasESvlzDCcd9KIbH'
    };
    return headers;
};

export const sendSingleDeviceNotification = data => {
    // var myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');
    // myHeaders.append(
    //   'Authorization',
    //   'key=AAAA7sPYarA:APA91bFfnjzBF29knkdi5snZzUEnvrQtZQ8LvhlikVPHpGawCaoFwTpX6_aXaYPDVZ07TC2HM_70-QcSAr8Ejwov-gIsShUpzIDX2PkK8bBSTdkJcASaQv-3nlFMasESvlzDCcd9KIbH',
    //  );

    var raw = JSON.stringify({
      data: {},
      notification: {
        body: data.body,
        title: data.title,
      },
      to: data.token,
    });
  
    var requestOptions = {
      method: 'POST',
      headers: getHeaders(),
      body: raw,
      redirect: 'follow',
    };
  
     fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
};