import React from 'react';
import { View, Text, Modal, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Crown, Check, X } from 'lucide-react-native';
import { COLORS } from '../constants/appConstants';
import { handlePayment } from '../services/paymentService';
import { useAuthStore } from '../store/authStore';

export default function PremiumModal({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const { user } = useAuthStore();
  
  const features = [
    'कोई Ads नहीं (Ad-Free Experience)',
    '50+ Premium Templates',
    'HD Quality PDF & JPG',
    'Watermark नहीं (No Watermark)',
    'Cloud Save & Edit',
    'Unlimited Downloads',
    'Priority Support'
  ];

  const onSubscribe = async () => {
    try {
      const result = await handlePayment(99, user?.email || '', '');
      console.log('Payment success:', result);
      // Here you would update the user's premium status in Supabase
      alert('Subscription Successful! Welcome to Premium.');
      onClose();
    } catch (error) {
       console.error('Payment error:', error);
       alert('Payment failed or cancelled.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/60 justify-end">
        <View className="bg-cream rounded-t-[40px] overflow-hidden">
          <View className="bg-gold px-6 py-10 items-center">
            <TouchableOpacity onPress={onClose} className="absolute top-6 right-6 p-2 bg-black/10 rounded-full">
              <X size={20} color={COLORS.maroon} />
            </TouchableOpacity>
            <View className="w-16 h-16 bg-cream rounded-full items-center justify-center shadow-lg">
               <Crown size={40} color={COLORS.maroon} />
            </View>
            <Text className="text-maroon text-2xl font-bold mt-4">ShubhCard Premium</Text>
            <Text className="text-maroonDark opacity-70 text-sm">सभी Premium Features Unlock करें</Text>
          </View>
          
          <ScrollView className="px-8 py-6 max-h-[400px]">
            {features.map((f, i) => (
              <View key={i} className="flex-row items-center gap-x-3 mb-4 border-b border-maroon/5 pb-3">
                <View className="bg-green-100 rounded-full p-1">
                  <Check size={14} color="green" />
                </View>
                <Text className="text-ink text-sm font-medium">{f}</Text>
              </View>
            ))}
          </ScrollView>

          <View className="px-8 pb-12 pt-4 items-center bg-cream-dark/30">
            <View className="items-center mb-6">
              <Text className="text-maroon text-3xl font-bold">₹99<Text className="text-sm">/महीना</Text></Text>
              <Text className="text-ink opacity-40 text-[10px] mt-1">या ₹799/साल (33% बचत)</Text>
            </View>
            <TouchableOpacity 
              onPress={onSubscribe}
              className="bg-maroon w-full py-4 rounded-2xl items-center shadow-xl border-b-4 border-maroon-dark"
            >
              <Text className="text-cream text-lg font-bold">Premium लें</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} className="mt-4">
              <Text className="text-ink opacity-40 font-medium">बाद में</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
