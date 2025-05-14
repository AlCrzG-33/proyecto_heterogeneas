"use client"

import { useState } from "react"
import { StyleSheet, View, ScrollView } from "react-native"

import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { Collapsible } from "@/components/Collapsible"
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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>

      <Collapsible title="Theme" initiallyExpanded={true}>
        <View style={styles.themeContainer}>
          <ThemedText>Dark Mode</ThemedText>
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    marginTop: 8,
  },
  themeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
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
