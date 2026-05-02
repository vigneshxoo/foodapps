import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';
import { Text } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CartProvider } from '../context/CartContext';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      (Text as any).defaultProps = (Text as any).defaultProps || {};
      (Text as any).defaultProps.style = { fontFamily: 'Poppins_400Regular' };
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {/* 🔥 ONE PLACE TO TURN OFF HEADER FOR ENTIRE APP */}
          <Stack screenOptions={{ headerShown: false }}>
            {/* You don't even need to list screens here */}
          </Stack>

          <StatusBar style="auto" />
        </ThemeProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
