/* eslint-disable */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {px} from './utils/devices';

import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TabBarIOSItem,
} from 'react-native';
import IconFont from './src/iconfont';

import {NavigationContainer} from '@react-navigation/native'; // router
import {createStackNavigator} from '@react-navigation/stack'; // router
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import Ls from './views/Ls';
import Pd from './views/Pd';
import My from './views/my';
import Zr from './views/Zr';
import Set from './views/UserSetting/Set'; //设置页面
import Alice from './views/UserSetting/Alice'; //个人资料页
import AlterName from './views/UserSetting/AlterName' //更改名字
import Address from './views/UserSetting/Address'; //收货地址页
import SetReminder from './views/UserSetting/SetReminder'; //消息提示设置页
import AccountSecurity from './views/UserSetting/AccountSecurity'; //账户安全管理页
import AccountPhone from './views/UserSetting/AccountPhone'; //账户绑定手机号页
import AccountPwd from './views/UserSetting/AccountPwd'; //账户修改密码页
import CustomerService from './views/UserSetting/CustomerService'; //客服中心
import Feedback from './views/UserSetting/Feedback'; //意见反馈
import AboutUs from './views/UserSetting/AboutUs'; //关于我们
import Preceipt from './views/UserSetting/Preceipt'; //收货地址
import Mymotto from './views/UserSetting/Mymotto'; //个性签名
import OrderParticular from './views/CurriculumOrder/OrderParticular'; //课程订单详情
import CurriculumParticular from './views/CurriculumOrder/CurriculumParticular'; //课程详情
import Dingchang from './views/dingchang'; //订场
import VenueDetails from './views/venueDetails'; // 场馆详情  
import BookingSpace from './views/bookingSpace'; // 订场预约 
import Confirmation from './views/confirmationirmation'; // 确认订单
import OrderDetails from './views/orderDetails'; // 订单详情
import OrderList from './views/orderList'; //订场订单
import Wallet from './views/wallet'; //钱包
import Activity from './views/activity'; //活动
import Activity_details from './views/activity_details'; //活动详情
import Map from './views/map'; // 地图
import AnimatedExample from './views/dt';
import Dtxc from './views/Dtxc'; //动态相册
import home from './views/home';
import Dtjj from './views/Dtjj'; //动态集锦
import Dtfb from './views/Dtfb'; //动态发布界面
import Footer from './component/Footer';
import {CommonActions} from '@react-navigation/native';
import Login from './views/login'; // 登录
import Register from './views/register'; // 注册
import Findpwd from './views/Findpwd'; // 找回密码
import Resetpwd from './views/resetpwd'; // 设置密码
import Cultivate from './views/cultivate'; // 培训
import CharterAgreement from './views/charterAgreement'; // 包场协议
import CitySelect from './component/city'; // 包场协议
import {useSelector, useDispatch} from 'react-redux';
import {setUserInfo} from './store/userStore';
import {Provider} from '@ant-design/react-native';
import storage from './utils/storage';
function App() {
  const dispatch = useDispatch();
  // 用户信息初始化
  useEffect(() => {
    (async () => {
      try {
        const userInfo = await storage.load({
          key: 'userInfo',
        });
        dispatch(setUserInfo(userInfo));
      } catch (e) {}
    })();
  }, []);

  const TabBar = () => {
    return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'home') {
                iconName = 'liuliangyunpingtaitubiao02'
              }else if (route.name === 'OrderList') {
                iconName ='dingchang';
              }else if (route.name === 'Activity') {
                iconName ='huodong';
              }else if (route.name === 'My') {
                iconName ='wode';
              }
              return <IconFont name={iconName} size={size} color={color}/>;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
      >
        <Tab.Screen name="home" component={home} options={{headerShown:false,title: '首页'}} />
        {/* <Tab.Screen name="Dingchang" component={Dingchang} options={{title: '订场'}}/> */}
        <Tab.Screen name="OrderList" component={OrderList} options={{title: '我的订单'}}/>
        <Tab.Screen name="Activity" component={Activity} options={{title: '赛事活动'}}/>
        <Tab.Screen name="My" component={My} options={{title: '个人中心'}}/>
      </Tab.Navigator>
    );
  };

  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator>
        
          <Stack.Screen name="Index" component={TabBar} options={{headerShown:false}} />
          <Stack.Screen name="Login" component={Login} options={{title: '登录'}}/>
          <Stack.Screen name="Dingchang" component={Dingchang} options={{title: '快速订场'}}/>
          <Stack.Screen name="Register" component={Register} options={{title: '注册'}}/>
          <Stack.Screen name="Findpwd" component={Findpwd} options={{title: '身份验证'}}/>
          <Stack.Screen name="Resetpwd" component={Resetpwd} options={{title: '设置密码'}}/>
          <Stack.Screen name="Cultivate" component={Cultivate} options={{title: '培训'}}/>
          <Stack.Screen name="Activity_details" component={Activity_details} options={{title: '活动详情'}}/>
          <Stack.Screen name="Ls" component={Ls} options={{title: '积分商城'}}/>
          <Stack.Screen name="Pd" component={Pd} options={{title: '我的积分'}}/>
          <Stack.Screen name="Zr" component={Zr} options={{title: '转让'}} />

          {/*更改名称*/}
          <Stack.Screen name="AlterName" component={AlterName} options={{title: '更改名字', headerRight: () => (<Button onPress={() => alert('修改成功')} title="保存" color="#999999"/>),}}/>
          {/* 课程订单*/}
          <Stack.Screen name="OrderParticular"component={OrderParticular} options={{title: '课程订单详情', headerRight: () => (<Button onPress={() => alert('This is a button!')} title="发送" color="#999"/>),}}/>
          {/*个人设置页*/}
          <Stack.Screen name="Set" component={Set} options={{title: '设 置'}} />
          <Stack.Screen name="Mymotto" component={Mymotto} options={{title: '个性签名',headerRight: () => (<Button onPress={() => alert('This is a button!')} title="发送" color="#999"/>),}}/>
          <Stack.Screen name="Preceipt" component={Preceipt} options={{title: '收货地址'}}/>
          <Stack.Screen name="AboutUs" component={AboutUs} options={{title: '关于我们'}}/>
          {/*<Stack.Screen name="Set" component={Set} options={{title: '设 置'}} />*/}
          <Stack.Screen name="Feedback" component={Feedback} options={{title: '意见反馈'}}/>
          <Stack.Screen name="CustomerService" component={CustomerService} options={{title: '客服中心'}}/>
          <Stack.Screen name="AccountPwd" component={AccountPwd} options={{title: '修改密码'}}/>
          <Stack.Screen name="AccountPhone" component={AccountPhone} options={{title: '更换手机号'}}/>
          <Stack.Screen name="AccountSecurity" component={AccountSecurity} options={{title: '账户安全'}}/>
          <Stack.Screen name="SetReminder" component={SetReminder} options={{title: '新消息提醒'}}/>
          <Stack.Screen name="Address" component={Address} options={{title: '编辑地址'}}/>
          <Stack.Screen name="Alice" component={Alice} options={{title: '个人资料'}}/>
          <Stack.Screen name="CitySelect" component={CitySelect} options={{title:''}}/>
          <Stack.Screen name="VenueDetails" component={VenueDetails} options={{title: '场馆详情', headerStyle: {backgroundColor: 'transparent '},}}/>
          <Stack.Screen name="BookingSpace" component={BookingSpace} options={{title: '订场预约'}}/>
          <Stack.Screen name="Confirmation" component={Confirmation} options={{title: '确认订单'}}/>
          <Stack.Screen name="CharterAgreement" component={CharterAgreement} options={{headerShown:false}}/>
          <Stack.Screen name="OrderDetails" component={OrderDetails} options={{title: '订单详情'}}/>
          <Stack.Screen name="OrderList" component={OrderList} options={{title: '订场订单'}}/>
          <Stack.Screen name="Wallet" component={Wallet} />
          {/*<Stack.Screen*/}
          {/*  name="Map"*/}
          {/*  component={Map}*/}
          {/*  options={{title: '位置信息'}}*/}
          {/*/>*/}
          <Stack.Screen name="AnimatedExample" component={AnimatedExample} options={{title: '位置信息'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
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
  i1: {
    marginLeft: px(20),
  },
});

export default App;
