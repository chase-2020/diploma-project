import React, {useState} from 'react';
import {px} from '../../utils/devices';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  Text,
} from 'react-native';
import {Button} from '@ant-design/react-native';
import {useUpdate, yzmlogin} from '../../src/apis/user';

function AlterName(porps) {
  const {navigation, route} = porps;
  const {a} = route.params;
  const [value, onChange] = React.useState(a.username);

  const findu = async () => {
    try {
      const res = await useUpdate({
        username: value,
        phone: a.phone, //更改条件
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={Sy.body}>
      <View style={Sy.gx} />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={Sy.bost}>
            <TextInput
              style={Sy.input}
              onChangeText={onChange}
              value={value}
              placeholder="来编辑你名字吧"
              placeholderTextColor="#343434"
              keyboardType="default"
            />
          </View>
          <View style={Sy.bost2}>
            <Text style={Sy.st2}>好名字可以让朋友更容易记住你。</Text>
          </View>
          {/*点击按钮*/}
          <View style={Sy.bdp3}>
            <Button
              onPress={findu}
              activeStyle={{backgroundColor: '#333'}} //点击之后变色
              style={Sy.anopk}>
              <Text style={Sy.wz}>完成并发送</Text>
            </Button>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const Sy = StyleSheet.create({
  body: {
    height: px(1330),
    backgroundColor: '#ffffff',
  },
  bost: {
    // backgroundColor:'#333',
    borderBottomWidth: px(1),
    borderBottomColor: '#ffc900',
    marginLeft: px(30),
    marginRight: px(30),
  },
  bost2: {
    margin: px(30),
    color: '#888',
  },
  st2: {
    color: '#888',
    fontSize: px(22),
    marginTop: px(-10),
  },
  gx: {
    marginLeft: px(30),
    marginRight: px(30),
    marginTop: px(20),
    backgroundColor: 'red',
  },
  input: {
    height: px(80),
    fontSize: px(24),
    paddingTop: px(20),
    paddingBottom: px(20),

    color: '#000',
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
  anopk: {
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

export default AlterName;
