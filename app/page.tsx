'use client';
import React, { useState } from 'react';
import { askChatQuestion } from '@/app/server-actions';
import { ChatMessage } from '@/app/types';
import { Message } from '@/components/Message/Message';
import { SubmitBar } from '@/components/Message/SubmitBar';

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
    <div className="flex flex-col h-screen bg-gray-800 text-white">
      <div className="flex-grow overflow-y-auto p-4">
        {chatHistory.map((message, index) => {
          return <Message message={message} key={index} />;
        })}
      </div>
      <SubmitBar handleQuestionAsked={handleQuestionAsked} />
    </div>
  );
}
