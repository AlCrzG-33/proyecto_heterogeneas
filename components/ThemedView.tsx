import { View, type ViewProps, StyleSheet } from "react-native"

export function ThemedView(props: ViewProps) {
  return <View {...props} style={[styles.container, props.style]} />
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
})
