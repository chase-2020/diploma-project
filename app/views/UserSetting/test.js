/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {px} from '../utils/devices';
import IconFont from '../src/iconfont';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    ToastAndroid,
} from 'react-native';
import {  Dialog } from 'antd-mobile';

import {findOneAll} from "../../src/apis/sdUser";


function Confirmation(props) {

    const [type,setType] = useState([])  //运营商的类型

    // 查询当前运营商的信息
    const findOne = async ()=>{
        try{
            const res = await findOneAll({
                mid : id
            })
            setType(res)
            console.log('res',res)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        findOne()
    },[])

    return (
        <View style={styles.body}>
            { type?.map((r,index)=>
                <View style={styles.item3} key={index}>
                    <Text style={styles.hao}>{r.siteName}</Text>
                    <View style={styles.iTime}>
                        <Text style={styles.tx1}>{r.dateAt}</Text>
                        <Text style={styles.tx1}>{r.st}</Text>
                    </View>
                    <Text style={styles.tx1}>￥{r.fee}</Text>
                </View>
            ) }

        </View>
    );
}



export default Confirmation;
