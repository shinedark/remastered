import Expo, { GLView, Audio, Asset} from 'expo';
import React from 'react';
import {View, Image, TouchableOpacity, Linking, Text} from 'react-native';

import * as THREE from 'three'; 
import ExpoTHREE from 'expo-three'; 

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}


console.disableYellowBox = true;
const url = "https://itunes.apple.com/us/artist/shine-dark/id993072837";

class GifOverlay extends React.Component {
  state = {
    visible: true,
  }

  render() {
    return this.state.visible ? (
      <TouchableOpacity style={styles.touchable} onPress={() => Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.log('Can\'t handle url: ' + url);
        } else {
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err))}>
      <View style={styles.container}>
        <Text style={styles.paragraph}>Get Album</Text>
      </View>
      </TouchableOpacity>
    ) : null;
  }

  setVisible(visible) {
    this.setState({ visible });
  }
}

const styles = {
    touchable: {
        position: 'absolute',
        bottom: 18,
        right: 18,
    },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'white',
    opacity: 0.9,
    borderRadius: 4    
  },
  paragraph: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
};

export default class Shine extends React.Component {

  state={
    currentScreen: "search"
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
    await this._loadAssetsAsync();
  }
  
  playBackgroundMusicAsync = async () => {
    const soundObject = new Expo.Audio.Sound();
    try {
      await soundObject.loadAsync(require('../../assets/rell.m4a'));
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
          <GLView
            ref={(ref) => this._glView = ref}
            style={{ flex: 1 }}
            onContextCreate={this._onGLContextCreate}
          />
          <GifOverlay ref={(ref) => this.overlay = ref} />
        </View>
      );
    }
    
      async _loadAssetsAsync() {
          const imageAssets = cacheImages([
              
              require('../../assets/rell.m4a'),
              require('../../assets/shine.gif'),
              require('../../assets/remastered.png'),
              require('../../assets/icon.png'),
          ]);

          await Promise.all([... imageAssets]);
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

        const material = new THREE.MeshBasicMaterial({
              
              // NOTE: How to create an Expo-compatible THREE texture
              map:  await ExpoTHREE.createTextureAsync({
                asset: Expo.Asset.fromModule(require('../../assets/shine.gif')),
              }),
            });
            material.transparent = false;
            material.side = THREE.DoubleSide;
            material.depthWrite = true;
        
        const material4 = new THREE.MeshBasicMaterial({
              
              // NOTE: How to create an Expo-compatible THREE texture
              map:  await ExpoTHREE.createTextureAsync({
                asset: Expo.Asset.fromModule(require('../../assets/shine.gif')),
              }),
            });
            material.transparent = false;
            material.side = THREE.DoubleSide;
            material.depthWrite = true;    
        

        const material2 = new THREE.MeshBasicMaterial({
              // NOTE: How to create an Expo-compatible THREE texture
              map: await ExpoTHREE.createTextureAsync({
                asset: Expo.Asset.fromModule(require('../../assets/icon.png')),
              }),
            });
          material2.transparent = false;
          material2.side = THREE.DoubleSide;
          material2.depthWrite = true;

          var mergedGeometry = new THREE.Geometry();
          
          var boxGeometry = new THREE.BoxGeometry(6, 6, 6);
          var material3 = new THREE.MeshBasicMaterial( { color: 0xffffff }  );
              material3.transparent = false;
              material3.side = THREE.DoubleSide;
              material3.depthWrite = true;

          for (var i = 0; i < 5000; i++) {

              var x = Math.random() * 500 - 250;
              var y = Math.random() * 500 - 250;
              var z = Math.random() * 500 - 250;

              boxGeometry.translate(x, y, z);

              mergedGeometry.merge(boxGeometry);

              boxGeometry.translate(-x, -y, -z);
          }

          var cubes = new THREE.Mesh(mergedGeometry, material3);
          scene.add(cubes);

                      
    // Edit the box dimensions here and see changes immediately!
    const geometry = new THREE.BoxGeometry(0.16, 0.16, 0.16);
    const geometry2 = new THREE.BoxGeometry(0.30, 0.7, 0.7);
    
    const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32, 6, 6.3);

    
    const mat = new THREE.MeshNormalMaterial({  color: 0x55add2});
    mat.transparent = true;
    mat.side = THREE.DoubleSide;
    mat.depthWrite = true;


    
    

    const sphere = new THREE.Mesh(sphereGeometry, mat);
    sphere.position.z = 0.30;
    scene.add(sphere);

    const cube = new THREE.Mesh( geometry , material);
    cube.position.z = -0.3;

    scene.add(cube);


    const cube2 = new THREE.Mesh( geometry , material4);
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
      
      sphere.rotation.y += 0.01;
      sphere.rotation.x += 0.01;
      rectangle.rotation.y += 0.01;
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube2.rotation.x += 0.01;
      cube2.rotation.y += 0.01;
      cube3.rotation.x += 0.01;
      cube3.rotation.y += 0.01;
      
      renderer.render(scene, camera);
      gl.endFrameEXP();
    }
    animate();

  }
}


