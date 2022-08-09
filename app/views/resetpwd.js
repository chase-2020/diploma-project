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
import {setpwd} from "../src/apis/user";

function Resetpwd({route,navigation}) {
    // const { phone } = route.params;
    const phone = 18377454360
    console.log(phone)

    const [pwd, setPwd] = React.useState('');  // 密码
    const [qrpwd, setQrpwd] = React.useState('');  // 密码


    const resetpwd = async ()=>{
        try{
            const res = await setpwd({
                passWord: pwd,
                passWord1: qrpwd,
                phone: phone,
            })
            console.log(res)
            const { success,info } = res;
            if(success) {
                navigation.navigate("Login")
            }else {
                alert(info)
            }
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
                    onChangeText={text => setPwd(text)}
                    value={pwd}
                    placeholder={'请设置新密码'}
                />

                <TextInput
                    style={styles.shuru}
                    onChangeText={text => setQrpwd(text)}
                    value={qrpwd}
                    placeholder={'请再次输入新密码'}
                />

                <Text style={styles.zc} onPress={resetpwd}>确定</Text>
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
        backgroundColor: '#1890ff',
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

export default Resetpwd;
