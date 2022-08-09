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
    Image,
    TextInput, 
    ToastAndroid,
} from 'react-native';

import IconFont from "../src/iconfont";

import axios from 'axios'
import {register, yzmreg} from "../src/apis/user"

function Register({navigation}) {

    const [phone, setPhone] = React.useState(''); // 手机号
    const [pwd, setPwd] = React.useState('');  // 密码
    const [yzm, setYzm] = React.useState('');   // 验证码
    const [gou,setGou] = useState(0) // 协议

    const register1 = async ()=>{
        try{
            const res = await register({
                passWord: pwd,
                phone: phone,
                code: yzm,
            })
            console.log(res)
            const { info,success } = res;
            if(success){
                alert(info)
                navigation.navigate("Login")
                setPhone('')
                setPwd('')
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

                <TextInput
                    style={styles.shuru}
                    onChangeText={text => setPwd(text)}
                    value={pwd}
                    placeholder={'设置6-16位字母、数字密码'}
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

                <View style={styles.xieyi}>
                    <View style={styles.dxk}>
                        {gou === 0 ? (
                            <TouchableOpacity  onPress={()=> setGou(1)}>
                                <IconFont name="gou" size={20} color={'#FFF'} />
                            </TouchableOpacity>
                        ):(<TouchableOpacity  onPress={()=> setGou(0)}>
                            <IconFont name="gou"  size={20} color={'#000'}/>
                        </TouchableOpacity> )}
                    </View>
                    <Text>已阅读并同意服务协议</Text>
                </View>

                <Text style={styles.zc} onPress={()=>( gou===1 ? (register1()):(ToastAndroid.show('请先阅读并勾选同意《服务协议》',ToastAndroid.SHORT)))}>注册</Text>
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
        borderWidth: px(1),
        borderRadius: px(20),
        borderColor:'#fccb12',
        alignItems: 'center',
    },
    yzm_tx: {
        lineHeight: px(60),
        color: '#fff',
    },

    xieyi: {
        width: px(690),
        height: px(135),
        paddingTop: px(15),
        flexDirection: 'row',
        alignItems: 'center',
    },
    dxk: {
        width: px(40),
        height: px(40),
        borderWidth: px(2),
        borderColor: '#e8e8e8',
        marginRight: px(18),
        marginLeft: px(30),
    },


    zc: {
        width: px(650),
        textAlign: 'center',
        lineHeight: px(100),
        backgroundColor: '#fccb12',
        borderRadius: px(10),
    }


});

export default Register;
