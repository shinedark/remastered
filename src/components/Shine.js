import Expo, {Video, Audio, AppLoading, Asset} from 'expo';
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import * as THREE from 'three'; // 0.87.1
import ExpoTHREE from 'expo-three'; // 2.0.2


console.disableYellowBox = true;

class GifOverlay extends React.Component {
  state = {
    visible: true,
  }


  render() {
    return this.state.visible ? (
      <Video
        source={{ uri: 'https://media.giphy.com/media/3ohhwEZqxzKbNUHzji/giphy.mp4' }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0, right: 0,
          // backgroundColor: '#f1e8e4',
          opacity: 0.3,
        }}
      />
    ) : null;
  }

  setVisible(visible) {
    this.setState({ visible });
  }
}

export default class Shine extends React.Component {

  state = {
        isReady: false
      }

  async componentDidMount() {
    Expo.Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Expo.Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Expo.Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });

    await this.playBackgroundMusicAsync();
  }
  
  playBackgroundMusicAsync = async () => {
    const soundObject = new Expo.Audio.Sound();
    try {
      await soundObject.loadAsync(require('../../assets/talo.m4a'));
      await soundObject.playAsync();
      await soundObject.setStatusAsync({
        shouldPlay: true,
        isLooping: true,
        volume: 1,
      });
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }


  
  render() {
      return (
        <View style={{ flex: 1 }}>
          <Expo.GLView
            ref={(ref) => this._glView = ref}
            style={{ flex: 1 }}
            onContextCreate={this._onGLContextCreate}
          />
          <GifOverlay ref={(ref) => this.overlay = ref} />
        </View>
      );
    }
  

  _onGLContextCreate = async (gl) => {
    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;

    const arSession = await this._glView.startARSessionAsync();

    const scene = new THREE.Scene();

    const camera = ExpoTHREE.createARCamera(arSession, width, height, 0.01, 1000);
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);


    // const material2 = new THREE.MeshBasicMaterial({ color: '#fdfe02' });
    // const geometry = new THREE.BoxGeometry(1, 1, 1);

        const material = new THREE.MeshBasicMaterial({
              
              // NOTE: How to create an Expo-compatible THREE texture
              map: await ExpoTHREE.createTextureAsync({
                asset: Expo.Asset.fromModule(require('../../assets/shine.gif')),
              }),
            });

        

        const material2 = new THREE.MeshBasicMaterial({
              // NOTE: How to create an Expo-compatible THREE texture
              map: await ExpoTHREE.createTextureAsync({
                asset: Expo.Asset.fromModule(require('../../assets/remastered.png')),
              }),
            });

    // Edit the box dimensions here and see changes immediately!
    const geometry = new THREE.BoxGeometry(0.16, 0.16, 0.16);
    const geometry2 = new THREE.BoxGeometry(0.30, 0.7, 0.7);
    // const video = Expo.Asset.fromModule(require('./assets/car.mp4'));

    

    const cube = new THREE.Mesh( geometry , material);
    cube.position.z = -0.3;
    scene.add(cube);


    const cube2 = new THREE.Mesh( geometry , material);
    cube2.position.z = -0.6;
    scene.add(cube2);

    const cube3 = new THREE.Mesh( geometry , material);
    cube3.position.z = -0.9;
    scene.add(cube3);

    const rectangle = new THREE.Mesh( geometry2, material2 );
    rectangle.position.y = -0.63;
    scene.add(rectangle);

    const animate = () => {
      requestAnimationFrame(animate);

      
      rectangle.rotation.y += 0.01;
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube2.rotation.x += 0.02;
      cube2.rotation.y += 0.02;
      cube3.rotation.x += 0.03;
      cube3.rotation.y += 0.03;
      
      renderer.render(scene, camera);
      gl.endFrameEXP();
    }
    animate();
  }
}



