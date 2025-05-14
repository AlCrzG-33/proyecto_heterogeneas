import type { ReactNode } from "react"
import { View, StyleSheet, Animated } from "react-native"

interface ParallaxScrollViewProps {
  children: ReactNode
  headerImage: ReactNode
  headerBackgroundColor?: {
    light: string
    dark: string
  }
  headerHeight?: number
}

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor = { light: "#D0D0D0", dark: "#353636" },
  headerHeight = 200,
}: ParallaxScrollViewProps) {
  const scrollY = new Animated.Value(0)
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight / 2],
    extrapolate: "clamp",
  })

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            backgroundColor: headerBackgroundColor.light,
            transform: [{ translateY: headerTranslate }],
          },
        ]}
      >
        {headerImage}
      </Animated.View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        contentContainerStyle={[styles.scrollViewContent, { paddingTop: headerHeight }]}
      >
        <View style={styles.content}>{children}</View>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    zIndex: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  content: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
})
