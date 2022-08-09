import React, {useState} from 'react';
import {px} from '../../utils/devices';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import {List, TextareaItem} from '@ant-design/react-native';

function Mymotto(props) {
  // const [
  //   value1,
  //   onChange = val => {
  //     React.useState({val});
  //   },
  // ] = React.useState('我的个性签名');
  return (
    <View style={Sy.body}>
      <View style={Sy.gx} />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View>
          <List>
            <TextareaItem
              placeholder="我的个性签名"
              rows={4}
              style={{color: '#ddd', fontSize: px(26), paddingLeft: px(30)}}
              // onChange={text => onChange(text)}
              // value={value1}
              count={26}
            />
          </List>
        </View>
      </ScrollView>
    </View>
  );
}

const Sy = StyleSheet.create({
  body: {
    height: px(1330),
    backgroundColor: '#ffffff',
  },
  gx: {
    marginLeft: px(30),
    marginRight: px(30),
    marginTop: px(20),
  },
});

export default Mymotto;
