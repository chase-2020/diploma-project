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

function AboutUs() {
  return (
    <ScrollView style={Sy.ScrollView}>
      <View style={Sy.bdh1}>
        <Text style={Sy.ks1}>我们的故事</Text>
      </View>
      <View style={Sy.bdh2}>
        <View style={Sy.qsbox}>
          <View style={Sy.qs}>
            <Text>logo</Text>
          </View>
        </View>
        <View style={Sy.qs2}>
          <Text style={Sy.qs2xt}>阿巴阿巴阿……</Text>
        </View>
      </View>
      <View style={Sy.bdh3}>
        <View style={Sy.h3tx}>
          <IconFont
            name="fuwutiaokuan-copy"
            size={20}
            color="#ddd"
            style={{marginRight: px(20)}}
          />
          <Text style={Sy.fu}>服务条款</Text>
        </View>
        <IconFont
          name="zhaoshangxiaochengxu-jiantou-you"
          size={20}
          color="#ddd"
          style={Sy.txt}
        />
      </View>
      <View style={Sy.bdh4}>
        <View style={Sy.h3tx}>
          <IconFont
            name="dianhua"
            size={20}
            color="#ddd"
            style={{marginRight: px(20)}}
          />
          <Text style={Sy.fu}>联系客服</Text>
        </View>
        <IconFont
          name="zhaoshangxiaochengxu-jiantou-you"
          size={20}
          color="#ddd"
          style={Sy.txt}
        />
      </View>
      <View style={Sy.bdh4}>
        <View style={Sy.h3tx}>
          <IconFont
            name="wechat-fill"
            size={20}
            color="#ddd"
            style={{marginRight: px(20)}}
          />
          <Text style={Sy.fu}>官方微信号</Text>
        </View>
        <IconFont
          name="zhaoshangxiaochengxu-jiantou-you"
          size={20}
          color="#ddd"
          style={Sy.txt}
        />
      </View>
      <View style={Sy.bdh5}>
        <View style={Sy.h3tx}>
          <IconFont
            name="liuliangyunpingtaitubiao02"
            size={20}
            color="#ddd"
            style={{marginRight: px(20)}}
          />
          <Text style={Sy.fu}>返回首页</Text>
        </View>
        <IconFont
          name="zhaoshangxiaochengxu-jiantou-you"
          size={20}
          color="#ddd"
          style={Sy.txt}
        />
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
  qs: {
    height: px(100),
    width: px(100),
    backgroundColor: '#ffc900',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(30),
  },
  qs2: {
    height: px(330),
    backgroundColor: '#fff',
    display: 'flex',
    paddingRight: px(10),
    paddingLeft: px(10),
    paddingTop: px(10),
    paddingBottom: px(10),
    borderRadius: px(30),
  },
  qs2xt: {
    color: '#333',
    fontSize: px(26),
    paddingLeft: px(30),
    paddingRight: px(30),
  },
  bdh1: {
    height: px(320),
    backgroundColor: '#ffc900',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ks1: {
    // backgroundImage: `url('https://fakeimg.pl/350x200/?text=Hello')`,
  },
  bdh2: {
    height: px(486),
    width: px(690),
    backgroundColor: '#ffffff',
    display: 'flex',
    position: 'absolute',
    top: px(248),
    left: px(30),
    borderRadius: px(30),
  },
  qsbox: {
    height: px(160),
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(30),
  },

  bdh3: {
    height: px(100),
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: px(30),
    paddingRight: px(30),
    marginTop: px(448),
    borderBottomWidth: px(1),
    borderBottomColor: '#f2f2f2',
  },
  bdh4: {
    height: px(100),
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: px(30),
    paddingRight: px(30),
    borderBottomWidth: px(1),
    borderBottomColor: '#f2f2f2',
  },
  bdh5: {
    height: px(100),
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: px(30),
    paddingRight: px(30),
    borderBottomWidth: px(1),
    borderBottomColor: '#f2f2f2',
    marginBottom: px(200),
    marginTop: px(30),
  },
  h3tx: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fu: {
    fontSize: px(26),
    color: '#333333',
  },
});

export default AboutUs;
