import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import BackIcon from '../../assets/svg/BackIcon';
import CameraIcon from '../../assets/svg/CameraIcon';
import MikeIcon from '../../assets/svg/MikeIcon';
import PlusIcon from '../../assets/svg/PlusIcon';
import ConversationCloseIcon from '../../assets/svg/ConversationCloseIcon';
import ThumDownIcon from '../../assets/svg/ThumDownIcon';
import ThumUpIcon from '../../assets/svg/ThumUpIcon';

const QUICK_OPTIONS = [
  'Movies FAQs',
  'I am looking to book a movie',
  'I have a concern about my existing booking',
  'I have an issue related to After Movie bites voucher',
];

const initialMessages = [
  {
    id: '1',
    type: 'bot',
    text: "Hi Tasha Marie, I'm your Genie interactive Assistant",
    time: null,
  },
  {
    id: '2',
    type: 'bot',
    isOptions: true,
    text: 'Please select any option given below;',
    options: QUICK_OPTIONS,
    time: null,
  },
  {
    id: '3',
    type: 'user',
    text: 'I am looking to book a movie',
    time: '1:44 PM',
  },
  {
    id: '4',
    type: 'bot',
    text: 'Can you please elaborate your concern so that we can assist you',
    time: '11:08 PM',
  },
  {
    id: '5',
    type: 'user',
    text: 'I am looking to book a movie',
    time: '2:06 PM',
  },
];

const formatTime = () => {
  const now = new Date();
  let h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
};

const OptionsMessage = ({ msg, onOptionPress }) => (
  <View style={styles.botBubbleWrapper}>
    <View style={[styles.bubble, styles.botBubble, styles.optionsBubble]}>
      <Text style={styles.botText}>{msg.text}</Text>
      <View style={styles.optionsDivider} />
      {msg.options.map((opt, i) => (
        <React.Fragment key={i}>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => onOptionPress(opt)}
            activeOpacity={0.6}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
          {i < msg.options.length - 1 && (
            <View style={styles.optionSeparator} />
          )}
        </React.Fragment>
      ))}
    </View>
  </View>
);

const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const [rating, setRating] = useState(null);
  const scrollRef = useRef(null);

  const sendMessage = text => {
    const trimmed = (text || inputText).trim();
    if (!trimmed) return;
    const userMsg = {
      id: String(Date.now()),
      type: 'user',
      text: trimmed,
      time: formatTime(),
    };
    const botReply = {
      id: String(Date.now() + 1),
      type: 'bot',
      text: 'Thank you! Our team will assist you shortly.',
      time: formatTime(),
    };
    setMessages(prev => [...prev, userMsg, botReply]);
    setInputText('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor="#0F7754" />
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation?.goBack()}
          >
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Genie Interactive Assistant</Text>
            <Text style={styles.headerSubtitle}>
              Your personal virtual assistant
            </Text>
          </View>
        </View>

        {/* Date label */}
        <View style={styles.dateLabelWrap}>
          <Text style={styles.dateLabel}>Today</Text>
        </View>

        {/* Messages */}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <ScrollView
            ref={scrollRef}
            style={styles.messageList}
            contentContainerStyle={styles.messageListContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({ animated: false })
            }
          >
            {messages.map(msg =>
              msg.isOptions ? (
                <OptionsMessage
                  key={msg.id}
                  msg={msg}
                  onOptionPress={sendMessage}
                />
              ) : msg.type === 'bot' ? (
                <View key={msg.id} style={styles.botBubbleWrapper}>
                  <View style={[styles.bubble, styles.botBubble]}>
                    <Text style={styles.botText}>{msg.text}</Text>
                    {msg.time && (
                      <Text style={styles.timeTextBot}>{msg.time}</Text>
                    )}
                  </View>
                </View>
              ) : (
                <View key={msg.id} style={styles.userBubbleWrapper}>
                  <View style={[styles.bubble, styles.userBubble]}>
                    <Text style={styles.userText}>{msg.text}</Text>
                    {msg.time && (
                      <View style={styles.userTimRow}>
                        <Text style={styles.timeTextUser}>{msg.time}</Text>
                        <Text style={styles.doubleCheck}> ✓✓</Text>
                      </View>
                    )}
                  </View>
                </View>
              ),
            )}

            <View>
              {/* Banner */}
              <View style={styles.banner}>
                <ConversationCloseIcon />
                <Text style={styles.bannerText}>
                  This conversation has been closed
                </Text>
              </View>

              {/* Feedback section */}
              <View style={styles.feedbackSection}>
                <Text style={styles.feedbackQuestion}>
                  How well was I able to solve your problem?
                </Text>

                <View style={styles.thumbsRow}>
                  <ThumDownIcon />
                  <ThumUpIcon />
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Input Bar */}
          <View style={styles.inputBar}>
            <TouchableOpacity style={styles.addBtn}>
              <PlusIcon />
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              placeholder="Type your message here"
              placeholderTextColor="#aaa"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => sendMessage()}
              returnKeyType="send"
              multiline
            />
            <TouchableOpacity style={styles.iconBtn}>
              <CameraIcon />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.micBtn}
              onPress={() => sendMessage()}
            >
              <MikeIcon />
            </TouchableOpacity>
          </View>
          {/* <Text style={{ textAlign: 'center', marginBottom: 16 }}>
            Issue resolved Chat with us
          </Text> */}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const TEAL = '#5bbfb5';
const TEAL_LIGHT = '#d4f0ed';

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: StatusBar.currentHeight,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    backgroundColor: '#fff',
  },
  backBtn: {
    marginRight: 10,
    padding: 4,
  },
  backArrow: {
    fontSize: 20,
    color: '#333',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: 0.1,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#888',
    marginTop: 1,
  },

  // Date label
  dateLabelWrap: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  dateLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },

  // Messages
  messageList: {
    flex: 1,
    paddingHorizontal: 12,
  },
  messageListContent: {
    paddingBottom: 16,
    paddingTop: 4,
  },

  // Bubble base
  bubble: {
    maxWidth: '75%',
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 9,
    marginBottom: 8,
  },

  // Bot bubbles
  botBubbleWrapper: {
    alignItems: 'flex-start',
  },
  botBubble: {
    backgroundColor: TEAL_LIGHT,
    borderTopLeftRadius: 4,
  },
  botText: {
    fontSize: 13.5,
    color: '#1a1a1a',
    lineHeight: 19,
  },
  timeTextBot: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },

  // Options bubble
  optionsBubble: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: 'hidden',
    maxWidth: '82%',
  },
  optionsDivider: {
    height: 1,
    backgroundColor: '#b2dbd7',
    marginTop: 4,
  },
  optionRow: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    backgroundColor: '#fff',
  },
  optionSeparator: {
    height: 1,
    backgroundColor: '#e6f4f2',
    marginHorizontal: 0,
  },
  optionText: {
    fontSize: 13,
    color: '#1a1a1a',
    lineHeight: 18,
  },

  // User bubbles
  userBubbleWrapper: {
    alignItems: 'flex-end',
  },
  userBubble: {
    backgroundColor: '#e8f8f6',
    borderTopRightRadius: 4,
  },
  userText: {
    fontSize: 13.5,
    color: '#1a1a1a',
    lineHeight: 19,
  },
  userTimRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  timeTextUser: {
    fontSize: 10,
    color: '#666',
  },
  doubleCheck: {
    fontSize: 10,
    color: TEAL,
  },

  // Input bar
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  addBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  addBtnText: {
    fontSize: 18,
    color: '#555',
    lineHeight: 20,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 14,
    fontSize: 13.5,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ebebeb',
  },
  iconBtn: {
    marginLeft: 8,
    padding: 4,
  },
  iconText: {
    fontSize: 19,
  },
  micBtn: {
    marginLeft: 4,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micText: {
    fontSize: 17,
  },
  openBtn: {
    backgroundColor: '#3a7c45',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
  },
  openBtnText: {
    color: appColors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#feeb93',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    width: '100%',
  },
  bannerText: {
    fontSize: 15,
    color: appColors.black,
    flexShrink: 1,
    marginLeft: 10,
  },

  // ── Feedback ────────────────────────────────────────────
  feedbackSection: {
    marginTop: 28,
    alignItems: 'center',
    width: '100%',
  },
  feedbackQuestion: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  thumbsRow: {
    flexDirection: 'row',
    gap: 16,
  },
});

export default Chat;
