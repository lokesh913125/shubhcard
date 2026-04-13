import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';
import { COLORS } from '../constants/appConstants';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react-native';

export default function LoginScreen({ onToggleAuth }: { onToggleAuth: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-12">
          <View className="items-center mb-10">
            <View className="w-16 h-16 bg-gold rounded-2xl items-center justify-center shadow-lg transform rotate-3">
              <LogIn size={32} color={COLORS.maroon} />
            </View>
            <Text className="text-maroon text-3xl font-bold mt-6">Welcome Back</Text>
            <Text className="text-ink opacity-50 text-sm mt-2">Sign in to continue to ShubhCard</Text>
          </View>

          <View className="space-y-4">
            <View className="bg-white rounded-xl px-4 py-3 flex-row items-center shadow-sm border border-maroon/5">
              <Mail size={20} color={COLORS.maroon} opacity={0.6} />
              <TextInput
                className="flex-1 ml-3 text-ink text-base"
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            <View className="bg-white rounded-xl px-4 py-3 flex-row items-center shadow-sm border border-maroon/5">
              <Lock size={20} color={COLORS.maroon} opacity={0.6} />
              <TextInput
                className="flex-1 ml-3 text-ink text-base"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity 
            className="bg-maroon mt-8 py-4 rounded-xl items-center shadow-lg border-b-4 border-maroon-dark"
            onPress={handleLogin}
            disabled={loading}
          >
            <Text className="text-cream text-lg font-bold">{loading ? 'Logging in...' : 'Sign In'}</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-6">
            <Text className="text-ink opacity-60">Don't have an account? </Text>
            <TouchableOpacity onPress={onToggleAuth}>
              <Text className="text-maroon font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
