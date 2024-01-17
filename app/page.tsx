'use client';
import { useState } from 'react';
import { askQuestion } from '@/app/server-actions';
import { langChainService } from '@/services/langchain.service';

export default function Home() {
  const [conversation, setConversation] = useState([] as string[]);

  const handleQuestionAsked = async (form: FormData) => {
    const question = form.get('question') as string;
    setConversation([...conversation, question]);
    conversation.push(question);
    const response = await askQuestion(question);
    setConversation([...conversation, response]);
  };

  return (
    <div>
      <form action={handleQuestionAsked}>
        <label>
          Question: <input type="text" name="question" />
        </label>
        <button type="submit">Ask</button>
      </form>

      {conversation.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}
