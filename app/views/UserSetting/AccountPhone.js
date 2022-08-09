import React, {Component} from 'react';
import {px} from '../../utils/devices';
import IconFont from '../../src/iconfont'; //引入图标库
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import {Button} from '@ant-design/react-native';
import {register, useUpdate, yzmreg} from '../../src/apis/user';

function AccountPhone(porps) {
  // const [value, onChangeText] = React.useState('请输入手机号');
  // const [value2, onChangeText2] = React.useState('请输入验证码');
  const {navigation, route} = porps;
  const {a} = route.params;
  const [value, onChange] = React.useState(a.phone); // 获取手机号

  const updatePhone = async () => {
    try {
      const res = await useUpdate({
        phone: value,
        username: a.username, //更新判断条件
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  //验证码
  const verifiCation = async () => {
    try {
      const res = await yzmreg({
        phone: a.phone, //更新判断条件
      });
      console.log(res);
      const {info} = res;
      alert(info);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={Sy.ScrollView}>
      <View style={Sy.body}>
        <View style={Sy.bdA1}>
          <Text style={Sy.A1tx}>新手机号</Text>
        </View>
        {/*输入新的手机号*/}
        <View style={Sy.bdA2}>
          <Text style={Sy.A2tx}>+86</Text>
          <TextInput
            style={Sy.rft86}
            onChangeText={onChange}
            value={value}
            placeholder={'请输入手机号'}
            keyboardType="default"
          />
        </View>
        <View style={Sy.bdA3}>
          <TextInput
            style={Sy.rty}
            placeholder={'请输入验证码'}
            // onChangeText2={text => onChangeText2(text)}
            // value={value2}
          />
          <Text style={Sy.A3tx} onPress={verifiCation}>
            获取验证码
          </Text>
          <IconFont
            name="zhaoshangxiaochengxu-jiantou-you"
            size={20}
            color="#ddd"
            style={Sy.txt}
          />
        </View>
      </View>
      <View style={Sy.ft}>
        {/*点击按钮*/}
        <Button
          onPress={updatePhone}
          activeStyle={{backgroundColor: '#333'}} //点击之后变色
          style={Sy.anopx}>
          <Text style={Sy.ftx}>更换手机号</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const Sy = StyleSheet.create({
  ScrollView: {
    flex: 1,
    // backgroundColor: '#fffff',
  },
  body: {
    backgroundColor: '#f4f4f4',
    // height:px(1000),
  },
  txt: {
    marginLeft: px(0),
  },
  //Switch：开关
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bdA1: {
    height: px(160),
    lineHeight: px(160),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: px(70),
    paddingRight: px(70),
    backgroundColor: '#ffffff',
  },
  bdA2: {
    height: px(140),
    lineHeight: px(110),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: px(70),
    paddingRight: px(70),
    borderBottomWidth: px(1),
    borderBottomColor: '#ebebeb',
    backgroundColor: '#ffffff',
  },
  rft86: {
    height: 40,
    fontSize: px(26),
    color: '#c2c3c4',
    paddingLeft: px(50),
    marginLeft: px(70),
    width: px(500), // 预设
    backgroundColor: '#f9f9f9', //输入框背景
    borderRadius: px(30),
  },
  rty: {
    height: 40,
    fontSize: px(26),
    color: '#c2c3c4',
    paddingLeft: px(50),
    width: px(340), // 预设
    backgroundColor: '#f9f9f9', //输入框背景
    borderRadius: px(30),
  },
  bdA3: {
    height: px(160),
    lineHeight: px(160),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: px(70),
    paddingRight: px(70),
    borderBottomWidth: px(1),
    borderBottomColor: '#ebebeb',
    backgroundColor: '#ffffff',
  },
  A1tx: {
    marginBottom: px(2),
    fontSize: px(30),
    color: '#969696',
    fontWeight: '700',
  },
  A2tx: {
    fontSize: px(30),
    color: '#060606',
    fontWeight: '700',
  },
  A3tx: {
    fontSize: px(30),
    color: '#969696',
    fontWeight: '700',
  },
  ft: {
    height: px(85),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc900',
    marginLeft: px(70),
    marginRight: px(70),
    marginTop: px(100),
    borderRadius: px(30),
  },
  ftx: {
    fontSize: px(30),
    color: '#ffffff',
    fontWeight: '700',
  },
  anopx: {
    width: px(610),
    height: px(85),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc900',
    borderRadius: px(30),
  },
});

export default AccountPhone;
