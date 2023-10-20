
import axios from 'axios';
const url = 'https://prod.customers.loyaltylane.com/webapi/api/AdminSession';
const SinUpUrl = 'https://prod.customers.loyaltylane.com/webapi/api/FullAccount';
const userUpdateUrl = 'https://prod.customers.loyaltylane.com/webapi/api/Account';
import { Config } from './../Config/index'

const MainAppurl = Config.API_URL;


export const _getClientToken= (data) => async dispatch => {

     try {
       const res = await axios.post(url, data)
      // dispatch(fetchRegistrationSuccess(res));

       return res;
     }
     catch (error) {
      // dispatch(fetchRegistrationError(error));
       console.log(error);
       return error;
     }
   
   }



export const CreateNewUserinLoyaltyLane= (data,ClientToken) => async dispatch => {
console.log(`ClientToken.............${ClientToken}`)
    try {
      const res = await axios.post(SinUpUrl, data,{
        "headers": {
            "ClientToken":ClientToken,
            "content-type": "application/json",
            
            },
      })
     // dispatch(fetchRegistrationSuccess(res));

      return res;
    }
    catch (error) {
     // dispatch(fetchRegistrationError(error));
      console.log(error);
      return error;
    }
  
  }

  export const _getLoyaltyCardNumber= (data) => async dispatch => {
    let getVirtualCradParameters =  'type=' + 'getVirtualCard'
    try {
      const res = await axios.post(MainAppurl+ getVirtualCradParameters)
     // dispatch(fetchRegistrationSuccess(res));

      return res;
    }
    catch (error) {
     // dispatch(fetchRegistrationError(error));
      console.log(error);
      return error;
    }
  
  }

  
  export const _getBalanceTransaction= (data,ClientToken) => async dispatch => {
    
    let getBalanceTrans = 
    'accountid=' + data.accountid
    //'accountid=' + '2105'
     try {
       const res = await axios.get('https://prod.customers.loyaltylane.com/webapi/api/BalanceTransaction?'+ getBalanceTrans,{
         "headers": {
             "ClientToken":ClientToken,
             "content-type": "application/json",
             
             },
       })

       console.log('....................')
       return res;
     }
     catch (error) {
       console.log(error);
       return error;
     }
   
   }
// get past order from loyalty Lane
export const _getPastOrderFromLoyaltyLane= (data,ClientToken) => async dispatch => {
    
  let getPastorders = 
  'postransactionid=' + data.postransactionid + '&' +
  'storeid=' + data.storeid + '&' +
  'terminalid=' + data.terminalid + '&' +
  'transactiondate=' + data.transactiondate
   try {
     const res = await axios.get('https://prod.customers.loyaltylane.com/webapi/api/TransactionItem?'+ getPastorders,{
       "headers": {
           "ClientToken":ClientToken,
           "content-type": "application/json",
           
           },
     })

     console.log('.........Loiyalty past orders...........')
     return res;
   }
   catch (error) {
     console.log(error);
     return error;
   }
 
 }
  //
  export const _getLoyaltyCardBalance= (data,ClientToken) => async dispatch => {
   // alert('hi')
    let getBalancePara = 
    'accountid=' + data.accountid + '&' +
    'phone=' + data.phone
    try {
      const res = await axios.get('https://prod.customers.loyaltylane.com/webapi/api/Balance?'+ getBalancePara,{
        "headers": {
            "ClientToken":ClientToken,
            "content-type": "application/json",
            
            },
      })
      //const res = await axios.post('https://prod.customers.loyaltylane.com/webapi/api/Balance?'+ getBalancePara)
     // dispatch(fetchRegistrationSuccess(res));
console.log('....................')
      return res;
    }
    catch (error) {
     // dispatch(fetchRegistrationError(error));
      console.log(error);
      return error;
    }
  
  }


  export const UpdateUserinLoyaltyLane= (data,ClientToken) => async dispatch => {
    console.log(`ClientToken.............${ClientToken}`)
        try {
          const res = await axios.put(userUpdateUrl, data,{
            "headers": {
                "ClientToken":ClientToken,
                "content-type": "application/json",
                
                },
          })
         // dispatch(fetchRegistrationSuccess(res));
    
          return res;
        }
        catch (error) {
         // dispatch(fetchRegistrationError(error));
          console.log(error);
          return error;
        }
      
      }