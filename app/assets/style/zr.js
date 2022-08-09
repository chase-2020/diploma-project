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



    toto:{

    },


    //头
    hhead:{
        height:px(147),
        display:'flex',
        flexDirection:'row',

    },


    hhead1:{
        width:px(250),

    },

    vv:{

    },


    ve:{

    },







    hhead2:{
        width:px(250),
        borderLeftWidth:px(1),
        borderRightWidth:px(1),
        borderColor:'#e9e9e9',
    },
    hhead3:{
        width:px(250),
    },



    //主体
    bodi:{
        height:px(147),

    },


    yeye:{},




    //尾
    wwe:{
        height:px(117),
        backgroundColor:'#ffffff',


    },

    didi:{
        height:px(78),
        width:px(654),
        backgroundColor:'#5b73f2',
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius:px(40),

    },

    abq:{
        fontSize:px(26),
        color:'#fcfdff',
        textAlign:'center',
        lineHeight:px(78)
    },


});



export default styles;