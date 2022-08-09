import React from 'react';
import {px} from '../../utils/devices';
import IconFont from '../../src/iconfont'; //引入图标库
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Switch,
  TouchableOpacity,
} from 'react-native';

function AccountSecurity({navigation}) {
  return (
    <ScrollView style={Sy.ScrollView}>
      <View style={Sy.body}>
        <View style={Sy.bdA1}>
          <Text style={Sy.A1tx}>密码管理</Text>
          {/*跳转页面*/}
          <TouchableOpacity onPress={() => navigation.navigate('AccountPwd')}>
            <View style={Sy.bdA2}>
              <Text style={Sy.A2tx}>修改密码</Text>
              <IconFont
                name="zhaoshangxiaochengxu-jiantou-you"
                size={20}
                color="#ddd"
                style={Sy.txt}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={Sy.bdA1}>
          <Text style={Sy.A1tx}>绑定手机号</Text>
          {/*跳转页面*/}
          <TouchableOpacity onPress={() => navigation.navigate('AccountPhone')}>
            <View style={Sy.bdA2}>
              <Text style={Sy.A2tx}>123456</Text>
              <IconFont
                name="zhaoshangxiaochengxu-jiantou-you"
                size={20}
                color="#ddd"
                style={Sy.txt}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const Sy = StyleSheet.create({
  ScrollView: {
    flex: 1,
  },
  body: {
    backgroundColor: '#f4f4f4',
  },
  txt: {
    marginLeft: px(30),
  },
  //Switch：开关
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bdA1: {
    height: px(100),
    lineHeight: px(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: px(30),
    paddingRight: px(30),
    borderBottomWidth: px(1),
    borderBottomColor: '#ebebeb',
    backgroundColor: '#ffffff',
  },
  bdA2: {
    height: px(100),
    lineHeight: px(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  A1tx: {
    fontSize: px(26),
    color: '#333333',
  },
  A2tx: {
    fontSize: px(24),
    color: '#9f9f9f',
  },
});

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: px(32),
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default AccountSecurity;
