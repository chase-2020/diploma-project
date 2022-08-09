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
import TextareaItem from '../../component/TextareaItem';
import {Button, List} from '@ant-design/react-native';
import {login, useUpdate} from '../../src/apis/user';
import {setUserInfo} from '../../store/userStore'; // 引入多行输入组件

function CustomerService() {
  const [ad, setAd] = React.useState('');

  // 更新用户信息
  const doreg = async () => {
    try {
      const res = await useUpdate({
        email: ad,
      });
      console.log(res);
      const {success, info, one} = res;
      alert(info);
    } catch (e) {
      console.log(e);
      console.log('5656555555');
    }
  };

  return (
    <ScrollView style={Sy.ScrollView}>
      <View style={Sy.body}>
        <View style={Sy.bdp1}>
          <ScrollView
            style={{flex: 1}}
            automaticallyAdjustContentInsets={true}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={false}>
            <View style={{backgroundColor: 'red'}}>
              <TextareaItem
                rows={4}
                placeholder="请输入你遇到的问题及想要反馈的意见"
                count={300}
              />
            </View>
          </ScrollView>
        </View>
        <View style={Sy.bdp2}>
          <Text style={Sy.yj}>邮箱 :</Text>
          <TextInput
            onChangeText={text => setAd(text)}
            value={ad}
            placeholder={'请输入你的邮箱'}
            style={{
              height: 40,
              color: '#bbb',
              marginRight: px(30),
              marginLeft: px(20),
            }}
            // onChangeText={text => onChangeText(text)}
            // value={value}
          />
        </View>
        <View style={Sy.bdp3}>
          {/*点击按钮*/}
          <Button
            onPress={doreg}
            activeStyle={{backgroundColor: '#333'}} //点击之后变色
            style={Sy.anopx}>
            <Text style={Sy.wz}>完成并发送</Text>
          </Button>
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
  bdp1: {
    height: px(300),
    backgroundColor: '#ffffff',
  },
  bdp2: {
    height: px(120),
    backgroundColor: '#ffffff',
    marginTop: px(30),

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  yj: {
    // fontSize: px(26),
    fontWeight: '700',
    color: '#333333',
    marginLeft: px(60),
  },
  bdp3: {
    height: px(85),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ffc900',
    marginLeft: px(30),
    marginRight: px(30),
    marginTop: px(30),
    borderRadius: px(30),
  },
  wz: {
    fontWeight: '700',
    color: '#fff',
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

export default CustomerService;
