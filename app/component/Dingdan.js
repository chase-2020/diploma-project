/* eslint-disable */
import React from 'react';
import {px} from '../utils/devices';
import {StyleSheet, Text, View} from 'react-native';



function Dingdan({a}) {
    return (
            <View style={styles.didan} >
                <View style={styles.dtop}>
                    <Text style={styles.qiuc}>{a}</Text>
                    <Text style={styles.zt}>待支付</Text>
                </View>
                <Text style={styles.dtype}>篮球-半场</Text>
                <View>
                    <View style={styles.changci}>
                        <Text>A1</Text>
                        <Text style={styles.dtx}>2021.08.01 09:00-10:00</Text>
                        <Text style={styles.dtx}>￥50.00</Text>
                    </View>
                    <View style={styles.changci}>
                        <Text>A2</Text>
                        <Text style={styles.dtx}>2021.08.01 09:00-10:00</Text>
                        <Text style={styles.dtx}>￥50.00</Text>
                    </View>
                </View>
                <View style={styles.jiage}>
                    <Text>总价 ￥300 优惠 ￥0.00</Text>
                    {/*<View style={styles.je}>*/}
                    {/*    <Text style={styles.je1}>总计金额</Text>*/}
                    {/*    <Text style={styles.je2}> ￥100.00</Text>*/}
                    {/*</View>*/}
                    <Text>实付款 <Text>￥300.00</Text></Text>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    didan: {
        width: px(690),
        marginTop: px(30),
        paddingTop: px(35),
        paddingRight: px(30),
        paddingLeft: px(30),
        paddingBottom: px(65),
        borderRadius: px(10),
        backgroundColor: '#fff',

    },
    qiuc: {
        fontSize: px(34),
        fontWeight: "bold",
    },
    zt: {
        fontSize: px(30),
        color: "#bf1918",
        fontWeight: "bold",
    },
    dtop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dtype: {
        marginTop: px(40),
        fontSize: px(26),
        marginBottom: px(30),
    },
    changci: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dtx: {
        color: '#7b7b7b',
    },
    jiage: {
        height: px(148),
        width: px(630),
        marginTop: px(36),
        // paddingTop: px(60),
        borderTopWidth: px(1),
        borderTopColor: "#e3e3e3",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    je: {

        display: 'flex',
        flexDirection: 'row',
    },
    je1: {
        lineHeight: px(76),
        fontSize: px(30),
        marginTop: px(4),
    },
    je2: {
        lineHeight: px(76),
        fontSize: px(45),
        color: '#cc1108',
    },
});

export default Dingdan;
