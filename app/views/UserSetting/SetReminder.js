import React from 'react';
import {useState} from 'react'; //引入开关
import {px} from '../../utils/devices';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';

function SetReminder() {
  // 开关
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);
  const [isEnabled5, setIsEnabled5] = useState(false);
  const [isEnabled6, setIsEnabled6] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState2 => !previousState2);
  const toggleSwitch3 = () => setIsEnabled3(previousState3 => !previousState3);
  const toggleSwitch4 = () => setIsEnabled4(previousState4 => !previousState4);
  const toggleSwitch5 = () => setIsEnabled5(previousState5 => !previousState5);
  const toggleSwitch6 = () => setIsEnabled6(previousState6 => !previousState6);
  return (
    <ScrollView style={Sy.ScrollView}>
      <View style={Sy.body}>
        <View style={Sy.bdn1}>
          <Text style={Sy.n1tx}>接受消息提示</Text>
          {/*  Switch：开关 */}
          <View style={styles.container}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        <View style={Sy.bdn1}>
          <Text style={Sy.n1tx}>接受消息但不提示</Text>
          {/*  Switch：开关 */}
          <View style={styles.container}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled2 ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch2}
              value={isEnabled2}
            />
          </View>
        </View>
        <View style={Sy.bdn1}>
          <Text style={Sy.n1tx}>屏蔽消息/免打扰</Text>
          {/*  Switch：开关 */}
          <View style={styles.container}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled3 ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch3}
              value={isEnabled3}
            />
          </View>
        </View>
        <View style={Sy.bdn1}>
          <Text style={Sy.n1tx}>静音模式</Text>
          {/*  Switch：开关 */}
          <View style={styles.container}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled4 ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch4}
              value={isEnabled4}
            />
          </View>
        </View>
        <View style={Sy.bdn1}>
          <Text style={Sy.n1tx}>静音时振动</Text>
          {/*  Switch：开关 */}
          <View style={styles.container}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled5 ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch5}
              value={isEnabled5}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const Sy = StyleSheet.create({
  ScrollView: {
    flex: 1,
    // height: px(100),
  },
  body: {
    backgroundColor: '#f4f4f4',
  },
  //Switch：开关
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bdn1: {
    height: px(100),
    lineHeight: px(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: px(30),
    paddingRight: px(30),
    borderBottomWidth: px(1),
    borderBottomColor: '#ebebeb',
    backgroundColor: '#ffffff',
  },
  n1tx: {
    fontSize: px(26),
    color: '#333333',
  },
});

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: px(32),
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default SetReminder;
