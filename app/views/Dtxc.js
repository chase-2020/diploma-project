
 import React from 'react';
 import { px } from '../utils/devices'
  import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  

  import IconFont from '../src/iconfont';
 
 function Dtxc() {
 
  
    return (
        <View style={{ height:px(1530),backgroundColor: '#131313',position:'relative'}}>


            {/* 相册与集锦 */}
            <View style={{height: px(104)}}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:"space-between",height:px(40),width:px(450),marginTop:px(20),marginLeft:px(35)}}>
                    <View style={{ marginTop:px(35)}}>
                        <IconFont name="gengduo" color="#ffffff" size={16} />
                    </View>

                    <View style={ys.album}>
                        <View style={ys.jj}>
                            <Text style={{ width:px(60), height:px(100),color:'#edc068' }}>相册</Text>
                            
                        </View>
                        <View >
                            <Text style={{marginLeft:px(20),height:px(100),color:'#ffffff' }}>集锦</Text>
                        </View>
                    </View>
                </View>

            </View>


            {/* 暂无动态 */}
            <View style={{ flex: 1,justifyContent: 'center'}}>
                <View style={{display: 'flex',flexDirection:'row',justifyContent:'center'}}>
                     <IconFont name="wenjianbi" color="#989898" size={150} />
                </View>
                <View style={{display: 'flex',flexDirection:'row',justifyContent:'center'}}>
                    <Text style={{color:'#989898' }}>暂无个人动态，快去发布吧</Text>
                </View>
            </View>


           

            <View style={ys.bs}>

            </View>

        </View>

    
    );
  };
  const ys = StyleSheet.create({      //全局样式
         bzt: {                          //白字体
          fontSize:px(24),
          color: '#ffffff'
      },


    //相册和锦集
      album: {             
            width: px(214),       
            height: px(50),
            display:'flex',
            flexDirection: 'row',
            marginTop:px(20)
            
      },

      //集锦
      jj:{
          width:px(102),
          borderBottomWidth:px(3),
          borderBottomColor: '#edc068',
          paddingLeft:px(22)
      },

    //   白色横杠
      bs:{
        width:px(270),
        height:px(13),
        backgroundColor:'#fefefe',
        borderRadius:px(5),
        marginBottom:px(20),
        marginLeft:px(250)
        
      },







  })
  

 


 
 
 

  
  export default Dtxc;
  