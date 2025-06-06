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
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors, fontType } from '../src/theme';
import firestore from '@react-native-firebase/firestore'; // Tetap dipertahankan
import axios from 'axios'; // Tambahan untuk akses API

export default function AddPaintingScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

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
        // batal
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
    if (!title || !author || !image || !category) {
      Alert.alert('Error', 'Semua field wajib diisi');
      return;
    }

    const newData = {
      title,
      artist: author,
      image,
      category,
      createdAt: new Date().toISOString(),
    };

    try {
      // Simpan ke mockapi.io
      await axios.post('https://6829d51aab2b5004cb34e747.mockapi.io/api/kanvasnusantara', newData);
      Alert.alert('Sukses', 'Lukisan berhasil ditambahkan ke MockAPI');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message || 'Gagal menyimpan data');
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.label}>Nama Lukisan</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Masukkan nama lukisan"
      />

      <Text style={styles.label}>Nama Penulis</Text>
      <TextInput
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
        placeholder="Masukkan nama penulis"
      />

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

      <Button title="Tambah Lukisan" onPress={handleSave} />
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
    borderColor: colors.grey(),
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
    backgroundColor: colors.grey(),
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
