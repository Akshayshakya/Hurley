import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from './Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isANDROID} from './ThemeHelper';

const data = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
];
const DropdownComponent = props => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* {renderLabel()} */}
      <Dropdown
        style={[styles.dropdown,{borderColor:props.borderColor}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={props.data ? props.data : data}
        maxHeight={150}
        labelField="label"
        valueField="value"
        placeholder={props.placeholder ? props.placeholder : 'Gender'}
        value={props.value ? props.value : value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={
          props.onChange
            ? props.onChange
            : item => {
                setValue(item.value);
                setIsFocus(false);
              }
        }
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grayfade,
    borderRadius: 10,
    marginTop: wp('3%'),
    flex: 1,
  },
  dropdown: {
    paddingVertical: isANDROID ? wp('2.5%') : wp('1.5%'),
    fontSize: 14,
    paddingLeft: wp('3%'),
    flex: 1,
    borderWidth:1,
    borderRadius:5,
    color: Colors.blackFirst,
    paddingRight: wp('2%'),
    textAlignVertical: 'top',
    
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: Colors.gray,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
});
