import { Image, StyleSheet, Text, View } from "react-native"

interface ArticleCardProps {
  title: string
  description: string
  imageUrl?: string
}

export default function ArticleCard({ title, description, imageUrl }: ArticleCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.placeholderContainer}>
            <View style={styles.triangle} />
            <View style={styles.square} />
            <View style={styles.circle} />
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {description}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: "100%",
  },
  imageContainer: {
    height: 200,
    backgroundColor: "#d3d3d3",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderContainer: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap: 24,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderBottomWidth: 50,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#999",
  },
  square: {
    width: 50,
    height: 50,
    backgroundColor: "#999",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#999",
  },
  content: {
    padding: 16,
    backgroundColor: "#faf0f0",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
})
