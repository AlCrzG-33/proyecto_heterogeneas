import { Text, type TextProps, StyleSheet } from "react-native"

interface ThemedTextProps extends TextProps {
  type?: "default" | "defaultSemiBold" | "title" | "subtitle" | "link"
}

export function ThemedText({ type = "default", style, ...props }: ThemedTextProps) {
  let textStyle

  switch (type) {
    case "title":
      textStyle = styles.title
      break
    case "subtitle":
      textStyle = styles.subtitle
      break
    case "defaultSemiBold":
      textStyle = styles.defaultSemiBold
      break
    case "link":
      textStyle = styles.link
      break
    default:
      textStyle = styles.default
  }

  return <Text style={[textStyle, style]} {...props} />
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  link: {
    fontSize: 16,
    color: "#0066cc",
    textDecorationLine: "underline",
  },
})
