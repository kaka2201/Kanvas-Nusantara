import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { colors, fontType } from '../src/theme';

export default function SearchResultScreen({ route }) {
  const { query } = route.params;

  // Contoh data lukisan (bisa kamu ganti nanti dengan API atau filter dari global state)
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
    // Tambahkan lainnya jika perlu...
  ];

  const filtered = paintings.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.artist.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {filtered.length === 0 ? (
        <Text style={styles.noResult}>No results for "{query}"</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.artist}>{item.artist}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
          )}
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
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.white(),
    borderRadius: 12,
    elevation: 4,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
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
