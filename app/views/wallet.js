/* eslint-disable */
import React, {useState} from 'react';
import {px} from '../utils/devices';
import IconFont from '../src/iconfont';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';

function OrderDetails() {
    const [value, onChangeText] = React.useState('Useless Placeholder');
    // var leftText = data.name;
    // const [kuang,setKuang] = useState(true)

  return (
        <View style={styles.body}>
            <View style={styles.top}>
                <IconFont name="zuojiantou" size={20} style={styles.i1} />
                <Text style={styles.top1}>余额</Text>
            </View>

            <View style={styles.main}>
                    <Text style={styles.wallet}>钱包余额</Text>
                    <View style={styles.money}>
                        <View style={styles.mContent}>
                            <Text style={styles.zje}>总金额（元）</Text>
                            <View style={styles.zye}>
                                <Text style={styles.wd}>520.</Text>
                                <Text style={styles.wx}>00</Text>
                            </View>
                            <View style={styles.feilei}>
                                <View style={styles.fItem}>
                                    <Text style={styles.fx}>0.00</Text>
                                    <Text style={styles.ftx}>冻结金额</Text>
                                </View>
                                <View style={styles.fItem}>
                                    <Text style={styles.fx}>0.00</Text>
                                    <Text style={styles.ftx}>赠额</Text>
                                </View>
                                <View style={styles.fItem}>
                                    <Text style={styles.fx}>0.00</Text>
                                    <Text style={styles.ftx}>本金</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            <ScrollView style={styles.sv}>
                <View style={styles.footer}>
                    <View style={styles.fTop}>
                        <Text>消费记录</Text>
                        <View style={styles.ftRight}>
                            <Text style={styles.zhichu}>支出: ￥0.00</Text>
                            <Text style={styles.shouru}>收入: ￥0.00</Text>
                        </View>
                    </View>
                    <View style={styles.zhangdan}><Text style={styles.zd}>暂无账单信息</Text></View>
                </View>
            </ScrollView>

        </View>
  );
}

const styles = StyleSheet.create({
    body: {
        display:"flex",
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    top: {
        width: px(750),
        height: px(96),
        backgroundColor: '#fff',
        position: 'relative',
    },
    i1: {
        position: 'absolute',
        top: px(30),
        left: px(30),
    },
    top1: {
        lineHeight: px(96),
        textAlign: 'center',
        color: '#000',
        fontSize: px(36),
        fontWeight: "bold",
        // fontWeight: "900",
    },
    main: {
        width: px(750),
        height: px(385),
        alignItems: 'center',
    },
    wallet: {
        width: px(690),
        lineHeight: px(80),
        fontSize: px(30),
    },
    money: {
        width: px(690),
        height: px(305),
        backgroundColor: '#56524a',
        borderRadius: px(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    mContent: {
        width: px(622),
        height: px(238),
    },
    zje: {
        fontSize: px(26),
        color: '#b8b7b0',
    },
    zye: {
        height: px(120),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    wd: {
        fontSize: px(42),
        color: '#fefefe',
    },
    wx: {
        fontSize: px(30),
        color: '#fefefe',
        marginTop: px(10),
    },
    feilei: {
        height: px(78),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    fItem: {
        justifyContent: 'space-between',
    },
    fx: {
        fontSize: px(30),
        color: '#fefefe',
    },
    ftx: {
        fontSize: px(26),
        color: '#b8b7b0',
    },
    sv: {
        display: 'flex',
        flex: 1,
    },
    footer: {
        width: px(690),
        marginTop: px(80),
        marginBottom: px(10),
    },
    fTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ftRight: {
        flexDirection: 'row',
    },
    zhichu: {
        fontSize: px(24),
        color: '#b8b7b0',
    },
    shouru: {
        fontSize: px(24),
        color: '#b8b7b0',
        marginLeft: px(32),
    },
    zhangdan: {
        width:px(690),
        height: px(690),
        alignItems: 'center',
        justifyContent: 'center',
    },
    zd: {
        fontSize: px(50),
        color: '#b8b7b0',
    },

});

export default OrderDetails;
