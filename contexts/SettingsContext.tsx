import React, { useContext, useState } from 'react';

export interface SettingsContextState {
  location: string,
  setLocation: (value: string) => void,
  temperatureWarning?: string,
  setTemperatureWarning: (value: string) => void,
  humidityWarning?: string,
  setHumidityWarning: (value: string) => void,
  dustWarning?: string,
  setDustWarning: (value: string) => void
}

export interface SettingsProviderProps {
  children: React.ReactNode
}

const SettingsContext = React.createContext<SettingsContextState | undefined>(undefined);

export const SettingsProvider: React.FunctionComponent<SettingsProviderProps> = ({
  children,
}: SettingsProviderProps) => {
  const [location, setLocation] = useState<string>("dhcn");
  const [temperatureWarning, setTemperatureWarning] = useState<string>();
  const [humidityWarning, setHumidityWarning] = useState<string>();
  const [dustWarning, setDustWarning] = useState<string>();


  return (
    <SettingsContext.Provider
      value={{
        location,
        setLocation,
        temperatureWarning,
        setTemperatureWarning,
        humidityWarning,
        setHumidityWarning,
        dustWarning,
        setDustWarning
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettingState(): SettingsContextState {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("setting context error")
  }
  return context
}