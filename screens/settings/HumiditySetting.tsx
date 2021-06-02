import { useNavigation } from '@react-navigation/core';
import { Divider, Layout, Text, TopNavigation, TopNavigationAction, Input, Button } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { BackIcon } from '../../components/Icons';
import { useSettingState } from '../../contexts/SettingsContext';


export const HumiditySetting = (): React.ReactElement => {
  const navigation = useNavigation();
  const settings = useSettingState();

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  )

  const saveHumidity = () => {
    settings.humidityWarning && settings.setDustWarning(settings.humidityWarning);
    window.alert("Cài đặt thành công");
    Keyboard.dismiss();
  }

  return (
    <React.Fragment>
      <TopNavigation
        title="Cài đặt độ ẩm"
        alignment='center'
        accessoryLeft={renderBackAction} />
      <Divider />
      <Layout style={styles.container}>
        <Layout style={styles.setting}>
          <Text style={{ width: '50%' }}>Cài đặt ẩm cảnh báo</Text>
          <TouchableWithoutFeedback style={{ width: '50%' }} onPress={Keyboard.dismiss} accessible={false}>
            <Input
              keyboardType="numeric"
              style={{ width: 150 }}
              value={settings.humidityWarning}
              onChangeText={settings.setHumidityWarning}
            />
          </TouchableWithoutFeedback>
        </Layout>

        <Layout style={{ marginTop: 16 }}>
          <Button onPress={() => { saveHumidity() }}>Lưu</Button>
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