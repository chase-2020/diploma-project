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

import {activity, venueAll} from "../src/apis/sdUser";

function Activity(props) {
    const { navigation } = props;

    const [count,setCount] = useState(0) // Tabs栏样式判断
    const [st,setSt] = useState([])  //场馆列表
    const [cg,setCg] = useState([])  //要渲染的活动列表
    const [cd,setCd] = useState('') //查询单个场馆
    const [cdd,setCdd] = useState('') //用来判断渲染哪个

    // 查询所有发布活动的场馆
    useEffect(()=>{
        stAll();
    },[])

    // 查询所有活动 或 查询单个场馆的所有的活动
    useEffect(()=>{
        doreg();
    },[cd])

    // 查询所有发布活动的场馆
    const stAll = async ()=>{
        try{
            const res = await venueAll({
            })
            setSt(res);
        } catch (e) {
            console.log(e)
        }
    }

    // 查询所有活动 或 查询单个场馆的所有的活动
    const doreg = async ()=>{
        try{
            const res = await activity({
                organizer: cd,
            })
            setCg(res);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.body}>
            <View style={styles.main}>
                <View style={styles.hd_top}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <Text onPress={()=> [setCd(''),setCdd(''),setCount(0)]} style={count === 0 ? (styles.tyItem) : (styles.tyItem1)} >全部场馆</Text>
                        { st.map((r,index)=>
                            <Text onPress={()=> [setCount(index+1),setCd(r),setCdd(r), {a: r}]} style={count === index+1 ? (styles.tyItem) : (styles.tyItem1)} key={index}>{r}</Text>
                        )}
                    </ScrollView>
                </View>
                    { cdd === cd ? ( <ScrollView>
                        { cg.map( (r,index)=>(
                            <View style={styles.cg} key={index}>
                                <TouchableOpacity onPress={()=>navigation.navigate("Activity_details",{a:r}) }>
                                    <View style={styles.cg_top}>
                                        <View style={styles.content}>
                                            <Text style={styles.ct_tx}>{r.type === '1' ?('个人活动'):('团体活动')}</Text>
                                            <Text style={styles.ct_tx1}>{r.theme}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cg_bottom}>
                                        <Text style={styles.cb_title}>{r.organizer}-{r.field}</Text>
                                        <Text style={styles.cbb_q}>活动时间:{r.startTime}-{r.endTime}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>) : null }
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        display:"flex",
        height: '100%',
        alignItems: 'center',
    },

    main: {
        flex: 1,
        width: px(690),
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
    },
    hd_top: {
        marginTop: px(30),
        height: px(80),
        flexDirection: 'row',
    },
    tyItem: {
        paddingLeft: px(37),
        paddingRight: px(44),
        lineHeight: px(80),
        backgroundColor: '#89724b',
        borderRadius: px(40),
        color: '#f9f9ea',
        fontSize: px(26),
        marginRight: px(20),
    },
    tyItem1: {
        paddingLeft: px(37),
        paddingRight: px(44),
        lineHeight: px(80),
        backgroundColor: '#fff',
        borderRadius: px(40),
        color: '#000',
        fontSize: px(26),
        marginRight: px(20),
    },
    // 活动
    cg: {
        width: px(690),
        marginTop: px(30),
    },
    cg_top: {
        width: px(690),
        height: px(420),
        backgroundColor: '#90ee90',
        borderTopLeftRadius: px(24),
        borderTopRightRadius: px(24),
        position: 'relative',
    },
    content: {
        width: px(600),
        position: 'absolute',
        left: px(24),
        bottom: px(34),
    },
    ct_tx: {
        paddingLeft: px(20),
        paddingRight: px(20),
        lineHeight: px(50),
        borderWidth: px(2),
        borderColor: '#fff',
        borderRadius: px(40),
        color: '#f9f9ea',
        fontSize: px(26),
        marginRight: px(20),
        position: 'absolute',
        bottom: px(70)
    },
    ct_tx1: {
        fontSize: px(38),
        color: '#fcfaf8',
        marginTop: px(28),
    },
    ct_tx2: {
        marginTop: px(28),
        flexDirection: 'row',
    },
    ct_logo: {
        flexDirection: 'row',
        marginRight: px(38),
    },
    lq: {
        color: '#fcfaf8',
        fontSize: px(24),
        lineHeight: px(46),
        marginLeft: px(14),
    },
    cg_bottom: {
        width: px(690),
        height: px(210),
        backgroundColor: '#fff',
        borderBottomLeftRadius: px(24),
        borderBottomRightRadius: px(24),
        paddingLeft: px(20),
    },
    cb_title: {
        width: px(642),
        marginTop: px(50),
        fontSize: px(30),
        fontWeight: 'bold',
    },
    cb_bottom: {
        width: px(642),
        height: px(78),
        marginTop: px(36),
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    cbb_q: {
        lineHeight: px(78),
        fontSize: px(26),
        color: '#000',
        fontWeight: 'bold',
    },
    ts: {
        color: '#000',
        fontWeight: 'normal',
        fontSize:px(26),
    },
    cbb_dc: {
        width: px(238),
        lineHeight: px(78),
        fontSize: px(28),
        backgroundColor: '#89724b',
        borderRadius: px(39),
        color: '#fff',
        textAlign: 'center',
    },

});

export default Activity;
