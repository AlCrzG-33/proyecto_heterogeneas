"use client"

import CategoryChip from "@/components/CategoryChip"
import { Collapsible } from "@/components/Collapsible"
import { ThemedText } from "@/components/ThemedText"
import { useSettings } from "@/context/SettingsContext"
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native"

export default function SettingsScreen() {
  const { settings, setSettings } = useSettings()
  const { height } = useWindowDimensions()

  const toggleCategory = (category: string) => {
    setSettings((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category],
      },
    }))
  }

  const availableCountries = [
    { code: "us", name: "United States" },
    { code: "mx", name: "Mexico" },
    { code: "de", name: "Germany" },
    { code: "ca", name: "Canada" },
    { code: "fr", name: "France" },
    { code: "jp", name: "Japan" },
  ]

  const toggleDarkMode = (value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      darkMode: value,
    }))
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        { minHeight: height * 0.9 } // Asegura que haya suficiente espacio para desplazarse
      ]}
      showsVerticalScrollIndicator={true}
      bounces={true}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.content}>
        <Collapsible title="Country news" initiallyExpanded={true}>
          <ThemedText style={styles.sectionDescription}>Select the country for your news:</ThemedText>
          <View style={styles.countryContainer}>
            {availableCountries.map((country) => (
              <CategoryChip
                key={country.code}
                label={country.name}
                selected={settings.country === country.code}
                onToggle={() =>
                  setSettings((prev) => ({
                    ...prev,
                    country: country.code,
                  }))
                }
              />
            ))}
          </View>
        </Collapsible>

        <View style={styles.sectionSeparator} />

        <Collapsible title="Categories" initiallyExpanded={true}>
          <ThemedText style={styles.sectionDescription}>Select your preferred news categories:</ThemedText>
          <View style={styles.categoriesContainer}>
            {Object.entries(settings.categories).map(([category, selected]) => (
              <CategoryChip
                key={category}
                label={category}
                selected={selected}
                onToggle={() => toggleCategory(category)}
              />
            ))}
          </View>
        </Collapsible>
        
        {/* Espacio adicional al final para asegurar que todo sea accesible */}
        <View style={styles.bottomPadding} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 40, // Padding adicional en la parte inferior
  },
  header: {
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    padding: 16,
  },
  sectionDescription: {
    marginBottom: 12,
    fontSize: 16,
  },
  themeOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8, // Espacio entre chips
  },
  countryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8, // Espacio entre chips
  },
  notificationOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  sectionSeparator: {
    height: 20, // Espacio entre secciones
  },
  bottomPadding: {
    height: 60, // Espacio adicional al final
  }
})