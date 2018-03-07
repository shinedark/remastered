import React from 'react';
import {  View, Text, Image} from 'react-native';
import { Button } from 'native-base';
import Expo, { Audio, Asset, AppLoading, Video} from 'expo';
import Shine from './Shine';
import TextOverlay from './TextOverlay';

const styles = {
  container:{
    flex: 1
  }
}

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class Dark extends React.Component{
	state={
	  currentScreen: "landing",
	  isReady: false,
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

	
	async _loadAssetsAsync() {
	    const imageAssets = cacheImages([
	      	// 'https://media.giphy.com/media/3osBLlsqoiD8tZytJ6/giphy.gif',
        	require('../../assets/water2.m4a'),
        	require('../../assets/shine.gif'),
        	require('../../assets/drop.mp4'),
	    ]);

	    await Promise.all([... imageAssets]);
	  }

	renderScreen = () => {
	  if (!this.state.isReady) {
	        return (
	        	<View style={{flex:1}}>
		          <Image  
		              source={require('../../assets/shine.gif')}
		              resizeMode="cover"
		              style={{
		                position: 'absolute',
		                left: 0, top: 0, bottom: 0, right: 0,
		                flex:1,
		              }}
		              
		            />
		            <AppLoading
		              startAsync={this._loadAssetsAsync}
		              onFinish={() => this.setState({ isReady: true })}
		              onError={console.warn}
		            />
		        </View>
	        );
	      }
	  else if(this.state.currentScreen === "landing"){
	    return(
	    	<View style={{flex: 1}}>
	    		<Video
	    		  source={require('../../assets/drop.mp4')}
	    		  resizeMode= "cover"
	    		  shouldPlay
	    		  isLooping
	    		  isMuted={true}
	    		  rate={1.0}
	    		  style={{
	    		    position: 'absolute',
	    		    left: 0, top: 0, bottom: 0, right: 0,
	    		    // flex: 1,
	    		  }}
	    		/>
	    		<TextOverlay switchScreen={this.switchScreen}/>
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







