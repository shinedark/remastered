import React from 'react';
import { View, Text ,Image} from 'react-native';
import { Button } from 'native-base';



class TextOverlay extends React.Component {
  state = {
    visible: true,
  }


  render() {
    return this.state.visible ? (
        <View style={styles.viewStyles}>
  		    <Button
  		      rounded 
            transparent
            
  		      style={styles.buttonStyles}
  		      onPress={() => this.props.switchScreen("search")}

  		    >
  		      <Image 
              style={styles.ball}
              source={{uri: 'https://media.giphy.com/media/5ciuhhe0rQva8/giphy-downsized.gif'}}
            />
  		    </Button>
      	</View>
    ) : null;
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

