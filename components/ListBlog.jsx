import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fontType } from '../constants/theme';

export default function ListBlog() {
  const navigation = useNavigation();

  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://6829d51aab2b5004cb34e747.mockapi.io/api/kanvas';

  const fetchPaintings = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPaintings(data);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaintings();
  }, []);

  const handleEdit = (item) => {
    navigation.navigate('AddEditPainting', { painting: item });
  };

  const handleDelete = (itemId) => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin menghapus lukisan ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/${itemId}`, {
                method: 'DELETE',
              });
              if (response.ok) {
                // Update state untuk hapus item secara lokal
                setPaintings((prev) => prev.filter((item) => item.id !== itemId));
              } else {
                Alert.alert('Error', 'Gagal menghapus data.');
              }
            } catch (error) {
              console.error('Error saat menghapus:', error);
              Alert.alert('Error', 'Terjadi kesalahan saat menghapus.');
            }
          },
        },
      ]
    );
  };

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

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.blue() }]}
                  onPress={() => handleEdit(painting)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.red() }]}
                  onPress={() => handleDelete(painting.id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
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
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 250,
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
  actions: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 15,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
  },
  buttonText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 14,
  },
});
