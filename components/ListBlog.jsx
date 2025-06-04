import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { colors, fontType } from '../constants/theme';
import firestore from '@react-native-firebase/firestore'; // Tidak dihapus

export default function ListBlog() {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPaintings = async () => {
  try {
    const response = await fetch('https://6829d51aab2b5004cb34e747.mockapi.io/api/kanvasnusantara');
    const data = await response.json();

    // Pastikan data adalah array
    if (Array.isArray(data)) {
      setPaintings(data);
    } else {
      console.warn('Data dari API bukan array:', data);
      setPaintings([]);
    }
  } catch (error) {
    console.error('Gagal mengambil data dari API:', error);
    setPaintings([]); // fallback kosong agar tidak crash
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchPaintings();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.black()} />
        <Text style={styles.loadingText}>Memuat data...</Text>
      </View>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    marginTop: 10,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
  },
});
