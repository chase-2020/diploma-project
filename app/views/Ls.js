

//积分商城

import React from 'react';
import { px } from '../utils/devices'
import {

    Text,
    View,
} from 'react-native';

import { styles } from "../assets/style/ls";


import IconFont from '../src/iconfont';

function Ls() {


    return (
        <View style={styles.to}>







            {/*中*/}
            <View style={styles.mi}>
                {/*左*/}
                <View style={styles.mil}>
                    <View style={styles.fen}><Text><IconFont name="jifenguizeguankong2" size={27} /></Text></View>
                    <View style={styles.myfen}><Text style={styles.b}>我的积分</Text></View>

                </View>
                {/*右*/}
                <View style={styles.mir}>
                    <View style={styles.iife}><Text><IconFont name="guize" size={27} /></Text></View>
                    <View style={styles.fenguiz}><Text style={styles.c}>积分规则</Text></View>
                    <View style={styles.getfen}><Text style={styles.d}>如何获取积分？</Text></View>
                </View>
            </View>







            {/*尾*/}
            <View style={styles.mo}>
                {/*组件1*/}
                <View style={styles.mooo}>
                    {/*左*/}
                    <View style={styles.mooolf}>
                        <View style={styles.mooolf1}></View>

                    </View>
                    {/*右*/}
                    <View style={styles.mooori}>
                        {/*右上*/}
                        <View style={styles.moooritop}><Text style={styles.ee}>积分抽奖</Text></View>
                        {/*右下*/}
                        <View style={styles.moooribom}>
                            <View style={styles.moooribom1}><Text style={styles.e}>10积分</Text></View>
                            <View style={styles.moooribom2}><Text style={styles.f}>参加</Text></View>
                            <View style={styles.moooribom3}><Text style={styles.g}>(274279)</Text></View>
                        </View>
                    </View>
                </View>
            </View>




        </View>

    );
};



export default Ls;