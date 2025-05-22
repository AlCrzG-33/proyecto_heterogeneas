// context/SettingsContext.tsx
import React, { createContext, useContext, useState } from "react"

const defaultSettings = {
  categories: {
    Business: true,
    Entertainment: true,
    General: true,
    Sports: true,
    Health: true,
    Science: true,
    Technology: true,
  },
  language: "en",
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
