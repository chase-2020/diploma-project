import React, {useEffect, useRef, useState} from 'react';
import {px} from '../../utils/devices';
import IconFont from '../../src/iconfont';
import {
  Button,
  Modal,
  PickerView,
  DatePicker,
  List,
  Provider,
} from '@ant-design/react-native'; //选择器
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {findUser, useUpdate} from '../../src/apis/user';
import {activity, venueAll} from '../../src/apis/sdUser';
import {useSelector} from 'react-redux'; // 路由传值

function Alice({navigation}) {
  const seasons = [
    [
      {
        label: '男',
        value: '男',
      },
      {
        label: '女',
        value: '女',
      },
    ],
  ]; // 男 女
  const [value, setValue] = useState(''); //性别选择
  const [valuename, onChangeName] = React.useState(null); //获取名称
  const [number, onChangeNumber] = React.useState(null); //获取手机号
  const [valuehobby, onChangeHobby] = React.useState(null); //获取爱好
  const [valuesignature, onChangeSignature] = React.useState(null); //获取签名
  const [valuedate, onChangeDate] = React.useState(''); //获取日期
  const [opchange, setOpchange] = useState(false); // 立即购买

  const user = useSelector(state => state.userStore.userInfo); //  获取数据库中的用户信息
  console.log(user.photo);

  return (
    <ScrollView style={Sy.ScrollView}>
      <View style={Sy.body}>
        {/*头像*/}
        <View style={Sy.bd}>
          <Text style={Sy.tx02}>头像</Text>
          <View style={Sy.tx02x}>
            <View style={styles.container}>
              {/*<Image*/}
              {/*  style={styles.tinyLogo}*/}
              {/*  source={require('../../android/app/src/main/res/drawable/th2.png')}*/}
              {/*/>*/}
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: user.photo,
                }}
              />
            </View>
            <View>
              <IconFont
                name="zhaoshangxiaochengxu-jiantou-you"
                size={20}
                color="#ddd"
                style={Sy.tx022}
              />
            </View>
          </View>
        </View>
        {/*名称*/}
        <View style={Sy.bdto}>
          <Text style={Sy.name}>昵称</Text>
          {/*跳转页面、用路由值给下一个页面*/}
          <TouchableOpacity
            onPress={() => navigation.navigate('AlterName', {a: user})}>
            <View style={Sy.tx02x}>
              {/*获取数据库传过来的名称*/}
              <Text style={Sy.rtx}>{user.username}</Text>
              {/*<SafeAreaView>*/}
              {/*<TextInput*/}
              {/*  style={styles.input}*/}
              {/*  onChangeText={onChangeName}*/}
              {/*  value={valuename,findUif.username}*/}
              {/*  placeholder="输入名称"*/}
              {/*  keyboardType="default"*/}
              {/*/>*/}
              {/*</SafeAreaView>*/}
              <View>
                <IconFont
                  name="zhaoshangxiaochengxu-jiantou-you"
                  size={20}
                  color="#ddd"
                  style={Sy.tx022}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {/*我的二维码*/}
        <View style={Sy.bdsr}>
          <Text style={Sy.mycode}>我的二维码</Text>
          <View style={Sy.tx02x}>
            <View>
              <IconFont name="erweima4" size={32} color="#ccc" />
            </View>
            <View>
              <IconFont
                name="zhaoshangxiaochengxu-jiantou-you"
                size={20}
                color="#ddd"
                style={Sy.tx022}
              />
            </View>
          </View>
        </View>
        {/*我的封面*/}
        <View style={Sy.bdfo}>
          <Text style={Sy.mycover}>我的封面</Text>
          <View style={Sy.tx02x}>
            <Text style={Sy.cover}>上传个人封面</Text>
            <View>
              <IconFont
                name="zhaoshangxiaochengxu-jiantou-you"
                size={20}
                color="#ddd"
                style={Sy.tx022}
              />
            </View>
          </View>
        </View>
        {/*性别*/}
        <View style={Sy.bdfy}>
          <Text style={Sy.myname}>性别</Text>
          <View style={Sy.tx02x}>
            <Text style={Sy.mynametx} onPress={() => [setOpchange(true)]}>
              {/*选择性别*/}
              选择性别
            </Text>
            <Modal
              popup
              maskClosable={true}
              visible={opchange}
              animationType="slide-up">
              {/*点击后上拉的内容*/}
              <View style={Sy.ymana}>
                <View style={Sy.yman1a}>
                  <Text style={Sy.yman1xa} />
                  <TouchableOpacity onPress={() => setOpchange(false)}>
                    <View>
                      <IconFont name="quxiao" size={20} />
                    </View>
                  </TouchableOpacity>
                </View>
                {/*选择男女*/}
                <PickerView
                  onChange={setValue}
                  value={value}
                  data={seasons}
                  cascade={false}
                />
                <View />
              </View>
              {/*按钮点击*/}
              <Button style={Sy.anop2} onPress={() => alert('修改成功')}>
                确定
              </Button>
            </Modal>
            <View>
              <IconFont
                onPress={() => setOpchange(true)} //单机图标选择性别
                name="zhaoshangxiaochengxu-jiantou-you"
                size={20}
                color="#ddd"
                style={Sy.tx022}
              />
            </View>
          </View>
        </View>
        {/*生日*/}
        <View style={Sy.bdfy}>
          <Text style={Sy.myname}>生日</Text>
          <View style={Sy.tx02x}>
            {/*<Text style={Sy.mynametx}>选择日期</Text>*/}
            {/*获取数据库传过来的生日*/}
            {/*<Text style={Sy.rtx}>{user.birthday}</Text>*/}
            <Text style={Sy.mynametx}>
              {/*{user.birthday}*/}
              <DatePicker
                value={valuedate}
                onChange={onChangeDate}
                mode="date"
                defaultDate={new Date()}
                minDate={new Date(1970, 1, 1)}
                maxDate={new Date(2026, 11, 3)}
                itemStyle={{}}
                format="YYYY-MM-DD">
                <List.Item />
              </DatePicker>
            </Text>
            <View>
              <IconFont
                name="zhaoshangxiaochengxu-jiantou-you"
                size={20}
                color="#ddd"
                style={Sy.tx022x}
              />
            </View>
          </View>
        </View>
        {/*手机*/}
        <View style={Sy.bdxs}>
          <Text style={Sy.myphone}>手机</Text>
          {/*输入手机号*/}
          {/*跳转页面、用路由值给下一个页面*/}
          <TouchableOpacity
            onPress={() => navigation.navigate('AccountPhone', {a: user})}>
            <View style={Sy.tx02x}>
              {/*获取数据库传过来的名称*/}
              <Text style={Sy.rtx}>{user.phone}</Text>
              {/*<SafeAreaView>*/}
              {/*  <TextInput*/}
              {/*    style={styles.input}*/}
              {/*    onChangeText={onChangeNumber}*/}
              {/*    value={number}*/}
              {/*    placeholder="我的手机号"*/}
              {/*    keyboardType="numeric"*/}
              {/*  />*/}
              {/*</SafeAreaView>*/}
              <View>
                <IconFont
                  name="zhaoshangxiaochengxu-jiantou-you"
                  size={20}
                  color="#ddd"
                  style={Sy.tx022}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {/*特别爱好*/}
        <View style={Sy.bdseven}>
          <Text style={Sy.myhobby}>兴趣爱好</Text>
          <View style={Sy.tx02x}>
            {/*我的爱好*/}
            <SafeAreaView>
              <TextInput
                style={styles.input}
                onChangeText={onChangeHobby}
                value={valuehobby}
                placeholder="我喜欢的运动"
                keyboardType="default"
              />
            </SafeAreaView>
            {/*获取数据库传过来的信息*/}
            <Text style={Sy.choosehy}>{user.hobby}</Text>
            <View>
              <IconFont
                name="zhaoshangxiaochengxu-jiantou-you"
                size={20}
                color="#ddd"
                style={Sy.tx022}
              />
            </View>
          </View>
        </View>
        {/*个性签名*/}
        <View style={Sy.bdeight}>
          <Text style={Sy.mymotto}>个性签名</Text>

          <View style={Sy.tx02x}>
            {/*个性签名*/}
            {/*获取数据库传过来的信息*/}
            <Text style={Sy.rtx}>{user.motto}</Text>
            <SafeAreaView>
              <TextInput
                style={styles.input}
                onChangeText={onChangeSignature}
                value={valuesignature}
                placeholder="我的签名"
                keyboardType="default"
              />
            </SafeAreaView>
            <View>
              {/*跳转页面*/}
              <TouchableOpacity onPress={() => navigation.navigate('Mymotto')}>
                <IconFont
                  name="zhaoshangxiaochengxu-jiantou-you"
                  size={20}
                  color="#ddd"
                  style={Sy.tx022}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/*密码修改*/}
        <View style={Sy.bdnine}>
          <Text style={Sy.mypwd}>密码修改</Text>
          <View style={Sy.tx02x}>
            <View>
              {/*跳转页面*/}
              <TouchableOpacity
                onPress={() => navigation.navigate('AccountPwd')}>
                <IconFont
                  name="zhaoshangxiaochengxu-jiantou-you"
                  size={20}
                  color="#ddd"
                  style={Sy.tx022}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/*隔热板主页*/}
        <View style={Sy.ft}>
          <Text style={Sy.myhome}>个人主页</Text>
          {/*页面跳转*/}
          <TouchableOpacity onPress={() => navigation.navigate('My')}>
            <View style={Sy.tx02x}>
              <Text style={Sy.home}>返回</Text>
              <View>
                <IconFont
                  name="zhaoshangxiaochengxu-jiantou-you"
                  size={20}
                  color="#ddd"
                  style={Sy.tx022}
                />
              </View>
            </View>
          </TouchableOpacity>
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
    backgroundColor: '#f4f4f4',
  },
  hd: {},
  tx01: {
    fontSize: px(30),
    fontWeight: '700',
    textAlign: 'center',
  },

  tx02: {
    fontSize: px(26),
    color: '#333333',
    fontWeight: '600',
    height: px(96),
    lineHeight: px(96),
  },
  tx02x: {
    // lineHeight: px(180),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:'green',
  },
  tx022: {
    marginLeft: px(24),
  },
  tx022x: {
    marginLeft: px(0),
  },

  bd: {
    height: px(126),
    display: 'flex',
    justifyContent: 'space-between', //义了项目在主轴上的对齐方式(两端对齐)
    flexDirection: 'row', //决定主轴的方向(raw->左向右)(column->上向下)
    alignItems: 'center', //属性定义项目在交叉轴上如何对齐
    borderBottomWidth: px(1),
    borderColor: '#e0e0e0',
    paddingLeft: px(30),
    paddingRight: px(30),
    backgroundColor: '#ffffff',
  },
  bdto: {
    height: px(96),
    // backgroundColor: '#666',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: px(1),
    borderColor: '#e0e0e0',
    paddingLeft: px(30),
    paddingRight: px(30),
    backgroundColor: '#ffffff',
  },
  name: {
    fontSize: px(26),
    color: '#333333',
  },
  rtx: {
    fontSize: px(24),
    color: '#888',
  },
  bdsr: {
    height: px(96),
    // backgroundColor: '#666',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: px(2),
    borderColor: '#e0e0e0',
    paddingLeft: px(30),
    paddingRight: px(30),
    backgroundColor: '#ffffff',
  },
  mycode: {
    fontSize: px(26),
    color: '#333333',
  },
  codeimg: {
    fontSize: px(24),
    color: '#666666',
  },
  bdfo: {
    height: px(96),
    // backgroundColor: '#666',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: px(1),
    borderColor: '#e0e0e0',
    paddingLeft: px(30),
    paddingRight: px(30),
    backgroundColor: '#ffffff',
  },
  mycover: {
    fontSize: px(26),
    color: '#333333',
  },
  cover: {
    fontSize: px(24),
    color: '#666666',
  },
  bdfy: {
    height: px(96),
    // backgroundColor: '#666',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: px(1),
    borderColor: '#e0e0e0',
    paddingLeft: px(30),
    paddingRight: px(30),
    backgroundColor: '#ffffff',
  },
  myname: {
    fontSize: px(26),
    color: '#333333',
  },
  mynametx: {
    fontSize: px(24),
    color: '#666666',
  },

  bdxs: {
    height: px(96),
    // backgroundColor: '#666',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: px(1),
    borderColor: '#e0e0e0',
    paddingLeft: px(30),
    paddingRight: px(30),
    marginBottom: px(20),
    backgroundColor: '#ffffff',
  },
  myphone: {
    fontSize: px(26),
    color: '#333333',
  },

  bdseven: {
    height: px(96),
    // backgroundColor: '#666',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: px(1),
    borderColor: '#e0e0e0',
    paddingLeft: px(30),
    paddingRight: px(30),
    backgroundColor: '#ffffff',
  },
  myhobby: {
    fontSize: px(26),
    color: '#333333',
  },
  choosehy: {
    fontSize: px(24),
    color: '#666666',
  },
  bdeight: {
    height: px(96),
    // backgroundColor: '#666',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: px(1),
    borderColor: '#e0e0e0',
    paddingLeft: px(30),
    paddingRight: px(30),
    marginBottom: px(20),
    backgroundColor: '#ffffff',
  },
  mymotto: {
    fontSize: px(26),
    color: '#333333',
  },
  bdnine: {
    height: px(96),
    // backgroundColor: '#666',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: px(1),
    borderColor: '#e0e0e0',
    paddingLeft: px(30),
    paddingRight: px(30),
    backgroundColor: '#ffffff',
  },
  mypwd: {
    fontSize: px(26),
    color: '#333333',
  },
  pwd: {
    fontSize: px(24),
    color: '#666666',
  },
  ft: {
    height: px(96),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: px(1),
    borderColor: '#e0e0e0',
    paddingLeft: px(30),
    paddingRight: px(30),
    marginBottom: px(200),
    backgroundColor: '#ffffff',
  },
  myhome: {
    fontSize: px(26),
    color: '#333333',
  },
  home: {
    fontSize: px(24),
    color: '#666666',
  },
  ymana: {
    height: px(400),
    paddingLeft: px(30),
    paddingRight: px(30),
  },
  yman1a: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomWidth: px(1),
    // borderBottomColor: '#86734d',
  },
  yman1xa: {
    height: px(100),
    color: '#86734d',
    fontSize: px(30),
    paddingTop: px(30),
  },
});

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: px(32),
    paddingHorizontal: px(24),
  },
  sectionTitle: {
    fontSize: px(24),
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: px(8),
    fontSize: px(18),
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: px(80),
    fontSize: px(24),
    paddingTop: px(20),
    paddingBottom: px(20),
    color: '#343434',
    // backgroundColor:'#333',
  },
  container: {
    width: px(100),
    height: px(100),
    paddingTop: px(10),
    // backgroundColor: 'green',
  },
  tinyLogo: {
    width: px(90),
    height: px(90),
    borderRadius: px(45),
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default Alice;
