"use client"

import CategoryChip from "@/components/CategoryChip"
import { Collapsible } from "@/components/Collapsible"
import { ThemedText } from "@/components/ThemedText"
import ThemeToggle from "@/components/ThemeToggle"
import { useSettings } from "@/context/SettingsContext"
import { ScrollView, StyleSheet, Text, View } from "react-native"

export default function SettingsScreen() {
  const { settings, setSettings } = useSettings()

  const toggleCategory = (category: string) => {
    setSettings((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category],
      },
    }))
  }

  const toggleDarkMode = (value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      darkMode: value,
    }))
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.content}>
        <Collapsible title="Country news" initiallyExpanded={true}>
          <View style={styles.themeOption}>
            <Text style={styles.optionText}>United States</Text>
            <Text style={styles.optionText}>Mexico</Text>
            <Text style={styles.optionText}>Germany</Text>
            <Text style={styles.optionText}>Canada</Text>
            <ThemeToggle value={settings.darkMode} onValueChange={toggleDarkMode} />
          </View>
        </Collapsible>

        <Collapsible title="Categories" initiallyExpanded={true}>
          <ThemedText>Select your preferred news categories:</ThemedText>
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
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
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
  },
  notificationOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
})
