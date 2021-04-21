import { useNavigation } from '@react-navigation/core';
import { Button, Divider, Input, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackIcon } from '../../components/Icons';
import { useSettingState } from '../../contexts/SettingsContext';


export const TemperatureSetting = (): React.ReactElement => {
  const navigation = useNavigation();
  const settings = useSettingState();

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  )

  return (
    <React.Fragment>
      <TopNavigation
        title="Cài đặt nhiệt độ"
        alignment='center'
        accessoryLeft={renderBackAction} />
      <Divider />
      <Layout style={styles.container}>
        <Layout style={styles.setting}>
          <Text style={{ width: '50%' }}>Cài đặt mức nhiệt độ cảnh báo</Text>
          <TouchableWithoutFeedback style={{ width: '50%' }} onPress={Keyboard.dismiss} accessible={false}>
            <Input
              keyboardType="numeric"
              style={{ width: 150 }}
              value={settings.temperatureWarning}
              onChangeText={settings.setTemperatureWarning}
            />
          </TouchableWithoutFeedback>
        </Layout>

        <Layout style={{ paddingTop: 16 }}>
          <Button onPress={() => { settings.temperatureWarning && settings.setTemperatureWarning(settings.temperatureWarning) }}>Lưu</Button>
        </Layout>

      </Layout>
    </React.Fragment>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 16,
    paddingHorizontal: 16
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16
  },
})