import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { colors, fontType } from '../src/theme';

export default function SearchResultScreen({ route }) {
  const { query } = route.params;
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPaintings = async () => {
    try {
      const response = await axios.get('https://6829d51aab2b5004cb34e747.mockapi.io/api/kanvas');
      setPaintings(response.data);
    } catch (error) {
      console.error('Error fetching paintings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaintings();
  }, []);

  const filtered = paintings.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.artist.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const PaintingCard = ({ item }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>{item.artist}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultCount}>
        {filtered.length} hasil untuk "{query}"
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.gold()} style={{ marginTop: 40 }} />
      ) : filtered.length === 0 ? (
        <Text style={styles.noResult}>No results for "{query}"</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <PaintingCard item={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
    padding: 16,
  },
  resultCount: {
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 14,
    color: colors.grey(),
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.white(),
    borderRadius: 12,
    elevation: 6,
    marginBottom: 20,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 18,
    color: colors.black(),
    marginTop: 10,
  },
  artist: {
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 14,
    color: colors.grey(),
    marginTop: 4,
  },
  category: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 12,
    color: colors.gold(),
    marginTop: 4,
  },
  noResult: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.grey(),
    marginTop: 50,
    fontFamily: fontType['Pjs-Medium'],
  },
});
