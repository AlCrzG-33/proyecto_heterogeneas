"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, Pressable, LayoutAnimation, Platform, UIManager } from "react-native"
import { Ionicons } from "@expo/vector-icons"

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

interface CollapsibleProps {
  title: string
  children: React.ReactNode
  initiallyExpanded?: boolean
}

export function Collapsible({ title, children, initiallyExpanded = false }: CollapsibleProps) {
  const [expanded, setExpanded] = useState(initiallyExpanded)

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpanded(!expanded)
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleExpand} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={24} color="#666" />
      </Pressable>
      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
})
