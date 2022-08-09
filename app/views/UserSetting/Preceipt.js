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

function Preceipt() {
  return (
    <ScrollView style={Sy.ScrollView}>
      <View style={Sy.body}>
        {/*地址栏*/}
        <View style={Sy.bdtp1}>
          <View style={Sy.pjy}>
            <IconFont name="shouhuo" size={40} color="#ffffff" />
          </View>
          <View style={Sy.sh}>
            <Text style={Sy.shxt}>暂无收货人地址</Text>
          </View>
        </View>
        {/*尾部添加栏*/}
        <View style={Sy.bdft}>
          <View style={Sy.ft1}>
            <IconFont name="tianjia" size={20} />
            <Text style={Sy.ft1xt}>添加新的收货地址</Text>
          </View>
          <View style={Sy.ft2}>
            <IconFont
              name="zhaoshangxiaochengxu-jiantou-you"
              size={20}
              color="#ddd"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const Sy = StyleSheet.create({
  ScrollView: {
    flex: 1,
    position: 'relative',
    // height: px(1000),
  },
  txt: {
    marginRight: px(20),
  },
  body: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  bdtp1: {
    backgroundColor: '#f4f4f4',
    flexGrow: 0,
    height: px(1328),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pjy: {
    width: px(140),
    height: px(140),
    borderRadius: px(70),
    backgroundColor: '#e1e1e1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sh: {
    marginTop: px(10),
  },
  shxt: {
    fontSize: px(26),
    color: '#333',
  },
  bdft: {
    height: px(100),
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  ft1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: px(40),
  },
  ft1xt: {
    fontSize: px(26),
    paddingLeft: px(10),
  },

  ft2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: px(30),

  },
});

export default Preceipt;
