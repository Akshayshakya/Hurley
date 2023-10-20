import instance from "../../Components/CommonUtils/baseService";
import { CONVERSATION, RESET_STORE } from "../types";

export const APICall = (obj) => {
  return new Promise((resolve, reject) => {
    instance(obj)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
        } else if (err?.response?.status === 500) {
          alert("Server Down");
        } else if (err?.response?.status === 400) {
          alert(err?.response?.data?.response_msg);
          // alert(JSON.stringify(err?.response?.data));
          console.log(JSON.stringify(err?.response?.data));
        } else if (err?.response) {
          reject(err.response);
        } else {
          alert("Server Down");
        }
      });
  });
};

export const getConversation = (data) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let obj = {
        url: "api/chat/getConversation",
        method: "post",
        data: data,
      };
      APICall(obj)
        .then((res) => {
          dispatch({
            type: CONVERSATION,
            payload: res?.data,
          });
          resolve(res?.data);
        })
        .catch((err) => {
          alert(err?.data?.message);
          reject(err);
        });
    });
  };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_STORE,
    });
  };
};
