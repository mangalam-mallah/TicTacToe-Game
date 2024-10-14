/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,

} from 'react-native';
import TicTacToeGame from './src/TicTacToeGame';


function App(): React.JSX.Element {


  return (
    <>
      <TicTacToeGame/>
    </>
  );
}

const styles = StyleSheet.create({
});

export default App;
