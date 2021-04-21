import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/HomeScreen';
import { SignInScreen } from './screens/user/SignInScreen';
import { SignUpScreen } from './screens/user/SignUpScreen';
import { useAuthState } from './contexts/AuthContext';
import { LocationScreen } from './screens/LocationScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { TemperatureSetting } from './screens/settings/TemperatureSettings';
import { HumiditySetting } from './screens/settings/HumiditySetting';
import { DustSetting } from './screens/settings/DustSetting';

const Stack = createStackNavigator();


const MainNavigator = (): React.ReactElement => {

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="TemperatureSetting" component={TemperatureSetting} />
      <Stack.Screen name="HumiditySetting" component={HumiditySetting} />
      <Stack.Screen name="DustSetting" component={DustSetting} />
    </Stack.Navigator>
  )

};

const UserNavigator = (): React.ReactElement => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
)

export const AppNavigator = () => {
  const authState = useAuthState();

  return (
    <NavigationContainer>
      {authState.isUserLoggedIn ? (
        <MainNavigator />
      ) : (
        <UserNavigator />
      )}

    </NavigationContainer>
  )

}
