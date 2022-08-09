import {
    StatusBar,
    StyleSheet,
} from 'react-native';
import {px} from "../../utils/devices";

export  const  styles = StyleSheet.create({
    sectionContainer: {
        marginTop: px(32),
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },



    to:{
        height:'100%',
        display:'flex',
    },



    //主体
    body:{
        flex: 1,
        height:0,

        display:'flex',
        backgroundColor:'#f2f2f2'


    },




    //头像
    body1:{

        height: px(619),
        backgroundColor:'#908475',
        marginBottom:px(18),
    },


    //头像上部分
    tou:{

        // backgroundColor:'red',
        height:px(260),
        marginTop:px(240),
        paddingLeft:px(30),
        display:'flex',
        flexDirection:'row',

    },

    //头像上部分的左边
    tou_a:{
        height:px(148),
        width:px(148),
        marginLeft:px(30),
        borderRadius:74,
        backgroundColor:'#ffffff'
    },
    tinyLogo: {
        width: '100%',
        height: '100%',
        borderRadius: px(74),
    },

    //头像上部分的中间
    tou_b:{
        marginLeft:px(58),

    },

    //中间1
    tou_bhe:{
        fontSize:px(23),

    },

    a:{
        color:'#f8f6dd',
        fontSize:px(30),
    },


    //中间2
    tou_bto:{
        display:'flex',
        flexDirection:'row',
        marginTop:px(25),
    },

    tou_bto1:{
        fontSize:px(17),


    },

    b:{
        color:'#d5c0a2',
        fontSize:px(24),
    },

    tou_bto2:{
        fontSize:px(17),
        color:'#d5c0a2',
        marginLeft:px(13),
    },


    //中间3
    tou_bmi:{
        display:'flex',
        flexDirection:'row',
    },

    tou_bmi1:{
        fontSize:px(17),
        color:'#d5c0a2',
    },

    tou_bmi2:{

        color:'#d5c0a2',
        marginLeft:px(13),
    },



    //中间4
    tou_bbo:{
        display:'flex',
        flexDirection:'row',
    },

    tou_bbo1:{

        color:'#d5c0a2',
    },

    tou_bbo2:{
        fontSize:px(17),
        color:'#d5c0a2',
        marginLeft:px(13),
    },




    //头像上部分的右边
    tou_c:{
        marginTop:px(66),
        marginLeft:px(75),
    },


    //右边1
    tou_cto:{
        display:'flex',
        flexDirection:'row',
    },

    tou_cto1:{
        fontSize:px(17),
        color:'#d5c0a2',
    },

    tou_cto2:{
        fontSize:px(17),
        color:'#d5c0a2',
        marginLeft:px(13),
    },


    //右边2
    tou_cmi:{
        display:'flex',
        flexDirection:'row',
    },

    tou_cmi1:{
        fontSize:px(17),
        color:'#d5c0a2',
    },

    tou_cmi2:{
        fontSize:px(17),
        color:'#d5c0a2',
        marginLeft:px(13),
    },



    //右边3
    tou_cbo:{
        display:'flex',
        flexDirection:'row',
    },

    tou_cbo1:{
        fontSize:px(17),
        color:'#d5c0a2',
    },

    tou_cbo2:{
        fontSize:px(30),
        color:'#d5c0a2',
        marginLeft:px(13),
    },

    tou_cbo3:{
        fontSize:px(17),
        color:'#d5c0a2',
        marginLeft:px(13),
    },






    //头像下部分
    tour:{
        marginLeft:px(37),
        display:'flex',
        flexDirection:'row',
    },

    //下部1
    tour_a:{
        width:px(200),
        height:px(84),
        borderRightWidth:px(1),
        borderColor:'#5e4d3c',

    },

    tour_a1:{
        paddingLeft:px(75),

    },


    c:{
        fontSize:px(28),
        color:'#dfc23d'
    },


    tour_a2:{
        paddingLeft:px(30),
        paddingTop:px(10),
    },


    d:{
        fontSize:px(22),
        color:'#e8e1d6',
    },


    //下部2
    tour_b:{
        width:px(240),
        height:px(84),
        borderRightWidth:px(1),
        borderColor:'#5e4d3c',
    },

    tour_b1:{

    },

    cc:{
        textAlign:'center',
    },

    tour_b2:{

        marginLeft:px(98),
    },


    //下部3
    tour_c:{
        width:px(140),
        height:px(56),
        borderRightWidth:px(2),
        borderLeftWidth:px(2),
        borderTopWidth:px(2),
        borderBottomWidth:px(2),
        borderColor:'#baa77f',
        marginLeft:px(47),
        marginTop:px(13),

    },


    e:{
        fontSize:px(24),
        color:'#deaf66',
        lineHeight:px(52),
        textAlign:'center',

    },



    //个人中心
    body2:{

        marginHorizontal: 20,
        height:px(542),
        marginBottom:px(18),
        borderRadius:15,
        backgroundColor:'#ffffff',

    },

    //个人中心上部
    person_top:{
        height:px(102),
    },


    f:{
        fontSize:px(26),
        color:'#000',
        lineHeight:px(102),
        paddingLeft:px(30),
    },



    //个人中心下部
    person_bottom:{

    },

    lalala:{
        height:px(146),
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
    },



    //下部分中的一个View
    person_boone:{
        height:px(125),
        width:px(140),

        textAlign:'center'
    },


    person_boone1:{
        height:px(78),

        textAlign:'center',
    },

    g:{
        fontSize:px(44),
        textAlign:'center',
        color:'#8da8f4',

    },

    person_boone2:{},

    h:{
        fontSize:px(20),
        color:'#919191',
        textAlign:'center',
        marginTop:px(10),
    },


    //场馆服务
    body3:{

        marginHorizontal: 20,
        height:px(542),
        marginBottom:px(18),
        borderRadius:15,
        backgroundColor:'#ffffff',
    },

    //小工具
    body4:{

        marginHorizontal: 20,
        height:px(256),
        marginBottom:px(18),
        borderRadius:15,
        backgroundColor:'#ffffff',
    },


    //关于
    body5:{

        marginBottom:px(18),
        height:px(104),
        marginHorizontal: 20,
        borderRadius:15,
        backgroundColor:'#ffffff',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center' ,

    },


    about:{},



    gg:{
        lineHeight:px(104),
        color:'#8fa5f8'
    },






    //底部
    bottom:{

        backgroundColor:'#ffffff',
        height:px(97),
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
    },


    jojo:{
        height:px(72),
        width:px(84),

    },

    jojo1:{
        height:px(40),
        marginTop:px(10),

    },

    jojo2:{
        marginTop:px(3)
    },

});



export default styles;