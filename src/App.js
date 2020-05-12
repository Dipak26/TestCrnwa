import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TouchableHighlight,
  Animated,
  Easing,
  ActivityIndicator,
  Modal as RNModal,
  // RefreshControl,
  SafeAreaView
} from 'react-native';
import { RefreshControl } from 'react-native-web-refresh-control'
import Modal  from 'modal-enhanced-react-native-web'


import logo from './logo.png';


import Routes from '../src/router/Routes';


function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}


class App extends Component {
  
  constructor(props){
    super(props);
    this.state ={
      spinValue: new Animated.Value(0),
      modalVisible: false,
      refreshing:false,
      setRefreshing:false
    }
  }
  
  
  setModalVisible = (visible) => {
    // if(Platform.OS !== "web"){
       this.setState({ modalVisible: visible });
    // }else{
    //     if(visible){
    //     alert("Modal not supported in web")
    //     }
    // }
  };

  onRefresh =() => {
    this.setState({refreshing: true});
    wait(2000).then(() => this.setState({refreshing: false}));
  };

  onClick = () => {
    const wasRotated = this.state.spinValue._value === 1;
    Animated.timing(this.state.spinValue, {
      toValue: wasRotated ? 0 : 1,
      duration: 250,
      easing: Easing.linear,
    }).start();
  };

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const { modalVisible } = this.state;
    
    return (
      <SafeAreaView style={styles.container}>
         <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
         <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>
        }>
                  <View style={styles.container}>
        <ActivityIndicator animating={true} color="red" size="large"/>
        {Platform.OS !=='web' ? <RNModal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                this.setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </RNModal> : <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                this.setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
       }
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => { 
          this.setModalVisible(true)  
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight>
        <Animated.Image
          source={logo}
          style={[styles.logo, {transform: [{rotate: spin}]}]}
        />
        <Text style={styles.title}>Create React Native Web App</Text>
        <Text style={styles.text}>
          Open up src/App.js to start working on your app!
        </Text>
        <Text style={styles.text}>
          Changes you make will automatically reload.
        </Text>
        {Platform.OS !== 'web' && (
          <Text style={styles.text}>
            Shake your phone to open the developer menu.
          </Text>
        )}
        <TouchableHighlight
          onPress={this.onClick}
          style={styles.button}
          underlayColor={'#0A84D0'}>
          <Text style={styles.buttonText}>Rotate Logo</Text>
        </TouchableHighlight>
      </View>
       </ScrollView>
      </SafeAreaView>       
    );
  }

  render1() {
    return (
        <View>
            <Routes/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#fff',
  },
  button: {
    borderRadius: 3,
    padding: 20,
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: '#1B95E0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;
