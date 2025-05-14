import { View, StyleSheet, type ViewStyle } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface IconSymbolProps {
  name: string
  size: number
  color: string
  style?: ViewStyle
}

export function IconSymbol({ name, size, color, style }: IconSymbolProps) {
  // This is a simplified version that uses Ionicons
  // In a real app, you might want to handle the custom icon name format
  const iconName = name.includes(".") ? "code" : name

  return (
    <View style={[styles.container, style]}>
      <Ionicons name={iconName as any} size={size} color={color} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
})
