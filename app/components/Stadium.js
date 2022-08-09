/* eslint-disable */
import React from 'react';
import {px} from '../utils/devices';
import {StyleSheet, Text, View} from 'react-native';
import IconFont from "../src/iconfont";


function Stadium({navigation,url}) {
    return (

        <View style={styles.cg}>
            <View style={styles.cg_top}>
                <View style={styles.content}>
                    <Text style={styles.ct_tx1}>徐家汇体育公园</Text>
                    <View style={styles.ct_tx2}>
                        <View style={styles.ct_logo}>
                            <IconFont name="56-lanqiu" size={26} color={'#fcfaf8'} />
                            <Text style={styles.lq}>篮球</Text>
                        </View>
                        <View style={styles.ct_logo}>
                            <IconFont name="soccer" size={26} color={'#fcfaf8'} />
                            <Text style={styles.lq}>足球</Text>
                        </View>
                        <View style={styles.ct_logo}>
                            <IconFont name="yumaoqiu" size={26} color={'#fcfaf8'} />
                            <Text style={styles.lq}>羽毛球</Text>
                        </View>
                        <View style={styles.ct_logo}>
                            <IconFont name="huwaiyundong" size={26} color={'#fcfaf8'} />
                            <Text style={styles.lq}>网球</Text>
                        </View>

                    </View>
                </View>
            </View>
            <View style={styles.cg_bottom}>
                <Text style={styles.cb_title}>上海市徐汇区零陵路800号</Text>
                <View style={styles.cb_bottom}>
                    <Text style={styles.cbb_q}>￥50-500</Text>
                    <Text onPress={()=>navigation.navigate("VenueDetails")} style={styles.cbb_dc}>我要订场</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        borderWidth: px(1),
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
    cbb_dc: {
        width: px(238),
        lineHeight: px(78),
        fontSize: px(28),
        backgroundColor: '#89724b',
        borderRadius: px(39),
        color: '#fff',
        textAlign: 'center',
    }

});

export default Stadium;
