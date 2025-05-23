"use client"

import ArticleCard from "@/components/ArticleCard"
import { useSettings } from "@/context/SettingsContext"
import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native"

export default function HomeScreen() {
  const [news, setNews] = useState({ articles: [] })
  const [loading, setLoading] = useState(true)
  const [apiWarning, setApiWarning] = useState("")
  const { width, height } = useWindowDimensions()
  const { settings } = useSettings()

  const getNumColumns = (screenWidth) => {
    if (screenWidth >= 1200) return 4
    if (screenWidth >= 900) return 3
    if (screenWidth >= 600) return 2
    return 1
  }

  const numColumns = getNumColumns(width)

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      setApiWarning("")

      try {
        const selectedCategories = Object.entries(settings.categories)
          .filter(([_, isSelected]) => isSelected)
          .map(([category]) => category.toLowerCase())

        const categoriesToFetch = selectedCategories.length > 0 ? selectedCategories : ['general']
        const allArticles = []

        for (const category of categoriesToFetch) {
          await new Promise(res => setTimeout(res, 1500))
          const url = `https://gnews.io/api/v4/top-headlines?category=${category}&country=${settings.country}&apikey=637c2ffe01ed65727d3e6170cf40a75f`
          console.log("Request URL:", url)

          const response = await fetch(url)

          if (response.status === 429) {
            console.warn("Error 429: Too Many Requests")
            setApiWarning("Has hecho demasiadas solicitudes. Espera un momento.")
            continue
          }

          const json = await response.json()
          console.log(`Fetched ${json.articles?.length || 0} articles from ${category}`)

          if (Array.isArray(json.articles)) {
            allArticles.push(...json.articles)
          }
        }

        const uniqueArticles = Array.from(
          new Map(allArticles.map(article => [article.title, article])).values()
        )

        setNews({ articles: uniqueArticles })
      } catch (error) {
        console.error("Error fetching news:", error)
        setApiWarning("Ocurrió un error al cargar las noticias.")
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [settings.categories, settings.country])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    )
  }

  const renderArticlesGrid = () => {
    if (!Array.isArray(news.articles) || news.articles.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay noticias disponibles. Intenta seleccionar otras categorías.</Text>
        </View>
      )
    }

    const articleRows = []
    const articles = [...news.articles]

    for (let i = 0; i < articles.length; i += numColumns) {
      const rowArticles = articles.slice(i, i + numColumns)

      articleRows.push(
        <View key={`row-${i}`} style={styles.row}>
          {rowArticles.map((article, index) => (
            <View
              key={`article-${i + index}`}
              style={[styles.articleWrapper, { width: `${100 / numColumns}%` }]}
            >
              <TouchableOpacity onPress={() => Linking.openURL(article.url)} style={styles.touchable}>
                <ArticleCard
                  title={article.title || "Title"}
                  description={
                    article.description ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                  }
                  imageUrl={article.image || "https://via.placeholder.com/400x200?text=No+Image"}
                />
              </TouchableOpacity>
            </View>
          ))}

          {/* Relleno para filas incompletas */}
          {Array(numColumns - rowArticles.length)
            .fill()
            .map((_, index) => (
              <View
                key={`empty-${i + index}`}
                style={[styles.articleWrapper, { width: `${100 / numColumns}%` }]}
              />
            ))}
        </View>
      )
    }

    return articleRows
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.articlesContainer, { minHeight: height * 1.2 }]}
      showsVerticalScrollIndicator={true}
      bounces={true}
    >
      {apiWarning !== "" && (
        <Text style={{ color: "red", textAlign: "center", marginVertical: 10 }}>{apiWarning}</Text>
      )}
      <View style={styles.content}>{renderArticlesGrid()}</View>
      <View style={styles.bottomPadding} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  articlesContainer: {
    padding: 8,
    paddingBottom: 100,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 16,
  },
  articleWrapper: {
    paddingHorizontal: 8,
    marginBottom: 16,
    height: 350,
  },
  touchable: {
    flex: 1,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  bottomPadding: {
    height: 80,
  },
})
