import { StyleSheet, Pressable } from "react-native"
import { Animated } from "react-native"

interface ThemeToggleProps {
  value: boolean
  onValueChange: (value: boolean) => void
}

export default function ThemeToggle({ value, onValueChange }: ThemeToggleProps) {
  const translateX = new Animated.Value(value ? 20 : 0)

  const toggleSwitch = () => {
    Animated.spring(translateX, {
      toValue: value ? 0 : 20,
      useNativeDriver: true,
    }).start()
    onValueChange(!value)
  }

  return (
    <Pressable onPress={toggleSwitch} style={[styles.container, { backgroundColor: value ? "#6750a4" : "#d0d0d0" }]}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 5,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
})
