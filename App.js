import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';

export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
    text: ''
  };

  render() {
    let { image } = this.state;
    //Desabilita warnings
    console.disableYellowBox = true;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 20,
            textAlign: 'center',
            marginHorizontal: 15,
          }}>
          Example: Upload ImagePicker result
        </Text>

        {/*Botão para pegar uma imagem*/}
        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />

        <Button onPress={this._takePhoto} title="Take a photo" /> 
        {/* {this._takePhoto()} */}
        {/* {this._maybeRenderImage()} */}
        {/* {this._maybeRenderUploadingOverlay()} */}
        <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        <Text
          style={{
            fontSize: 20,
            color: 'green',
            textAlign: 'center',
          }}>
          {this.state.text}
        </Text>
        <StatusBar barStyle="default" />
      </View>




    );
  }

  // _maybeRenderImage = () => {
  //   let { image } = this.state;
  //   if (!image) {
  //     return;
  //   }

  //   return (
  //     <View
  //       style={{
  //         marginTop: 30,
  //         width: 250,
  //         borderRadius: 3,
  //         elevation: 2,
  //         shadowColor: 'rgba(0,0,0,1)',
  //         shadowOpacity: 0.2,
  //         shadowOffset: { width: 4, height: 4 },
  //         shadowRadius: 5,
  //       }}>
  //       <View
  //         style={{
  //           borderTopRightRadius: 3,
  //           borderTopLeftRadius: 3,
  //           overflow: 'hidden',
  //         }}>
  //         <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
  //       </View>

  //       <Text
  //         onPress={this._copyToClipboard}
  //         onLongPress={this._share}
  //         style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
  //         {image}
  //       </Text>
  //     </View>
  //   );
  // };

  // _share = () => {
  //   /*Share.share({
  //     message: this.state.image,
  //     title: 'Check out this photo',
  //     url: this.state.image,
  //   });*/
  // };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: false
    });

    this._handleImagePicked(pickerResult);
  };


  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    this.setState({ image: pickerResult.uri });

    //...

    this.setState({ text: 'valid' });

  };

}

