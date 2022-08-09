

//我的积分


import React from 'react';
import { px } from '../utils/devices'
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import { styles } from "../assets/style/pd";

import IconFont from '../src/iconfont';




function Pd({navigation}) {



    const a = new Date();









    return (




        <View style={styles.too}>




            {/*主体*/}
            <View style={styles.middom}>

                {/*主体上部*/}
                <View style={styles.middomt}>
                    {/*主体上部1*/}
                    <View style={styles.middomtt}>
                        <View style={styles.middomtt1}><Text style={styles.b}><IconFont name="jifen1" size={45}  color={'#faffff'} /></Text></View>
                        <View style={styles.middomtt2}><Text style={styles.b}>10</Text></View>
                        <View style={styles.middomtt3}><Text style={styles.b}>积分</Text></View>
                    </View>
                    {/*主体上部2*/}
                    <View style={styles.middomto}>

                        <TouchableOpacity onPress={() => navigation.navigate('Ls')}>
                        <View style={styles.middomto1}><Text style={styles.c}>积分商城</Text></View>
                        </TouchableOpacity>

                        <View style={styles.middomto2}><Text><IconFont name="qianjin" size={15}  color={'#faffff'} /></Text></View>
                    </View>


                </View>
                {/*主体下部*/}
                <View style={styles.smiddomb}>
                    <View style={styles.smiddomb1}><Text style={styles.d}><IconFont name="jilu" size={30}  color={'#fcd277'} /></Text></View>
                    <View style={styles.smiddomb2}><Text style={styles.e}>兑换记录</Text></View>
                    <View style={styles.smiddomb3}><Text style={styles.d}><IconFont name="qianjin" size={15}  color={'#fcd277'} /></Text></View>
                </View>
            </View>


            {/*底部*/}
            <View style={styles.bootmo}>
                {/*底部头*/}
                <View style={styles.bootmo1}><Text style={styles.f}>积分明细</Text></View>
                {/*底部尾*/}
                <View style={styles.bootmo2}>
                    {/*一个组件*/}
                    <View style={styles.fenqian}>
                        {/*左*/}
                        <View style={styles.fenqianlf}>
                            <View style={styles.fenqianlf1}><Text style={styles.g}>签到</Text></View>
                            <View style={styles.fenqianlf2}><Text style={styles.i}>{a.getFullYear()}-{a.getMonth()+1}-{a.getDate()}</Text></View>
                        </View>
                        {/*右*/}
                        <View style={styles.fenqianri}><Text style={styles.h}>+5</Text></View>
                    </View>
                </View>
            </View>

        </View>






    );
};



export default Pd;
