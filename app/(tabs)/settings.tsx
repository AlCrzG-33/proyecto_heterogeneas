"use client"

import CategoryChip from "@/components/CategoryChip"
import { Collapsible } from "@/components/Collapsible"
import { ThemedText } from "@/components/ThemedText"
import { useSettings } from "@/context/SettingsContext"
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native"

export default function SettingsScreen() {
  const { settings, setSettings } = useSettings()
  const { height } = useWindowDimensions()

  const enforceCategoryLimit = (category) => {
    const currentSelected = Object.entries(settings.categories)
      .filter(([_, selected]) => selected)
      .map(([cat]) => cat)

    const isSelected = settings.categories[category]

    if (isSelected) {
      setSettings((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          [category]: false,
        },
      }))
    } else {
      if (currentSelected.length < 2) {
        setSettings((prev) => ({
          ...prev,
          categories: {
            ...prev.categories,
            [category]: true,
          },
        }))
      } else {
        const [first] = currentSelected
        const updatedCategories = { ...settings.categories }
        updatedCategories[first] = false
        updatedCategories[category] = true

        setSettings((prev) => ({
          ...prev,
          categories: updatedCategories,
        }))
      }
    }
  }

  const availableCountries = [
    { code: "au", name: "Australia" },
    { code: "br", name: "Brazil" },
    { code: "ca", name: "Canada" },
    { code: "cn", name: "China" },
    { code: "eg", name: "Egypt" },
    { code: "fr", name: "France" },
    { code: "de", name: "Germany" },
    { code: "gr", name: "Greece" },
    { code: "hk", name: "Hong Kong" },
    { code: "in", name: "India" },
    { code: "ie", name: "Ireland" },
    { code: "il", name: "Israel" },
    { code: "it", name: "Italy" },
    { code: "jp", name: "Japan" },
    { code: "nl", name: "Netherlands" },
    { code: "no", name: "Norway" },
    { code: "pk", name: "Pakistan" },
    { code: "pe", name: "Peru" },
    { code: "ph", name: "Philippines" },
    { code: "pt", name: "Portugal" },
    { code: "ro", name: "Romania" },
    { code: "ru", name: "Russian Federation" },
    { code: "sg", name: "Singapore" },
    { code: "es", name: "Spain" },
    { code: "se", name: "Sweden" },
    { code: "ch", name: "Switzerland" },
    { code: "tw", name: "Taiwan" },
    { code: "ua", name: "Ukraine" },
    { code: "gb", name: "United Kingdom" },
    { code: "us", name: "United States" },
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
        { minHeight: height * 0.9 },
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
                onToggle={() => enforceCategoryLimit(category)}
              />
            ))}
          </View>
        </Collapsible>

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
    paddingBottom: 40,
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
    gap: 8,
  },
  countryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8,
  },
  notificationOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  sectionSeparator: {
    height: 20,
  },
  bottomPadding: {
    height: 60,
  },
})
