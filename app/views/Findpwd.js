/* eslint-disable */
import React, {useState} from 'react';
import {px} from '../utils/devices';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Button, 
    TextInput,
    Image
} from 'react-native';

import IconFont from "../src/iconfont";

import axios from 'axios'
import {yzmlogin, yzmreg} from "../src/apis/user";

function Findpwd({navigation}) {

    const [phone, setPhone] = React.useState(''); // 手机号
    const [yzm, setYzm] = React.useState('');   // 验证码


    // 身份验证
    const vcloger = async ()=>{
        try{
            const res = await yzmlogin({
                phone: phone,
                code: yzm,
            })
            console.log(res)
            const { success ,info} = res;
            if(success){
                navigation.navigate("Resetpwd",{phone:phone})
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
            const { info } = res;
            alert(info)
        } catch (e) {
            console.log(e)
        }
    }


    return(

        <View style={styles.body}>
            <Image resizeMode='stretch' source={require('../assets/img/logo.png')} style={styles.logo} />

            <View style={styles.bottom}>

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

                <Text style={styles.zc} onPress={ vcloger }>下一步</Text>
            </View>


        </View>

    );

}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#fff',
        alignItems: 'center',
        display:"flex",
        height:'100%',
    },
    logo:{
        marginTop:px(50),
        marginBottom:px(100),
        width:px(450),
        height:px(150)
    },
    t_tx: {
        lineHeight: px(150),
        width: px(690),
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: px(30),

    },

    bottom: {
        alignItems: 'center',
    },

    k: {
        width: px(630),
        borderWidth: px(2),
        marginBottom: px(30),
        flexDirection: 'row',
        alignItems: 'center',
    },

    shuru1: {
        width: px(440),
    },

    shuru: {
        width: px(630),
        borderWidth: px(2),
        marginBottom: px(30),
    },

    yzm: {
        height: px(60),
        width: px(160),
        backgroundColor: '#fccb12',
        borderColor:'#fccb12',
        borderWidth: px(1),
        borderRadius: px(20),
        alignItems: 'center',
    },
    yzm_tx: {
        lineHeight: px(60),
        color: '#fff',
    },


    zc: {
        width: px(650),
        textAlign: 'center',
        lineHeight: px(100),
        backgroundColor: '#fccb12',
        borderRadius: px(10),
    }


});

export default Findpwd;
