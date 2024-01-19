'use client';
import React, { useState } from 'react';
import { askChatQuestion } from '@/app/server-actions';

export default function Home() {
  const [chatHistory, setChatHistory] = useState([] as string[][]);

  const handleQuestionAsked = async (form: FormData) => {
    const question = form.get('question') as string;
    setChatHistory([...chatHistory, ['user', question]]);
    const response = await askChatQuestion(question, chatHistory);
    setChatHistory([...chatHistory, ['ai', response]]);
  };

  return (
    <div>
      <form action={handleQuestionAsked}>
        <label>
          Question: <input type="text" name="question" />
        </label>
        <button type="submit">Ask</button>
      </form>

      {chatHistory.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}
