import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@/constants/Fonts';
import { Platform, View, StyleSheet } from 'react-native';

export default function OrdersLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#00A300', // Premium Green
        tabBarInactiveTintColor: '#94A3B8', // Slate Grey
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        // This ensures the items don't squash the icons
        tabBarItemStyle: {
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
        },
      }}
    >
      {/* SALES ORDER */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'SALES ORDER',
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.iconWrap, focused && styles.activeIconBg]}>
              <MaterialCommunityIcons
                name={focused ? 'chart-box' : 'chart-box-outline'}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* VAN ORDER */}
      <Tabs.Screen
        name="Addemploye"
        options={{
          title: 'VAN ORDER',
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.iconWrap, focused && styles.activeIconBg]}>
              <MaterialCommunityIcons
                name={focused ? 'truck-delivery' : 'truck-delivery-outline'}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* RETAILER ORDER */}
      {/* <Tabs.Screen
        name="analytics"
        options={{
          title: 'RETAILER ORDER',
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.iconWrap, focused && styles.activeIconBg]}>
              <MaterialCommunityIcons
                name={focused ? 'storefront' : 'storefront-outline'}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      /> */}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 5, // Floating off the bottom
    left: 20,
    right: 20,
    height: 72,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderTopWidth: 0,
    
    // --- PREMIUM WHITE SHADOW ---
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1, // Soft and expensive looking
    shadowRadius: 20,
    elevation: 15, // High elevation for Android shadow
    
    // To make sure shadow shows correctly on Android
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },

  tabBarLabel: {
    fontFamily: Fonts.bold,
    fontSize: 9,
    letterSpacing: 0.5,
    marginTop: 2,
  },

  iconWrap: {
    // This container holds the icon and the background color
    width: 55,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center', // Centers icon vertically
    alignItems: 'center',     // Centers icon horizontally
    marginBottom: 4,          // Space between icon and text
  },

  activeIconBg: {
    // Only shows when the tab is clicked
    backgroundColor: 'rgba(0, 163, 0, 0.12)', 
  },
});