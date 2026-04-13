import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, NotoSansDevanagari_400Regular, NotoSansDevanagari_700Bold } from '@expo-google-fonts/noto-sans-devanagari';
import { Marcellus_400Regular } from '@expo-google-fonts/marcellus';
import { CormorantGaramond_400Regular, CormorantGaramond_700Bold } from '@expo-google-fonts/cormorant-garamond';

import { supabase } from './src/lib/supabase';
import { useAuthStore } from './src/store/authStore';
import { COLORS } from './src/constants/appConstants';

// Screens
import CardBuilderScreen from './src/screens/CardBuilderScreen';
import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';



SplashScreen.preventAutoHideAsync();

export default function App() {
  const { user, session, loading, setSession, setUser } = useAuthStore();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const [fontsLoaded] = useFonts({
    NotoSansDevanagari_400Regular,
    NotoSansDevanagari_700Bold,
    Marcellus_400Regular,
    CormorantGaramond_400Regular,
    CormorantGaramond_700Bold,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setSession, setUser]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !loading) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, loading]);

  if (!fontsLoaded || loading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.cream, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.maroon} />
      </View>
    );
  }

  const renderContent = () => {
    if (user) {
      if (selectedCategoryId) {
        return <CardBuilderScreen categoryId={selectedCategoryId} onBack={() => setSelectedCategoryId(null)} />;
      }
      return <HomeScreen onSelectCategory={setSelectedCategoryId} />;
    }
    
    return authMode === 'login' ? (
      <LoginScreen onToggleAuth={() => setAuthMode('signup')} />
    ) : (
      <SignupScreen onToggleAuth={() => setAuthMode('login')} />
    );
  };

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="light" backgroundColor={COLORS.maroon} />
      {renderContent()}
    </View>
  );
}
