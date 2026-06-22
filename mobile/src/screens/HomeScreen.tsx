import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { CATEGORIES, FEATURES, COLORS } from '../constants/appConstants';
import { Crown, Heart, Image as ImageIcon, Send, Palette, UserPlus, FileText, Share2 } from 'lucide-react-native';
import PremiumModal from '../components/PremiumModal';

const { width } = Dimensions.get('window');

export default function HomeScreen({ onSelectCategory }: { onSelectCategory: (id: string) => void }) {
  const [showPremium, setShowPremium] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-cream">
      {/* Header */}
      <View className="bg-maroon px-4 py-4 flex-row items-center justify-between shadow-lg border-b-4 border-gold">
        <View className="flex-row items-center gap-x-2">
          <View className="w-10 h-10 bg-gold rounded-full items-center justify-center">
            <Text className="text-maroon text-xl font-bold">ॐ</Text>
          </View>
          <View>
            <Text className="text-cream text-lg font-bold">ShubhCard</Text>
            <Text className="text-cream opacity-80 text-[10px]">शुभ कार्ड निर्माता</Text>
          </View>
        </View>
        <TouchableOpacity 
          onPress={() => setShowPremium(true)}
          className="bg-gold px-4 py-2 rounded-full flex-row items-center gap-x-1"
        >
          <Crown size={14} color={COLORS.maroonDark} />
          <Text className="text-maroonDark text-xs font-bold">Premium</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View className="py-8 px-4 items-center">
          <Text className="text-maroon text-2xl font-bold text-center">हर शुभ अवसर के लिए</Text>
          <Text className="text-ink opacity-70 text-sm text-center mt-2 max-w-[300px]">
            Bio-Data, Shadi Card, Shok Patra और बहुत कुछ — सिर्फ़ कुछ ही पल में बनाएं
          </Text>
          <View className="flex-row items-center justify-center gap-x-3 mt-4">
            <View className="h-[1px] w-10 bg-gold" />
            <Text className="text-maroon text-lg">❁</Text>
            <View className="h-[1px] w-10 bg-gold" />
          </View>
        </View>

        {/* Categories Grid */}
        <View className="px-4">
          <Text className="text-center text-maroon text-xl font-bold mb-4">सेवाएं चुनें</Text>
          <View className="flex-row flex-wrap justify-between">
            {CATEGORIES.map((cat) => (
              <TouchableOpacity 
                key={cat.id} 
                onPress={() => onSelectCategory(cat.id)}
                className="bg-white rounded-2xl p-4 items-center mb-3 shadow-md border-b-4 border-gold-light"
                style={{ width: (width - 44) / 2 }}
              >
                {cat.badge && (
                   <View className={`absolute top-2 right-2 px-2 py-0.5 rounded-full ${cat.badge === 'hot' ? 'bg-orange-500' : 'bg-green-500'}`}>
                    <Text className="text-white text-[8px] font-bold uppercase">{cat.badge}</Text>
                   </View>
                )}
                <Text className="text-4xl mb-2">{cat.icon}</Text>
                <Text className="text-maroon text-sm font-bold text-center">{cat.name}</Text>
                <Text className="text-ink opacity-40 text-[9px] mt-0.5">{cat.nameEn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Features */}
        <View className="mt-8 px-4 pb-12">
          <Text className="text-center text-maroon text-xl font-bold mb-4">क्यों ShubhCard?</Text>
          <View className="flex-row flex-wrap justify-between">
            {FEATURES.map((feature, idx) => (
              <View 
                key={idx} 
                className="bg-white p-3 rounded-xl flex-row items-center gap-x-2 mb-2 border-l-4 border-gold"
                style={{ width: (width - 40) / 2 }}
              >
                <Text className="text-lg">{feature.icon}</Text>
                <Text className="text-ink text-[10px] font-medium">{feature.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View className="py-8 items-center border-t border-maroon/10">
          <Text className="text-maroon text-sm mb-2">❁ ॐ श्री गणेशाय नमः ❁</Text>
          <Text className="text-ink opacity-40 text-[10px]">ShubhCard © 2026 | Made with ❤️ in Bharat</Text>
        </View>
      </ScrollView>

      <PremiumModal visible={showPremium} onClose={() => setShowPremium(false)} />
    </SafeAreaView>
  );
}
