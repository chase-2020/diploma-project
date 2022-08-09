/* eslint-disable */
import React, {useState} from 'react';
import {px} from '../utils/devices';
import IconFont from '../src/iconfont';

import {NavigationContainer} from '@react-navigation/native'; // router
import {createStackNavigator} from '@react-navigation/stack'; // router
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Button,
    Alert,
} from 'react-native';
import axios from "axios";


function Footer({navigation}) {

    return (

        <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate("SY")}>
                <View>
                    <IconFont style={styles.g} name="shouye" size={30} color={'#8e8e8e'}/>
                    <Text style={styles.h}>首页</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Dingchang")}>
                <View>
                    <IconFont style={styles.g} name="dingchang" size={30} color={'#8e8e8e'}/>
                    <Text style={styles.h}>订场</Text>
                </View>
            </TouchableOpacity>
        <View>
            <IconFont style={styles.g} name="dingchang" size={30} color={'#8e8e8e'}/>
            <Text style={styles.h}>培训</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Activity")}>
        <View>
            <IconFont style={styles.g} name="huodong" size={30} color={'#8e8e8e'}/>
            <Text style={styles.h}>活动</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("My")}>
        <View>
            <IconFont style={styles.g} name="wode" size={30} color={'#8e8e8e'}/>
            <Text style={styles.h}>我的</Text>
        </View>
        </TouchableOpacity>
    </View>


    );
}

const styles = StyleSheet.create({
    footer: {
        width: px(750),
        height: px(100),
        backgroundColor: '#fff',
        marginTop: px(50),
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'space-around',
    },
    g: {
        lineHeight: px(65),
    },






});

export default Footer;
