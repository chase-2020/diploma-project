/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {px} from '../utils/devices';
import IconFont from '../src/iconfont';
import { MapView } from "react-native-amap3d";

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Button,
    Alert, Image,
} from 'react-native';
import { findAll,findOneAll } from "../src/apis/sdUser";

function VenueDetails(props) {
    const { route,navigation } = props;
    const { id } = route.params;  //id : 运营商编号

    const [ sitea,setSitea] = useState([]) //运营商信息
    const [ stList,setStList] = useState([]) //场馆列表
    const [ type,setType] = useState([]) //场馆类型

    useEffect(()=>{
        find();
        findOne()
    },[])

    const type_list = [
        {name:'篮球', icon:'56-lanqiu'},
        {name:'足球', icon:'soccer'},
        {name:'羽毛球', icon:'yumaoqiu'},
        {name:'网球', icon:'huwaiyundong'},
        {name:'乒乓球', icon:'pingpangqiuqiupaitiyuyundongxianxing'},
    ]

    // 获取场馆列表
    const find = async ()=>{
        try{
            const res = await findAll({
                mid: id
            })
            setStList(res);
            console.log('所有场馆',res)

        } catch (e) {
            console.log(e)
        }
    }

    const findOne = async ()=>{
        try{
            const res = await findOneAll({
                mid : id
            })
            const qtype = []
            type_list.forEach((r, index) => {

                if(res.type.includes(index + 1)){
                    qtype.push(
                        <View style={styles.type_item} key={index}>
                            <Text style={styles.ti_top}><IconFont name={r.icon} size={30} color={'#222'} /></Text>
                            <Text style={styles.ti_bottom}>{r.name}</Text>
                        </View>
                    );
                }
            })
            setType(qtype)
            setSitea(res)
            // console.log('我是运营商信息',res)

        } catch (e) {
            console.log(e)
        }

    }

    return (
        <View style={styles.body}>
            <MapView style={styles.dt}
                center={{
                    latitude: 39.91095,
                    longitude: 116.37296
                }}
            />
            <ScrollView>
            <View style={styles.main}>
                {/*头部区域*/}
                <View style={styles.top}>
                    <View style={styles.top_img}>
                        <Image style={styles.cg_top}  source={{ uri: sitea.pictureAddress,}}/>
                        <Text style={styles.ti_tx}>{sitea.name}</Text>
                    </View>
                    <View style={styles.top_btm}>
                        <View style={styles.bt_item}>
                            <Text style={styles.bt_tx}>{sitea.priceRange}<Text style={styles.bt_tx2}>/小时/场</Text></Text>
                            {/* <Text style={styles.bt_right}>场馆平面图</Text> */}
                        </View>
                        <View style={styles.bt_item}>
                            <Text onPress={ () => navigation.navigate("AnimatedExample")} style={styles.bt_tx11}>{sitea.operatorAddress}</Text>
                        </View>
                    </View>
                </View>

                {/*场馆列表*/}
                <View style={styles.list}>
                    <Text style={styles.list_title}>场馆列表</Text>
                    <View style={styles.list_bottom}>
                        { stList?.map((r,index)=>
                            <View style={styles.list_item} key={index}>
                                {/*<View style={styles.li_img}></View>*/}
                                <Image style={styles.li_img}  source={{ uri: r.coverPhoto,}}/>
                                <Text style={styles.li_tx}>{r.name}</Text>
                            </View>
                        ) }
                    </View>
                </View>

                {/*场馆类型*/}
                <View style={styles.type}>
                    <Text style={styles.type_title}>场馆类型</Text>
                    <View style={styles.type_bottom}>
                        { type?.map((r,index)=>(<View key={index}>{r}</View>)) }
                    </View>
                </View>

                {/*场馆介绍*/}
                <View style={styles.introduce}>
                    <Text style={styles.int_title}>场馆介绍</Text>
                    <Text style={styles.int_tx}>{sitea.operatorProfile}</Text>
                </View>
            </View>
            </ScrollView>

            <View style={styles.footer}>
               <Text onPress={()=>navigation.navigate("BookingSpace",{id:id}) }style={styles.ftr_tx}>我要订场</Text>
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
        width: px(750),
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        // marginTop: px(50),
    },
    top: {
        alignItems: 'center',
    },

    top_img: {
        width: px(750),
        // height: px(460),
        // height: px(310),
        backgroundColor: '#338ecd',
        position: 'relative',
    },
    cg_top: {
        width: px(750),
        height: px(420),
        backgroundColor: '#90ee90',
        borderTopLeftRadius: px(24),
        borderTopRightRadius: px(24),
        // position: 'relative',
    },
    ti_tx: {
        fontSize: px(40),
        color: '#fff',
        position: 'absolute',
        left: px(25),
        bottom: px(40),
    },
    top_btm: {
        width: px(690),
        paddingTop: px(40),
        borderBottomWidth: px(2),
        borderBottomColor: '#dadada',
    },
    bt_item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: px(40),
    },
    bt_tx: {
        fontSize: px(40),
        color: '#cc1108',
        fontWeight: 'bold',
    },
    bt_tx2: {
        fontSize: px(30),
        color: '#000',
        fontWeight: 'bold',
    },
    bt_right: {
        fontSize: px(30),
        marginTop: px(11),
    },
    bt_tx11: {
        color: '#000',
    },

    // 场馆列表
    list: {
        width: px(690),
        paddingTop: px(55),
        marginBottom: px(34),
    },
    list_title: {
        fontSize: px(36),
        color: '#000',
        fontWeight: 'bold',
    },
    list_bottom: {
        marginTop: px(30),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    list_item: {
        width: px(328),
        height: px(270),
    },
    li_img: {
        width: px(328),
        height: px(200),
        backgroundColor: '#e8e8e8',
        borderRadius: px(20),
    },
    li_tx: {
        lineHeight: px(70),
        fontSize: px(26),
        textAlign: 'center',
    },

    // 场馆类型
    type: {
        width: px(690),
        borderBottomWidth: px(2),
        borderBottomColor: '#dadada',
    },
    type_title: {
        fontSize: px(36),
        color: '#000',
        fontWeight: 'bold',
    },
    type_bottom: {
        flexDirection: 'row',
        paddingTop: px(50),
        paddingBottom: px(60),
    },
    type_item: {
        width: px(115),
        height: px(115),
        marginRight: px(22),
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    ti_top: {
        width: px(115),
        lineHeight: px(78),
        textAlign: 'center',
    },
    ti_bottom: {
        fontSize: px(22),
    },

    // 场馆介绍
    introduce: {
        width: px(690),
        paddingTop: px(55),

    },
    int_title: {
        fontSize: px(36),
        color: '#000',
        fontWeight: 'bold',
        marginBottom: px(32),
    },
    int_tx: {
        fontSize: px(30),
    },


    // 底部确认提交
    footer: {
        width: px(750),
        height: px(180),
        backgroundColor: '#fff',
        borderTopLeftRadius: px(30),
        borderTopRightRadius: px(30),
        paddingTop: px(36),
        alignItems: 'center',
    },
    ft_right: {
        width: px(240),
        height: px(80),
        backgroundColor: '#89724b',
        borderRadius: px(40),
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

export default VenueDetails;
