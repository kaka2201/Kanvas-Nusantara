import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { Element3 } from 'iconsax-react-native';
import firestore from '@react-native-firebase/firestore'; // tetap dipertahankan
import SearchBar from '../components/SearchBar';
import ListBlog from '../components/ListBlog';
import { colors, fontType } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fetchCategories = async () => {
  try {
    const response = await fetch('https://6829d51aab2b5004cb34e747.mockapi.io/api/kanvasnusantara');
    const data = await response.json();

    console.log('RESPON API:', data); // Tambahkan debug log

    if (Array.isArray(data)) {
      const uniqueCategories = [...new Set(data.map(item => item.category))];
      setCategories(uniqueCategories);
    } else {
      console.warn('API tidak mengembalikan array:', data);
      setCategories([]);
    }
  } catch (error) {
    console.error('Gagal mengambil kategori dari API:', error);
    setCategories([]);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchCategories();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSearch = (query) => {
    navigation.navigate('SearchResult', { query });
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryResult', { category });
  };

  const CategoryItem = ({ item, index }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

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

    return (
      <TouchableWithoutFeedback
        onPress={() => handleCategoryPress(item)}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Animated.View
          style={[
            stylesCategory.item,
            index === 0 && { marginLeft: 24 },
            index === categories.length - 1 && { marginRight: 24 },
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={stylesCategory.title}>{item}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.blue()} />
        <Text style={styles.loadingText}>Memuat kategori...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kanvas Nusantara</Text>
        <View style={styles.iconContainer}>
          <Element3 color={colors.white()} variant="Linear" size={24} />
        </View>
      </View>

      <Animated.View style={[styles.listCategory, { opacity: fadeAnim }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item, index) => (
            <CategoryItem key={index} item={item} index={index} />
          ))}
        </ScrollView>
      </Animated.View>

      <SearchBar onSearch={handleSearch} />
      <ListBlog />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white() },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: colors.blue(),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.black(),
  },
  iconContainer: {
    position: 'absolute',
    right: 24,
  },
  listCategory: {
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 16,
    color: colors.grey(0.8),
  },
});

const stylesCategory = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: colors.white(),
    elevation: 3,
  },
  title: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    color: colors.black(),
  },
});
