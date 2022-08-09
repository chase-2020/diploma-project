//个人中心页

import React, {useState} from 'react';
import {px} from '../utils/devices';
import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';

import {styles} from '../assets/style/My';

import IconFont from '../src/iconfont';
import Footer from '../component/Footer';

import {useSelector, useDispatch} from 'react-redux';

function My({navigation}) {
  const user = useSelector(state => state.userStore.userInfo); // store中获取用户信息

  console.log('user', user);

  return (
    <View style={styles.to}>
      {/*主体*/}
      <ScrollView style={styles.body} centerContent={true}>
        {/*头像部分*/}
        <View style={styles.body1}>
          {/*头像部分的上部分*/}
          <View style={styles.tou}>
            {/*左边*/}
            <View style={styles.tou_a}>
              {/*点头像跳转页面到个人资料*/}
              <TouchableOpacity onPress={() => navigation.navigate('Alice')}>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: user.photo,
                  }}
                />
              </TouchableOpacity>
            </View>
            {/*中间*/}
            <View style={styles.tou_b}>
              {/*中间1*/}
              <View style={styles.tou_bhe}>
                <Text style={styles.a}>{user.username}</Text>
              </View>
              {/*中间2*/}
              <View style={styles.tou_bto}>
                <View style={styles.tou_bto1}>
                  <Text style={styles.b}>年龄:</Text>
                </View>
                <View style={styles.tou_bto2}>
                  <Text style={styles.b}>{user.age}</Text>
                </View>
              </View>
              {/*中间3*/}
              <View style={styles.tou_bmi}>
                <View style={styles.tou_bmi1}>
                  <Text style={styles.b}>身高:</Text>
                </View>
                <View style={styles.tou_bmi2}>
                  <Text style={styles.b}>{user.hight}</Text>
                </View>
              </View>
              {/*中间4*/}
              <View style={styles.tou_bbo}>
                <View style={styles.tou_bbo1}>
                  <Text style={styles.b}>体重:</Text>
                </View>
                <View style={styles.tou_bbo2}>
                  <Text style={styles.b}>{user.weight}</Text>
                </View>
              </View>
            </View>
            {/*右边*/}
            <View style={styles.tou_c}>
              {/*右边1*/}
              <View style={styles.tou_cto}>
                <View style={styles.tou_cto1}>
                  <Text style={styles.b}>位置:</Text>
                </View>
                <View style={styles.tou_cto2}>
                  <Text style={styles.b}>GK</Text>
                </View>
              </View>
              {/*右边2*/}
              <View style={styles.tou_cmi}>
                <View style={styles.tou_cmi1}>
                  <Text style={styles.b}>BMI:</Text>
                </View>
                <View style={styles.tou_cmi2}>
                  <Text style={styles.b}>0</Text>
                </View>
              </View>
              {/*右边3*/}
              <View style={styles.tou_cbo}>
                <View style={styles.tou_cbo1}>
                  <Text style={styles.b}>地区:</Text>
                </View>
                <View style={styles.tou_cbo2}>
                  <Text style={styles.b}>{user.address}</Text>
                </View>
              </View>
            </View>
          </View>
          {/*头像部分的下部分*/}
          <View style={styles.tour}>
            {/*下部1*/}
            <View style={styles.tour_a}>
              <View style={styles.tour_a1}>
                <Text style={styles.c}>0</Text>
              </View>
              <View style={styles.tour_a2}>
                <Text style={styles.d}>关注及粉丝</Text>
              </View>
            </View>
            {/*下部2*/}
            <View style={styles.tour_b}>
              <View style={styles.tour_b1}>
                <Text style={styles.cc}>
                  <IconFont name="qianbao1" size={25} color={['#dfc23d']} />
                </Text>
              </View>
              <View style={styles.tour_b2}>
                <Text style={styles.d}>钱包</Text>
              </View>
            </View>
            {/*下部3*/}
            {/*跳转*/}
            <TouchableOpacity onPress={() => navigation.navigate('Pd')}>
              <View style={styles.tour_c}>
                <Text style={styles.e}>积分</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/*个人中心*/}
        <View style={styles.body2}>
          {/*个人中心上部*/}
          <View style={styles.person_top}>
            <Text style={styles.f}>个人中心</Text>
          </View>
          {/*个人中心下部*/}
          <View style={styles.person_bottom}>
            {/*一行三个*/}
            <View style={styles.lalala}>
              {/*下部分中的一个View*/}
              <TouchableOpacity onPress={() => navigation.navigate('OrderList')}>
                <View style={styles.person_boone}>
                  <View style={styles.person_boone1}>
                    <Text style={styles.g}>
                      <IconFont name="dingdan1" size={38} color={['#8aa9ff']} />
                    </Text>
                  </View>
                  <View style={styles.person_boone2}>
                    <Text style={styles.h}>我的订单</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g}>
                    <IconFont name="huiyuankax" size={44} color={['#8aa9ff']} />
                  </Text>
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h}>我的会员卡</Text>
                </View>
              </View>

              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g}>
                    <IconFont
                      name="qiandao_huaban1"
                      size={44}
                      color={['#8aa9ff']}
                    />
                  </Text>
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h}>我的签到记录</Text>
                </View>
              </View>
            </View>
            {/*一行三个*/}
            <View style={styles.lalala}>
              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g}>
                    <IconFont name="yuezhan" size={36} color={['#8aa9ff']} />
                  </Text>
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h}>我的约战记录</Text>
                </View>
              </View>

              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g}>
                    <IconFont name="huodong1" size={38} color={['#8aa9ff']} />
                  </Text>
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h}>报名活动记录</Text>
                </View>
              </View>

              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g}>
                    <IconFont
                      name="jiaoliandenglu"
                      size={46}
                      color={['#8aa9ff']}
                    />
                  </Text>
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h}>私 教</Text>
                </View>
              </View>
            </View>
            {/*一行三个*/}
            <View style={styles.lalala}>
              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g}>
                    <IconFont name="gengduo" size={42} color={['#8aa9ff']} />
                  </Text>
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h}>更 多</Text>
                </View>
              </View>

              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g} />
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h} />
                </View>
              </View>

              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g} />
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/*场馆服务*/}
        <View style={styles.body3}>
          {/*场馆服务上部*/}
          <View style={styles.person_top}>
            <Text style={styles.f}>球场服务</Text>
          </View>

          {/*场馆服务下部*/}
          <View style={styles.person_bottom}>
            {/*一行三个*/}
            <View style={styles.lalala}>
              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g}>
                    <IconFont
                      name="membership-card_icon"
                      size={44}
                      color={['#8aa9ff']}
                    />
                  </Text>
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h}>会员卡购买</Text>
                </View>
              </View>

              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g}>
                    <IconFont
                      name="yaoqinghaoyou"
                      size={38}
                      color={['#8aa9ff']}
                    />
                  </Text>
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h}>邀请好友</Text>
                </View>
              </View>

              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g}>
                    <IconFont name="sousuo" size={44} color={['#8aa9ff']} />
                  </Text>
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h}>微小店</Text>
                </View>
              </View>
            </View>

            {/*一行三个*/}
            <View style={styles.lalala}>
              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g}>
                    <IconFont name="chongzhi" size={38} color={['#8aa9ff']} />
                  </Text>
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h}>储值卡充值</Text>
                </View>
              </View>

              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g}>
                    <IconFont name="ceshi" size={44} color={['#8aa9ff']} />
                  </Text>
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h}>体检记录</Text>
                </View>
              </View>

              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g}>
                    <IconFont
                      name="qianshuxieyi"
                      size={44}
                      color={['#8aa9ff']}
                    />
                  </Text>
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h}>会员入会协议</Text>
                </View>
              </View>
            </View>

            {/*一行三个*/}
            <View style={styles.lalala}>
              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g}>
                    <IconFont name="lipinka" size={44} color={['#8aa9ff']} />
                  </Text>
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h}>礼品卡</Text>
                </View>
              </View>

              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g}>
                    <IconFont name="task-plan" size={44} color={['#8aa9ff']} />
                  </Text>
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h}>任务积分</Text>
                </View>
              </View>

              {/*下部分中的一个View*/}
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g} />
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/*小工具*/}
        <View style={styles.body4}>
          {/*小工具上部*/}
          <View style={styles.person_top}>
            <Text style={styles.f}>小工具</Text>
          </View>

          {/*一行三个*/}
          <View style={styles.lalala}>
            {/*下部分中的第一个View-设置*/}
            {/*跳转页面*/}
            <TouchableOpacity onPress={() => navigation.navigate('Set')}>
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g}>
                    <IconFont name="tuijian" size={44} color={['#8aa9ff']} />
                  </Text>
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h}>设置</Text>
                </View>
              </View>
            </TouchableOpacity>
            {/*下部分中的第二个View-反馈*/}
            {/*跳转页面*/}
            <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
              <View style={styles.person_boone}>
                <View style={styles.person_boone1}>
                  <Text style={styles.g}>
                    <IconFont
                      name="bangzhuyufankui"
                      size={44}
                      color={['#8aa9ff']}
                    />
                  </Text>
                </View>
                <View style={styles.person_boone2}>
                  <Text style={styles.h}>帮助与反馈</Text>
                </View>
              </View>
            </TouchableOpacity>
            {/*下部分中的第三个View-客服帮助*/}
            <View style={styles.person_boone}>
              <View style={styles.person_boone1}>
                <Text style={styles.g}>
                  <IconFont name="lianxikefu1" size={44} color={['#8aa9ff']} />
                </Text>
              </View>
              <View style={styles.person_boone2}>
                <Text style={styles.h}>联系客服</Text>
              </View>
            </View>
          </View>
        </View>

        {/*关于*/}
        <View style={styles.body5}>
          <View style={styles.about}>
            <Text style={styles.gg}>
              <IconFont name="guanyuwomen" size={22} color={['#8aa9ff']} />
            </Text>
          </View>
          {/*跳转页面*/}
          <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
            <View style={styles.about}>
              <Text style={styles.gg}>关于我们</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/*底部*/}
    </View>
  );
}

export default My;
