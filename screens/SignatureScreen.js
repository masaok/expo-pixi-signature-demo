import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  AppState,
  Button,
  StyleSheet,
  View,
} from 'react-native';

import * as ExpoPixi from 'expo-pixi';

export default class SignatureScreen extends React.Component {
  state = {
    image: null,
    strokeColor: 0,
    appState: AppState.currentState,
  };

  handleAppStateChangeAsync = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      if (isAndroid && this.sketch) {
        this.setState({ appState: nextAppState, id: uuidv4(), lines: this.sketch.lines });
        return;
      }
    }
    this.setState({ appState: nextAppState })
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChangeAsync);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChangeAsync);
  }

  onReady = () => {
    console.log('ready!');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.sketchContainer}>
            <ExpoPixi.Signature
              ref={ref => (this.sketch = ref)}
              style={styles.sketch}
              strokeColor={'blue'}
              strokeAlpha={1}
              onReady={this.onReady}
            />
          </View>
        </View>
        <Button
          color={'blue'}
          title="undo"
          style={styles.button}
          onPress={() => {
            this.sketch.undo();
          }}
        />
      </View>
    );
  }
}

SignatureScreen.navigationOptions = {
  title: 'Signature Demo',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sketch: {
    flex: 1,
  },
  sketchContainer: {
    height: '100%',
  },
  image: {
    flex: 1,
  },
  label: {
    width: '100%',
    padding: 5,
    alignItems: 'center',
  },
  button: {
    // position: 'absolute',
    // bottom: 8,
    // left: 8,
    zIndex: 1,
    padding: 12,
    minWidth: 56,
    minHeight: 48,
  },
});
