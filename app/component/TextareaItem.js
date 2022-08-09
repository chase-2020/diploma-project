import {px} from '../utils/devices';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {List, TextareaItem} from '@ant-design/react-native';

export default class BasicTextAreaItemExample extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = val => {
      this.setState({val});
    };
  }

  render() {
    return (
      <ScrollView
        style={{flex: 1}}
        automaticallyAdjustContentInsets={true}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor: 'red'}}>
          <List renderHeader={'问题反馈'}>
            <TextareaItem
              rows={4}
              placeholder="请输入你遇到的问题及想要反馈的意见"
              count={300}
            />
          </List>
        </View>
      </ScrollView>
    );
  }
}
