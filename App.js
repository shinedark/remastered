import React from 'react';
import { Platform, Text, View , Image} from 'react-native';
import {Asset, AppLoading} from 'expo';
import Dark from './src/components/Dark';




export default class App extends React.Component {


  render() {

    return (   
       <Dark/>
    );
  }
}



