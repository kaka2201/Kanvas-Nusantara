import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { colors, fontType } from '../constants/theme';

export default function ListBlog() {
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

  return (
    <ScrollView>
      <View style={styles.listBlog}>
        {paintings.map((painting) => (
          <View key={painting.id} style={styles.cardItem}>
            <Image source={{ uri: painting.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardCategory}>{painting.category}</Text>
              <Text style={styles.cardTitle}>{painting.title}</Text>
              <Text style={styles.cardText}>{painting.artist}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listBlog: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
  cardItem: {
    backgroundColor: colors.white(),
    borderRadius: 15,
    elevation: 5,
    marginBottom: 15,
  },
  cardImage: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
    alignItems: 'center',
  },
  cardCategory: {
    color: colors.black(),
    fontSize: 12,
    fontFamily: fontType['Pjs-SemiBold'],
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginTop: 10,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(),
    marginTop: 5,
    textAlign: 'center',
  },
});
