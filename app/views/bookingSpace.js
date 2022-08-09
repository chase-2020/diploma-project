/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {px} from '../utils/devices';
import IconFont from '../src/iconfont';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Button,
    Alert,
} from 'react-native';
import {findOneAll, findAll ,findSite} from "../src/apis/sdUser";
import {findOrder, siteOrder} from "../src/apis/user";
import {Corder} from "../src/apis/user";
import moment from 'moment'
import {BoxShadow} from 'react-native-shadow'
    import {useSelector, useDispatch} from 'react-redux';

function BookingSpace(props) {
    const { route,navigation } = props;
    const { id } = route.params;

    const user = useSelector(state => state.userStore.userInfo); // store中获取用户信息

    console.log('我是用户信息',user)
    const [type,setType] = useState([])  //运营商的类型
    const [xinxi,setXinxi] = useState([])  //运营商的信息
    const [ctype,setCtype] = useState([])  //当前选中的类型
    const [court,setCourt] = useState([])  //指定类型的场馆列表
    const [selectCourt,setSelectCourt] = useState([])  //当前选中的场馆
    const [courtName,setCourtName] = useState('')  //当前选中的场馆名字
    const [courtList,setCourtList] = useState([])  //场地列表
    const [plan,setPlan] = useState([])  //指定场馆的排场
    const [time,setTime] = useState([])  //可预订时间段
    const [now,setNow] = useState([])  //今天日期  月份+日期
    const [dateAt,setDateAt] = useState([])  //今天日期  月份+日期
    const [month,setMonth] = useState('')  //当前月份
    const [today,setToday] = useState([])  //当前日期
    const [hours,setHours] = useState([])  //当前小时
    const [week,setWeek] = useState([])  //选中时间的星期
    const [selectList,setSelectList] = useState([])  //选中的场地列表
    const [select,setSelect] = useState([])  //当前选定的场地的信息
    const [count,setCount] = useState(0)  //类型选中时的样式
    const [count1,setCount1] = useState(0) //场馆选中时的样式

    const [order,setOrder] = useState('')

    const typeList = [
        {name:'篮球', icon:'56-lanqiu'},
        {name:'足球', icon:'soccer'},
        {name:'羽毛球', icon:'yumaoqiu'},
        {name:'网球', icon:'huwaiyundong'},
        {name:'乒乓球', icon:'pingpangqiuqiupaitiyuyundongxianxing'},
    ]


    useEffect(()=>{
        findOne()
        timeList()
        getTime()
    },[])

    useEffect(()=>{
        CourtAll()
    },[ctype])

    useEffect(()=>{
        findCourt()
        console.log('我是场馆编号',selectCourt)
    },[selectCourt])

    // 查询当前运营商的信息
    const findOne = async ()=>{
        try{
            const res = await findOneAll({
                mid : id
            })
            console.log('res',res.type)
            const qtype = []
            const Ctype = []
            typeList.forEach((r, index) => {
                if(res.type.includes(index + 1)){
                    Ctype.push(index+1)
                    qtype.push(
                        {name: r.name, icon: r.icon},
                    );
                }
            })
            setType(qtype)
            setCtype(Ctype[0])
            setXinxi(res)
            console.log('我是运营商信息',res)
            console.log('1521',qtype)
        } catch (e) {
            console.log(e)
        }

    }

    // 查询单个运营商指定类型的所有场馆
    const CourtAll = async ()=>{
        try{
            const res = await findAll({
                mid : id,
                type : ctype,
            })
            if(res){
                setCourt(res)
                console.log('我是场馆信息',res)
                setSelectCourt(res[0]?.ctid)
                setCourtName(res[0]?.name)
                console.log('我是场馆名',res[0]?.name)
            }

        }catch (e){
            console.log(e)
        }
    }

    // 查询单个运营商指定条件的单个场馆的场地列表
    const findCourt = async ()=>{
        try{
            const res1 = await findSite({
                courtid : selectCourt,
            })
            // console.log('我是res1',res1)
            if ( res1 ){
                setCourtList(res1.data)
                console.log('ssssplan',week)
                const a = []
                for(const i of res1.data){
                    // if(i.plan) a.push(JSON.parse(i.plan)[0].children)
                    if(i.plan) a.push(JSON.parse(i.plan)[week])

                }

                // 显示今天可以选择的时间段
                if(dateAt === now
                ){
                    for(let r of a){
                        r?.children?.splice(0,hours)
                    }
                    return  setPlan(a)
                }
                return  setPlan(a)
                console.log('++++++++++++++++++')
                console.log(a)
                console.log('++++++++++++++++++')
                // return a

            }

            // getPeice()
            console.log('resdate',courtList)
        }catch (e){
            console.log(e)
        }
    }

    //获取当前选中的场馆类型
    const gettype = (index,k) =>{
        setCount(index)
        setCount1(0)
        setSelectList([])
        setSelect([])
        if(k === '篮球') return setCtype(1)
        if(k === '足球') return setCtype(2)
        if(k === '羽毛球') return setCtype(3)
        if(k === '网球') return setCtype(4)
        if(k === '乒乓球') return setCtype(5)
    }

    //获取当前选中的场馆名
    const getname = (index,k,name) =>{
        setCount1(index)
        setSelectCourt(k)
        console.log('我是场馆名',name)
        setCourtName(name)
        setSelectList([])
        setSelect([])
    }

    // 日期
    const _datearr=[]
    for(var i=0;i<7;i++){
        const _d = new Date();
        _d.setDate(_d.getDate()+i)
        _datearr.push(_d)
    }

    // 获取时间
    const getTime = ()=>{
        const _t = new Date();
        setMonth(_t.getMonth()+1)
        setToday(_t.getDate())
        setHours(_t.getHours())
        setDateAt(_t.getMonth()+1+'-'+_t.getDate())
        setNow(_t.getMonth()+1+'-'+_t.getDate())
        setWeek(_t.getDay())
    }


    const week_arr=['星期天','星期一','星期二','星期三','星期四','星期五','星期六']

    const setSelectTime = (index,m,t,d) => {
        setSelectIndex(index)
        setMonth(m)
        setToday(t)
        setWeek(d)
        setSelectList([])
        setSelect([])
        setDateAt(m+'-'+t)
        console.log('月份',m)
        console.log('日期',t)
        console.log('星期',d)
    }

    useEffect(()=>{
        timeList()

    },[month,today])


    // 可预定的时间段
    const timeList = () =>{
        getPeice()
        const pTime = [];
        for (let i = 0; i < 24; i++){
            let hourFrom = moment().hour(i).format('HH:00')
            let hourTo = moment().hour(i+1).format('HH:00')
            pTime.push(`${hourFrom}-${hourTo}`)
        }
        if(dateAt === now){
            pTime.splice(0,hours)
           return  setTime(pTime)
        }
        setTime(pTime)
        console.log('日期111',dateAt)
    }

    // 获取可预约场地价格列表
    const getPeice = ()=>{
        console.log('ssssplan',week)
        const a = []
        for(const i of courtList){
            // if(i.plan) a.push(JSON.parse(i.plan)[0].children)
            if(i.plan) a.push(JSON.parse(i.plan)[week])

        }

        // 显示今天可以选择的时间段
        if(dateAt === now){
            for(let r of a){
                r?.children?.splice(0,hours)
            }
            return  setPlan(a)
        }
        return  setPlan(a)
    }

    // 选择场地(多选)
    function clickBtn (iaindex,ibindex){
        console.log('选中的13',selectList)
        const ibinx = ibindex
        if(dateAt === now){
            ibindex = ibindex+hours
        }
        const ia  = courtList[iaindex]
        const ib = plan[iaindex].children[ibinx]
        console.log('iaindex  ',iaindex)
        console.log('plan[iaindex]: ',plan[iaindex])
        // console.log('ia',ia)
        // console.log('ib',ib)
        // console.log('索引',ibindex)
        //
        const siteName = ia.siteNum;
        // this.cura = iaindex;
        // this.curb = ibindex;
        const fee  = ib.fullFee;
        let st = 0
        if(dateAt === now){
             st = time[ibinx];
        }else {
             st = time[ibindex];
        }

        // const time = this.date
        // const type = this.ntype //当前场馆类型
        // console.log('月份',time)
        // console.log("场地号，价格，时间段",siteName,fee,`${st}-${et}`)
        //
        // console.log("我是tol",this.tol)

        let exitsStr =  `${iaindex}#${ibindex}`;
        if( selectList.includes(exitsStr) ){
            // this.tol.splice( this.tol.indexOf({siteName,fee,ibindex,time,type}),1 )
            selectList.splice( selectList.indexOf(exitsStr),1 )
            select.splice(select.findIndex(r=>r.iaindex == iaindex&& r.ibindex==ibindex),1)
        }else{
            // this.tol.push({siteName,fee,ibindex,time,type})
            selectList.push(exitsStr);
            select.push({
                siteName,
                fee,
                st,
                dateAt,
                // time,
                // iaindex,
                // ibindex,
            });//选中添加到数组里
        }
        setSelectList([...selectList])
        setSelect([...select])

        console.log('选中的',selectList)
        console.log('选中的122',select)
    }

    useEffect(()=>{
        console.log('55887123',selectList)

    },[selectList])

    // 计算选中场地的总价
    const sum = () =>{
        let array1 = [];
        let price = 0
        const reducer = (p,c) => p + c;

        for(let r of select){
            array1.push(parseInt(r.fee))
            price = array1.reduce(reducer)
        }

        console.log('我是钱',array1)

        return price
    }

    // 选中时候的样式
    const click = (ia,ib)=>{
        if(dateAt === now){
            // selectList.includes(`${iaindx}#${ibindex}`)
            return selectList.includes(`${ia}#${ib+hours}`)
        }
        return selectList.includes(`${ia}#${ib}`)
    }

    const shadowOpt = {
        width:px(200), //包裹的子内容多宽这里必须多宽
        height:px(200),//同上
        color:"#a4a4a4",//阴影颜色
        border:4,//阴影宽度
        // radius:30,//包裹的子元素圆角多少这里必须是多少
        opacity:0.5,//透明度
        x:px(2),
        y:px(20),
        side: 'bottom',
        style:{marginRight: px(20)}
    }

        // 可预约日期
    const [dateArr, setDateArr] = useState( _datearr )

    const [selectIndex,setSelectIndex] = useState(0)

    const Order = async (r)=>{
        try{
            const res = await Corder({
                name:user.username,
                phone:user.phone,
                mbName:xinxi.name,
                courtName:courtName,
                mbAddr:xinxi.operatorAddress,
                courtType:ctype,
                money:sum(),
                state:1,
                orderNum:r,
            })
            console.log('订单号',r)
            console.log('res555',res)
            const { success,info } = res;
            if(success){
                await OrderCx(r)
                console.log('888888888888888888888888')
            }else {
                alert(info)
            }


            // console.log('resdate',courtList)
        } catch(e){
            console.log(e)
        }
    }

    // useEffect(()=>{
    //     OrderCx()
    //     console.log('我是第一次测试啊啊啊啊')
    // },[])

    // 用户单个订单查询
    const OrderCx = async (r)=>{
        try{
            const res = await findOrder({
                orderNum:r,
            })
            console.log('res5551111',res)
            console.log('cheshi',r)
            const { success,data } = res;
            console.log('我是did',data.did)

            console.log('------------------')
            if(success){
                await siteOrder({
                    site:select,
                    orderNum:r,
                    did:data.did
                })
                console.log('！！！！！！！！！！！！！！！！')
                navigation.navigate("Confirmation",{orderInfo:r})
            }
        } catch(e){
            console.log(e)
        }
    }

    const orderSite = async(r) => {
        try{
             await siteOrder({
                site:select,
                 orderNum:r,

            })


        } catch(e){
            console.log(e)
        }
    }

    const confirm = () => {
        const now = new Date();
        let year=now.getFullYear().toString();
        let month = (now.getMonth() + 1).toString();
        let day = now.getDate().toString();
        let hour = now.getHours().toString();
        let minutes = now.getMinutes().toString();
        let seconds = now.getSeconds().toString();
        // 存放订单号
        let num = '';
        // N位随机数(加在时间戳后面)
        for (let i = 0; i < 4; i++)
        {
            num += Math.floor(Math.random() * 10);
        }
        setOrder(year+month+day+hour+minutes+seconds+num)
        Order(year+month+day+hour+minutes+seconds+num)
        console.log('我是订单',year+month+day+hour+minutes+seconds+num)
        // orderSite(year+month+day+hour+minutes+seconds+num)
    }


    // const confirm = async ()=>{
    //     try{
    //         orderNum()
    //         if (order !== ''){
    //             Order()
    //         }
    //
    //
    //     } catch(e){
    //         console.log(e)
    //     }
    // }

  return (
        <View style={styles.body}>

            <ScrollView>
            <View style={styles.main}>
                {/*场馆类型*/}
                <View style={styles.cgtype}>
                    <Text style={styles.tyTop}>场馆类型</Text>
                    <View style={styles.tyBottom}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            { type?.map((r,index)=>
                                <View  key={index}  style={count === index ? (styles.tyItem) : (styles.tyItem1)} >
                                    <TouchableOpacity onPress={()=> gettype(index,r.name)} style={styles.ti_click}>
                                        <Text style={count === index ? (styles.ti_top1) : (styles.ti_top)} ><IconFont name={r.icon} size={18} /></Text>
                                        <Text style={count === index ? (styles.ti_bottom1) : (styles.ti_bottom)} >{r.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            ) }
                        </ScrollView>
                    </View>
                </View>

                {/*场馆*/}
                <View style={styles.cgtype}>
                    <Text style={styles.tyTop}>场馆</Text>
                    <View style={styles.tyBottom}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            { court?.map((r,index)=>
                                <Text style={count1 === index ? (styles.tyItem) : (styles.tyItem1)} onPress={()=>getname(index,r.ctid,r.name)} key={index} >{r.name}</Text>
                            ) }
                        </ScrollView>
                    </View>
                </View>

                {/*包场类型*/}
                <View style={styles.cgtype}>
                    <Text style={styles.tyTop}>包场类型</Text>
                    <View style={styles.tyBottom}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <Text  style={styles.tyItem}>全场</Text>
                            <Text  style={styles.tyItem1}>半场</Text>
                        </ScrollView>
                    </View>
                </View>

                {/*日期*/}
                <View style={styles.date}>
                    <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                        {dateArr.map( (r,index)=>(
                                <TouchableOpacity
                                    style={ selectIndex===index?(styles.date_item):(styles.date_item1) }
                                    key={index}
                                    activeOpacity={1}
                                    onPress={()=> setSelectTime(index,r.getMonth()+1,r.getDate(),r.getDay())}
                                >
                                    <Text style={ selectIndex===index?(styles.date_top):(styles.date_top1) } >
                                        {r.getMonth()+1}-{r.getDate()}
                                    </Text>
                                    <Text style={ selectIndex===index?(styles.date_bottom):(styles.date_bottom1)}>
                                        { now === r.getMonth()+1+'-'+r.getDate() ? ('今天'):(week_arr[r.getDay()]) }
                                    </Text>
                                </TouchableOpacity>
                        ) )}
                    </ScrollView>
                </View>

                {/*场地状态标识*/}
                <View style={styles.cd_start}>
                    <View style={styles.cd_1}>
                        <View style={styles.start1}></View>
                        <Text style={styles.start_tx}>可预订</Text>
                    </View>
                    <View style={styles.cd_1}>
                        <View style={styles.start2}></View>
                        <Text style={styles.start_tx}>不可选</Text>
                    </View>
                    <View style={styles.cd_1}>
                        <View style={styles.start3}></View>
                        <Text style={styles.start_tx}>已预定</Text>
                    </View>
                </View>

                <View style={styles.cd_bot}>

                    <View  style={styles.sj}>
                        { time.map((r,index)=><Text style={styles.shij} key={index}>{ r }</Text>) }
                    </View>
                    <ScrollView   horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.slSite}>
                            { courtList?.map((r,iaindex)=>
                                <View  key={iaindex} >
                                    <Text style={styles.cdh}>{r.siteNum}</Text>
                                    { plan[iaindex]?.children?.map((item,ibindex)=>
                                        <Text key={ibindex}  style={item.fullFee == -1 ?styles.xuanzhe2:(click(iaindex,ibindex) ? styles.xuanzhe1:styles.xuanzhe)}
                                              onPress={()=>clickBtn(iaindex,ibindex)}
                                        >
                                            {item.fullFee}
                                        </Text>
                                    ) }
                                </View>
                            ) }
                        </View>
                    </ScrollView>

                </View>

            </View>
            </ScrollView>


            <View>
                <View style={styles.select}>
                    <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.xzk} >
                            { select?.map((r,index )=>
                                <BoxShadow setting={shadowOpt} key={index}>
                                    <View style={styles.xz} >
                                        <Text style={styles.sDate}>{r.dateAt}</Text>
                                        <Text style={styles.sTime}>{r.st}</Text>
                                        <Text style={styles.sSite}>{r.siteName}</Text>
                                    </View>
                                </BoxShadow>
                            ) }
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <View style={styles.ft_item}>
                        <View  style={styles.ft_left}><Text style={styles.zongji}>总计金额</Text><Text style={styles.qian}>￥{sum()}.00</Text></View>
                        {/*<View  style={styles.ft_right}><Text onPress={()=> alert('请选择场地')} style={styles.ftr_tx}>确认提交</Text></View>*/}
                        <View  style={styles.ft_right}><Text onPress={()=>[confirm()] }style={styles.ftr_tx}>下一步</Text></View>
                    </View>
                    {/*<Button onPress={() => {Alert.alert('你点击了按钮！');}} title="点我！"/>*/}
                </View>
            </View>




        </View>
  );
}

const styles = StyleSheet.create({
    body : {
        display:"flex",
        height: '100%',
        alignItems: 'center',
    },

    main: {
        flex: 1,
        width: px(750),
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        marginTop: px(50),
    },
    cgtype: {
        width: px(690),
    },
    tyTop:{
        fontSize: px(34),
        fontWeight: 'bold',
    },
    tyBottom: {
        marginTop: px(25),
        marginBottom: px(50),
        height: px(80),
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
        flexDirection: 'row',
    },
    ti_click:{
        flexDirection: 'row',
    },
    ti_top:{
        lineHeight: px(80),
        color: '#ffc900'
    },
    ti_top1:{
        lineHeight: px(80),
        color: '#fff'
    },
    ti_bottom:{
        lineHeight: px(80),
        color: '#000'
    },
    ti_bottom1:{
        lineHeight: px(80),
        color: '#fff'
    },


    // 日期
    date: {
        width: px(750),
        height: px(115),
        backgroundColor: '#fff',
    },

    date_item: {
        width: px(187.5),
        height: px(115),
        borderBottomWidth: px(4),
        borderBottomColor: '#89724b',
        color: '#89724b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    date_item1: {
        width: px(187.5),
        height: px(115),
        borderBottomWidth: px(4),
        borderBottomColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    date_top: {
        color: '#89724b',
    },
    date_top1: {
        color: '#000',
    },
    date_bottom: {
        color: '#89724b',
        fontWeight: 'bold',
    },
    date_bottom1: {
        color: '#000',
        fontWeight: 'bold',
    },

    // 订单列表
    cd_start: {
        width: px(390),
        marginTop: px(30),
        marginBottom: px(22),
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    cd_1: {
        width: px(115),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    start1: {
        width: px(28),
        height: px(28),
        backgroundColor: '#fff',
        borderRadius: px(4),
    },
    start2: {
        width: px(28),
        height: px(28),
        backgroundColor: '#aaa',
        borderRadius: px(4),
    },
    start3: {
        width: px(28),
        height: px(28),
        backgroundColor: '#89724b',
        borderRadius: px(4),
    },
    start_tx: {
        fontSize: px(24),
    },
    cd_bot: {
        width:px(750),
        paddingLeft: px(20),
        flexDirection: 'row',
        paddingBottom: px(210)
    },
    sj: {
        paddingTop: px(70),
    },
    shij:{
        lineHeight: px(55),
        marginBottom: px(25),
    },
    slSite: {
        display: 'flex',
        flexDirection: 'row',
    },
    cd_num: {

        display: 'flex',
        flexDirection: 'row',
    },
    cdh: {
        width: px(150),
        lineHeight: px(70),
        fontSize: px(28),
        color: '#555',
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: px(36),
    },
    pailie: {
        flexDirection: 'row',
    },
    xuanzhe: {
        width: px(150),
        lineHeight: px(55),
        color: '#89724b',
        backgroundColor: '#fff',
        textAlign: 'center',
        marginLeft: px(36),
        marginBottom: px(25),
        borderRadius: px(36),
    },

    xuanzhe1: {
        width: px(150),
        lineHeight: px(55),
        color: '#fff',
        backgroundColor: '#89724b',
        textAlign: 'center',
        marginLeft: px(36),
        marginBottom: px(25),
        borderRadius: px(36),
    },
    xuanzhe2: {
        width: px(150),
        lineHeight: px(55),
        color: '#aaa',
        backgroundColor: '#aaa',
        textAlign: 'center',
        marginLeft: px(36),
        marginBottom: px(25),
        borderRadius: px(36),
    },

    // 选中的场地信息
    select:{
        width: px(750),
        position : 'absolute',
        bottom: px(160),
        paddingTop: px(30),
        borderTopLeftRadius: px(30),
        borderTopRightRadius: px(30),
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
    },

    xzk:{
        width: px(690),
        display: 'flex',
        flexDirection: 'row'
    },
    xz:{
        width:px(200),
        height:px(175),
        marginRight: px(20),
        backgroundColor: '#fff',
        borderTopLeftRadius: px(10),
        borderTopRightRadius: px(10),
    },
    sDate:{
        lineHeight: px(45),
        backgroundColor: '#89724b',
        color: '#fff',
        textAlign: 'center',
        borderTopLeftRadius: px(10),
        borderTopRightRadius: px(10),
    },
    sTime:{
        lineHeight: px(50),
        backgroundColor: '#89724b',
        color: '#fff',
        textAlign: 'center'
    },
    sSite:{
        lineHeight: px(80),
        color: '#89724b',
        fontWeight:'bold',
        textAlign: 'center'
    },
    // select: {
    //     width: px(750,
    //     position: 'fixed',
    //     bottom: px(130),
    //     paddingTop: px(30),
    //     border-top-left-radius: 30rpx;
    //     border-top-right-radius: 30rpx;
    //     background-color: #fff;
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    // }


    // 底部确认提交
    footer: {
        width: px(750),
        height: px(180),
        backgroundColor: '#fff',
        borderTopLeftRadius: px(30),
        borderTopRightRadius: px(30),
        paddingTop: px(30),
        alignItems: 'center',
        position: 'relative',
    },
    ft_item: {
        width: px(690),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ft_left: {
        flexDirection: 'row',
        marginRight: px(30),
    },
    zongji: {
        lineHeight: px(80),
        fontSize: px(30),
        marginTop: px(2)
    },
    qian: {
        lineHeight: px(80),
        fontSize: px(44),
        color: '#cc1108',
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

});

export default BookingSpace;
