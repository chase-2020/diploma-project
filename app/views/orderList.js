/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {px} from '../utils/devices';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Button,
    ToastAndroid,
    
} from 'react-native';
import { Modal } from '@ant-design/react-native';
import Dingdan from "../component/Dingdan";
import OrderDetails from "./confirmationirmation";
import IconFont from "../src/iconfont";
import {findAll,modifyOrder} from "../src/apis/user";
import {useSelector} from 'react-redux';

function Dcdd(props) {
    const { route,navigation } = props;


    const user = useSelector(state => state.userStore.userInfo); // store中获取用户信息
    const [orderList,setOrderList] = useState([])
    const [tabIndex,setTabIndex] = useState(0)
    const [count,setCount] = useState(0)

    useEffect(()=>{
        getOrder()
    },[count])


    const stateList = ['全部','未支付','已支付','已取消','已完成']

    
    // 取消订单
    const cancel  = async (r)=>{
        try{
            const res = await modifyOrder({
                phone:user.phone,
                orderNum:r,
                state:3,
            })
            const { success,info } = res;
            if(success){
                getOrder()
                ToastAndroid.show('订单取消成功',ToastAndroid.SHORT)
            }else{
                ToastAndroid.show('订单取消失败,请联系客服',ToastAndroid.SHORT)
            }
                
            
            
        } catch(e){
            console.log(e)
        }
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
    const payment123 = ()=>{
        Modal.alert('提示', '确定要删除该订单吗？',[{text: '取消',onPress: () => {},style: 'cancel'},{text: '确定',onPress: () => {},style: 'cancel'}])
    }
    // 查询用户所有订单
    const getOrder = async (r)=>{
        try{
            const res = await findAll({
                phone:user.phone,
                state:count,
            })
            setOrderList(res)
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

        return (

            <View style={styles.body}>

                {/*订单状态列表*/}
                <View style={styles.ka}>
                    { stateList?.map((r,index) =>
                        <TouchableOpacity key={index} onPress={()=> [setCount(index)]}>
                            <Text  style={count === index? (styles.title) : (styles.title1)}>{r}</Text>
                        </TouchableOpacity>
                    ) }
                </View>

                {/*订单列表*/}
                <ScrollView>
                    <View style={styles.sss}>
                    { orderList?.map((r,index)=>
                    <TouchableOpacity key={index} activeOpacity={1} onPress={()=> navigation.navigate("OrderDetails",{id:r.orderNum})}>
                        <View style={styles.didan} >
                            <View style={styles.dtop}>
                                <Text style={styles.qiuc}>{r.mbName}-{r.courtName}</Text>
                                <Text style={styles.zt}>{printFruits(r)}</Text>
                            </View>
                            <Text style={styles.dtype}>{printBook(r)}</Text>
                            <View>
                                {r.orderrecords?.map((records,idx)=>
                                    <View style={styles.changci} key={idx}>
                                        <Text>{records.sid}</Text>
                                        <Text style={styles.dtx}>{records.date}  {records.startIndex}</Text>
                                        <Text style={styles.dtx}>￥{records.price}</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.jiage}>
                                <Text>总价 ￥{r.money} 优惠 ￥0.00</Text>
                                <Text>实付款 <Text>{r.money}</Text></Text>
                            </View>
                            {r.state==1?
                            <View style={styles.submit}>
                                <View style={styles.ft_right1}><Text onPress={()=>cancel(r.orderNum) }style={styles.ftl_tx}>取消订单</Text></View>
                                <View style={styles.ft_right}><Text onPress={()=>payment(r.orderNum) }style={styles.ftr_tx}>立即支付</Text></View>
                            </View>:null
                            }
                            {r.state==3 || r.state==4?
                            <View style={styles.submit}>
                                <View style={styles.ft_right}><Text onPress={()=>payment123(r.orderNum) }style={styles.ftr_tx}>删除订单</Text></View>
                            </View>:null
                            }
                            
                            
                        </View>
                    </TouchableOpacity>
                    ) }
                    </View>
                </ScrollView>
            </View>
        );
    }

    const styles = StyleSheet.create({
        body: {
            backgroundColor: '#f9f9f9',

            display:"flex",
            height:'100%',
        },
        sss: {
            width: px(750),
            flex: 1,
            alignItems: 'center',
            paddingBottom: px(50)
        },

        i1: {
            position: 'absolute',
            top: px(30),
            left: px(30),
        },
        sectionContainer: {
            marginTop: px(32),
            paddingHorizontal: 24,
        },
        ka: {
            width: px(750),
            height: px(82),
            flexDirection: 'row',
            backgroundColor: '#fff',
        },
        ts: {
            color: 'red',

        },
        ts1: {
          color : 'green',
        },
        title: {
            width: px(150),
            fontSize: px(32),
            fontWeight: 'bold',
            color: '#816d4d',
            lineHeight: px(82),
            textAlign: 'center',
            borderBottomColor: '#816d4d',
            borderBottomWidth: px(4),
        },
        title1: {
            width: px(150),
            fontSize: px(32),
            color: '#b8b7b0',
            lineHeight: px(82),
            textAlign: 'center',
        },
        a1: {
            width: px(150),
            fontSize: px(32),

            color: '#816d4d',
            lineHeight: px(82),
            textAlign: 'center',
            borderBottomWidth: px(2),
            borderBottomColor: '#816d4d',
        },
        sv: {
            width:px(690),
            height:px(0),
            flex:1,
        },


        //订单
        didan: {
            width: px(690),
            marginTop: px(30),
            paddingTop: px(35),
            paddingRight: px(30),
            paddingLeft: px(30),
            paddingBottom: px(50),
            borderRadius: px(10),
            backgroundColor: '#fff',

            elevation: 5,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
            shadowColor: 'black',  //  阴影颜色
            shadowOffset: { width: 0, height: 0 },  // 阴影偏
            shadowOpacity: 1,  // 阴影不透明度
            shadowRadius: 10,  //  圆角

        },
        qiuc: {
            fontSize: px(36),
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
            borderTopWidth: px(2),
            borderTopColor: "#aaa",
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
        // 按钮
        submit:{
            width:'100%',
            height: px(80),
            
            display:'flex',
            flexDirection:'row',
            justifyContent:'flex-end'
        },
        ft_right: {
            width: px(240),
            height: px(80),
            backgroundColor: '#89724b',
            borderRadius: px(40),
            marginLeft:px(20)
        },
        ft_right1: {
            width: px(240),
            height: px(80),
            backgroundColor: '#fff',
            borderRadius: px(40),
            marginLeft:px(20),
            borderWidth: px(1),
            borderColor:'#89724b'
        },
        ftr_tx: {
            lineHeight: px(80),
            fontSize: px(30),
            color: '#fff',
            textAlign: 'center',
        },
        ftl_tx: {
            lineHeight: px(80),
            fontSize: px(30),
            color: '#89724b',
            textAlign: 'center',
        },
    });

export default Dcdd;
