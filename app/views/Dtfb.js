

 import React from 'react';
 import { px } from '../utils/devices'
  import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button
  } from 'react-native';

  import IconFont from '../src/iconfont';
  // import { TextInput } from 'react-native';

  //import { TextInput,View, TextInput } from 'react-native';

 function Dtfb() {
 
    const [value, onChangeText] = React.useState('    想要说点什么~');
    const [isPublic, setIsPublic] = React.useState(false);

    const publicBtn = () => {
      setIsPublic
    }

    return (
        <View style={{ height:px(1530),backgroundColor: '#131313',position:'relative'}}>


            {/* 头部 */}
          <View style={{height: px(104)}}>
               <View style={{display:'flex',flexDirection:'row',justifyContent:"space-between",height:px(40),width:px(685),marginTop:px(20),marginLeft:px(25)}}>
                      {/* 图标 */}
                      <View style={{ marginTop:px(35)}}>
                          {/* 为了调距离用文字占位置 */}
                          <Text>是的</Text>
                          <IconFont name="gengduo" color="#f1f1f1" size={16} />
                      </View>

                      {/* 发布动态字样 */}
                      <View>
                          <Text style={{ height:px(80),color:'#ffffff',fontSize:px(35),marginTop:px(20)}}>发布动态</Text>
                      </View>

                      {/* 发布点击 */}
                      <View>
                       
                          <Text style={{ height:px(80),color:'#d6c862',fontSize:px(32),marginTop:px(20)}}>发布</Text>
                  
                      </View>
                </View>

           </View>


            {/* 动态文案 */}
            <View style={{ height:px(612),backgroundColor: '#313637',padding:px(30)}}>
                {/* 文案输入 */}
                <View >
                <TextInput
                    style={{ height: 200, borderColor: 'gray', borderWidth: 1 ,fontSize: px(40),display:'flex',flexDirection:'row'}}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    editable={true}
                    multiline={true}
                    numberOfLines={6}
                  
                  />
                
                </View>
                {/* 图片添加 */}
                <View>

                </View>
            </View>

            {/* 话题添加栏 */}
            <View style={{ height:px(152),display:'flex',justifyContent:'center',}}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:px(694),height:px(64),marginLeft:px(28)}}>
                  {/* 选择话题 */}
                  <View style={ys.xzht}>
                        <Text style={{fontSize:px(26),lineHeight:px(58),marginLeft:px(10)}}>#添加话题</Text>
                  </View>

                  {/* 是否公开 */}
                  <View style={{ display:'flex',justifyContent:'space-between',flexDirection:'row'}}>

                      {/* 图标 */}
                      <View style={{marginTop:px(5)}}>
                        <IconFont name="iconset0115" color="#98989b" size={20} />
                      </View>

                      {/* 公开字体样式 */}

                      <View >
                        <Text style={{ color:'#98989b',fontSize:px(36),marginLeft:px(10)}}>{isPublic ? '公开' : '不公开'}</Text>
                        <Button title="点击更改" onPress={publicBtn()} />
                      </View>

                  </View>
                </View>
            </View>


            {/* 所属比赛类型 */}
            <View style={{ height:px(115), backgroundColor:'#313637',display:'flex',justifyContent:'center'}}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:px(694),height:px(60),marginLeft:px(28),marginTop:px(20)}}>
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                          <View>
                              <IconFont name="icon--" color="#98989b" size={20} />
                          </View>
                          <View>
                              <Text style={{color:'#ffffff',fontSize:px(30),marginLeft:px(10)}}>所属比赛</Text>
                          </View>
                    </View>

                    <View>
                        <IconFont name="gengduo1" color="#98989b" size={18} />
                    </View>

                </View>
            </View>

            {/* 同步选择 */}
            <View style={{ height:px(115),marginTop:px(30),backgroundColor:'#313637',display:'flex',justifyContent:'center'}}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:px(694),height:px(60),marginLeft:px(28),marginTop:px(20)}}>
                    <View>
                      <Text style={{ color:'#c3c3c6'}}>同步到</Text>
                    </View>

                    <View style={{width:px(200), display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                      <IconFont name="pengyouquan" color="#98989b" size={18} />
                      <IconFont name="weixin" color="#98989b" size={18} />
                      <IconFont name="qq" color="#98989b" size={18} />
                      <IconFont name="kongjian" color="#98989b" size={18} />
                    </View>
                </View>
            </View>


            {/* 白色横杠 */}
            {/* <View style={ys.bs}>

            </View> */}

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
      // 输入框
      inputbox:{
        height:px(400),
        width:px(688),
        backgroundColor: '#ffffff',
      },

      // 选择话题
      xzht:{
        width:px(140),
        height:px(58),
        backgroundColor:'#f5ba40',
        borderRadius:px(15)
      },




      // 白色横杠
      bs:{
        width:px(270),
        height:px(13),
        backgroundColor:'#fefefe',
        borderRadius:px(5),
        marginBottom:px(20),
        marginLeft:px(250)
        
      },







  })
  

 


 
 
 

  
  export default Dtfb;
  