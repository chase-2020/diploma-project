/* eslint-disable */
import React, {useState,useEffect} from 'react';
import {px} from '../utils/devices';
import IconFont from '../src/iconfont';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Footer from "../component/Footer";
import axios from 'axios';
import{request}from'@uni/apis';



function Activity_details(props) {
    const { route,navigation } = props;
    const { a } = route.params;
    console.log(a)

    return (
        <View style={styles.body}>

            <View style={styles.main}>
                <View style={styles.img}></View>
                <View style={styles.message}>
                    <View style={styles.ms_top}>
                        <Text style={styles.type}>{a.type === '1' ?('个人活动'):('团体活动')}</Text>
                        <Text style={styles.zhuti}>{a.theme}</Text>
                    </View>
                    <Text style={styles.xingzhi}> 公益活动</Text>
                    <View style={styles.item}>
                        <Text style={styles.it_tx}>活动场馆：</Text>
                        <Text style={styles.it_tx1}>{a.organizer}-{a.field}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.it_tx}>活动时间：</Text>
                        <Text style={styles.it_tx1}>{a.startTime}-{a.endTime}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.it_tx}>报名时间：</Text>
                        <Text style={styles.it_tx1}>随时</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.it_tx}>活动人数：</Text>
                        <Text style={styles.it_tx1}>{a.quota}</Text>
                    </View>
                </View>
                <View style={styles.introduce}>
                    <Text style={styles.it_tx}>活动场馆：</Text>
                    <Text style={styles.in_tx}>本次活动最大的特点就是免费！！！</Text>
                    <Text style={styles.in_tx}>本次活动最大的特点就是免费！！！</Text>
                    <Text style={styles.in_tx}>本次活动最大的特点就是免费！！！</Text>
                </View>
            </View>


            {/*底部*/}
            <View style={styles.footer}>
                <Text onPress={()=>console.log('123') }style={styles.ftr_tx}>我要报名</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        display:"flex",
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#e5e5e5',
    },


    main: {
        flex: 1,
        width: px(690),
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: px(30),
        borderRadius: px(14),

    },
    img: {
        height: px(420),
        width: px(690),
        backgroundColor: '#79a6d6',
        borderRadius: px(14),
    },
    message: {
        width: px(650),
        height: px(400),
        borderBottomWidth: px(2),
    },
    ms_top: {
        marginTop: px(25),
        flexDirection: 'row',
    },
    type: {
        lineHeight: px(45),
        paddingLeft: px(20),
        paddingRight: px(20),
        backgroundColor: '#eee',
        borderRadius: px(20),
        marginRight: px(12),
    },
    zhuti: {
        lineHeight: px(45),
        fontSize: px(32),
        fontWeight: "bold",
    },
    xingzhi: {
        fontSize: px(36),
        marginTop: px(30),
        marginBottom: px(46),
        color: '#d01c1e',
        fontWeight: 'bold',
    },
    item: {
        flexDirection: 'row',
        marginBottom: px(15),
    },
    it_tx: {
        fontSize: px(26),
        fontWeight: 'bold',
    },
    it_tx1: {
        fontSize: px(26),
        color: '#666',
    },

    // 活动介绍
    introduce: {
        width: px(650),
        paddingTop: px(30),
    },
    in_tx: {
        marginTop: px(25),
        fontSize: px(30),
    },



    // 底部确认提交
    footer: {
        width: px(750),
        height: px(180),
        backgroundColor: '#fff',
        borderTopLeftRadius: px(30),
        borderTopRightRadius: px(30),
        marginTop: px(15),
        paddingTop: px(36),
        alignItems: 'center',
    },

    ftr_tx: {
        width: px(690),
        lineHeight: px(80),
        fontSize: px(30),
        backgroundColor: '#89724b',
        borderRadius: px(40),
        color: '#fff',
        textAlign: 'center',
    },



});

export default Activity_details;
