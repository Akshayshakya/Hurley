import { ActivityIndicator } from "react-native-paper";
import React, { useState } from "react";
import { Dimensions, PixelRatio, Platform } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const isIOS = Platform.OS === "ios";
const isANDROID = Platform.OS === "android";
const isiPAD = screenHeight / screenWidth < 1.6;

const widthPercentageToDP = (wp) => {
  const widthPercent = wp;
  const elemWidth =
    typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = (hp) => {
  const heightPercent = hp;
  const elemHeight =
    typeof heightPercent === "number"
      ? heightPercent
      : parseFloat(heightPercent);

  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

// based on iphone 5s's scale
const scale = screenWidth / 375;
const normalize = (size) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const color = {
  White: "#FFFFFF",
  Black: "#000000",
  WhiteShade: "#737F8C",

  GrayBg: "#949398",

  BlueBg: "#215190",
  BlueLightBg: "#4B9BAE",
  BlueIconBg: "#4A9BAE",

  ThemeColor: "#1F2933",
  ThemeLight: "#323F4B",

  Yellow: "#F0DF67",

  redDim: "#C06364",
};

//const Splash_Gradient = ['#CC262E', '#660E14'];

const fonts = {
  fontBold: "bold",
};

const Loader = (props) => {
  return (
    <ActivityIndicator
      animating={props.visible}
      size={props.size}
      color={props.color}
    />
  );
};

export {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  screenHeight,
  screenWidth,
  normalize,
  isIOS,
  isANDROID,
  isiPAD,
  color,
  fonts,
  Loader,
};
