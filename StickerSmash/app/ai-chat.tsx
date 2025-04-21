import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {  useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChatMessage, dummyBotMessages } from '@/utils/walletData';
import { colors, typography, spacing, borderRadius } from '@/utils/theme';
import ChatMessageComponent from '@/components/ChatMessager';
import ChatInput from '@/components/ChatInput';
import { ArrowLeft, Bot } from 'lucide-react-native';

export default function AIChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>(dummyBotMessages);
  const flatListRef = useRef<FlatList>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);
  
  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: Date.now(),
    };
    
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm analyzing your request. How else can I assist you with your crypto today?",
        isUser: false,
        timestamp: Date.now() + 1000,
      };
      
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
       colors={colors.gradients.primaryGradient }
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft color={colors.neutral.white} size={24} />
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
            <Bot color={colors.neutral.white} size={24} style={styles.botIcon} />
            <Text style={styles.headerTitle}>AI Assistant</Text>
          </View>
          
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatMessageComponent message={item} />}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />
        
        <ChatInput onSend={handleSendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botIcon: {
    marginRight: spacing.xs,
  },
  headerTitle: {
    fontFamily: typography.font.bold,
    fontSize: typography.size.lg,
    color: colors.neutral.white,
  },
  placeholder: {
    width: 40,
  },
  messagesList: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
});