import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { colors, fontType } from '../src/theme';

const paintingsDataInit = [
  {
    id: '1',
    category: 'Renaissance',
    name: 'Mona Lisa',
    author: 'Leonardo da Vinci',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg',
  },
  {
    id: '2',
    category: 'Baroque',
    name: 'The Night Watch',
    author: 'Rembrandt',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/25/The_Nightwatch_by_Rembrandt.jpg',
  },
  // Tambahkan data lainnya sesuai kebutuhan
];

export default function CategoryResultScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params;

  const [paintingsData, setPaintingsData] = useState(paintingsDataInit);

  const filteredPaintings = paintingsData.filter((item) => item.category === category);

  const handleEdit = (item) => {
    navigation.navigate('AddEditPainting', {
      isEdit: true,
      painting: {
        id: item.id,
        title: item.name,
        author: item.author,
        image: item.image,
        category: item.category,
      },
    });
  };

  const handleDelete = (item) => {
    Alert.alert(
      'Hapus Data',
      `Apakah Anda yakin ingin menghapus lukisan: ${item.name}?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            setPaintingsData((prev) => prev.filter((p) => p.id !== item.id));
          },
        },
      ]
    );
  };

  // Komponen Item dengan animasi fade-in dan tombol scale
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const RenderItem = ({ item }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleEdit = useRef(new Animated.Value(1)).current;
    const scaleDelete = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    }, [fadeAnim]);

    const onPressIn = (anim) => {
      Animated.spring(anim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };
    const onPressOut = (anim) => {
      Animated.spring(anim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.info}>
          <Text style={styles.paintingName}>{item.name}</Text>
          <Text style={styles.authorName}>{item.author}</Text>

          <View style={styles.buttonsContainer}>
            <AnimatedPressable
              style={[styles.button, styles.editButton, { transform: [{ scale: scaleEdit }] }]}
              onPress={() => handleEdit(item)}
              onPressIn={() => onPressIn(scaleEdit)}
              onPressOut={() => onPressOut(scaleEdit)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </AnimatedPressable>

            <AnimatedPressable
              style={[styles.button, styles.deleteButton, { transform: [{ scale: scaleDelete }] }]}
              onPress={() => handleDelete(item)}
              onPressIn={() => onPressIn(scaleDelete)}
              onPressOut={() => onPressOut(scaleDelete)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Hapus</Text>
            </AnimatedPressable>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kategori: {category}</Text>

      {filteredPaintings.length === 0 ? (
        <Text style={styles.noDataText}>Belum ada lukisan untuk kategori ini.</Text>
      ) : (
        <FlatList
          data={filteredPaintings}
          renderItem={RenderItem}
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
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  editButton: {
    backgroundColor: colors.gold(),
  },
  deleteButton: {
    backgroundColor: colors.red ? colors.red() : '#ff4d4d',
  },
  buttonText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-SemiBold'],
  },
});
