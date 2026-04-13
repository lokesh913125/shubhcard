import React from 'react';
import { View, Text, Image } from 'react-native';
import { COLORS } from '../constants/appConstants';

export default function CardPreview({ categoryId, formData, viewRef }: { categoryId: string, formData: any, viewRef: any }) {
  const isBiodata = categoryId === 'biodata';
  
  return (
    <View 
      ref={viewRef}
      collapsable={false}
      className="bg-white p-8 border-8 border-maroon shadow-2xl"
      style={{ width: '100%', minHeight: 600 }}
    >
      <View className="items-center mb-6">
        <Text className="text-maroon text-lg font-bold">❁ ॐ श्री गणेशाय नमः ❁</Text>
        <Text className="text-maroon text-2xl font-bold mt-2 uppercase tracking-widest" style={{ fontFamily: 'CormorantGaramond_700Bold' }}>
          {isBiodata ? 'Marriage Bio-Data' : 'विवाह आमंत्रण'}
        </Text>
        <View className="h-[2px] w-32 bg-gold mt-2" />
      </View>

      {formData.photo && (
        <View className="items-center mb-6">
          <View className="w-32 h-40 border-4 border-gold rounded-lg overflow-hidden">
             <Image source={{ uri: formData.photo }} className="w-full h-full" resizeMode="cover" />
          </View>
        </View>
      )}

      <View className="space-y-4">
        {Object.entries(formData).map(([key, value]: [string, any]) => {
          if (key === 'photo' || !value) return null;
          return (
            <View key={key} className="flex-row items-center border-b border-maroon/10 pb-2">
              <Text className="text-maroon font-bold w-1/3 text-xs">{key.toUpperCase()}:</Text>
              <Text className="text-ink flex-1 text-sm font-medium">{value}</Text>
            </View>
          );
        })}
      </View>
      
      <View className="mt-12 items-center">
        <Text className="text-maroon text-sm font-bold">Contact: {formData.mobile || formData.contact || 'N/A'}</Text>
        <View className="h-[1px] w-full bg-gold/30 mt-4" />
        <Text className="text-maroon/50 text-[10px] mt-2">ShubhCard - Created with ❤️</Text>
      </View>
    </View>
  );
}
