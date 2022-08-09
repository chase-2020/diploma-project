
 import React from 'react';
 import { px } from '../utils/devices'
  import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  

  import IconFont from '../src/iconfont';
 
 function Dtjj() {
 
  
    return (
        <View style={{ height:px(1521),backgroundColor: '#131313'}}>


            {/* 相册与集锦 */}
            <View style={{height: px(104)}}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:"space-between",height:px(40),width:px(450),marginTop:px(20),marginLeft:px(35)}}>
                    <View style={{ marginTop:px(35)}}>
                        <IconFont name="gengduo" color="#ffffff" size={16} />
                    </View>

                    <View style={ys.album}>
                        <View >
                            <Text style={{ width:px(60), height:px(100),color:'#ffffff' }}>相册</Text>
                            
                        </View>
                        <View style={ys.jj}>
                            <Text style={{marginLeft:px(20),height:px(100),color:'#edc068' }}>集锦</Text>
                        </View>
                    </View>
                </View>

            </View>

            {/* 发布过的视频 */}
            <View style={{ backgroundColor:'#1f1f22'}}>  
                <View style={ys.before}>
                    {/* 文字 */}
                    <View >
                        <Text style={{ width:px(300), height:px(100),marginTop:px(22),color:'#ffffff' }}>我发布的视频</Text>
                    </View>

                    {/* 图标 */}
                    <View style={{marginTop:px(33) }}>
                        <IconFont name="gengduo1" color="#ffffff" size={12} />
                    </View>
                </View>
            </View>

            {/* 未发布界面 */}
            <View style={ys.weic}>                      
                <View style={{ height:px(50),marginTop:px(40)}}>
                     <Text style={{ color:'#4f4f4f' }}> 亲，还没有发布过集锦 ~~</Text>

                </View>
            </View>

            {/* 本地拍摄镜头 */}
            <View style={{ backgroundColor:'#1f1f22'}}>  
                <View style={ys.before}>
                    {/* 文字 */}
                    <View >
                        <Text style={{ width:px(300), height:px(100),marginTop:px(22),color:'#ffffff' }}>本地拍摄的镜头</Text>
                    </View>

                    {/* 图标 */}
                    <View style={{marginTop:px(33) }}>
                        <IconFont name="gengduo1" color="#ffffff" size={12} />
                    </View>
                </View>
            </View>

            {/* 拍摄镜头 */}
            <View style={{ flex: 1,justifyContent: 'center',paddingLeft: px(180)}}>
            
                <Text style={{ height: px(40),width :px(500),color:'#4f4f4f',marginLeft: px(68) }}> 亲，还没有本地镜头</Text>
                <Text style={{color:'#4f4f4f' }}>快使用拍拍功能捕捉精彩瞬间吧</Text>

            </View>

            {/* 制作新集锦 */}
            <View style={ys.new }>

                <View style={ys.new1}>
                    <Text style={{ marginLeft: px(255),color:'#5f1317',fontSize: px(30) }}> 制作新的集锦</Text>
                </View>
                {/* 黑色横杠 */}
                <View style={ys.new11}>
                <Text style={{ marginLeft: px(255),color:'#ffffff',fontSize: px(30) }}> 制作新的集锦</Text>

                </View>

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
          borderBottomColor: '#cfbe73',
      },


    // 我发布的视频
      before: {      
            width: px(690),       
            height: px(88),
            borderBottomWidth: px(1),
            borderBottomColor: '#5c5c5f'  ,
            display:'flex',
            flexDirection: 'row',
            justifyContent:'space-between',
            marginLeft:px(32),
      },







      weic: {
          //width: px(400),
          height: px(148),
      },

      bdps: {
          height: px(86),
          backgroundColor: '#1f1f22',
          paddingLeft: px(20),
          display:'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: '#5c5c5f'
      },

      new:{
          height: px(164),
          backgroundColor: '#343339',
          position: 'relative',
          display:'flex',
          flexDirection: 'row',
          justifyContent:'center'
      },

      new1:{
          height: px(148),
          width: px(718),
          backgroundColor: '#f8bc37',
          borderRadius: px(20),
          marginTop: px(10),
          marginLeft: px(10),
        //  flexDirection: 'row',
          justifyContent: 'center',
          
      },
    //   黑色横杠
      new11:{
        width:px(270),
        height:px(13),
        backgroundColor:'#2e2e31',
        position: 'absolute',
        borderRadius:px(5),
        marginTop: px(140)
        
      },





  })
  

 


 
 
 

  
  export default Dtjj;
  