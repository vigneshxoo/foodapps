import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useCart } from '@/context/CartContext';
export default function TabLayout() {
  const { itemCount } = useCart();
  console.log(itemCount);
  return (
    <Tabs
      screenOptions={{

        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView
            intensity={100}
            tint="systemChromeMaterial" // Adaptable native blur
            style={styles.blurContainer}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="search" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="Test"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.actionButton}>
              {itemCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{itemCount}</Text>
                </View>
              )}
              <Ionicons name="cart-outline" size={30} color="white" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Product"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="layers" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="person" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

function TabIcon({ name, focused }: { name: any; focused: boolean }) {
  return (
    <View style={styles.iconContainer}>
      <Ionicons
        name={focused ? name : `${name}-outline`}
        size={25}
        color={focused ? '#00A300' : '#A0A0A0'}
      />
      {/* The Indicator: A simple 4px dot is more modern than a pill */}
      {focused && <View style={styles.indicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 3, // Higher up for modern safe areas
    height: 80,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    width: "100%",
    paddingVertical: 20
  },
  blurContainer: {

    ...StyleSheet.absoluteFillObject,
    borderRadius: 32, // Perfect pill shape
    overflow: 'hidden',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fallback for Android
  },
  iconContainer: {
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  indicator: {
    position: 'absolute',
    bottom: 12, // Precisely placed dot
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#00A300',
  },
  actionButton: {
    width: 48,
    height: 48,
    backgroundColor: '#00A300',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? -5 : -10,
    borderRadius: 100,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },


});