import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Communications from 'react-native-communications';
import Colors from '../../Components/CommonUtils/Colors';
import {wp, hp, isANDROID} from '../../Components/CommonUtils/ThemeHelper';
import InnerHeader from '../../Components/Header/innerHeader';
import Images from '../../Components/CommonUtils/Images';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownComponent from '../../Components/CommonUtils/DropDown';
import TextInputs from '../../Components/CommonUtils/TextInput';
import Buttons from '../../Components/CommonUtils/Button';

const EmailForm = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const ReasonData = [
    {label: 'Reason 1', value: 'reason 1'},
    {label: 'Reason 2', value: 'reason 2'},
    {label: 'Reason 3', value: 'reason 3'},
  ];

  return (
    <View style={{marginTop: hp('2%')}}>
      <View style={{flex: 1}}>
        <TextInputs
          placeholder={'NAME'}
          value={name}
          onChangeText={text => setName(text)}
          notMargin
        />
      </View>

      <View style={{flex: 1}}>
        <TextInputs
          placeholder={'EMAIL'}
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>

      <View style={{flex: 1}}>
        <TextInputs
          placeholder={'PHONE'}
          value={phone}
          onChangeText={text => setPhone(text)}
        />
      </View>

      <View style={{flex: 1}}>
        <DropdownComponent
          placeholder={'REASON FOR YOUR EMAIL'}
          data={ReasonData}
          value={reason}
          onChange={item => {
            setReason(item.value);
          }}
        />
      </View>

      <View style={{flex: 1}}>
        <TextInputs
          placeholder={'MESSAGE'}
          value={message}
          onChangeText={text => setMessage(text)}
          multiline={true}
        />
      </View>

      <View style={{marginTop: hp('2%')}}>
        <Buttons
          label="Submit"
          onPress={() => {
            console.log('...');
          }}
        />
      </View>
    </View>
  );
};
export default EmailForm;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
