import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { FORM_SCHEMAS } from '../constants/cardSchemas';
import { CATEGORIES, COLORS } from '../constants/appConstants';
import { ArrowLeft, ChevronDown, ChevronUp, Trash2, Plus, Eye, Download, Share2, FileText } from 'lucide-react-native';
import CardPreview from '../components/CardPreview';
import { generatePDF, generateJPG } from '../utils/generationUtils';
import PremiumModal from '../components/PremiumModal';

export default function CardBuilderScreen({ categoryId, onBack }: { categoryId: string, onBack: () => void }) {
  const schema = FORM_SCHEMAS[categoryId] || [];
  const category = CATEGORIES.find(c => c.id === categoryId);
  const [formData, setFormData] = useState<any>({});
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const viewRef = useRef<any>(null);

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev: string[]) => 
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    );
  };

  const updateField = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleDownload = async (type: 'pdf' | 'jpg') => {
    try {
      if (type === 'pdf') {
        await generatePDF(viewRef);
      } else {
        await generateJPG(viewRef);
      }
      Alert.alert('Success', `Card ${type.toUpperCase()} generated and ready to share!`);
    } catch (err) {
      Alert.alert('Error', 'Failed to generate card. Please try again.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      {/* Header */}
      <View className="bg-maroon px-4 py-4 flex-row items-center shadow-lg border-b-2 border-gold">
        <TouchableOpacity onPress={onBack} className="mr-3">
          <ArrowLeft size={24} color={COLORS.cream} />
        </TouchableOpacity>
        <Text className="text-cream text-lg font-bold">{category?.name} Builder</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
          {showPreview ? (
            <CardPreview categoryId={categoryId} formData={formData} viewRef={viewRef} />
          ) : (
            <>
              {schema.map((section: any) => (
                <View key={section.id} className="bg-white rounded-2xl p-4 mb-4 shadow-sm border-t-4 border-gold">
                  <TouchableOpacity 
                    onPress={() => toggleSection(section.id)}
                    className="flex-row items-center justify-between mb-4"
                  >
                    <Text className="text-maroon font-bold text-base">{section.title}</Text>
                    {collapsedSections.includes(section.id) ? <ChevronDown size={20} color={COLORS.maroon} /> : <ChevronUp size={20} color={COLORS.maroon} />}
                  </TouchableOpacity>

                  {!collapsedSections.includes(section.id) && section.fields && (
                    <View className="space-y-4">
                      {section.fields.map((field: any) => (
                        <View key={field.name}>
                          <Text className="text-ink text-xs font-semibold mb-1 opacity-70">{field.label}</Text>
                          <TextInput
                            className="bg-cream p-3 rounded-lg text-ink border border-maroon/5"
                            placeholder={field.placeholder || field.label}
                            value={formData[field.name]}
                            onChangeText={(val) => updateField(field.name, val)}
                            multiline={field.type === 'textarea'}
                            numberOfLines={field.type === 'textarea' ? 3 : 1}
                            keyboardType={field.type === 'tel' ? 'phone-pad' : 'default'}
                          />
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
              
              <TouchableOpacity onPress={() => setShowPremium(true)} className="bg-white border-2 border-dashed border-gold p-4 rounded-xl items-center mb-8">
                <View className="flex-row items-center gap-x-2">
                  <Plus size={18} color={COLORS.maroon} />
                  <Text className="text-maroon font-bold">Add Custom Field</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Action Bar */}
      <View className="bg-white px-4 py-3 pb-8 flex-row items-center justify-between shadow-2xl border-t border-gold/20">
        <TouchableOpacity className="items-center" onPress={() => setShowPreview(!showPreview)}>
          <Eye size={20} color={COLORS.maroon} />
          <Text className="text-[10px] font-bold text-maroon mt-1">{showPreview ? 'Edit' : 'Preview'}</Text>
        </TouchableOpacity>
        
        <View className="flex-row gap-x-2">
          <TouchableOpacity 
            onPress={() => handleDownload('jpg')}
            className="bg-gold px-4 py-3 rounded-xl shadow-lg"
          >
            <Download size={18} color={COLORS.maroon} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleDownload('pdf')}
            className="bg-maroon flex-row items-center px-6 py-3 rounded-xl gap-x-2 shadow-lg"
          >
            <FileText size={18} color="white" />
            <Text className="text-white font-bold">PDF HD</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="items-center" onPress={() => setShowPremium(true)}>
          <Share2 size={20} color={COLORS.maroon} />
          <Text className="text-[10px] font-bold text-maroon mt-1">Share</Text>
        </TouchableOpacity>
      </View>

      <PremiumModal visible={showPremium} onClose={() => setShowPremium(false)} />
    </SafeAreaView>
  );
}
