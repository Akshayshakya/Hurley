import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {hp, wp, isANDROID} from './ThemeHelper';
import Icon_1 from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Colors from './Colors';
import Modal from 'react-native-modal';

const CalenderComponent = props => {
  const [ModalVisible, setModalVisible] = useState(false);
  const [changeValue, setchangeValue] = useState('');
  const today = moment(Date()).format('DD-MM-YYYY');

  const Done = () => {
    setModalVisible(!ModalVisible);
    props.getDate(changeValue);
  };
  const returnData = date => {
    return moment(date).format('DD-MM-YYYY');
  };

  const validateDate=(text)=>{
    //let value = text;  
    var reg = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;   
     
     if (!reg.test(text)) {
       setchangeValue(Finald)
   }
   let Finald = text.replace(/^([\d]{2})([\d]{2})([\d]{4})$/,"$1/$2/$3");   
   //return Status;
 
       setchangeValue(Finald)
 
 
   }
  return (
    <View style={{flex: 1}}>
      <View style={[styles.mainView,{borderColor:props.borderColor}]}>
        <TextInput
          placeholder="DD-MM-YYYY (DOB)"
          value={changeValue?changeValue:props.FinalValue}
          placeholderTextColor={Colors.gray}
          onChangeText={text => validateDate(text)}
          style={[
            styles.textInputStyle,
            isANDROID ? styles.textInputStyleAndroid : styles.textInputStyleIos,
          ]}
        />
        <TouchableOpacity
          onPress={() => setModalVisible(!ModalVisible)}
          style={{alignSelf: 'center'}}>
          <Icon_1
            name="calendar-month-outline"
            size={20}
            color={Colors.gray}
            style={[styles.calenderIcon]}
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationIn="slideInUp"
        isVisible={ModalVisible}
        onBackdropPress={() => setModalVisible(!ModalVisible)}>
        <View
          style={[
            styles.modalView,
            isANDROID ? styles.modalViewAndroid : styles.modalViewIos,
          ]}>
          <CalendarPicker
            container={{hp: hp(40)}}
            containerStyle={[styles.calenderContainer]}
            selectedDayColor={Colors.appColor}
            selectedDayTextColor={Colors.white}
            minDate={new Date(1900, 0, 1)}
            maxDate={new Date(2050, 11, 1)}
            previousTitle={
              <Ionicons
                name="chevron-back-outline"
                color={Colors.appColor}
                size={hp(3)}
              />
            }
            nextTitle={
              <Ionicons
                name="chevron-forward-outline"
                color={Colors.appColor}
                size={hp(3)}
              />
            }
            weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
            textStyle={{
              color: Colors.appColor,
            }}
            todayBackgroundColor={Colors.gray}
            onDateChange={text => {
              setchangeValue(returnData(text));
            }}
          />

          <View style={[styles.doneView]}>
            <TouchableOpacity onPress={Done} style={[styles.doneButton]}>
              <Text style={[styles.doneText]}>Done</Text>
            </TouchableOpacity>
            <Text style={[styles.selectDate]}>
              {changeValue
                ? changeValue.toString()
                : changeValue == ''
                ? today
                : null}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default CalenderComponent;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: Colors.grayfade,
    borderRadius: 10,
    borderWidth:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp('3%'),
    flex: 1,
  },
  textInputStyle: {
    paddingVertical: isANDROID ? wp('3%') : wp('4%'),
    fontSize: 14,
    paddingLeft: wp('3%'),
    flex: 1,
   
    color: Colors.blackFirst,
  },
  textInputStyleAndroid: {paddingVertical: null},
  textInputStyleIos: {paddingVertical: null},

  calenderIcon: {
    alignSelf: 'center',
    marginRight: wp(3),
  },

  calenderContainer: {paddingHorizontal: wp(5)},

  modalView: {
    alignSelf: 'center',
    // top: hp(20),
    backgroundColor: Colors.white,
    // elevation: 5,
    paddingVertical: hp(2),
    left: 2,
    right: 2,
    // shadowColor: Colors.blackFirst,
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 20,
    // elevation: 5,
  },
  // modalViewAndroid: {height: hp(60)},
  // modalViewIos: {height: hp(65)},

  doneView: {
    justifyContent: 'center',
  },

  doneButton: {
    borderRadius: 5,
    backgroundColor: Colors.appColor,
    alignSelf: 'center',
    marginTop: hp(4),
    marginBottom: wp(2),
    paddingHorizontal: wp(7),
    paddingVertical: hp(1),
  },

  doneText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700',
    alignSelf: 'center',
  },
  selectDate: {
    color: Colors.blackFirst,
    fontSize: 17,
    // fontWeight: '300',
    fontWeight: 'bold',
    marginTop: hp(1),
    alignSelf: 'center',
  },
});
