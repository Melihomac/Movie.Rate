import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import axios from 'axios';
import {GoogleGenerativeAI} from '@google/generative-ai';

const DiscoverScreen = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const apiKey = 'AIzaSyCdqvTfPTluwjTN60tIsIKkWbPccXzMdhE';
  const genAI = new GoogleGenerativeAI(apiKey);
  const sendRequest = async () => {
    try {
      const model = genAI.getGenerativeModel({model: 'gemini-pro'});
      const prompt = inputText;
      setInputText(prompt);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      setOutputText(text);

      // const response = await axios.post(
      //   'https://api.openai.com/v1/chat/completions',
      //   {
      //     model: 'gpt-3.5-turbo-1106',
      //     messages: [
      //       {role: 'system', content: 'You are a helpful assistant.'},
      //       {role: 'user', content: inputText},
      //     ],
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization:
      //         'Bearer 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',
      //     },
      //   },
      // );

      // const botReply = response.data.choices[0].message.content;
      // setOutputText(botReply);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10}}
        onChangeText={text => setInputText(text)}
        value={inputText}
      />
      <Button title="Send" onPress={sendRequest} />
      <Text>{outputText}</Text>
    </View>
  );
};

export default DiscoverScreen;
