import React, {useState} from 'react';
// import React, { Component } from 'react'
import {px} from '../../utils/devices';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import {Button, Modal, Provider} from '@ant-design/react-native';
import IconFont from '../../src/iconfont';
import {BasicModalExample} from '../../component/Modalx';

function CurriculumParticular() {
  const [name] = useState([
    {
      name: '第一期 :',
      texts1: 'yy-mm-dd',
      datxt1: 'mm-dd',
      datxt2: 'mm-dd',
      textsx: '2人',
      textsy: '2人',
      age: '4-10周岁',
      place: '1800',
    },
    {
      name: '第二期 :',
      texts1: 'yy-mm-dd',
      datxt1: 'mm-dd',
      datxt2: 'mm-dd',
      textsx: '3人',
      textsy: '5人',
      age: '4-16周岁',
      place: '1080',
    },
    {
      name: '第三期 :',
      texts1: 'yy-mm-dd',
      datxt1: 'mm-dd',
      datxt2: 'mm-dd',
      textsx: '4人',
      textsy: '15人',
      age: '4-16周岁',
      place: '1801',
    },
    {
      name: '第四期 :',
      texts1: 'yy-mm-dd',
      datxt1: 'mm-dd',
      datxt2: 'mm-dd',
      textsx: '6人',
      textsy: '50人',
      age: '4-16周岁',
      place: '1010',
    },
    {
      name: '第五期 :',
      texts1: 'yy-mm-dd',
      datxt1: 'mm-dd',
      datxt2: 'mm-dd',
      textsx: '8人',
      textsy: '25人',
      age: '4-16周岁',
      place: '1000',
    },
  ]);
  const [opchange, setOpchange] = React.useState(false); // 立即购买

  return (
    <ScrollView style={Sy.ScrollView}>
      <View style={Sy.body}>
        {/*模块一*/}
        <View style={Sy.bdcp1}>
          <View style={Sy.p1box1}>
            <View style={Sy.x1tu}>
              <IconFont name="zuqiu" size={20} />
            </View>
            <View style={Sy.x1tx}>
              <Text style={Sy.txfb}> 足球暑假班</Text>
            </View>
          </View>
          <View style={Sy.x1tx2}>
            <View style={Sy.tx2p}>
              <IconFont name="tiyuchangguan-01" size={20} />
              <Text style={Sy.txzg}> 开课场馆：</Text>
              <Text style={Sy.txzk}>恒大体育-轩宇球馆</Text>
            </View>
            <View style={Sy.tx2p}>
              <IconFont name="shijian" size={20} />
              <Text style={Sy.txzg}> 开课时间：</Text>
              <Text style={Sy.txzk}>yy-mm-dd</Text>
            </View>
            {/*横线*/}
            <View style={Sy.bodcl} />
          </View>
          {/*训练基本信息*/}
          <View style={Sy.x1tx3}>
            <View style={Sy.tx3p1}>
              <View style={Sy.p1t}>
                <IconFont name="lianxiren" size={20} />
                <Text style={Sy.txzg}> 联系人 ：</Text>
                <Text style={Sy.txzk}>alice</Text>
              </View>
            </View>
            <View style={Sy.p1t}>
              <IconFont name="dianhua" size={20} />
              <Text style={Sy.txzg}> 联系电话 ：</Text>
              <Text style={Sy.txzk}>123456789</Text>
            </View>
            <View style={Sy.tx3p2}>
              <IconFont name="ketangxueyuan" size={20} />
              <Text style={Sy.txzg}> 学员年龄段 :</Text>
              <View style={Sy.p2bt}>
                <Text style={Sy.txzk}>4-14周岁</Text>
              </View>
            </View>
            <View style={Sy.tx3p3}>
              <IconFont name="shijian" size={20} />
              <Text style={Sy.txzg}> 训练时间段 ：</Text>
              <View>
                <Text style={Sy.txzk}>周一至周五：17:00-19:00</Text>
              </View>
            </View>
          </View>
          {/*训练时间段，map遍历*/}
          <View style={Sy.x1tx4}>
            <IconFont name="zhouqi" size={20} />
            <View style={Sy.tx4wk}>
              {name.map(r => (
                <View style={Sy.tx4p}>
                  <Text style={Sy.datx}>{r.name}</Text>
                  <View style={Sy.dat}>
                    <Text style={Sy.datx}>{r.datxt1}</Text>
                    <Text style={Sy.datx}>—</Text>
                    <Text style={Sy.datx}>{r.datxt2}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
        {/*模块二、遍历*/}
        {name.map(r => (
          <View style={Sy.bdcp2}>
            <View style={Sy.p2box1}>
              <Text style={Sy.texts1}>{r.name}</Text>
              <Text style={Sy.texts2}>{r.texts1}</Text>
            </View>
            <View style={Sy.p2box2}>
              <View style={Sy.x2t1}>
                <View style={Sy.t1b}>
                  <Text style={Sy.texts}>已报名人数 ：</Text>
                  <Text style={Sy.texts}>{r.textsx}</Text>
                </View>
                <View style={Sy.t1b2}>
                  <Text style={Sy.texts}>已报名人数 ：</Text>
                  <Text style={Sy.texts}>{r.textsy}</Text>
                </View>
              </View>
              <View style={Sy.x2t2}>
                <Text style={Sy.texts}>年龄段：</Text>
                <Text style={Sy.texts}>{r.age}</Text>
              </View>
            </View>
            <View style={Sy.p2box3}>
              <View style={Sy.x3t1}>
                <Text style={Sy.tsz1}>￥</Text>
                <Text style={Sy.tsz2}>{r.place}</Text>
              </View>
              <View style={Sy.x3t2}>
                {/*点击购买按钮*/}
                <Button
                  onPress={() => {
                    setOpchange(true);
                  }}
                  activeStyle={{backgroundColor: '#333'}} //点击之后变色
                  style={Sy.anop}>
                  <Text style={Sy.tsan}>立即购买</Text>
                </Button>
                {/*点击后上拉的内容*/}
                <Modal
                  popup
                  maskClosable={true}
                  visible={opchange}
                  animationType="slide-up">
                  <View style={Sy.yman}>
                    <View style={Sy.yman1}>
                      <Text style={Sy.yman1x}>￥ 1800.00</Text>
                      <TouchableOpacity onPress={() => setOpchange(false)}>
                        <View>
                          <IconFont name="quxiao" size={20} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={Sy.yman2}>
                      <Text style={Sy.yman2x}>选择规格</Text>
                    </View>
                    <View style={Sy.mom}>
                      <Text>第三期：17：00-19：00</Text>
                    </View>
                    <View style={Sy.mom2}>
                      <Text>库存</Text>
                    </View>
                  </View>
                  {/*购买成功*/}
                  <Button style={Sy.anop2} onPress={() => alert('购买成功')}>
                    立即购买
                  </Button>
                </Modal>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const Sy = StyleSheet.create({
  ScrollView: {
    flex: 1,
  },
  body: {
    // backgroundColor: '#ffffff',
  },
  anop: {
    backgroundColor: '#ffc900',
    width: px(240),
    height: px(80),
    borderRadius: px(30),
  },
  anop2: {
    backgroundColor: '#ffc900',
    height: px(80),
    borderRadius: px(30),
    marginLeft: px(30),
    marginRight: px(30),
    marginBottom: px(30),
  },
  bdcp1: {
    height: px(810),
    marginTop: px(20),
    marginRight: px(30),
    marginLeft: px(30),
    elevation: 1.5, // 控制阴影
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 3,
    shadowRadius: 1.5,
    borderRadius: px(20),
  },
  p1box1: {
    marginTop: px(50),
    marginBottom: px(10),
    marginRight: px(30),
    marginLeft: px(30),
    display: 'flex',
    flexDirection: 'row',
  },
  x1tu: {
    width: px(36),
    height: px(36),
  },
  x1tx: {
    marginBottom: px(10),
    // marginLeft: px(20),
  },
  txfb: {
    fontSize: px(30),
    color: '#1d1d1d',
  },
  x1tx2: {
    marginRight: px(30),
    marginLeft: px(30),
  },
  tx2p: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: px(20),
  },
  txzg: {
    fontSize: px(26),
    color: '#333333',
  },
  txzk: {
    fontSize: px(24),
    color: '#333333',
  },
  bodcl: {
    marginTop: px(34),
    borderWidth: px(2),
    borderColor: 'rgba(24,24,6,0.2)',
  },
  x1tx3: {
    marginLeft: px(30),
    marginRight: px(30),
  },
  tx3p1: {
    marginTop: px(20),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tx3p2: {
    marginTop: px(20),
    display: 'flex',
    flexDirection: 'row',
  },
  tx3p3: {
    marginTop: px(20),
    display: 'flex',
    flexDirection: 'row',
  },
  p2bt: {
    marginLeft: px(24),
  },
  p1t: {
    marginTop: px(20),
    display: 'flex',
    flexDirection: 'row',
  },
  x1tx4: {
    marginTop: px(20),
    marginRight: px(30),
    marginLeft: px(30),
    display: 'flex',
    flexDirection: 'row',
  },
  tx4wk: {
    marginLeft: px(10),
    marginTop: px(-10),
  },
  tx4p: {
    marginTop: px(10),
    display: 'flex',
    flexDirection: 'row',
  },
  dat: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: px(24),
  },
  datx: {
    fontSize: px(24),
    color: '#333333',
  },
  bdcp2: {
    marginTop: px(20),
    marginBottom: px(10),
    marginRight: px(30),
    marginLeft: px(30),
    elevation: 1.5, // 控制阴影
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 3,
    shadowRadius: 1.5,
    borderRadius: px(20),
  },
  p2box1: {
    paddingLeft: px(30),
    paddingTop: px(40),
    display: 'flex',
    flexDirection: 'row',
  },
  texts1: {
    fontSize: px(26),
    color: '#242424',
  },
  texts2: {
    marginLeft: px(20),
    fontSize: px(26),
    color: '#242424',
  },
  p2box2: {
    paddingLeft: px(30),
    paddingTop: px(40),
  },
  texts: {
    fontSize: px(24),
    color: '#525252',
  },
  x2t1: {
    display: 'flex',
    flexDirection: 'row',
  },
  t1b: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  t1b2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: px(130),
  },
  x2t2: {
    paddingTop: px(24),
    display: 'flex',
    flexDirection: 'row',
  },
  p2box3: {
    paddingTop: px(20),
    paddingLeft: px(30),
    paddingRight: px(30),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  x3t1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tsz1: {
    fontSize: px(24),
    color: '#86734d',
  },
  tsz2: {
    fontSize: px(36),
    color: '#86734d',
  },
  x3t2: {
    marginBottom: px(20),
  },
  tsan: {
    color: '#fff',
    fontSize: px(34),
    fontWeight: '700',
  },
  yman: {
    height: px(400),
    paddingLeft: px(30),
    paddingRight: px(30),
  },
  yman1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: px(1),
    borderBottomColor: '#86734d',
  },
  yman1x: {
    height: px(100),
    color: '#86734d',
    fontSize: px(30),
    paddingTop: px(30),
  },
  yman2: {
    paddingTop: px(16),
  },
  yman2x: {
    color: '#333333',
    fontSize: px(28),
  },
  mom: {
    width: px(375),
    marginTop: px(16),
    paddingTop: px(10),
    paddingBottom: px(10),
    paddingRight: px(30),
    paddingLeft: px(30),
    borderRadius: px(15),
    backgroundColor: '#999',
  },
  mom2: {
    marginTop: px(16),
  },
});

export default CurriculumParticular;
