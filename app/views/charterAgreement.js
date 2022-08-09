/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {px} from '../utils/devices'

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Button,
    Alert,
} from 'react-native';


function CharterAgreement(props) {


    return (
        <View style={styles.body}>
            <ScrollView>
            <Text  style={styles.top}>包场协议</Text>
            <View  style={styles.bottom}>
                <Text  style={styles.subject}>
                    1.1场馆(场地)运营方负责提供运动场地及相关配套设施,确保场馆(场地)的正常使用。除非场馆(场地)运营方另行书面同意，场地方只承担法定、约定的责任，不涉及其他责任或义务。
                </Text>
                <Text  style={styles.subject}>
                    1.2会员应在约定时间和地点并按照约定的用途使用场馆(场地)。除非经场馆(场地)运营方事前同意,不得擅自变更场馆(场地)使用时间、地点和用途,进入和使用场馆(场地)，须遵守运动场规范,使用方法详见通过智慧场馆运营平台公示的使用规则以及场馆(场地)公示的管理规范、规定等。
                </Text>
                <Text  style={styles.subject}>
                    1.3会员自进入场馆(场地)，应自行承担全部管理和安全责任，包括但不限于遵守进出场与场内管理秩序、保管携带物品、安全合理运动等，场馆(场地)方依法承担安全保障义务与责任。会员使用场馆(场地)期间，因第三人行为遭受损害的，由第三人承担侵权责任;场馆(场地)运营方未尽到安全保障义务的，承担相应的补充责任。场馆(场地)运营方承担补充责任后，有权向该第三人追偿。会员理解并同意,其使用场馆(场地)的活动,是其自愿参加的具有一定风险的文体活动，其因其他参与者遭受损害的,依法由受损害会员、其他参与者承担责任。
                </Text>
                <Text  style={styles.subject}>
                    1.4会员应保证正常使用场馆(场地)运营方提供的场地、器材、设施，如会员原因造成损坏的，由会员按重新购置的市场价赔偿。

                </Text>
                <Text  style={styles.subject}>
                    1.5会员使用场馆(场地)前,应进行一定的安全检查，使用过程中也应注意是否存在安全隐患，如发现场地、器材、设施等存在安全隐患的，应暂停使用并通知场馆(场地)运营方处理，未通知场馆(场地)运营方或未暂停使用的,场馆(场地）运营方免责。
                </Text>
                <Text  style={styles.subject}>
                    1.6场馆(场地)运营方按照订单为会员预留场地,订单包场时间段起始时间之前,会员有权按照智慧场馆运营平台公示的规则解除订单合同。有效订单的包场时间段内，如会员取消活动或减少使用范围、使用时间的，或因擅自变更用途被场馆(场地）运营方叫停的，仍应按订单支付全部费用。
                </Text>
                <Text  style={styles.subject}>
                    1.7会员应确保使用场馆(场地）期间所有人员遵守禁止在公共场所吸烟规定，遵守场馆(场地)运营方对场馆(场地)使用的其他规定。用户在场馆(场地)内的任何搭建行为应经场馆（场地）运营方允许。
                </Text>
                <Text  style={styles.subject}>
                    1.8会员保证不在场馆(场地)内开展任何违法、违规或扰乱社会秩序的行为。
                </Text>
                <Text  style={styles.subject}>
                    1.9会员应在订单包场时间段截止前撤离全部人员,依原状交还场馆(场地)及相关设施、物品等。如未达上述标准的,场馆(场地)运营方可自行或委托第三方代为复原或清理,此期间的场馆(场地)占用费以及复原或清理费用由会员承担。
                </Text>
                <Text  style={styles.subject}>
                    1.10包场时间段内，可进入包场场馆(场地)的人数不得超过该场馆(场地)所能容纳的最多人数(足球场20人，篮球场15人、网球场6人，羽毛球场6人）,购买场馆(场地)服务的有效订单持有人可通过“邀请好友”方式(邀请成功的条件为被邀请者完成关注“久事体育场馆预定小程序”,完成关注后被邀请者即为智慧场馆运营平台会员)使其好友获得入场二维码，一人一码扫码入场。如需暂时离开场地，包场时间段届满前会员展示二维码后可重新进入。
                </Text>
                <Text  style={styles.subject}>
                    1.11会员需要超过约定时间使用场地的，场馆(场地)运营方可视后续场地使用安排决定是否同意，如同意延时使用的，按门市价计费，先付后用。
                </Text>
                <Text  style={styles.subject}>
                    1.12商业活动，培训班不提供包场服务。
                </Text>
                <Text  style={styles.subject}>
                    1.13如因遇恶劣天气导致当天无法运动可以拨打客服热线做特殊取消申请。
                </Text>
                <Text  style={styles.subject}>
                    1.14在包场时间段起始时间开始前,视场馆(场地)的当时使用情况，会员最多可提前10分钟进场，但必须准时离场以免影响下一场包场运动，所有人员需遵守场馆(场地)营业截止时间必须全部离场的规定,并自行承担滞留场内的全部责任。
                </Text>
                <Text  style={styles.subject}>
                    1.15如遇自然灾害、疫情、政府行为或其他不可抗力导致场馆(场地)运营方无法全部或部分履行本协议的，场馆(场地)运营方免于承担民事责任，但场地方应尽早告知会员,并结合实际使用时间相应退还会员包场费用或与会员协商变更使用场地或使用时间。
                </Text>
                <Text  style={styles.subject}>
                    1.16协议任一方违反本协议及《智慧场馆运营平台会员服务协议》,经另一方指出后在合理时间内未得到纠正并可能给另一方带来实质性损害的，另一方可解除本协议并追究违约方违约责任。
                </Text>
            </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    body : {
        display:"flex",
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column'
    },
    top:{
        fontSize: px(28),
        color: '#020202',
        height: px(128),
        marginLeft: px(32),
        lineHeight: px(100)
    },
    bottom:{
        flex: 1
    },
    subject:{
        fontSize: px(28),
        color: '#020202',
        paddingLeft:px(32),
        paddingRight: px(32),
        marginBottom: px(60),
    },

});

export default CharterAgreement;
