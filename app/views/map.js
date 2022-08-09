/* eslint-disable */
import React, {useState} from 'react';
import {px} from '../utils/devices';
import IconFont from '../src/iconfont';
import { MapView } from "react-native-amap3d";

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Button,
    Alert,
} from 'react-native';


function Map(props) {
    const { route,navigation } = props;


    return (
        <View style={styles.body}>

            <MapView style={styles.dt}
                 center={{
                latitude: 31.181536,
                longitude: 121.439609,
            }}>
                <MapView.Marker
                    draggable
                    title="这是一个可拖拽的标记"
                    onDragEnd={({ nativeEvent }) =>
                        console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)
                    }
                    coordinate={{
                        latitude: 31.181536,
                        longitude: 121.439609,
                    }}
                />
            </MapView>

            {/*<MapView style={styles.dt}*/}
            {/*    center={{*/}
            {/*        latitude: 31.181536,*/}
            {/*        longitude: 121.439609,*/}
            {/*    }}*/}
            {/*/>*/}

        </View>

    );
}

const styles = StyleSheet.create({
    body: {
        display:"flex",
        height: '100%',
        alignItems: 'center',
    },

    dt:{
        flex: 1,
        width: px(750),
        // height: px(100),
    },

});

export default Map;
