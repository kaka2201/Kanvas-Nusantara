import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors, fontType } from '../src/theme';

export default function AddEditPaintingScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const isEdit = route.params?.isEdit || false;
  const painting = route.params?.painting;

  // Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [title, setTitle] = useState(painting?.title || '');
  const [artist, setArtist] = useState(painting?.artist || '');
  const [image, setImage] = useState(painting?.image || '');
  const [category, setCategory] = useState(painting?.category || '');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [fadeAnim]);

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        // batal pilih gambar
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setImage(uri);
      }
    });
  };

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
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

  const handleSave = async () => {
    if (!title || !artist || !image || !category) {
      Alert.alert('Error', 'Semua field wajib diisi');
      return;
    }

    const newData = { title, artist, image, category };
    const API_URL = 'https://6829d51aab2b5004cb34e747.mockapi.io/api/kanvas';

    try {
      if (isEdit) {
        // PUT request untuk update data
        const response = await fetch(`${API_URL}/${painting.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });

        if (!response.ok) throw new Error('Gagal update data');

        Alert.alert('Sukses', 'Data berhasil diperbarui');
      } else {
        // POST request untuk tambah data
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });

        if (!response.ok) throw new Error('Gagal tambah data');

        Alert.alert('Sukses', 'Data berhasil ditambahkan');
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.label}>Nama Lukisan</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Nama Penulis</Text>
      <TextInput style={styles.input} value={artist} onChangeText={setArtist} />

      <Text style={styles.label}>Kategori</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Masukkan kategori"
      />

      <Text style={styles.label}>Gambar Lukisan</Text>
      {image ? <Image source={{ uri: image }} style={styles.imagePreview} /> : null}

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          onPress={pickImage}
          style={styles.uploadButton}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          activeOpacity={0.8}
        >
          <Text style={styles.uploadButtonText}>Pilih Gambar dari Galeri</Text>
        </TouchableOpacity>
      </Animated.View>

      <Button
        title={isEdit ? 'Simpan Perubahan' : 'Tambah Lukisan'}
        onPress={handleSave}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white(),
    flex: 1,
  },
  label: {
    marginTop: 20,
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16,
    color: colors.black(),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey(0.3),
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    fontSize: 14,
  },
  imagePreview: {
    marginTop: 10,
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  uploadButton: {
    backgroundColor: colors.grey(0.2),
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  uploadButtonText: {
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
});
