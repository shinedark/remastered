import React from 'react';
import {  View, Text, Image} from 'react-native';
import { Button } from 'native-base';
import Expo, {Video, Audio, Asset} from 'expo';
import Shine from './Shine';
import TextOverlay from './TextOverlay';

const styles = {
  container:{
    flex: 1,
  }
}

export default class Dark extends React.Component{
	state={
	  currentScreen: "landing"
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
	    await soundObject.loadAsync(require('../../assets/water2.m4a'));
	    await soundObject.playAsync();
	    this.audioPlayer  = soundObject;
	    	 this.audioPlayer.playAsync();
	    	 this.audioPlayer.setPositionAsync(0);
	    	 this.audioPlayer.setIsLoopingAsync(true);
	    // Your sound is playing!
	  } catch (error) {
	    // An error occurred!
	  }
	}


	switchScreen = (currentScreen) => {
	  this.setState({currentScreen});
	  this.audioPlayer.stopAsync({currentScreen});
	}

	

	renderScreen = () => {
	  if(this.state.currentScreen === "landing"){
	    return(
	    	<View style={{flex: 1}}>
	    		<Video
	    		  source={{ uri: 'https://media.giphy.com/media/3osBLlsqoiD8tZytJ6/giphy.mp4' }}
	    		  rate={1.0}
	    		  volume={1.0}
	    		  isMuted={false}
	    		  resizeMode="cover"
	    		  shouldPlay
	    		  isLooping
	    		  style={{
	    		    position: 'absolute',
	    		    left: 0, top: 0, bottom: 0, right: 0,
	    		    
	    		  }}
	    		/>
	    	<TextOverlay stopMusic={this.stopMusic} switchScreen={this.switchScreen}/>
	    	</View>
	      
	    )
	  }
	  else if (this.state.currentScreen === 'search') {
	    return(
	      <Shine/>
	    )
	  }
	}
	render(){
		return (
		  <View style={styles.container}>
		   {this.renderScreen()}
		  </View>
		);
	}
}







