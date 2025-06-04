import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fontType } from '../src/theme';

export default function CategoryList() {
  const navigation = useNavigation();

  const categories = ['Renaissance', 'Cubism', 'Expressionism', 'Surreliasm', 'Abstract', 'Contemporary'];
  const [selectedCategory, setSelectedCategory] = useState('Renaissance');

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    navigation.navigate('CategoryResult', { category }); // Navigasi ke halaman hasil
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCategoryPress(category)}
            style={[
              styles.item,
              index === 0 ? { marginLeft: 24 } : index === categories.length - 1 ? { marginRight: 24 } : {},
              selectedCategory === category && { backgroundColor: colors.gold(0.1) }
            ]}
            activeOpacity={0.7}  // agar efek tekan terlihat
          >
            <Text
              style={[
                styles.title,
                selectedCategory === category ? { color: colors.gold() } : {}
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
