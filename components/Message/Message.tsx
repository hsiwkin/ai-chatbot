import { ChatMessage } from '@/app/types';
import React from 'react';
export function Message({ message }: { message: ChatMessage }) {
  let messageClass = 'break-words p-3 my-2 rounded-lg max-w-xs';
  if (message.type === 'ai') {
    messageClass += ' bg-blue-600 mr-auto';
  } else if (message.type === 'human') {
    messageClass += ' bg-green-600 ml-auto';
  }
  return <p className={messageClass}>{message.content as string}</p>;
}
