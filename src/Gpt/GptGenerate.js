import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import axios from 'axios';

const ChatGPT35 = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const sendMessage = async () => {
    const userMessage = {role: 'user', content: inputText};
    setMessages([...messages, userMessage]);
    setInputText('');
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [...messages, userMessage],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              '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',
          },
        },
      );
      const botMessage = {
        role: 'bot',
        content: response.data.choices[0].message.content,
      };
      setMessages([...messages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  return (
    <View>
      {messages.map((message, index) => (
        <Text
          key={index}
          style={{color: message.role === 'user' ? 'blue' : 'green'}}>
          {message.content}
        </Text>
      ))}
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => setInputText(text)}
        value={inputText}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};
export default ChatGPT35;
