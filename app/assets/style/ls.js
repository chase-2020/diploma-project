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
        backgroundColor:'#f5f4f9',
        display:'flex',


    },









    //中
    mi:{
        height:px(132),
        marginBottom:px(30),
        backgroundColor:'#ffffff',
        display:'flex',
        flexDirection:'row',





    },

    //左
    mil:{
        position:'relative',
        width:px(375),
        borderRightWidth:px(2),
        borderRightColor:'#ebebeb',
    },

    fen:{
        position:'absolute',
        top:'32%',
        left:'15%',

    },


    myfen:{},

    b:{
        fontSize:px(30),
        color:'#565656',
        lineHeight:px(132),
        textAlign:'center',

    },


    //右
    mir:{
        position:'relative',
        width:px(375),
        display:'flex'
    },

    iife:{
        position:'absolute',
        top:'32%',
        left:'15%',
    },


    fenguiz:{
        justifyContent:'center'
    },


    getfen:{
        justifyContent:'center'
    },


    c:{

        fontSize:px(30),
        color:'#565656',

        textAlign:'center',
        paddingTop:'12%'



    },


    d:{
        color:'#838383',
        fontSize:px(24),
        textAlign:'center',
    },









    //尾
    mo:{
        backgroundColor:'#ffffff',
        borderTopWidth:px(2),
        borderTopColor:'#f0f0ef',

    },


    //组件1
    mooo:{
        height:px(192),
        display:'flex',
        flexDirection:'row',
        borderBottomWidth:px(2),
        borderBottomColor:'#f0f0ef'

    },

    //左
    mooolf:{
        width:px(254),
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },

    mooolf1:{
        height:px(151),
        width:px(214),
        borderWidth:px(2),
        borderRadius:px(9),

    },



    //右
    mooori:{},

    //右上
    moooritop:{},


    ee:{
        fontSize:px(32),
        color:'#6b6a6f',
        marginTop:'5%',
    },

    //右下
    moooribom:{
        display:'flex',
        flexDirection:'row',
        marginTop:'13%',
    },

    moooribom1:{},
    e:{
        fontSize:px(32),
        color:'#f4974a',


    },

    moooribom2:{},
    f:{
        fontSize:px(26),
        color:'#878787',
        marginTop:px(7),

    },

    moooribom3:{},
    g:{
        fontSize:px(26),
        color:'#878787',
        marginTop:px(7),
        marginLeft:px(184),
    },






});


export default styles;