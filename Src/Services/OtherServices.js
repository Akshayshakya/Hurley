
import axios from 'axios';
const url = 'https://api.freshop.com/1/products?app_key=hurleys&has_offer=true&limit=24&popularity_sort=asc=&sort=popularity&store_id=1874&app_secret=2988166768289124088';
import { Config } from './../Config/index'

const Mailurl = Config.API_URL;


export const _getFreshDeals= () => async dispatch => {

     try {
       const res = await axios.get(url)
       return res;
     }
     catch (error) {
       console.log(error);
       return error;
     }
   
   }

   export const AddNewAddress = (data) => async dispatch => {
    // alert(data.dBirthDate)
     let addAddressParameters = 
     'type=' + data.type + '&' +
     'iUserId=' + data.iUserId + '&' +
     'eUserType=' + data.eUserType + '&' +
      'vServiceAddress=' + data.vServiceAddress + '&' +
      'vBuildingNo=' + data.vBuildingNo + '&' +
       'vLandmark=' + data.vLandmark + '&' +
       'vAddressType=' + data.vAddressType + '&' +
       'vLongitude=' + data.vLongitude + '&' +
       'vLatitude=' + data.vLatitude + '&' +
        'vTimeZone=' + data.vTimeZone + '&' +
        'address_type=' + data.address_type + '&' +
         'address=' + data.address

           
           
           
    // dispatch(fetchRegistrationData()); 
     try {
       const res = await axios.post(Mailurl + addAddressParameters)
      // dispatch(fetchRegistrationSuccess(res));
       return res;
     }
     catch (error) {
      // dispatch(fetchRegistrationError(error));
      return error;
       console.log(error);
     }
   
   }


   export const _getUserCardDetails= (data) => async dispatch => {
    let _userCardPayload = 

    'iUserId=' + data.iUserId + '&' +
    'type=' + data.type

    try {
      //const res = await axios.get(url)
      const res = await axios.post(Mailurl + _userCardPayload)
      return res;
    }
    catch (error) {
      console.log(error);
      return error;
    }
  
  }


  
  export const _getAllReceipts= (data) => async dispatch => {
    let _ReceiptPayload = 

    'filename=' + data.filename 

    try {
      //const res = await axios.get(url)
      const res = await axios.post("http://52.3.107.59/hurleys_backend/invoices/searchfile.php/?" + _ReceiptPayload)
      return res;
    }
    catch (error) {
      console.log(error);
      return error;
    }
  
  }


  