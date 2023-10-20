import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
// import {TextInput} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from './Colors';
import {isANDROID} from './ThemeHelper';

const TextInputContainer = props => {
  const [IseyeOn, setIseyeOn] = useState(true);

  return (
    <View
      style={[
        styles.TxtInpContainer,
        {borderWidth:1,borderColor:props.borderColor,marginTop: props.notMargin ? null : wp('3%')},
      ]}>
      <TextInput
        placeholder={props.placeholder}
        value={props.value}
        editable={props.editable}
        onFocus={props.onFocus}
        autoCapitalize={'none'}
        secureTextEntry={props.password ? (IseyeOn ? true : false) : false}
        keyboardType={props.keyboardType}
        multiline={props.multiline}
        placeholderTextColor={Colors.gray}
        onChangeText={props.onChangeText}
        style={[
          styles.TxtInp,
props.paddingLeft,
          props.multiline
            ? {height: hp('15%'), textAlignVertical: 'top'}
            : null,
        ]}
        // theme={{
        //   roundness: 10,
        //   colors: {
        //     primary: Colors.blackFirst,
        //     underlineColor: 'transparent',
        //   },
        // }}
        // mode="outlined"
        // label={props.placeholder}
      />
      {props.icon && (
        <TouchableOpacity
          onPress={() => setIseyeOn(!IseyeOn)}
          style={{alignSelf: 'center', paddingRight: wp('3%')}}>
          <MaterialIcon
            name={
              props.password ? (IseyeOn ? 'eye-off' : 'eye') : props.iconName
            }
            size={props.iconName ? 30 : 20}
            color={Colors.gray}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  TxtInpContainer: {
    backgroundColor: Colors.grayfade,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TxtInp: {
    paddingVertical: isANDROID ? wp('3%') : wp('4%'),
    alignSelf: 'center',
    fontSize: 14,
    paddingLeft: wp('3%'),
    flex: 1,
    color: Colors.blackFirst,

  },
});

export default TextInputContainer;
