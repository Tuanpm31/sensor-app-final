import React, { useContext, useEffect, useState } from 'react';
import { database } from '../firebase';
import { useSettingState } from './SettingsContext';

export interface DataContextState {
  selectedData: string,
  setSelectedData: (value: string) => void,
  currentData: string,
  currentTrackingData: Array<number>,
  averageValue: string,
  messageWarning?: string,
  currentTrackingTime: Array<string>,
}

export interface DataProviderProps {
  children: React.ReactNode
}

const DataContext = React.createContext<DataContextState | undefined>(undefined);

export const DataProvider: React.FC<DataProviderProps> = ({
  children
}: DataProviderProps) => {

  const settings = useSettingState();
  const { location, temperatureWarning, humidityWarning, dustWarning } = settings;

  const [selectedData, setSelectedData] = useState<string>("temperature");
  const [currentData, setCurrentData] = useState<string>("");
  const [currentTrackingData, setCurrentTrackingData] = useState<Array<number>>([]);
  const [averageValue, setAverageValue] = useState<string>("");
  const [messageWarning, setMessageWarning] = useState<string | undefined>();
  const [currentTrackingTime, setCurrentTrackingTime] = useState<Array<string>>([]);

  // function formatForMessageWarning(type: string) {
  //   switch (type) {
  //     case "temperature":
  //       return "Nhiệt độ vượt quá ngưỡng thiết lập cảnh báo"
  //     case "humidity":
  //       return "Độ ẩm vượt quá ngưỡng thiết lập cảnh báo"
  //     case "dust":
  //       return "Nồng độ bụi vượt quá ngưỡng cảnh báo"
  //     default:
  //       return null
  //   }

  // }

  useEffect(() => {
    const ref = database.ref("locations").child(location).child('data').child(selectedData);
    const listener = ref.on('value', (snapshot) => {
      setCurrentData(snapshot.val());
    });

    return () => {
      ref.off('value', listener);
    }

  }, [selectedData, location]);


  useEffect(() => {
    switch (selectedData) {
      case "temperature":
        if (temperatureWarning && Number(temperatureWarning) < Number(currentData)) {
          setMessageWarning("Nhiệt độ vượt quá ngưỡng thiết lập cảnh báo")
        } else {
          setMessageWarning(undefined)
        }
        break;
      case "humidity":
        if (humidityWarning && Number(humidityWarning) < Number(currentData)) {
          setMessageWarning("Độ ẩm vượt quá ngưỡng thiết lập cảnh báo")
        } else {
          setMessageWarning(undefined)
        }
        break;
      case "dust":
        if (dustWarning && Number(dustWarning) < Number(currentData)) {
          setMessageWarning("Nồng độ bụi vượt quá ngưỡng cảnh báo")
        } else {
          setMessageWarning(undefined)
        }
        break;
      default:
        setMessageWarning(undefined)
        break;
    }
  }, [currentData, selectedData, settings.dustWarning, settings.humidityWarning, settings.temperatureWarning])

  useEffect(() => {
    const ref = database.ref("locations").child(location).child('tracking').child(selectedData);
    const listener = ref.on('value', (snapshot) => {
      let temp: Array<number> = []
      let tempTime: Array<string> = []
      Object.keys(snapshot.val()).forEach((k) => {
        let entry = snapshot.val()[k];
        temp.push(Number(entry.value));
        tempTime.push(String(entry.time));
      });
      if (temp.length <= 6) {
        setCurrentTrackingData(temp);
        setCurrentTrackingTime(tempTime);
      } else {
        temp = temp.slice(temp.length - 6);
        tempTime = tempTime.slice(tempTime.length - 6);
        setCurrentTrackingData(temp);
        setCurrentTrackingTime(tempTime);
      }
      const average: string = (temp.reduce((a, b) => a + b, 0) / temp.length).toFixed(2);
      setAverageValue(String(average));
    })

    return () => {
      ref.off('value', listener)
    }

  }, [selectedData, location]);

  return (
    <DataContext.Provider
      value={{
        selectedData,
        setSelectedData,
        currentData,
        currentTrackingData,
        averageValue,
        messageWarning,
        currentTrackingTime
      }}>
      {children}
    </DataContext.Provider>
  )
}

export function useDataState(): DataContextState {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("data context error");
  }
  return context
}