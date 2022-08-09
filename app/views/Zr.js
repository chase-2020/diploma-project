import React,{useState} from 'react';
import { px } from '../utils/devices'
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import { styles } from "../assets/style/zr";

import IconFont from '../src/iconfont';

function Zr({navigation}) {








    return (


        <View style={styles.toto}>

            {/*头*/}
            <View style={styles.hhead}>
                <View sytle={styles.hhead1}>
                    <View sytle={styles.vv}><Text>转让次数</Text></View>
                    <View sytle={styles.ve}><Text>0次</Text></View>
                </View>
                <View sytle={styles.hhead2}>
                    <View sytle={styles.vv}><Text>无法交付</Text></View>
                    <View sytle={styles.ve}><Text>0次</Text></View>
                </View>
                <View sytle={styles.hhead3}>
                    <View sytle={styles.vv}><Text>交付率</Text></View>
                    <View sytle={styles.ve}><Text>0</Text></View>
                </View>
            </View>

            {/*主体*/}
            <View style={styles.bodi}>

                <View sytle={styles.yeye}></View>

            </View>

            {/*尾*/}

            <View style={styles.wwe}>
                <View sytle={styles.didi}><Text sytle={styles.abq}>发起转让</Text></View>
            </View>


        </View>

    );
};


export default Zr;