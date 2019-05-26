/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

class App extends Component<{}> {

  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
  };

  state = {
    queue: {
      id: 3,
      name: '',
      number: 1,
      status: 'pending',
      view: '',
    },
  };

  componentDidMount() {
    this._interval = setInterval(() => {
      this.getData();
    }, 3000);
  };

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  getData() {
    fetch('http://192.168.0.145:8082/queue/1')
    .then(res => res.json())
    .then(res => {
      if (res.length > 0) {
        if (res[0].status === 'pending') {

          this.setState(prevState => {
            return {
              ...prevState,
              queue: {
                ...prevState.queue,
                ...res[0],
                view: 'Nama anda dipanggil, NO: ' + res[0].number,
              }
            };
          });
          alert('Nama anda dipanggil, NO: ' + res[0].number);

        } else if (res[0].status === 'consult') {

          this.setState(prevState => {
            return {
              ...prevState,
              queue: {
                ...prevState.queue,
                view: 'In Consultation',
              }
            };
          });

        }
      } else {

        this.setState(prevState => {
          return {
            ...prevState,
            queue: {
              ...prevState.queue,
              view: 'Waiting',
            }
          };
        });

      }
    })
    .catch(err => {
      console.log(err);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{this.state.queue.view}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
