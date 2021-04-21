import { useNavigation } from "@react-navigation/core";
import { Layout, Text, TopNavigation, TopNavigationAction, Divider, Icon } from "@ui-kitten/components";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowIosBackIcon } from '../components/Icons';
import { Setting } from "../components/Setting";
import { useSettingState } from "../contexts/SettingsContext";


export const LocationScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const settings = useSettingState();

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={() => navigation.goBack()}
    />
  )

  const onLocationChoose = (value: string) => {
    settings.setLocation(value);
    navigation.navigate("Home");
  }


  return (
    <SafeAreaView
      style={{ flex: 1 }}>
      <TopNavigation
        title='Thay đổi địa điểm'
        alignment='center'
        accessoryLeft={renderBackAction}
      />
      <Divider />
      <ScrollView>
        <Layout>
          <Setting hint="Đại học công nghệ" style={styles.row} onPress={() => onLocationChoose("dhcn")}>
            <Image source={require('../assets/logo-dhcn.png')} style={styles.image} />
          </Setting>
          <Setting hint="Đà Nẵng" style={styles.row} onPress={() => onLocationChoose("dn")}>
            <Image source={require('../assets/adaptive-icon.png')} style={styles.image} />
          </Setting>
          <Setting hint="Hồ Chí Minh" style={styles.row} onPress={() => onLocationChoose("hcm")}>
            <Image source={require('../assets/adaptive-icon.png')} style={styles.image} />
          </Setting>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  row: {
    padding: 16
  },
  image: {
    width: 40,
    height: 40
  }
})