import React from 'react';
import { Platform, Text, View } from 'react-native';
import Dark from './src/components/Dark';




export default class App extends React.Component {
 
 	async componentDidMount() {
 	  this._cacheResourcesAsync();
 	}

  render() {
    return (   
       <Dark/>
    );
  }
  async _cacheResourcesAsync() {
      const images = [
        require('./assets/icon.png'),
        require('./assets/splash.png'),
        require('./assets/shine.gif'),
        require('./assets/talo.m4a'),
        require('./assets/water2.m4a'),
        require('./assets/remastered.png'),
      ];

      const cacheImages = images.map((image) => {
        return Asset.fromModule(image).downloadAsync();
      });
      return Promise.all(cacheImages)

    }
}



