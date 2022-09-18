import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import type { NavigationStackParamsListTypes } from '../navigation.stack.types';

import Home from '../components/Home/Home';
import Payment from '../components/Payment/Payment';

const Stack = createStackNavigator<NavigationStackParamsListTypes>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="payment"
          component={Payment}
          options={{
            title: '결제하기',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
