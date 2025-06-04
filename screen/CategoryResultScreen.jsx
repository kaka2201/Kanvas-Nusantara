import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors, fontType } from '../src/theme';

// Contoh data lukisan, seharusnya ini berasal dari API atau database
const paintingsData = [
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

export default function CategoryResultScreen() {
  const route = useRoute();
  const { category } = route.params;

  // Filter lukisan berdasarkan kategori yang diterima
  const filteredPaintings = paintingsData.filter(
    (item) => item.category === category
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.paintingName}>{item.title}</Text>
        <Text style={styles.authorName}>{item.artist}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kategori: {category}</Text>

      {filteredPaintings.length === 0 ? (
        <Text style={styles.noDataText}>Belum ada lukisan untuk kategori ini.</Text>
      ) : (
        <FlatList
          data={filteredPaintings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginBottom: 15,
  },
  noDataText: {
    fontSize: 16,
    color: colors.grey(),
    fontFamily: fontType['Pjs-Regular'],
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: colors.white(),
    elevation: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  paintingName: {
    fontSize: 16,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
  },
  authorName: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
    marginTop: 4,
  },
});
