"use client"

import { useState } from "react"
import { StyleSheet, View, ScrollView, Text } from "react-native"
import { Collapsible } from "@/components/Collapsible"
import { ThemedText } from "@/components/ThemedText"
import ThemeToggle from "@/components/ThemeToggle"
import CategoryChip from "@/components/CategoryChip"

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false)
  const [categories, setCategories] = useState({
    Business: true,
    Entertainment: true,
    General: true,
    Sports: true,
    Health: true,
    Science: true,
    Technology: true,
  })

  const toggleCategory = (category: string) => {
    setCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.content}>
        <Collapsible title="Theme" initiallyExpanded={true}>
          <View style={styles.themeOption}>
            <Text style={styles.optionText}>Dark Mode</Text>
            <ThemeToggle value={darkMode} onValueChange={setDarkMode} />
          </View>
        </Collapsible>

        <Collapsible title="Categories" initiallyExpanded={true}>
          <ThemedText>Select your preferred news categories:</ThemedText>
          <View style={styles.categoriesContainer}>
            {Object.entries(categories).map(([category, selected]) => (
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
