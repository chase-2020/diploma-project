/* eslint-disable */
import React, {useState,useEffect} from 'react';
import {px} from '../utils/devices';
import IconFont from '../src/iconfont';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ToastAndroid,
    TouchableOpacity,
    Button 
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {findAll,modifyOrder} from "../src/apis/user";

function OrderDetails(props) {
    const { route,navigation } = props;
    const { id } = route.params;
    console.log('订单ID',id)

    const [value, onChangeText] = React.useState('Useless Placeholder');
    const user = useSelector(state => state.userStore.userInfo); // store中获取用户信息
    const [order,setOrder] = useState({})
    const [tabIndex,setTabIndex] = useState(0)
    const [count,setCount] = useState(0)

    useEffect(()=>{
        getOrder()
    },[count])


    const stateList = ['全部','未支付','已支付','已取消','已退款']

    // 查询用户所有订单
    const getOrder = async ()=>{
        try{
            const res = await findAll({
                phone:user.phone,
                state:count,
                orderNum:id
            })
            setOrder(res[0])
            console.log('res',res)
        } catch(e){
            console.log(e)
        }
    }

    // 订单状态判断
    const fruitColor = new Map()
        .set('1','未支付')
        .set('2', '已支付')
        .set('3','已取消')
        .set('4','已完成')

    function printFruits(r) {
        return fruitColor.get(r.state) || [];
    }

    // 订场类型判断
    const bookingType = new Map()
        .set('1','篮球')
        .set('2', '足球')
        .set('3','羽毛球')
        .set('4','网球')
        .set('5','乒乓球')
    function printBook(r) {
        return bookingType.get(r.courtType) || [];
    }


    // 立即支付
    const payment  = async (r)=>{
        try{
            const res = await modifyOrder({
                phone:user.phone,
                orderNum:r,
                state:2,
            })
            const { success,info } = res;
            if(success){
                getOrder()
                ToastAndroid.show('订单支付成功',ToastAndroid.SHORT)
            }else{
                ToastAndroid.show('订单支付失败,请联系客服',ToastAndroid.SHORT)
            }
                
            
            
        } catch(e){
            console.log(e)
        }
    }

  return (
        <View style={styles.body}>

            <ScrollView >
            <View style={styles.main}>
            {order.state==2 || order.state==4?
                (<View style={styles.accomplish}>
                    <Text style={styles.ztx1}>{printFruits(order)}</Text>
                </View>):
                (<View></View>)
                }
                {order.state==1?
                (<View style={styles.zhuangtai}>
                    <Text style={styles.ztx}>{printFruits(order)}(请在10分37秒内完成支付)</Text>
                </View>):
                (<View></View>)
                }
                {order.state==3?
                (<View style={styles.zhuangtai}>
                    <Text style={styles.ztx}>{printFruits(order)}</Text>
                </View>):
                (<View></View>)
                }
                {/* {order.state==2?
                (<View style={styles.accomplish}>
                    <Text style={styles.ztx1}>{printFruits(order)}</Text>
                </View>):
                (<View style={styles.zhuangtai}>
                    <Text style={styles.ztx}>{printFruits(order)}</Text>
                </View>)
                } */}


                {/*包场人信息*/}
                <View style={styles.item1}>
                    <Text style={styles.title1}>包场人信息</Text>
                    <View style={styles.xm}>
                        <Text style={styles.xtx}>姓名： </Text>
                        <Text style={styles.xtx}>{order.name}</Text>
                    </View>
                    <View style={styles.xm}>
                        <Text style={styles.xtx}>手机号： </Text>
                        <Text style={styles.xtx}>{order.phone}</Text>
                    </View>
                </View>

                {/*场地信息*/}
                <View style={styles.item1}>
                    <Text style={styles.title1}>场地信息</Text>
                    <View style={styles.xm}>
                        <Text style={styles.xtx}>场馆： </Text>
                        <Text style={styles.xtx}>{order.mbName}-{order.courtName}</Text>
                    </View>
                    <View style={styles.xm}>
                        <Text style={styles.xtx}>地址： </Text>
                        <Text style={styles.xtx}>{order.mbAddr}</Text>
                    </View>
                </View>

                {/*场馆类型*/}
                <View style={styles.type1}>
                    <View style={styles.title2}>
                        <View style={styles.cg}>
                            <Text style={styles.txLeft}>场馆类型： </Text>
                            <Text style={styles.txLeft}>{printBook(order)}</Text>
                        </View>
                        <View style={styles.cg}>
                            <Text style={styles.txLeft}>包场类型： </Text>
                            <Text style={styles.txLeft}>半场</Text>
                        </View>
                    </View>
                    {order.orderrecords?.map((r,index)=>
                    <View style={styles.item3} key={index}>
                        <Text style={styles.hao}>{r.sid}</Text>
                        <View style={styles.iTime}>
                            <Text style={styles.tx1}>{r.date}</Text>
                            <Text style={styles.tx1}>{r.startIndex}</Text>
                        </View>
                        <Text style={styles.tx1}>￥ {r.price} </Text>
                    </View>
                    )}
                </View>

                <View style={styles.jiage}>
                    <View style={styles.jg}>
                        <Text style={styles.jqLeft}>总价</Text>
                        <Text style={styles.jqRight}>￥{order.money}</Text>
                    </View>
                    <View style={styles.jBottom}>
                            <View style={styles.jItem}>
                                <Text style={styles.sfk}>实付款 </Text>
                                <Text style={styles.qian}>￥{order.money}</Text>
                            </View>
                    </View>

                </View>
            </View>
            </ScrollView>
            {order.state==1?
            (<View style={styles.submit}>
                <View style={styles.ft_left}><Text onPress={()=>navigation.goBack() }style={styles.ftl_tx}>返回</Text></View>
                <View style={styles.ft_right}><Text onPress={()=>payment(order.orderNum) }style={styles.ftr_tx}>立即支付</Text></View>
            </View>):
            (<View style={styles.submit1}>
                <View style={styles.ft_left1}><Text onPress={()=>navigation.goBack() }style={styles.ftl_tx1}>返回</Text></View>
            </View>)
            }
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
        // paddingTop: px(25),
        alignItems: 'center',
    },
    zhuangtai: {
        width: px(750),
        height: px(72),
        backgroundColor: '#fcfaf8',
    },
    accomplish: {
        width: px(750),
        height: px(72),
        backgroundColor: '#73d13d',
    },
    ztx: {
        lineHeight: px(72),
        textAlign: 'center',
        fontSize: px(22),
        color: '#d8948e',
    },
    ztx1: {
        lineHeight: px(72),
        textAlign: 'center',
        fontSize: px(22),
        color: '#fff',
    },

    item1: {
        width: px(690),
    },
    title1: {
        width: px(690),
        fontSize: px(34),
        fontWeight: "bold",
        marginTop: px(33),
        marginBottom: px(30),
    },
    xm: {
        // width: px(105),
        // height: px(50),
        marginBottom: px(20),
        display: 'flex',
        flexDirection: 'row',
    },
    xtx: {
        fontSize: px(28),
        color: '#666',
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
        shadowColor: '#a4a4a4',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 14,
    },
    title2: {
        height: px(115),
        width: px(630),
        paddingTop: px(10),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cg: {
        display: 'flex',
        flexDirection: 'row',
    },
    txLeft: {
        lineHeight: px(115),
        fontSize: px(30),
        color: '#000',
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
        width: px(750 ),
        marginTop: px(46),
        marginBottom: px(20),
        alignItems: 'center',
    },
    jg: {
        width: px(690),
        height: px(60),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color:'#151515',
        position: 'relative',

    },
    jqLeft: {
        fontSize: px(28),
        lineHeight: px(60),
        marginBottom: px(2),
    },
    jqRight: {
        fontSize: px(24),
        lineHeight: px(60),
    },
    jBottom: {
        width: px(750),
        height: px(85),
        alignItems: 'center',
        borderTopWidth: px(2),
        borderTopColor:'#dadada',
    },
    jItem: {
      width: px(690),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    sfk: {
        lineHeight: px(85),
        fontSize: px(28),
        marginTop: px(2),
    },
    qian: {
        lineHeight: px(85),
        fontSize: px(38),
        color: '#cc1108',
    },
    //页面底部按钮
    submit:{
        width:'100%',
        height:px(150),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: px(20),
        paddingRight: px(20),
    },
    submit1:{
        width:'100%',
        height:px(150),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: px(20),
        paddingRight: px(20),
    },
    ft_left: {
        width: px(240),
        height: px(80),
        backgroundColor: '#fff',
        borderRadius: px(40),
        borderWidth: px(1),
        borderColor:'#aaa'
    },
    ftl_tx: {
        lineHeight: px(80),
        fontSize: px(30),
        color: '#89724b',
        textAlign: 'center',
    },
    ft_left1: {
        width: px(240),
        height: px(80),
        backgroundColor: '#89724b',
        borderRadius: px(40),
    },
    ftl_tx1: {
        lineHeight: px(80),
        fontSize: px(30),
        color: '#fff',
        textAlign: 'center',
    },
    ft_right: {
        width: px(240),
        height: px(80),
        backgroundColor: '#89724b',
        borderRadius: px(40),
    },
    ftr_tx: {
        lineHeight: px(80),
        fontSize: px(30),
        color: '#fff',
        textAlign: 'center',
    },
    payment:{
        width:px(80)
    }
});

export default OrderDetails;
