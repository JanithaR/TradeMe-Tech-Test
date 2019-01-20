/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import AppContainer from './app/router';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Colors from './app/res/colors';

type Props = {};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.tradeMeBlue,
    accent: Colors.tradeMeYellow,
  },
};

export default class App extends Component<Props> {
  render() {
    return (
      <PaperProvider theme={theme}>
        <AppContainer />
      </PaperProvider>
    );
  }
}