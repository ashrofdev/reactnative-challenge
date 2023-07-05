import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NavigationContainer, CommonActions} from '@react-navigation/native';
import StackNav from './StackNav';

const Navigation = () => {
  
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
};

export default Navigation;
