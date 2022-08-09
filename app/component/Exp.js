/* tslint:disable:no-console */
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {
  Button,
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Provider,
} from '@ant-design/react-native';
export class BasicModalExample extends React.Component {
  constructor(props) {
    super(props);

    this.onClose2 = () => {
      this.setState({
        visible2: false,
      });
    };

    this.state = {
      visible: false,
      visible1: false,
      visible2: false,
    }

    render() {
      const footerButtons = [
        {text: 'Cancel', onPress: () => console.log('cancel')},
        {text: 'Ok', onPress: () => console.log('ok')},
      ];
      return (
          <ScrollView style={{marginTop: 20}}>
            <WingBlank>
              <WhiteSpace />
              <Button onPress={() => this.setState({visible2: true})}>popup</Button>
            </WingBlank>

            <Modal
                popup
                visible={this.state.visible2}
                animationType="slide-up"
                onClose={this.onClose2}>
              <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
                <Text style={{textAlign: 'center'}}>Content...</Text>
                <Text style={{textAlign: 'center'}}>Content...</Text>
              </View>
              <Button type="primary" onPress={this.onClose2}>
                close modal
              </Button>
            </Modal>
          </ScrollView>
      );
    }
  };
  export default () => (
  < Provider >
  <BasicModalExample />
</Provider>
);
