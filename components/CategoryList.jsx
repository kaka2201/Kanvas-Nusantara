import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fontType } from '../src/theme';
import firestore from '@react-native-firebase/firestore'; // Tidak dihapus

export default function CategoryList() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://6829d51aab2b5004cb34e747.mockapi.io/api/kanvasnusantara'); // Ganti dengan URL asli
      const data = await response.json();

      // Ambil semua kategori dari data API, pastikan tidak null lalu jadikan unik
      const allCategories = data.map(item => item.category).filter(Boolean);
      const uniqueCategories = [...new Set(allCategories)];

      setCategories(uniqueCategories);
      setSelectedCategory(uniqueCategories[0] || null);
    } catch (error) {
      console.error('Failed to fetch categories from API:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    navigation.navigate('CategoryResult', { category });
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} size="small" color={colors.gold()} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCategoryPress(category)}
            style={[
              styles.item,
              index === 0
                ? { marginLeft: 24 }
                : index === categories.length - 1
                ? { marginRight: 24 }
                : {},
              selectedCategory === category && { backgroundColor: colors.gold(0.1) },
            ]}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.title,
                selectedCategory === category ? { color: colors.gold() } : {},
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
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
