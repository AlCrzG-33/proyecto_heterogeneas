import ArticleCard from '@/components/ArticleCard';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
  
export default function HomeScreen() {

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?category=technology&apiKey=5912444f7eba46f4af23efe4057e9838`);
        const json = await response.json();
        console.log(json);
        setNews(json);
      } catch (error) {
        console.error('Error fetching news:', error); 
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <ScrollView>
        <div>Loading...</div>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <div>
        {news.articles.map((article, index) => (
          <a style={{ textDecoration: 'none' }} href={article.url} target="_blank" rel="noopener noreferrer" key={index}>
            <ArticleCard title={article.title} description={article.description} imageUrl={article.urlToImage} />
          </a>
        ))
        }
      </div>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
