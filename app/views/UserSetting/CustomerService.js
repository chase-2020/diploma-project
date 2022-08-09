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
} from 'react-native';

function CustomerService() {
  return (
    <ScrollView style={Sy.ScrollView}>
      <View style={Sy.body}>
        <View style={Sy.bdc1}>
          <View style={Sy.yuan}>
            <IconFont name="kefu" size={72} color="#ffffff" style={Sy.txt} />
          </View>
        </View>
        <View style={Sy.bdc2}>
          <Text style={Sy.week}>周一至周日</Text>
          <Text style={Sy.week2}>9:00-21:00</Text>
        </View>
        <View style={Sy.bdc3}>
          <IconFont
            name="lianxikefu"
            size={20}
            color="rgba(214,13,0,0.67)"
            style={Sy.txt}
          />
          <Text style={Sy.week3}>联系客服</Text>
        </View>
        <View style={Sy.bdc4}>
          <IconFont
            name="dianhua"
            size={20}
            color="rgba(214,13,0,0.67)"
            style={Sy.txt}
          />
          <Text style={Sy.week3}>客服电话</Text>
        </View>
      </View>
      <View>{/*  加按钮组件 */}</View>
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
  bdc1: {
    height: px(220),
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yuan: {
    height: px(172),
    width: px(172),
    borderRadius: px(86),
    backgroundColor: '#ffc900',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bdc2: {
    height: px(100),
    backgroundColor: '#ffffff',
    // borderBottomWidth: px(1),
    // borderBottomColor: '#cdcdcd',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: px(4),
    marginBottom: px(20),
  },
  bdc3: {
    height: px(100),
    // lineHeight: px(10),
    backgroundColor: '#ffffff',
    borderBottomWidth: px(1),
    borderBottomColor: '#cdcdcd',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: px(10),
  },
  bdc4: {
    height: px(160),
    backgroundColor: '#ffffff',
    borderBottomWidth: px(1),
    borderBottomColor: '#cdcdcd',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: px(10),
  },
  week: {
    fontSize: px(30),
    color: '#d6d6d6',
    marginRight: px(20),
    fontWeight: '700',
  },
  week2: {
    fontSize: px(30),
    color: 'rgba(214,13,0,0.67)',
    fontWeight: '700',
    marginLeft: px(20),
  },
  week3: {
    fontSize: px(30),
    color: '#434343',
    marginLeft: px(20),
  },
});

export default CustomerService;
