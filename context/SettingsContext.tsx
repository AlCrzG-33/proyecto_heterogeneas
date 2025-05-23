// context/SettingsContext.tsx
import React, { createContext, useContext, useState } from "react"

const defaultSettings = {
  categories: {
    General: true,
    World: false,
    Nation: false,
    Business: false,
    Technology: false,
    Entertainment: false,
    Sports: false,
    Science: false,
    Health: false,
  },
  country: "us",
}

const SettingsContext = createContext({
  settings: defaultSettings,
  setSettings: (s: any) => {},
})

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings)
  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)
