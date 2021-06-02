import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as eva from '@eva-design/eva';
import { RootSiblingParent } from 'react-native-root-siblings';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './AppNavigator';
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { DataProvider } from './contexts/DataContext';


export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <DataProvider>
          <IconRegistry icons={[EvaIconsPack]} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <StatusBar />
            <RootSiblingParent>
              <AppNavigator />
            </RootSiblingParent>
          </ApplicationProvider>
        </DataProvider>
      </SettingsProvider>
    </AuthProvider>

  );
}