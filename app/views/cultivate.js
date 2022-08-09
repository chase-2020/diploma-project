/* eslint-disable */
import React, {useState,useEffect} from 'react';
import {px} from '../utils/devices';
import IconFont from '../src/iconfont';
import ModalDropdown from 'react-native-modal-dropdown';
import {Picker} from '@react-native-picker/picker';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,

} from 'react-native';

import {findAll, vnAll} from "../src/apis/venueClass";


function Cultivate(props) {
    const { navigation } = props;

    const [count,setCount] = useState(0) // Tabs栏样式判断
    const [count1,setCount1] = useState(0) // 下拉菜单样式判断
    const [st,setSt] = useState([])  //场馆列表
    const [cg,setCg] = useState([])  //要渲染的活动列表
    const [cd,setCd] = useState('') //查询单个场馆
    const [cdd,setCdd] = useState('') //用来判断渲染哪个
    const [drop,setDrop] = useState(false) //判断下拉菜单是否显示
    const [zhi,setZhi] = useState('全部场馆')   //下拉菜单当前选中的值
    const [zz,setZz] = useState()   //下拉菜单当前选中的值
    const asd = ['蒙德歌剧院','三维','徐家汇体育公园']

    // 查询所有的课程类型
    useEffect(()=>{
        ( async ()=>{
            try{
                const res = await vnAll({
                })
                setSt(res);
                console.log('a',st)
            } catch (e) {
                console.log(e)
            }
        })()
    },[])

    // 查询所有的课程
    useEffect(()=>{
        doreg();
    },[cd,zz])


    // 查询指定类型的课程
    const doreg = async ()=>{
        try{
            const res = await findAll({
                type: cd,
                venueName: zz,
            })
            console.log('类型',cd)
            setCg(res);
        } catch (e) {
            console.log('失败')
        }
    }

    // 查询指定场馆的课程
    const doreg1 = async (r)=>{
        try{
            const res = await findAll({
                type: count,
                venueName: r
            })
            setCg(res);
        } catch (e) {
            console.log(e)
        }
    }


    const ktype = []
    const type_list = ['篮球', '足球', '羽毛球', '网球','乒乓球','游泳']
    type_list.forEach((r, index) => {
        if(st.includes(index + 1)){
            ktype.push(r);
        }
    })




    return (
        <View style={styles.body}>
            <View style={styles.main}>
                <View style={styles.hd_top}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <Text onPress={()=> [setCd(''),setCdd(''),setCount(0)]} style={count === 0 ? (styles.tyItem) : (styles.tyItem1)} >全部场馆</Text>
                        { ktype.map((r,index)=>
                            <Text onPress={()=> [setCount(index+1),setCd(index+1),setCdd(index+1), {a: r}]} style={count === index+1 ? (styles.tyItem) : (styles.tyItem1)} key={index}>{r}</Text>
                        )}
                    </ScrollView>
                </View>

                {/*下拉菜单*/}
                <View style={styles.seek} >
                    <Text style={styles.seek_top} onPress={()=>setDrop(!drop)}><Text style={styles.quan}>{zhi}{drop=== false ? (<Text>▼</Text>):(<Text>▲</Text>)}</Text></Text>
                    <Text style={styles.seek_top} onPress={()=>console.log('132')}>价格</Text>
                </View>
                { drop === true ? (<View style={styles.xl}>
                    <View style={styles.xx}>
                        <Text style={count1 === 0 ? (styles.x_item1) : (styles.x_item)} onPress={()=>[setZz(''),setZhi('全部场馆'),setDrop(false),doreg1(),setCount1(0)]} >全部场馆</Text>
                        {count1=== 0 ? (<Text style={styles.gou}>✔</Text>):null}
                    </View>

                    { asd.map((r,index)=>
                        <View style={styles.xx} key={index}>
                            <Text onPress={()=>[setZz(r),setCount1(index+1),setZhi(r),setDrop(false)]}  style={count1 === index+1 ? (styles.x_item1) : (styles.x_item)}  >{ r }</Text>
                            {count1=== index+1 ? (<Text style={styles.gou}>✔</Text>):null}
                        </View>

                    )}
                </View>):null }
                {/*课程列表*/}
                { cdd === cd ? ( <ScrollView>
                    { cg.map( (r,index)=>(
                        <View style={styles.cg} key={index}>
                            <TouchableOpacity onPress={()=>navigation.navigate("Activity_details",{a:r}) }>
                                <View style={styles.cg_top}>
                                    <View style={styles.content}>
                                        <View style={styles.ct_tx}>
                                            { r.type===1 ?(<View style={styles.ct_logo}>
                                                <IconFont name="56-lanqiu" size={26} color={'#fcfaf8'}/>
                                            </View>):null }
                                            { r.type===2 ?(<View style={styles.ct_logo}>
                                                <IconFont name="soccer" size={26} color={'#fcfaf8'}/>
                                            </View>):null }
                                            { r.type===3 ?(<View style={styles.ct_logo}>
                                                <IconFont name="yumaoqiu" size={26} color={'#fcfaf8'}/>
                                            </View>):null }
                                            { r.type===4?(<View style={styles.ct_logo}>
                                                <IconFont name="huwaiyundong" size={26} color={'#fcfaf8'}/>
                                            </View>):null }
                                        </View>
                                        <Text style={styles.ct_tx1}>{r.className}</Text>
                                        <Text style={styles.ct_tx2}>{r.studentAge}</Text>
                                    </View>
                                </View>
                                <View style={styles.cg_bottom}>
                                    <Text style={styles.cb_title}>{r.venueName}</Text>
                                    <Text style={styles.cbb_q}>开课时间:{r.classTime}</Text>
                                    <Text style={styles.cbb_q}>{r.venueName}-{r.site}</Text>
                                    <Text style={styles.cbb_qian}>￥ {r.price}元</Text>
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

    //下拉菜单
    seek: {
        width: px(750),
        height: px(100),
        backgroundColor: '#fff',
        marginTop: px(30),
        marginBottom: px(30),
        flexDirection: 'row',
        justifyContent: 'space-around',
        position:'relative',
    },

    seek_top: {
        width: px(200),
        lineHeight: px(100),
        textAlign: 'center',
    },
    quan: {
        color:'#89724b',
    },
    xl: {
        width: px(750),
        backgroundColor: '#fff',
        zIndex: 999,
        position: 'absolute',
        top: px(240),
        left: px(-30),
    },
    x_item: {
        width: px(750),
        lineHeight: px(100),
        paddingLeft: px(30),

    },
    x_item1: {
        width: px(750),
        lineHeight: px(100),
        paddingLeft: px(30),
        color: '#89724b',
    },
    xx: {
        flexDirection: 'row',
        position:'relative',
    },
    gou: {
        color:'#89724b',
        position: 'absolute',
        top: px(30),
        right: px(30),
    },


    // 课程
    cg: {
        width: px(690),
        marginBottom: px(30),
    },
    cg_top: {
        width: px(690),
        height: px(420),
        backgroundColor: '#90ee90',
        borderTopLeftRadius: px(24),
        borderTopRightRadius: px(24),
    },
    content: {
        width: px(600),
        marginTop: px(180),
        marginLeft: px(25),
    },
    ct_tx: {
        marginTop: px(28),
        flexDirection: 'row',
        marginBottom: px(25),
    },
    ct_logo: {
        flexDirection: 'row',
        marginRight: px(38),
    },
    ct_tx1: {
        fontSize: px(38),
        color: '#fcfaf8',
    },
    ct_tx2: {
        fontSize: px(24),
        color: '#fcfaf8',
        marginTop: px(15),
    },


    cg_bottom: {
        width: px(690),
        height: px(340),
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
    cbb_q: {
        fontSize: px(26),
        color: '#000',
        marginTop: px(26),
    },
    cbb_qian: {
        fontSize: px(55),
        color: '#89724b',
        marginTop: px(25),
    }


});

export default Cultivate;
