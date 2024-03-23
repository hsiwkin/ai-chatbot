'use server';
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from '@langchain/core/messages';
import { ChatMessage } from './types';
import { getLangChainService } from '../services/langchain/langchain.service';

export const askChatQuestion = async (
  question: ChatMessage,
  chatHistory: ChatMessage[],
): Promise<string> => {
  'use server';

  const langChainService = await getLangChainService();

  const messageMapper = {
    human: HumanMessage,
    ai: AIMessage,
    system: SystemMessage,
  };

  const objectifiedHistory = chatHistory.map((msg: ChatMessage) => {
    const Constructor = messageMapper[msg.type];

    return new Constructor(msg.content);
  });

  return await langChainService.chat(question.content, objectifiedHistory);
};
