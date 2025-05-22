"use client"

import ArticleCard from "@/components/ArticleCard"
import { useSettings } from "@/context/SettingsContext"
import { useEffect, useState } from "react"
import { ActivityIndicator, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native"

export default function HomeScreen() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const { width } = useWindowDimensions()
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

        const allArticles = []

        for (const category of selectedCategories) {
          const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=5912444f7eba46f4af23efe4057e9838`
          )
          const json = await response.json()
          if (json.articles) {
            allArticles.push(...json.articles)
          }
        }

        setNews({ articles: allArticles })
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [settings.categories]) // Re-fetch when categories change

  if (loading) {
    return (
      <ScrollView style={styles.container}>
        <ActivityIndicator size="large" color="#666" />
      </ScrollView>
    )
  }

  const renderArticlesGrid = () => {
    if (!news.articles || news.articles.length === 0) return null

    const articleRows = []
    const articles = [...news.articles]

    for (let i = 0; i < articles.length; i += numColumns) {
      const rowArticles = articles.slice(i, i + numColumns)

      articleRows.push(
        <View key={`row-${i}`} style={styles.row}>
          {rowArticles.map((article, index) => (
            <View key={`article-${i + index}`} style={[styles.articleWrapper, { width: `${100 / numColumns}%` }]}>
              <a style={{ textDecoration: "none" }} href={article.url} target="_blank" rel="noopener noreferrer">
                <ArticleCard
                  title={article.title || "Title"}
                  description={
                    article.description ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                  }
                  imageUrl={article.urlToImage}
                />
              </a>
            </View>
          ))}

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
    <ScrollView style={styles.container}>
      <View style={styles.articlesContainer}>{renderArticlesGrid()}</View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  articlesContainer: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 16,
  },
  articleWrapper: {
    paddingHorizontal: 8,
  },
})