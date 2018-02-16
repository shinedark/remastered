import React from 'react';
import { View, Text ,Image, Animated, Easing} from 'react-native';
import { Button } from 'native-base';
import { Asset} from 'expo';



class TextOverlay extends React.Component {
  state = {
    visible: true,
  }

  constructor () {
    super()
    this.animatedValue = new Animated.Value(0)
  }

  async componentDidMount() {
    this._cacheResourcesAsync();
    this.animate();
  }

  
  animate () {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.cubic
      }
    ).start(() => this.animate())
  }

  render() {
    const marginTop = this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 130]
      })
    return this.state.visible ? (
        <View style={styles.viewStyles}>
          <Animated.View style={{marginTop}}>
    		    <Button
    		      rounded 
              transparent
              
    		      style={styles.buttonStyles}
    		      onPress={() => this.props.switchScreen("search")}

    		    >
    		      <Image 
                style={styles.ball}
                source={require('../../assets/mdrop.gif')}
              />
    		    </Button>
          </Animated.View>
      	</View>
    ) : null;
  }

  async _cacheResourcesAsync() {
      const images = [
      
        require('../../assets/mdrop.gif'),
        
      ];

      const cacheImages = images.map((image) => {
        return Asset.fromModule(image).downloadAsync();
      });
      return Promise.all(cacheImages)
  }


  setVisible(visible) {
    this.setState({ visible });
  }
}

const styles = {
  viewStyles:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyles:{
    margin: 150, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  ball: {
      width: 80,
      height: 50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    }
}

export default TextOverlay;

