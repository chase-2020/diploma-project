import React from 'react';
import {px} from '../../utils/devices';
import IconFont from '../../src/iconfont'; //引入图标库
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Switch,
  Button,
} from 'react-native';
import {TextareaItem} from '@ant-design/react-native';

function OrderParticular() {
  return (
    <ScrollView style={Sy.ScrollView}>
      <View style={Sy.body}>
        {/*模块一课程信息*/}
        <View style={Sy.bdu1}>
          <View style={Sy.u1t}>
            <Text style={Sy.u1tx}>课程信息</Text>
          </View>
          <View style={Sy.u1bull}>
            <View style={Sy.bup}>
              <View style={Sy.pc1}>
                <Text style={Sy.bull}>球类</Text>
              </View>
              <View style={Sy.pc2}>
                <View style={Sy.buc}>
                  <Text style={Sy.fc}>足球暑假班</Text>
                </View>
                <View style={Sy.buc2}>
                  <Text style={Sy.fc}>5节课</Text>
                  <Text style={Sy.hs}>适合：1-4岁</Text>
                  <Text style={Sy.ybox}>￥180.00</Text>
                </View>
                <View style={Sy.buc3}>
                  <Text style={Sy.fc}>课程开始时间</Text>
                  <Text style={Sy.ybox}>yyy-mm-dd</Text>
                </View>
              </View>
            </View>
            <View style={Sy.buft}>
              <Text style={Sy.sf}>总价</Text>
              <Text style={Sy.ybox2}>￥1800.00</Text>
            </View>
            <View style={Sy.buft1}>
              <Text style={Sy.sf}>实付款</Text>
              <Text style={Sy.ybox3}>￥1800.00</Text>
            </View>
          </View>
        </View>
        {/*模块二场地信息*/}
        <View style={Sy.bdu2}>
          <View style={Sy.u1t}>
            <Text style={Sy.u1tx}>场地信息</Text>
          </View>
          <View style={Sy.u2place}>
            <View style={Sy.pz}>
              <Text style={Sy.cg}>场馆 :</Text>
              <View style={Sy.pzc}>
                <Text style={Sy.ct}>恒大体育-玄羽球馆</Text>
              </View>
            </View>
            <View style={Sy.pz2}>
              <Text style={Sy.cg}>地址 :</Text>
              <View style={Sy.pzc}>
                <Text style={Sy.ct}>南宁市西乡塘区科园大道34号楼</Text>
              </View>
            </View>
          </View>
        </View>
        {/*模块三学院消息*/}
        <View style={Sy.bdu3}>
          <View style={Sy.u1t}>
            <Text style={Sy.u1tx}>学院信息</Text>
          </View>
          <View style={Sy.u2place}>
            <View style={Sy.pz}>
              <Text style={Sy.cg}>学院姓名 :</Text>
              <View style={Sy.pzc}>
                <Text style={Sy.ct}>恒大体育-玄羽球馆</Text>
              </View>
            </View>
            <View style={Sy.pz2}>
              <Text style={Sy.cg}>学员家长联系电话 :</Text>
              <View style={Sy.pzc}>
                <Text style={Sy.ct}>123456</Text>
              </View>
            </View>
          </View>
        </View>
        {/*模块四按钮点击*/}
        <View style={Sy.bdu4}>
          <View style={Sy.butf}>
            <Text style={Sy.trtl}>取消订单</Text>
          </View>
          <View style={Sy.butr}>
            <Text style={Sy.trxt}>付款</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const Sy = StyleSheet.create({
  ScrollView: {
    flex: 1,
  },
  body: {
    backgroundColor: '#fff',
  },
  bdu1: {
    height: px(560),
    paddingLeft: px(30),
    paddingRight: px(30),
    marginBottom: px(40),
  },
  u1t: {
    height: px(80),
    display: 'flex',
    justifyContent: 'center',
    marginBottom: px(20),
  },
  u1tx: {
    fontSize: px(30),
    color: '#333',
    fontWeight: '700',
  },
  u1bull: {
    backgroundColor: '#ffffff',
    elevation: 4, // 控制阴影
    shadowColor: 'rgba(24,24,6,0.89)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 3,
    shadowRadius: 1.5,
    borderRadius: px(20),
  },
  bup: {
    height: px(200),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: px(20),
  },
  buc: {
    paddingTop: px(20),
    paddingBottom: px(24),
  },
  fc: {
    fontSize: px(28),
    color: '#333',
  },
  hs: {
    fontSize: px(30),
    color: '#ccc',
  },
  ybox: {
    fontSize: px(30),
    color: '#ccc',
  },
  buc2: {
    paddingBottom: px(24),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buc3: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buft: {
    height: px(90),
    marginLeft: px(30),
    marginRight: px(30),
    marginTop: px(20),
    borderBottomWidth: px(2),
    borderTopWidth: px(2),
    borderColor: 'rgba(153,153,153,0.38)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ybox2: {
    fontSize: px(30),
    color: '#ccc',
  },
  ybox3: {
    fontSize: px(38),
    color: '#89776e',
    // backgroundColor:'red',
  },
  sf: {
    fontSize: px(30),
    color: '#333',
  },
  buft1: {
    height: px(110),
    marginLeft: px(30),
    marginRight: px(30),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor:'red',
  },
  bull: {},
  pc1: {
    height: px(200),
    width: px(150),
    // backgroundColor:'#333',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(20),
  },
  pc2: {
    height: px(200),
    width: px(160),
    paddingRight: px(30),
    paddingLeft: px(20),
    // backgroundColor:'#cfd',
    display: 'flex',
    flexGrow: 1,
  },
  bdu2: {
    height: px(300),
    paddingLeft: px(30),
    paddingRight: px(30),
    backgroundColor: '#ffffff',
    elevation: 4, // 控制阴影
    shadowColor: 'rgba(24,24,6,0.89)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 3,
    shadowRadius: 1.5,
    // backgroundColor: '#ffc',
  },

  u2place: {
    // backgroundColor: '#eec',
  },
  pz: {
    height: px(80),
    display: 'flex',
    flexDirection: 'row',
    // justifyContent:''
    alignItems: 'center',
  },
  pzc: {
    marginLeft: px(30),
  },
  cg: {
    color: '#959595',
    fontSize: px(30),
  },
  ct: {
    color: '#959595',
    fontSize: px(28),
  },
  pz2: {
    height: px(80),
    display: 'flex',
    flexDirection: 'row',
    // justifyContent:''
    alignItems: 'center',
  },
  bdu3: {
    height: px(340),
    marginTop: px(30),
    paddingLeft: px(30),
    paddingRight: px(30),
    backgroundColor: '#ffffff',
    elevation: 4, // 控制阴影
    shadowColor: 'rgba(24,24,6,0.89)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 3,
    shadowRadius: 1.5,
    // backgroundColor: '#fcc',
  },
  u3Institute: {
    backgroundColor: '#aac',
  },
  bdu4: {
    height: px(100),
    marginLeft: px(80),
    marginRight: px(80),
    marginTop: px(100),
    marginBottom: px(200),
    // backgroundColor: '#aba',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  butf: {
    height: px(90),
    width: px(230),
    borderWidth: px(1),
    borderColor: '#ffcd00',
    borderRadius: px(60),
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trtl: {
    fontSize: px(26),
    color: '#ffc900',
  },
  trxt: {
    fontSize: px(26),
    color: '#fff',
  },
  butr: {
    height: px(90),
    width: px(230),
    borderWidth: px(1),
    borderColor: '#ffcd00',
    borderRadius: px(60),
    backgroundColor: '#ffc900',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OrderParticular;
