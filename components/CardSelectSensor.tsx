import { Icon, Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';


interface CartdSelectSensorProps {
  onPress: () => void,
  iconName: string,
  title: string,
  onActive: boolean
}

export const CardSelectSensor: React.FC<CartdSelectSensorProps> = ({
  onPress,
  iconName,
  title,
  onActive
}: CartdSelectSensorProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Layout style={onActive ? styles.wrapperActive : styles.wrapper}>
        <Icon style={styles.icon} name={iconName} fill={onActive ? "#fff" : "#bababa"} />
        <Text style={onActive ? styles.textActive : styles.text}>{title}</Text>
      </Layout>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 0.3,
    borderRadius: 8,
    padding: 16,
    marginTop: 10,
    borderColor: "#bababa",
    backgroundColor: "#fff"
  },
  wrapperActive: {
    borderRadius: 8,
    padding: 16,
    marginTop: 10,
    backgroundColor: "#adadad"
  },
  icon: {
    width: 32,
    height: 32
  },
  text: {
    marginTop: 8
  },
  textActive: {
    color: "#fff",
    marginTop: 8
  }
})