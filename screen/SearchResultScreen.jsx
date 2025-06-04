import React, { useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors, fontType } from '../src/theme';

export default function SearchResultScreen({ route }) {
  const { query } = route.params;

  const paintings = [
     {
      id: 1,
      title: 'The Scream',
      artist: 'Edvard Munch',
      category: 'Expressionism',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/The_Scream.jpg/1200px-The_Scream.jpg',
    },
    {
      id: 2,
      title: 'The Last Supper',
      artist: 'Leonardo da Vinci',
      category: 'Renaissance',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg/1200px-The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg',
    },
    {
      id: 3,
      title: 'Guernica',
      artist: 'Pablo Picasso',
      category: 'Cubism',
      image: 'https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg',
    },
    {
      id: 4,
      title: 'The Persistence of Memory',
      artist: 'Salvador Dalí',
      category: 'Surrealism',
      image: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg',
    },
    {
      id: 5,
      title: 'The Creation of Adam',
      artist: 'Michelangelo',
      category: 'Renaissance',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1200px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
    },
    {
      id: 6,
      title: 'The Birth of Venus',
      artist: 'Sandro Botticelli',
      category: 'Renaissance',
      image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=800&q=60',
    },
  ];

  const filtered = paintings.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.artist.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Komponen kartu dengan animasi scale on press
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

      {filtered.length === 0 ? (
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
