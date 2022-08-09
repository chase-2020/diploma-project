import React, {Component} from 'react';
import {px} from '../../utils/devices';
import IconFont from '../../src/iconfont'; //引入图标库
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {Button} from '@ant-design/react-native';
import {useSelector} from 'react-redux';
import {useUpdate} from '../../src/apis/user';

function AccountPwd({navigation}) {
  // const {navigation, route} = porps;
  // const {a} = route.params;
  // const [value, onChange] = React.useState(a.phone); // 获取手机号

  const [value1, onChangeText1] = React.useState(null);
  const [value2, onChangeText2] = React.useState(null);
  const [value3, onChangeText3] = React.useState(null);

  const user = useSelector(state => state.userStore.userInfo); //  获取数据库中的用户信息

  const [km1, setKm1] = React.useState(''); // 获取密码
  const kom = async () => {
    try {
      const res = await useUpdate({
        passWord: km1,
      });
      console.log(res);
      const {info} = res;
      alert(info);
    } catch (e) {
      console.log(e);
      console.log('5656555555');
    }
  };

  return (
    <ScrollView style={Sy.ScrollView}>
      <View style={Sy.body}>
        {/*原密码*/}
        <View style={Sy.bdA3}>
          <Text style={Sy.A3tx}>原始密码</Text>
          <TextInput
            onChangeText={(onChangeText1, setKm1)}
            value={value1}
            style={Sy.txc}
            placeholder="请输入原始密码"
          />
          {/*待更新：加点击事件*/}
          <IconFont
            name="chakanmima-copy"
            size={20}
            color="#ddd"
            style={Sy.txt}
          />
        </View>
        {/*新密码*/}
        <View style={Sy.bdA3}>
          <Text style={Sy.A3tx}>新设密码</Text>
          <TextInput
            style={Sy.txc2}
            placeholder="输入6-16位数字、字母、字符"
            onChangeText2={onChangeText2}
            value={value2}
          />
          <IconFont
            name="chakanmima-copy"
            size={20}
            color="#ddd"
            style={Sy.txt}
          />
        </View>
        {/*确认新密码*/}
        <View style={Sy.bdA3}>
          <Text style={Sy.A3tx}>确认新密码</Text>
          <TextInput
            style={Sy.txc}
            placeholder="确认新密码"
            onChangeText3={onChangeText3}
            value={value3}
          />
          <IconFont
            name="chakanmima-copy"
            size={20}
            color="#ddd"
            style={Sy.txt}
          />
        </View>
        {/*跳转页面*/}
        <TouchableOpacity onPress={() => navigation.navigate('AccountPhone')}>
          <View style={Sy.bdAx}>
            <Text style={Sy.foget}>绑定手机号</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={Sy.ft}>
        {/*点击按钮*/}
        <Button
          // onPress={}
          activeStyle={{backgroundColor: '#333'}} //点击之后变色
          style={Sy.anopx}>
          <Text style={Sy.ftx} onPress={kom}>
            完成
          </Text>
        </Button>
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
    marginLeft: px(0),
  },
  //Switch：开关
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bdA3: {
    height: px(160),
    lineHeight: px(160),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: px(30),
    paddingRight: px(60), //输入框右边距
    borderBottomWidth: px(1),
    borderBottomColor: '#ebebeb',
    backgroundColor: '#ffffff',
  },
  A3tx: {
    fontSize: px(26),
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
  bdAx: {
    height: px(100),
    lineHeight: px(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: px(30),
    paddingRight: px(40),
    borderBottomWidth: px(1),
    borderBottomColor: '#ebebeb',
    backgroundColor: '#ffffff',
  },
  foget: {
    fontSize: px(30),
    color: '#949494',
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
  ftx: {
    fontSize: px(30),
    color: '#ffffff',
    fontWeight: '700',
  },
  txc: {
    height: 40,
    fontSize: px(26),
    color: '#c2c3c4',
    paddingLeft: px(30),
    width: px(480), // 预设
    backgroundColor: '#f9f9f9', //输入框背景
    borderRadius: px(30),
  },
  txc2: {
    height: 40,
    fontSize: px(26),
    color: '#c2c3c4',
    paddingLeft: px(30),
    width: px(480), // 预设
    backgroundColor: '#f9f9f9', //输入框背景
    borderRadius: px(30),
  },
});

export default AccountPwd;
