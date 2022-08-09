import React, {useEffect, useState} from 'react';
import {px} from '../utils/devices';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';

import Swiper from 'react-native-swiper';

import IconFont from '../src/iconfont';
import Footer from '../component/Footer';
import {SearchBar} from '@ant-design/react-native';
import { redAll } from "../src/apis/sdUser";

function home({navigation}) {
  const [cg,setCg] = useState([])  //渲染全部场馆
  const [type,setType] = useState([])  //场馆的类型

  const typeList = [
          {name:'篮球', icon:'56-lanqiu'},
          {name:'足球', icon:'soccer'},
          {name:'羽毛球', icon:'yumaoqiu'},
          {name:'网球', icon:'huwaiyundong'},
          {name:'乒乓球', icon:'pingpangqiuqiupaitiyuyundongxianxing'},
  ]
  // 查询全部场馆
  useEffect(()=>{
      venue()
  },[])

  // 获取运营商列表
  const venue = async ()=>{
      try {
          const res = await redAll()
          setCg(res);
          const ty = []
          for(var item of res) {
              const atype = []
              typeList.forEach((r, index) => {
                  if (item.type.includes(index + 1)) {
                      atype.push(
                          {name: r.name, icon: r.icon},
                      );
                  }
              })
              ty.push(atype)
          }
          setType(ty)

      } catch (e) {
          console.log(e)
      }

  }

  return (
    <View style={styles.body}>
      <View style={styles.top}>
        <TouchableOpacity onPress={()=>navigation.navigate("CitySelect") }>
          <View style={styles.location}>
            <Text>南宁</Text>
            <Text>▼</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.sous}>
          {/* <SearchBar defaultValue="初始值" placeholder="搜场馆，搜场地" /> */}
        </View>
      </View>
      <SafeAreaView>
        <ScrollView>
          <View style={{height: px(825)}}>
            {/* 轮播图 */}
            <View style={{height: px(422), backgroundColor: 'pink'}}>
              <Swiper
                style={styles.swiper}
                // height={px(800)}
                horizontal={true}
                paginationStyle={{bottom: 10}}
                showsButtons={false}
                loop={true}
                autoplay={true}
                autoplayTimeout={4}
                showsButtons={true}>
                <Image
                  source={require('../assets/img/1.jpg')}
                  style={styles.img}
                />
                <Image
                  source={require('../assets/img/2.jpg')}
                  style={styles.img}
                />
                <Image
                  source={require('../assets/img/3.jpg')}
                  style={styles.img}
                />
              </Swiper>
            </View>

            {/* 快速订场 */}
            <View style={styles.ksdc}>
              {/* 文字 */}
              <View style={styles.characters}>
                <Text style={{fontSize: px(35), height: px(40), color: '#fff'}}>
                  快速订场
                </Text>
              </View>
              {/* 选择栏 */}
              <ScrollView horizontal={true}>
                <View style={styles.xzl}>
                  {/* 篮球 */}
                  <View style={styles.xx}>
                    <TouchableOpacity 
                      onPress={ () => navigation.navigate("Dingchang",{kType:1})}
                      activeOpacity={1}
                    >
                      <View style={styles.xz} >
                        <IconFont name="56-lanqiu" color="#2b2a2a" size={40} />
                        <Text style={{marginTop: px(20)}}>篮球</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* 足球 */}
                  <View style={styles.xx}>
                    <TouchableOpacity 
                      onPress={ () => navigation.navigate("Dingchang",{kType:2})}
                      activeOpacity={1}
                    >
                      <View style={styles.xz}>
                        <IconFont name="soccer" color="#2b2a2a" size={40} />
                        <Text style={{marginTop: px(20)}}>足球</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* 羽毛球 */}
                  <View style={styles.xx}>
                    <TouchableOpacity 
                      onPress={ () => navigation.navigate("Dingchang",{kType:3})}
                      activeOpacity={1}
                    >
                      <View style={styles.xz}>
                        <IconFont name="yumaoqiu" color="#2b2a2a" size={40} />
                        <Text style={{marginTop: px(20)}}>羽毛球</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* 游泳 */}
                  <View style={styles.xx}>
                    <TouchableOpacity 
                      onPress={ () => navigation.navigate("Dingchang",{kType:5})}
                      activeOpacity={1}
                    >
                      <View style={styles.xz}>
                        <IconFont name="pingpangqiuqiupaitiyuyundongxianxing" color="#2b2a2a" size={40} />
                        <Text style={{marginTop: px(20)}}>兵乓球</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* 网球 */}
                  <View style={styles.xx}>
                    <TouchableOpacity 
                      onPress={ () => navigation.navigate("Dingchang",{kType:4})}
                      activeOpacity={1}
                    >
                      <View style={styles.xz}>
                        <IconFont name="huwaiyundong" color="#2b2a2a" size={40} />
                        <Text style={{marginTop: px(20)}}>网球</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
          {/* 热门场馆 */}
          <View style={{paddingLeft: px(28), backgroundColor: '#f3f3f3'}}>
            {/* 文字 */}
            <View style={styles.characters}>
              <Text style={{fontSize: px(35), height: px(40), color: '#000'}}>
                热门场馆
              </Text>
            </View>

            { cg.map( (r,index)=>(
                    <View style={styles.cg} key={index}>
                        <View style={styles.cg_top}>
                            <Image style={styles.cg_top}  source={{ uri: r.pictureAddress,}}/>
                            <View style={styles.content}>
                                {/*场馆名*/}
                                <Text style={styles.ct_tx1}>{r.name}</Text>
                                {/*场馆类型*/}
                                <View style={styles.ct_tx2}>
                                    {  type[index] ? type[index].map((r,index)=>
                                        <View style={styles.ct_logo} key={index}>
                                            <IconFont name={r.icon} size={26} color={'#fcfaf8'}/>
                                            <Text style={styles.lq}>{r.name}</Text>
                                        </View>
                                    ) : null}
                                </View>
                            </View>
                        </View>
                        <View style={styles.cg_bottom}>
                            <Text style={styles.cb_title}>{r.operatorAddress}</Text>
                            <View style={styles.cb_bottom}>
                                <Text style={styles.cbb_q}>{r.priceRange}<Text style={styles.ts}>/小时/场</Text></Text>
                                <Text onPress={ () => navigation.navigate("VenueDetails",{id:r.mid})} style={styles.cbb_dc}>我要订场</Text>
                            </View>
                        </View>
                    </View>
                ))}
          </View>

          {/* 切换栏 */}

          {/*底部*/}
          {/*<Footer navigation={navigation} />*/}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingBottom: px(30)
  },
  // 顶部定位搜索框
  top: {
    flexDirection: 'row',
    paddingLeft: px(30)
  },
  location: {
    width: px(100),
    height: px(85),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sous: {
    width: px(500),
  },
  // 轮播图样式
  swiper: {},
  img: {
    // width: dimensions.width,
    width: px(750),
    height: px(422),
  },

  // 快速订场
  ksdc: {
    flex: 1,
    backgroundColor: '#86704d',
    paddingLeft: px(28),
    paddingRight: px(28),
  },
  //文本
  characters: {
    height: px(35),
    marginTop: px(52),
    marginBottom: px(20),
  },
  // 球馆框
  xzl: {
    width: px(1000),
    height: px(240),
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: px(5),
  },
  // 球馆选择
  xx: {
    height: px(230),
    width: px(177),
    borderRadius: px(35),
    backgroundColor: '#f3f3f3',
    marginHorizontal: 5,
  },
  xz: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: px(230),
  },

  // 热门场馆

  cg: {
    width: px(690),
    marginTop: px(30),
  },
  cg_top: {
    width: px(690),
    height: px(420),
    backgroundColor: '#90ee90',
    borderTopLeftRadius: px(24),
    borderTopRightRadius: px(24),
    position: 'relative',
  },
  content: {
    position: 'absolute',
    left: px(24),
    bottom: px(34),
  },
  ct_tx1: {
    fontSize: px(44),
    color: '#fcfaf8',
    marginTop: px(28),
  },
  ct_tx2: {
    marginTop: px(28),
    flexDirection: 'row',
  },
  ct_logo: {
    flexDirection: 'row',
    marginRight: px(38),
  },
  lq: {
    color: '#fcfaf8',
    fontSize: px(24),
    lineHeight: px(46),
    marginLeft: px(14),
  },
  cg_bottom: {
    width: px(690),
    height: px(238),
    backgroundColor: '#fff',
    borderBottomLeftRadius: px(24),
    borderBottomRightRadius: px(24),
    alignItems: 'center',
  },
  cb_title: {
    width: px(642),
    marginTop: px(50),
    fontSize: px(30),
    fontWeight: 'bold',
  },
  cb_bottom: {
    width: px(642),
    height: px(78),
    marginTop: px(36),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cbb_q: {
    lineHeight: px(78),
    fontSize: px(35),
    color: '#cc1108',
    fontWeight: 'bold',
  },
  ts: {
    color: '#000',
    fontWeight: 'normal',
    fontSize: px(26),
  },
  cbb_dc: {
    width: px(238),
    lineHeight: px(78),
    fontSize: px(28),
    backgroundColor: '#89724b',
    borderRadius: px(39),
    color: '#fff',
    textAlign: 'center',
  },
});

export default home;
