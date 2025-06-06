import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screen/HomeScreen';
import SearchResultScreen from './screen/SearchResultScreen';
import CategoryResultScreen from './screen/CategoryResultScreen';
import AddEditPaintingScreen from './screen/AddEditPaintingScreen';
import AddPaintingScreen from './screen/AddPaintingScreen';
import { colors } from './src/theme';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SearchResult" component={SearchResultScreen} />
      <Stack.Screen name="CategoryResult" component={CategoryResultScreen} />
      <Stack.Screen name="AddEditPainting" component={AddEditPaintingScreen} />
      <Stack.Screen name="AddPainting" component={AddPaintingScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    const setupFCM = async () => {
      try {
        // Minta izin notifikasi (Android 13+)
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.warn('Permission not granted for notifications');
            return;
          }
        }

        // Register device & ambil token
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log('FCM Token:', token);

        // Subscribe to topic
        await messaging().subscribeToTopic('kanvasnusantara');
        console.log('Subscribed to topic "kanvasnusantara"');
      } catch (error) {
        console.error('FCM setup error:', error);
      }
    };

    setupFCM();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.gold(),
          tabBarInactiveTintColor: colors.grey(),
          tabBarStyle: {
            backgroundColor: colors.white(),
            borderTopWidth: 0,
            elevation: 8,
            height: 60,
            paddingBottom: 6,
            paddingTop: 6,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeStack') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'AddPainting') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="AddPainting"
          component={AddPaintingScreen}
          options={{ title: 'Tambah Data' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
