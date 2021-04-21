import { useNavigation } from '@react-navigation/core';
import { Divider, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackIcon } from '../components/Icons';
import { Setting } from '../components/Setting';
import { useAuthState } from '../contexts/AuthContext';


export const SettingsScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const auth = useAuthState();

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  )

  return (
    <SafeAreaView>
      <TopNavigation
        title="Cài đặt"
        alignment='center'
        accessoryLeft={renderBackAction} />
      <Divider />
      <Layout style={styles.container}>
        <Setting style={styles.setting} hint="Thay đổi địa điểm" onPress={() => navigation.navigate('Location')} />
        <Setting style={styles.setting} hint="Cài đặt ngưỡng thông báo nhiệt độ" onPress={() => navigation.navigate('TemperatureSetting')} />
        <Setting style={styles.setting} hint="Cài đặt ngưỡng thông báo độ ẩm" onPress={() => navigation.navigate('HumiditySetting')} />
        <Setting style={styles.setting} hint="Cài đặt ngưỡng thông báo nồng độ bụi" onPress={() => navigation.navigate('DustSetting')} />
      </Layout>
      <TouchableOpacity onPress={() => auth.logout()}>
        <Text style={styles.logoutText}>
          Đăng xuất
      </Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  setting: {
    padding: 16,
    paddingTop: 32,
  },
  logoutText: {
    color: '#3366ff',
    marginTop: 16,
    alignSelf: 'center'
  }
})