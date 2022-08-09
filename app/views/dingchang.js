/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {px} from '../utils/devices';
import IconFont from "../src/iconfont";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Button,
    Image
} from 'react-native';

import { SearchBar } from '@ant-design/react-native';

import { redAll } from "../src/apis/sdUser";


function Dingchang(props) {
    const { route,navigation } = props;
    const { kType } = route.params;

    const [cg,setCg] = useState([])  //渲染全部场馆
    const [type,setType] = useState([])  //场馆的类型

    const typeList = [
            {name:'篮球', icon:'56-lanqiu'},
            {name:'足球', icon:'soccer'},
            {name:'羽毛球', icon:'yumaoqiu'},
            {name:'网球', icon:'huwaiyundong'},
            {name:'乒乓球', icon:'pingpangqiuqiupaitiyuyundongxianxing'},
    ]
    // 查询全部场馆
    useEffect(()=>{
        venue()
    },[])

    // 获取运营商列表
    const venue = async ()=>{
        try {
            const res = await redAll({
                type:kType
            })
            setCg(res);
            const ty = []
            for(var item of res) {
                const atype = []
                typeList.forEach((r, index) => {
                    if (item.type.includes(index + 1)) {
                        atype.push(
                            {name: r.name, icon: r.icon},
                        );
                    }
                })
                ty.push(atype)
            }
            setType(ty)

        } catch (e) {
            console.log(e)
        }

    }

    return (

        <View style={styles.body}>
            {/* <View style={styles.top}>
                <View style={styles.sous}>
                    <SearchBar defaultValue="初始值" placeholder="搜索" />
                </View>

            </View> */}

            <ScrollView>
                { cg.map( (r,index)=>(
                    <View style={styles.cg} key={index}>
                        <View style={styles.cg_top}>
                            <Image style={styles.cg_top}  source={{ uri: r.pictureAddress,}}/>
                            <View style={styles.content}>
                                {/*场馆名*/}
                                <Text style={styles.ct_tx1}>{r.name}</Text>
                                {/*场馆类型*/}
                                <View style={styles.ct_tx2}>
                                    {  type[index] ? type[index].map((r,index)=>
                                        <View style={styles.ct_logo} key={index}>
                                            <IconFont name={r.icon} size={26} color={'#fcfaf8'}/>
                                            <Text style={styles.lq}>{r.name}</Text>
                                        </View>
                                    ) : null}
                                </View>
                            </View>
                        </View>
                        <View style={styles.cg_bottom}>
                            <Text style={styles.cb_title}>{r.operatorAddress}</Text>
                            <View style={styles.cb_bottom}>
                                <Text style={styles.cbb_q}>{r.priceRange}<Text style={styles.ts}>/小时/场</Text></Text>
                                <Text onPress={ () => navigation.navigate("VenueDetails",{id:r.mid})} style={styles.cbb_dc}>我要订场</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    body : {
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        display:"flex",
        height:'100%',
    },
    sous : {
        width: px(500)
    },
    cg: {
        width: px(690),
        marginTop: px(30),
        marginBottom: px(30),

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
        position: 'absolute',
        left: px(24),
        bottom: px(34),
    },
    ct_tx1: {
        fontSize: px(44),
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
        height: px(238),
        backgroundColor: '#fff',
        borderBottomLeftRadius: px(24),
        borderBottomRightRadius: px(24),
        alignItems: 'center',
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
        justifyContent: 'space-between',
    },
    cbb_q: {
        lineHeight: px(78),
        fontSize: px(35),
        color: '#cc1108',
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

export default Dingchang;
