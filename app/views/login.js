/* eslint-disable */
import React, {useState} from 'react';
import {px} from '../utils/devices';
    //useSelector 获取redux的状态
    //useDispatch 用来触发修改state的函数
import { useSelector, useDispatch } from 'react-redux'
import { setUserInfo } from '../store/userStore'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity, 
    TextInput,
    ImageBackground
} from 'react-native';
import {
    Button,
    Modal,
    WhiteSpace,
    WingBlank,
    Toast,
    Provider,
} from '@ant-design/react-native';
import IconFont from "../src/iconfont";
import axios from 'axios'

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import {login, yzmlogin, yzmreg} from "../src/apis/user";
import { transformSync } from '@babel/core';

function Login({navigation}) {

    const storage = new Storage({

        size: 1000,
        storageBackend: AsyncStorage,

        defaultExpires: 1000 * 3600 * 24,


    });

    const [st, setSt] = React.useState(false);  // 账号密码登录对话框
    const [stb, setStb] = React.useState(false); // 快捷登录对话框
    const [phone, setPhone] = React.useState(''); // 手机号
    const [pwd, setPwd] = React.useState('');  // 密码
    const [yzm, setYzm] = React.useState('');   // 验证码
    const dispatch = useDispatch()  // store触发器


    // 账号密码登录
    // 注意这个方法前面有async关键字
    const doreg = async ()=>{
        try{
            const res = await login({
                phone: phone,
                passWord: pwd,
            })
            const { success ,info,one} = res;
            if(success){
                Toast.info(info);
                dispatch(setUserInfo(one))
                navigation.navigate('My')
                    setSt(false)
                    setPhone('')
                    setPwd('')
            }else {
                Toast.info(info, 1, undefined, false);
            }
        } catch (e) {
            console.log(e)
        }

    }

    // 验证码登录
    const vcloger = async ()=>{
        try{
            const res = await yzmlogin({
                phone: phone,
                code: yzm,
            })
            const { success ,info,one} = res;
            if(success){
                // 保存电话、
                dispatch(setUserInfo(one))
                Toast.success(info, 1, undefined, false);
                navigation.navigate("My")
                setStb(false)
                setPhone('')
                setYzm('')
            }else {
                alert(info)
            }
        } catch (e) {
            console.log(e)
        }
    }

    // 请求验证码接口
    const yzmreg1 = async ()=>{
        
        try{
            const res = await yzmreg({
                phone: phone,
            })
            console.log(res)
            const { info,success } = res;
            if(success){
                Toast.loading('验证码发送中', 1);
            }else{
                Toast.info(info, 1);
            }
            
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <ImageBackground style={styles.image}
          source={require('../assets/img/login.jpg')}>
        <View style={styles.body}>
            <View style={styles.top}>
                <Text style={styles.t_tx1}>登陆后更精彩</Text>
                <Text style={styles.t_tx2}>快带上你的小伙伴们一起运动吧！</Text>
            </View>


            <View style={styles.bottom}>
                <Button style={styles.wx} onPress={()=> {setStb(true)}}>
                    手机号登录
                </Button>
                <Button style={[styles.wx,styles.sjh]} onPress={()=> {setSt(true)}}>
                    账号登录
                </Button>

                <View style={styles.zc}>
                    <Text onPress={()=>navigation.navigate("Findpwd") } style={styles.zc_tx}>找回密码</Text>
                    <Text onPress={()=>navigation.navigate("Register") } style={styles.zc_tx}>立即注册</Text>
                </View>

            </View>

            {/*快捷登录对话框 start*/}
            <Modal
                visible={stb}
                popup
                animationType="slide-up"
                style={styles.dhk}
            >
                <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>

                    <TextInput
                        style={styles.shuru}
                        onChangeText={text => setPhone(text)}
                        value={phone}
                        placeholder={'请输入您的手机号'}
                    />

                    <View style={styles.k}>
                        <TextInput
                            style={styles.shuru1}
                            onChangeText={text => setYzm(text)}
                            value={yzm}
                            placeholder={'请输入验证码'}
                        />
                        <TouchableOpacity onPress={yzmreg1}>
                            <View style={styles.yzm}>
                                <Text style={styles.yzm_tx}>获取验证码</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.dhk_bottom}>
                    <Button style={styles.dhk_but} type="primary" onPress={()=>[setStb(false),setPhone('')
                    ,setPwd('')]} >
                        返回
                    </Button>
                    <Button style={styles.dhk_but} type="primary" onPress={vcloger} >
                        登录
                    </Button>
                </View>
            </Modal>

            {/*快捷登录对话框 end*/}

            {/*密码登录对话框 start*/}
            <Modal
                visible={st}
                popup
                animationType="slide-up"
                style={styles.dhk}
            >
                <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>

                    <TextInput
                        style={styles.shuru}
                        onChangeText={text => setPhone(text)}
                        value={phone}
                        placeholder={'请输入您的账号'}
                        keyboardType={'numeric'}
                    />

                    <TextInput
                        style={styles.shuru}
                        onChangeText={text => setPwd(text)}
                        value={pwd}
                        placeholder={'输入密码'}
                    />

                </View>
                <View style={styles.dhk_bottom}>
                    <Button style={styles.dhk_but} type="primary" onPress={()=>setSt(false)} >
                        返回
                    </Button>
                    <Button style={styles.dhk_but} type="primary" onPress={doreg} >
                        登录
                    </Button>
                </View>
            </Modal>

            {/*密码登录对话框 end*/}

        </View>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    image:{
        // resizeMode: "cover",
        width:px(750),
        height:'100%'
        
    },
    body: {
        // backgroundColor: '#f9f9f9',
        alignItems: 'center',
        display:"flex",
        height:'100%',
        // backgroundImage: URL()
    },

    top: {
        width: px(690),
        textAlign: 'center',
        marginTop: px(56),
        marginLeft:px(20)
    },
    t_tx1:{
        fontWeight: 'bold',
        fontSize: px(60),
        color:'#fff',
        marginBottom:px(30),
    },
    t_tx2:{
        fontSize: px(30),
        color:'#fff',
    },
    bottom: {
        position:'absolute',
        bottom:px(90)
    },

    wx: {
        width: px(530),
        height: px(100),
        backgroundColor: '#fccb12',
        borderRadius: px(50),
        alignItems: 'center',
        marginBottom: px(40),
        borderColor: '#fccb12',
    },


    sjh: {
        backgroundColor: '#fff',
        borderWidth: px(2),
        borderColor: '#fff',
    },
    sjh_tx: {
        color: '#000',
        lineHeight: px(100),
    },

    zc: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    zc_tx: {
        width: px(250),
        textAlign: 'center',
        fontWeight: 'bold',
        color:'#fff'
    },

    // 对话框
    dhk: {
        height: px(560),
        alignItems: 'center',
    },

    k: {
        width: px(560),
        borderWidth: px(2),
        marginBottom: px(30),
        borderRadius: px(20),
        flexDirection: 'row',
        alignItems: 'center',
    },

    shuru: {
        width: px(560),
        borderWidth: px(2),
        marginBottom: px(30),
        borderRadius: px(20),
    },
    shuru1: {
        width: px(380),
    },
    yzm: {
        height: px(60),
        width: px(160),
        backgroundColor: '#fccb12',
        borderRadius: px(20),
        alignItems: 'center',
    },
    yzm_tx: {
        
        lineHeight: px(60),
        color: '#fff',
    },

    dhk_bottom: {
        width: px(560),
        marginLeft: px(40),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    dhk_but: {
        width: px(200),
        backgroundColor: '#fccb12',
        borderWidth: px(1),
        borderColor: 'transparent',
    },


});

export default   Login;
