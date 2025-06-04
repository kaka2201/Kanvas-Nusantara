import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { colors, fontType } from '../constants/theme';

export default function CategoryResultScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://6829d51aab2b5004cb34e747.mockapi.io/api/kanvas';

  useEffect(() => {
    fetchPaintings();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

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
                setPaintings((prev) =>
                  prev.filter((item) => item.id !== itemId)
                );
              } else {
                console.error('Gagal menghapus data');
              }
            } catch (error) {
              console.error('Error saat menghapus:', error);
            }
          },
        },
      ]
    );
  };

  const filteredPaintings = paintings.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  const renderItem = ({ item }) => (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>By {item.artist}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.blue() }]}
            onPress={() => handleEdit(item)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.red() }]}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.black()} />
        <Text style={styles.loadingText}>Memuat data lukisan...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kategori: {category}</Text>
      <FlatList
        data={filteredPaintings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Tidak ada lukisan pada kategori ini.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    fontSize: 22,
    fontFamily: fontType['Pjs-Bold'],
    textAlign: 'center',
    marginVertical: 20,
    color: colors.black(),
  },
  card: {
    backgroundColor: colors.white(),
    borderRadius: 12,
    elevation: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
  },
  author: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.8),
    marginVertical: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.white(),
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.grey(0.6),
    marginTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
  },
});
