import { SettingsProvider } from "@/context/SettingsContext"
import { useColorScheme } from "@/hooks/useColorScheme"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Platform, StyleSheet, Text, View, useWindowDimensions } from "react-native"
import "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const { width } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const isSmallDevice = width < 380
  const isLargeDevice = width >= 768

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })

  if (!loaded) return null

const nytColors = {
  background: colorScheme === "dark" ? "#FFFFFF" : "#121212",
  text: colorScheme === "dark" ? "#121212" : "#F0F0F0",
  accent: colorScheme === "dark" ? "#E2E2E2" : "#6B6B6B",
  border: colorScheme === "dark" ? "#E0E0E0" : "#333333",
  headerBg: colorScheme === "dark" ? "#FFFFFF" : "#1A1A1A",
}

  const responsiveStyles = StyleSheet.create({
    header: {
      paddingTop: Platform.OS === "ios" ? insets.top : 20,
      paddingBottom: isSmallDevice ? 5 : 10,
      paddingHorizontal: isSmallDevice ? 10 : isLargeDevice ? 24 : 16,
      borderBottomWidth: 1,
      borderBottomColor: nytColors.border,
    },
    date: {
      fontSize: isSmallDevice ? 10 : isLargeDevice ? 14 : 12,
      textAlign: "center",
      marginBottom: isSmallDevice ? 4 : 8,
    },
    title: {
      fontFamily: "TimesNewRoman",
      fontSize: isSmallDevice ? 24 : isLargeDevice ? 42 : 32,
      textAlign: "center",
      marginBottom: isSmallDevice ? 8 : 12,
    },
    headerNav: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: isSmallDevice ? 10 : isLargeDevice ? 30 : 20,
    },
  })

  return (
    <SettingsProvider>
      {/* NYT-style header */}
      <View style={[responsiveStyles.header, { backgroundColor: nytColors.headerBg }]}>
        <Text style={[responsiveStyles.date, { color: nytColors.text }]}>
          {new Date().toLocaleDateString("en-US", {
            weekday: isSmallDevice ? "short" : "long",
            month: isSmallDevice ? "short" : "long",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
        <Text style={[responsiveStyles.title, { color: nytColors.text }]}>El Sentinela</Text>
        <View style={responsiveStyles.headerNav}></View>
      </View>

      {/* Navegación principal */}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: nytColors.headerBg,
          },
          headerTintColor: nytColors.text,
          headerTitleStyle: {
            fontFamily: "TimesNewRoman",
            fontSize: isSmallDevice ? 18 : isLargeDevice ? 24 : 20,
          },
          contentStyle: {
            backgroundColor: nytColors.background,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </SettingsProvider>
  )
}
