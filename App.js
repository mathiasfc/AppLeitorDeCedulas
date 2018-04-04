import React from 'react';
import { Text, View, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }



  render() {
    //Desabilita warnings
    console.disableYellowBox = true;

    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>

              <TouchableOpacity
                style={styles.takePhoto}
                onPress={this.onPress}
              >
                {/* <Text> Touch Here </Text> */}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.flipPosition}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={styles.flip}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>

            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  flip: {
    fontSize: 18,
    marginBottom: 10, 
    color: 'white',
    backgroundColor: 'green'
  },
  flipPosition: {
    flex: 0.2,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 50
  },
  takePhoto: {
    borderRadius:100,
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'red',
    height: 120,
    marginBottom: 10,
    marginLeft: 50
  },
  button: {
    flex: 0.8,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
})