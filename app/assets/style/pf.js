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
















    dada:{
        display:'flex',
        height:'100%',
    },








    //主体
    body:{

        flex:1,
        height:0,


    },


    bodytop:{},



    bodybom:{},












    //底部
    bottom:{
        height:px(80),

        display:'flex',

    },

    bottom111:{

        height:px(80),
        width:px(686),
        backgroundColor:'#827351',
        borderRadius:px(40),
        marginLeft:'auto',
        marginRight:'auto',


    },




    chunk:{
        fontSize:px(30),
        color:'#fefaea',
        lineHeight:px(80),
        textAlign:'center',
    },


});



export default styles;