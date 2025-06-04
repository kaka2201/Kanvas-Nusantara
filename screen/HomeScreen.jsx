import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Element3 } from 'iconsax-react-native';
import SearchBar from '../components/SearchBar';
import ListBlog from '../components/ListBlog';
import { colors, fontType } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleSearch = (query) => {
    navigation.navigate('SearchResult', { query });
  };

  const categories =  ['Renaissance', 'Cubism', 'Expressionism', 'Surrealism', 'Abstract', 'Contemporary'];

  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryResult', { category });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kanvas Nusantara</Text>
        <View style={styles.iconContainer}>
          <Element3 color={colors.white()} variant="Linear" size={24} />
        </View>
      </View>

      <View style={styles.listCategory}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                category.item,
                index === 0 && { marginLeft: 24 },
                index === categories.length - 1 && { marginRight: 24 },
              ]}
              onPress={() => handleCategoryPress(item)}
              activeOpacity={0.7}
            >
              <Text style={category.title}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

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
});

const category = StyleSheet.create({
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
