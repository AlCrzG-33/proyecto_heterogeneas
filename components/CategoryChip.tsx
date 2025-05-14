import { Pressable, Text, StyleSheet, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface CategoryChipProps {
  label: string
  selected: boolean
  onToggle: () => void
}

export default function CategoryChip({ label, selected, onToggle }: CategoryChipProps) {
  return (
    <Pressable style={[styles.chip, selected && styles.selectedChip]} onPress={onToggle}>
      {selected && (
        <View style={styles.checkContainer}>
          <Ionicons name="checkmark" size={16} color="#fff" />
        </View>
      )}
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: "#e6e6fa",
  },
  checkContainer: {
    backgroundColor: "#6750a4",
    borderRadius: 12,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    color: "#333",
  },
  selectedLabel: {
    color: "#6750a4",
  },
})
