import React from 'react';
import {px} from '../../utils/devices';
import IconFont from '../../src/iconfont'; //引入图标库
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import { clearUserInfo } from '../../store/userStore'
import storage from '../../utils/storage'


function Set({navigation}) {
  const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
  });

  const dispatch = useDispatch()  // store触发器

  return (
    //app设置页
    <ScrollView style={Sy.ScrollView}>
      <View style={Sy.body}>
        <View style={Sy.bdone}>
          <Text style={Sy.PersonalDate}>个人资料</Text>
          {/*跳转页面*/}
          <TouchableOpacity onPress={() => navigation.navigate('Alice')}>
            <View>
              <IconFont
                name="zhaoshangxiaochengxu-jiantou-you"
                size={20}
                color="#ddd"
                style={Sy.txt}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={Sy.bdone}>
          <Text style={Sy.PersonalDate}>收货地址</Text>
          <View>
            {/*跳转页面*/}
            <TouchableOpacity onPress={() => navigation.navigate('Preceipt')}>
              <IconFont
                name="zhaoshangxiaochengxu-jiantou-you"
                size={20}
                color="#ddd"
                style={Sy.txt}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Sy.bdone01}>
          <Text style={Sy.PDate01}>账号安全</Text>
          {/*跳转页面*/}
          <TouchableOpacity
            onPress={() => navigation.navigate('AccountSecurity')}>
            <View>
              <IconFont
                name="zhaoshangxiaochengxu-jiantou-you"
                size={20}
                color="#ddd"
                style={Sy.txt}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={Sy.bdone}>
          <Text style={Sy.PersonalDate}>消息提醒</Text>
          {/*跳转页面*/}
          <TouchableOpacity onPress={() => navigation.navigate('SetReminder')}>
            <View>
              <IconFont
                name="zhaoshangxiaochengxu-jiantou-you"
                size={20}
                color="#ddd"
                style={Sy.txt}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={Sy.bdone}>
          <Text style={Sy.PersonalDate}>意见反馈</Text>
          {/*跳转页面*/}
          <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
            <View>
              <IconFont
                name="zhaoshangxiaochengxu-jiantou-you"
                size={20}
                color="#ddd"
                style={Sy.txt}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={Sy.bdone}>
          <Text style={Sy.PersonalDate}>版本更新</Text>
          {/*跳转页面*/}
          <TouchableOpacity onPress={() => navigation.navigate('#')}>
            <View style={Sy.leftCH}>
              <Text style={Sy.updateV}>当前为最新版本</Text>
              <IconFont
                name="zhaoshangxiaochengxu-jiantou-you"
                size={20}
                color="#ddd"
                style={Sy.txt}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={Sy.bdone}>
          <Text style={Sy.PersonalDate}>客服中心</Text>
          {/*跳转页面*/}
          <TouchableOpacity
            onPress={() => navigation.navigate('CustomerService')}>
            <View>
              <IconFont
                name="zhaoshangxiaochengxu-jiantou-you"
                size={20}
                color="#ddd"
                style={Sy.txt}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={Sy.bdone02}>
          <Text style={Sy.PDate02}>清楚缓存</Text>
          <View>
            <IconFont
              name="zhaoshangxiaochengxu-jiantou-you"
              size={20}
              color="#ddd"
              style={Sy.txt}
            />
          </View>
        </View>
        <View style={Sy.bdone}>
          <Text style={Sy.PersonalDate}>关于我们</Text>
          {/*跳转页面*/}
          <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
            <View>
              <IconFont
                name="zhaoshangxiaochengxu-jiantou-you"
                size={20}
                color="#ddd"
                style={Sy.txt}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={Sy.bdone}>
          <Text style={Sy.PersonalDate}>评价</Text>
          {/*跳转页面*/}
          <TouchableOpacity onPress={() => navigation.navigate('#')}>
            <View>
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

      <TouchableOpacity onPress={()=>[navigation.navigate("Login"),dispatch(clearUserInfo())]}>

        <View style={Sy.ft}>
          <Text style={Sy.ftxt}>退出</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const Sy = StyleSheet.create({
  ScrollView: {
    flex: 1,
    // height: px(1000),
  },
  body: {
    backgroundColor: '#f4f4f4',
  },
  txt: {
    marginRight: px(30),
  },
  bdone: {
    height: px(100),
    lineHeight: px(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: px(1),
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  PersonalDate: {
    lineHeight: px(100),
    fontSize: px(26),
    color: '#4c4c4c',
    paddingLeft: px(30),
    paddingRight: px(30),
  },
  bdone01: {
    height: px(100),
    lineHeight: px(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: px(1),
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    marginBottom: px(20),
    marginTop: px(20),
  },
  bdone02: {
    height: px(100),
    lineHeight: px(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: px(1),
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    marginTop: px(20),
  },
  PDate01: {
    lineHeight: px(100),
    fontSize: px(26),
    color: '#4c4c4c',
    paddingLeft: px(30),
    paddingRight: px(30),
  },
  PDate02: {
    lineHeight: px(100),
    fontSize: px(26),
    color: '#4c4c4c',
    paddingLeft: px(30),
    paddingRight: px(30),
    marginBottom: px(20),
  },
  ft: {
    height: px(86),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc900',
    marginTop: px(30),
    marginBottom: px(200),
    marginLeft: px(30),
    marginRight: px(30),
    borderRadius: px(30), // 圆角大小
  },
  updateV: {
    lineHeight: px(100),
    fontSize: px(24),
    color: '#bfbfbf',
    paddingLeft: px(30),
    paddingRight: px(30),
  },
  leftCH: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ftxt: {
    backgroundColor: '#ffc900',
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

export default Set;
