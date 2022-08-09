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

import {
    Button,
    Modal,
} from '@ant-design/react-native';

import { StackActions,NavigationActions } from 'react-navigation'
import {findOrder,findSite} from "../src/apis/user";

function Confirmation(props) {
    const { route,navigation } = props;
    const { orderInfo} = route.params;
    const [order,setOrder] = useState('') //订单信息
    const [site,setSite] = useState([]) //订单场地信息
    const [value, onChangeText] = React.useState('龙且');
    const [value1, onChangeText1] = React.useState('10086');
    const [visible, setVisible] = useState(false) //退款规则对话框

    const [gou,setGou] = useState(0)



    useEffect(()=>{
        Order()
        siteOrder()
    },[])

    // 用户单个订单查询
    const Order = async ()=>{
        try{
            const res = await findOrder({
                orderNum:orderInfo,
            })
            console.log('res555',res.date)

            const { success,data } = res;
            onChangeText(data.name)
            onChangeText1(data.phone)
            setOrder(data)
        } catch(e){
            console.log(e)
        }
    }

    // 查询用户预约的场地记录
    const siteOrder = async ()=>{
        try{
            const res = await findSite({
                orderNum:orderInfo,
            })
            console.log('我是场地信息8887',res)

            setSite(res)
        } catch(e){
            console.log(e)
        }
    }

    // 场馆类型判断
    const fruitColor = new Map()
        .set('1','篮球')
        .set('2', '足球')
        .set('3','羽毛球')
        .set('4','网球')
        .set('5','乒乓球')

    function printFruits() {
        console.log(fruitColor.get(order.courtType) || [])
        return fruitColor.get(order.courtType) || [];
    }

  return (
        <View style={styles.body}>
            <ScrollView >
            <View style={styles.main}>

                <Text style={styles.title1}>包场人信息</Text>
                <View style={styles.item1}>
                    <View style={styles.xm}>
                        <Text style={styles.xtx}>姓</Text>
                        <Text style={styles.xtx}>名</Text>
                    </View>
                    <View style={styles.icontent}>
                        <TextInput
                            style={styles.shuru}
                            onChangeText={text => onChangeText(text)}
                            value={value}
                        />
                    </View>
                </View>
                <View style={styles.item1}>
                    <View style={styles.xm}>
                        <Text style={styles.xtx}>手</Text>
                        <Text style={styles.xtx}>机</Text>
                        <Text style={styles.xtx}>号</Text>
                    </View>
                    <View style={styles.icontent}>
                        <TextInput
                            style={styles.shuru}
                            onChangeText={text => onChangeText1(text)}
                            value={value1}
                        />
                    </View>
                </View>

                {/*场地信息*/}
                <View style={styles.site}>
                    <Text style={styles.stitle}>场地信息</Text>
                    <Text style={styles.item2}>场馆:{order.mbName}-{order.courtName}</Text>
                    <Text style={styles.item2}>地址:{order.mbAddr}</Text>
                </View>

                {/*场馆类型*/}
                <View style={styles.type1}>
                    <View style={styles.title2}>
                        <Text style={styles.txLeft}>场馆类型： {printFruits()}</Text>
                        <Text style={styles.txLeft}>场馆类型： 篮球</Text>
                    </View>
                    { site?.map((r,index)=>
                        <View style={styles.item3} key={index}>
                            <Text style={styles.hao}>{r.sid}</Text>
                            <View style={styles.iTime}>
                                <Text style={styles.tx1}>{r.date}</Text>
                                <Text style={styles.tx1}>{r.startIndex}</Text>
                            </View>
                            <Text style={styles.tx1}>￥{r.price}</Text>
                        </View>
                    ) }


                </View>

                <View style={styles.jiage}>
                    <View style={styles.jg}>
                        <Text>总价</Text>
                        <Text>￥ {order.money}.00</Text>
                    </View>
                    <View style={styles.jg}>
                        <Text>优惠券</Text>
                        <Text style={styles.wukeyong}>无可用优惠券</Text>
                        <IconFont name="youjiantou"  style={styles.i2}/>
                    </View>
                    <View style={styles.tips}>
                        <IconFont name="tishi" size={18} color={'#cc1108'} />
                        <Text>提前24小时可退款，查看<Text style={styles.tuikuan} onPress={() => setVisible(true)}>退款规则</Text></Text>
                    </View>

                </View>
                <Modal
                    title="退款规则"
                    transparent
                    onClose={() => setVisible(false)}
                    visible={visible}
                >
                    <View style={{ paddingVertical: 20 }}>
                        <Text style={{ textAlign: 'center' }}>除天气原因及不可抗力影响，订单生效前24小时内不做退款处理</Text>
                    </View>
                    <Button type="primary" onPress={() => setVisible(false)}>
                        确认
                    </Button>
                </Modal>
            </View>
            </ScrollView>

            {/*底部价格确认*/}
            <View style={styles.footer}>
                <View style={styles.xieyi}>
                    <View style={styles.dxk}>
                    {gou === 0 ? (
                        <TouchableOpacity  onPress={()=> setGou(1)}>
                                <IconFont name="gou" size={15} color={'#FFF'} />
                        </TouchableOpacity>
                    ):(<TouchableOpacity  onPress={()=> setGou(0)}>
                            <IconFont name="gou"  size={15} color={'#000'}/>
                    </TouchableOpacity> )}
                    </View>
                    <Text>您已认真阅读并同意<Text style={styles.tuikuan} onPress={() => navigation.navigate("CharterAgreement")}>包场协议</Text></Text>
                </View>
                <View style={styles.zongji}>
                    <View style={styles.je}>
                        <Text style={styles.je1}>总计金额</Text>
                        <Text style={styles.je2}> ￥{order.money}.00</Text>
                    </View>

                    <TouchableHighlight  style={styles.but} onPress={()=>{
                       
                        ( gou===1 ? (navigation.navigate("OrderDetails",{id:orderInfo})):(ToastAndroid.show('请先阅读并勾选同意《包场协议》',ToastAndroid.SHORT)))
                        
                    }}>
                        <Text style={styles.zhifu}>确认提交</Text>
                    </TouchableHighlight>
                    {/*<TouchableHighlight*/}
                    {/*    style={styles.button}*/}
                    {/*    underlayColor="#a5a5a5"*/}
                    {/*    onPress={()=>}>*/}
                    {/*    <Text style={styles.buttonText}>长时间toast</Text>*/}
                    {/*</TouchableHighlight>*/}

                </View>
            </View>
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

    main: {
        flex: 1,
        width: px(750),
        // borderWidth: px(1),
        paddingTop: px(25),
        alignItems: 'center',
    },
    title1: {
        width: px(690),
        fontSize: px(34),
        fontWeight: "bold",
    },
    item1: {
        width: px(690),
        height: px(90),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    xm: {
        width: px(105),
        height: px(50),
        marginTop: px(40),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    xtx: {
        fontSize: px(30),
        color: '#000',
        fontWeight: 'bold',

    },
    icontent: {
        width: px(560),
        height: px(90),
        marginTop: px(25)
    },
    shuru: {
        height: px(75),
        fontSize: px(30),
        paddingLeft: px(20),
        borderBottomWidth: px(2),
        borderBottomColor: '#f0f0f0',
    },
    site: {
        width: px(690),
        marginTop: px(65),
        marginBottom: px(30),

    },
    stitle: {
        fontSize: px(34),
        fontWeight: 'bold',
    },
    item2: {
        fontSize: px(26),
        marginTop: px(38),
        color: '#7b7b7b',
    },

    type1: {
        width: px(710),
        paddingTop: px(50),
        paddingBottom: px(20),
        display: 'flex',
        alignItems: 'center',
        borderWidth: px(1),
        borderColor: 'transparent',
        elevation: 5,

    },
    title2: {
        height: px(115),
        width: px(630),
        paddingTop: px(10),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txLeft: {
        lineHeight: px(115),
        fontSize: px(30),
        color: '#000',
        fontWeight: 'bold',
    },
    item3: {
        width: px(630),
        height: px(120),
        borderTopWidth: px(2),
        borderTopColor:'#dadada',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hao: {
      fontSize: px(24),
    },
    iTime: {
        height: px(76),
        justifyContent: 'space-between',
    },
    tx1: {
        fontSize: px(24),
        color: '#7b7b7b',
    },

    jiage: {
        width: px(690 ),
        marginTop: px(46),
        marginBottom: px(20),
    },
    jg: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: px(20),
        color:'#151515',
        position: 'relative',

    },
    wukeyong: {
        color: '#7b7b7b',
        marginRight: px(50),
    },
    i2: {
        fontSize: px(50),
      marginLeft:px(100),
        position: 'absolute',
        right: 0,
    },
    tips: {
        marginTop: px(16),
        marginBottom: px(60),
        display: 'flex',
        flexDirection: 'row',
    },
    tuikuan: {
        textDecorationLine:'underline',
        color: '#7d6d51'
    },
    footer: {
        width: px(750),
        height: px(272),
        // borderTopLeftRadius: px(20),
        // borderTopRightRadius: px(20),
        alignItems: 'center',
        // borderWidth: px(2),
        elevation: 5,
        shadowColor: '#a4a4a4',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    xieyi: {
        width: px(690),
        height: px(135),
        paddingTop: px(15),
        flexDirection: 'row',
        alignItems: 'center',
    },
    dxk: {
        width: px(30),
        height: px(30),
        borderWidth: px(2),
        borderColor: '#e8e8e8',
        marginRight: px(18),
        marginLeft: px(15),
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
    zongji: {
        width: px(690),
        height: px(76),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    but: {
        width: px(240),
        height: px(76),
        backgroundColor: '#86724d',
        borderRadius: px(38),
        alignItems: 'center',
    },
    zhifu: {
        lineHeight: px(76),
        color: '#fefaea',
    },
});

export default Confirmation;
