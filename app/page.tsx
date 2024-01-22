'use client';
import React, { useState } from 'react';
import { askChatQuestion } from '@/app/server-actions';
import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages';
import { ChatMessage } from '@/app/types';

export default function Home() {
  const [chatHistory, setChatHistory] = useState([] as ChatMessage[]);

  const handleQuestionAsked = async (form: FormData) => {
    const questionText = form.get('question') as string;
    if (!questionText) {
      return;
    }
    const humanMessage: ChatMessage = {
      type: 'human',
      content: questionText,
    };
    const response = await askChatQuestion(humanMessage, chatHistory);
    const aiMessage: ChatMessage = {
      type: 'ai',
      content: response,
    };

    setChatHistory([...chatHistory, humanMessage, aiMessage]);
  };

  return (
    <>
      <div>
        {chatHistory.map((message, index) => (
          <p key={index}>{message.content as string}</p>
        ))}
      </div>
      <form action={handleQuestionAsked}>
        <button type="submit">Ask</button>
        <label>
          <input type="text" name="question" />
        </label>
      </form>
    </>
  );
}
