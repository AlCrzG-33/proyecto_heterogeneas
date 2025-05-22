"use client"

import ArticleCard from "@/components/ArticleCard"
import { useSettings } from "@/context/SettingsContext"
import { useEffect, useState } from "react"
import { ActivityIndicator, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"

export default function HomeScreen() {
  const [news, setNews] = useState({ articles: [] })
  const [loading, setLoading] = useState(true)
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

      try {
        const selectedCategories = Object.entries(settings.categories)
          .filter(([_, isSelected]) => isSelected)
          .map(([category]) => category.toLowerCase())

        // Si no hay categorías seleccionadas, usar 'general'
        const categoriesToFetch = selectedCategories.length > 0 ? selectedCategories : ['general']
        const allArticles = []

        for (const category of categoriesToFetch) {
          const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${settings.country || 'us'}&category=${category}&apiKey=5912444f7eba46f4af23efe4057e9838`
          )
          const json = await response.json()
          if (json.articles) {
            allArticles.push(...json.articles)
          }
        }

        // Eliminar duplicados basados en el título
        const uniqueArticles = Array.from(
          new Map(allArticles.map(article => [article.title, article])).values()
        )

        setNews({ articles: uniqueArticles })
      } catch (error) {
        console.error("Error fetching news:", error)
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
    if (!news.articles || news.articles.length === 0) {
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
            <View key={`article-${i + index}`} style={[styles.articleWrapper, { width: `${100 / numColumns}%` }]}>
              <TouchableOpacity 
                onPress={() => Linking.openURL(article.url)}
                style={styles.touchable}
              >
                <ArticleCard
                  title={article.title || "Title"}
                  description={
                    article.description ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                  }
                  imageUrl={article.urlToImage}
                />
              </TouchableOpacity>
            </View>
          ))}

          {/* Relleno para filas incompletas */}
          {Array(numColumns - rowArticles.length)
            .fill()
            .map((_, index) => (
              <View key={`empty-${i + index}`} style={[styles.articleWrapper, { width: `${100 / numColumns}%` }]} />
            ))}
        </View>
      )
    }

    return articleRows
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={[
        styles.articlesContainer,
        { minHeight: height * 1.2 } // Aumentar el espacio de scroll
      ]}
      showsVerticalScrollIndicator={true}
      bounces={true}
    >
      <View style={styles.content}>
        {renderArticlesGrid()}
      </View>
      
      {/* Espacio adicional al final para asegurar que todo sea accesible */}
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
    paddingBottom: 100, // Padding adicional en la parte inferior
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 350, // Altura fija para cada tarjeta
  },
  touchable: {
    flex: 1,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 80, // Espacio adicional al final
  }
})