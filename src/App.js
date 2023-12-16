import React from 'react';
import { StatusBar } from 'expo-status-bar';
import LoginNavigation from './naviagtions/LoginNavigation';

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <LoginNavigation />
    </>
  );
};

export default App;