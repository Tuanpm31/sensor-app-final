import React from 'react';
import { Layout, TopNavigation, TopNavigationAction, Text, Button } from '@ui-kitten/components';
import { ScrollView, StyleSheet, View, Dimensions, Platform } from 'react-native'
import { useAuthState } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/core';
import { SettingIcon } from '../components/Icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettingState } from '../contexts/SettingsContext';
import { CardSelectSensor } from '../components/CardSelectSensor';
import { useDataState } from '../contexts/DataContext';
import { LineChart } from 'react-native-chart-kit';
import { exportExcel } from '../utils/export';
import { formatData } from '../utils/data';
import { formatDate } from '../utils/datetime';

export const HomeScreen = (): React.ReactElement => {
  const auth = useAuthState();
  const navigation = useNavigation();
  const settings = useSettingState();
  const dataState = useDataState();
  const date = formatDate()

  const { currentData, selectedData, averageValue, messageWarning } = dataState;


  const renderSettingsAction = () => (
    <TopNavigationAction icon={SettingIcon} onPress={() => navigation.navigate('Settings')} />
  )

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <React.Fragment>
        <TopNavigation
          title='Thông số môi trường'
          alignment='center'
          accessoryRight={renderSettingsAction}
        />
        <ScrollView style={{ backgroundColor: '#fff' }}>
          <Layout style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            {auth.currentUser?.displayName && (
              <Text style={styles.name}>{auth.currentUser?.displayName}</Text>
            )}
          </Layout>
          <Layout style={styles.cardContainer}>
            <View style={styles.cardItems}>
              <CardSelectSensor
                onPress={() => dataState.setSelectedData("temperature")}
                iconName="thermometer"
                title="Nhiệt độ"
                onActive={selectedData === "temperature"} />

              <CardSelectSensor
                onPress={() => dataState.setSelectedData("dust")}
                iconName="trash"
                title="Nồng độ bụi"
                onActive={selectedData === "dust"} />
            </View>
            <View style={styles.cardItems}>
              <CardSelectSensor
                onPress={() => dataState.setSelectedData("humidity")}
                iconName="droplet" title="Độ ẩm"
                onActive={selectedData === "humidity"} />
            </View>
          </Layout>
          <Layout style={styles.valueCircleContainer}>
            <Layout style={styles.valueCircle}>
              <Layout style={styles.containerText}>
                <Text style={styles.textCircleValue}>{formatData(selectedData, currentData)}</Text>
              </Layout>
            </Layout>
          </Layout>
          <Layout style={styles.averageContainer}>
            {
              messageWarning && (
                <Text style={{ color: 'red', alignSelf: 'center' }}>{messageWarning}</Text>
              )
            }

            <Text style={{ color: "#bababa", fontSize: 20 }}>Giá trị trung bình: <Text style={{ fontSize: 20 }}>{formatData(selectedData, averageValue)}</Text></Text>
            <Text style={{ marginTop: 16, color: "#bababa", fontSize: 20 }}>Biểu đồ:</Text>
          </Layout>
          <LineChart
            data={{
              labels: [],
              datasets: [
                {
                  data: dataState.currentTrackingData,
                },
              ],
            }}
            width={Dimensions.get('window').width - 32} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
              style: {
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              marginTop: 16,
              paddingStart: 16
            }}
          />
          {
            Platform.OS !== "web" && (
              <Button onPress={() => exportExcel()} style={{ marginHorizontal: 16, backgroundColor: "#bababa", borderWidth: 0, marginBottom: 16 }}>Xuất dữ liệu</Button>
            )
          }


        </ScrollView>
      </React.Fragment>
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  date: {
    color: '#bababa',
    fontSize: 20
  },
  name: {
    marginTop: 32,
    fontSize: 16
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  cardItems: {
    width: '50%',
    paddingHorizontal: 10
  },
  valueCircleContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 32
  },
  valueCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#fff",
    borderWidth: 5,
    borderColor: "#bababa",
    justifyContent: 'center'
  },
  containerText: {
    alignSelf: 'center',
    fontSize: 20,
    position: 'relative'
  },
  textCircleValue: {
    fontSize: 32,
    color: "#bababa"
  },
  averageContainer: {
    paddingHorizontal: 16,
    marginTop: 16
  }
})