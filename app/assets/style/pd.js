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




    too:{
        height:'100%',
        display:'flex',
        backgroundColor:'#f4f9f8',

    },









    //主体
    middom:{
        height:px(336),
        marginBottom:px(50),

    },


    //主体上部
    middomt:{
        backgroundColor:'#eec34e',

    },

    //主体上部1
    middomtt:{
        height:px(219),
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',


    },

    middomtt1:{

    },

    middomtt2:{

    },

    middomtt3:{

    },


    b:{
        fontSize:px(80),
        color:'#faffff',
        lineHeight:px(219),
        textAlign:'center',

    },





    //主体上部2
    middomto:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingBottom:px(5),
    },

    middomto1:{},

    middomto2:{
        paddingTop:px(4),
    },

    c:{
        fontSize:px(25),
        color:'#faffff',

    },






    //主体下部
    smiddomb:{
        height:px(117),
        display:'flex',
        flexDirection:'row',
        position:'relative',
        backgroundColor:'#ffffff',


    },

    smiddomb1:{

    },

    d:{

        color:'#484848',
        lineHeight:px(117),
        textAlign:'center',
        paddingLeft:px(33),
    },

    smiddomb2:{},

    e:{
        fontSize:px(30),
        color:'#484848',
        lineHeight:px(117),
        textAlign:'center',
        paddingLeft:px(13),
    },


    smiddomb3:{
        position:'absolute',
        top:'5%',
        right:'5%',

    },





    //底部
    bootmo:{

        flex:1,
        backgroundColor:'#ffffff',


    },


    //bootmo1
    bootmo1:{
        height:px(58),
        marginLeft:px(25)
    },


    f:{
        fontSize:px(24),
        color:'#c6c6c6',
        lineHeight:px(58),


    },


    //底部尾
    bootmo2:{},


    //一个组件
    fenqian:{
        borderTopWidth:px(2),
        borderTopColor:'#f7f7f7',
        display:'flex',
        flexDirection:'row',
        height:px(126),


    },



    //左
    fenqianlf:{
        width:px(260),

        display:'flex',
        justifyContent:'center',
        alignItems:'center',


    },


    fenqianlf1:{},

    g:{
        fontSize:px(32),
        color:'#484b4d',
    },


    fenqianlf2:{},

    i:{
        fontSize:px(24),
        color:'#a2a5a5',
    },







    //右
    fenqianri:{
        display:'flex',
        justifyContent:'center',

    },



    h:{
        fontSize:px(50),
        paddingLeft:'50%',
    },













});


export default styles;