import React from 'react';
import {useState} from 'react'; //引入开关
import {px} from '../../utils/devices';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';

function Address() {
  const [value, onChangeText] = React.useState('请输入收件人'); //输入框内容
  const [value2, onChangeText2] = React.useState('请输入手机号或固定电话'); //输入框内容
  const [value3, onChangeText3] = React.useState('选择省/市/(县)区'); //输入框内容
  const [value4, onChangeText4] = React.useState('如街道、楼层、门牌号等'); //输入框内容
  //开关
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <ScrollView style={Sy.ScrollView}>
      <View style={Sy.body}>
        <View style={Sy.bdx}>
          <View style={Sy.sjrbox}>
            <Text style={Sy.sjr}>收件人</Text>
          </View>
          {/* TextInput： 输入框 */}
          <TextInput
            style={{
              height: 40,
              fontSize: px(24),
              color: '#8d8d8d',
            }}
            onChangeText={text => onChangeText(text)}
            value={value}
          />
        </View>
        <View style={Sy.bdxt}>
          <View style={Sy.sjrbox}>
            <Text style={Sy.sjr}>联系电话</Text>
          </View>
          {/* TextInput： 输入框 */}
          <TextInput
            style={{
              height: 40,
              fontSize: px(24),
              color: '#8d8d8d',
            }}
            onChangeText2={text => onChangeText(text)}
            value={value2}
          />
        </View>
        <View style={Sy.bdxt}>
          <View style={Sy.sjrbox}>
            <Text style={Sy.sjr}>收件地区</Text>
            {/*  待更新 */}
          </View>
          {/* TextInput： 输入框 */}
          <TextInput
            style={{
              height: 40,
              fontSize: px(24),
              color: '#8d8d8d',
            }}
            onChangeText3={text => onChangeText(text)}
            value={value3}
          />
        </View>
        <View style={Sy.bdxt}>
          <View style={Sy.sjrbox}>
            <Text style={Sy.sjr}>详细地址</Text>
          </View>
          {/* TextInput： 输入框 */}
          <TextInput
            style={{
              height: 40,
              fontSize: px(24),
              color: '#8d8d8d',
            }}
            onChangeText4={text => onChangeText(text)}
            value={value4}
          />
        </View>
        <View style={Sy.DefAddress}>
          <Text style={Sy.sjr}>设为默认收货地址</Text>
          {/*  Switch：开关 */}
          <View style={styles.container}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        <View style={Sy.ft}>
          <Text style={Sy.Bc}>保 存</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const Sy = StyleSheet.create({
  ScrollView: {
    flex: 1,
    // height: px(100),
  },
  body: {
    backgroundColor: '#f4f4f4',
  },
  bdx: {
    height: px(85),
    lineHeight: px(85),
    flexDirection: 'row',
    alignItems: 'center', //交叉轴方向对齐
    marginLeft: px(30),
    marginRight: px(30),
    borderColor: '#ebebeb',
    borderBottomWidth: px(1),
  },
  bdxt: {
    height: px(85),
    lineHeight: px(85),
    flexDirection: 'row',
    alignItems: 'center', //交叉轴方向对齐
    paddingLeft: px(30),
    paddingRight: px(30),
    borderColor: '#ebebeb',
    borderBottomWidth: px(1),
  },
  sjrbox: {
    // marginRight: px(64),
    width: px(170), //用盒子站位
  },
  sjr: {
    // marginLeft: px(64),
    fontSize: px(26),
    color: '#484848',
  },
  DefAddress: {
    height: px(85),
    lineHeight: px(85),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: px(30),
    paddingRight: px(30),
    borderColor: '#ebebeb',
    borderBottomWidth: px(1),
  },
  //Switch：开关
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //ft：保存
  ft: {
    height: px(85),
    marginTop: px(30),
    backgroundColor: '#ffc900',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: px(10),
    marginRight: px(10),
    borderRadius: px(30), // 圆角大小
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

export default Address;
