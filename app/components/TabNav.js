/* eslint-disable */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Confirmation from './views/confirmation'; // 确认订单
import OrderDetails from './views/orderDetails'; // 订单详情
import Wallet from './views/wallet'; //钱包
import BookingSpace from './views/bookingSpace'; // 订场预约
import VenueDetails from './views/venueDetails'; // 场馆详情
import Dingchang from './views/dingchang';
import IconFont from "./src/iconfont";
import OrderList from "./views/orderList";
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Navigation({colorScheme}) {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    if (route.name === 'Dingchang') {
                        return <AntDesign name="Dingchang" size={size} color={color} />;
                    } else if (route.name === 'Confirmation') {
                        return <AntDesign name="Confirmation" size={size} color={color} />;
                    } else if (route.name === 'VenueDetails') {
                        return <AntDesign name="VenueDetails" size={size} color={color} />;
                    } else if (route.name === 'Wallet') {
                        return <AntDesign name="Wallet" size={size} color={color} />;
                    }
                },
            })}>
            <Tab.Screen
                name="Dingchang"
                component={Dingchang}
                options={{title: '首页', headerMode: 'none'}}
            />
            <Tab.Screen
                name="Confirmation"
                component={Confirmation}
                options={{title: '校园'}}
            />
            <Tab.Screen
                name="VenueDetails"
                component={VenueDetails}
                options={{title: '消息'}}
            />

            <Tab.Screen
                name="Wallet"
                component={Wallet}
                options={{title: '设置'}}
            />
        </Tab.Navigator>
    );
}
const Tab = createBottomTabNavigator();
const TabStack = createStackNavigator();

function Confirmation() {
    return (
        <TabStack.Navigator>
            <TabStack.Screen
                name="Confirmation"
                component={Confirmation}
                options={{
                    headerTitle: '校园',
                    headerLeft: null,
                    headerTitleAlign: 'center',
                }}
            />
        </TabStack.Navigator>
    );
}

function VenueDetails() {
    return (
        <TabStack.Navigator>
            <TabStack.Screen
                name="VenueDetails"
                component={VenueDetails}
                options={{
                    headerTitle: '消息',
                    headerLeft: null,
                    headerTitleAlign: 'center',
                }}
            />
        </TabStack.Navigator>
    );
}

function Wallet() {
    return (
        <TabStack.Navigator>
            <TabStack.Screen
                name="Wallet"
                component={Wallet}
                options={{
                    headerTitle: '我是设置标题',
                    headerLeft: null,
                    headerTitleAlign: 'center',
                }}
            />
        </TabStack.Navigator>
    );
}

