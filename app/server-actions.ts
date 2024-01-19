'use server';
import { getLangChainService } from '@/services/langchain.service';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { ChatMessageHistory } from 'langchain/stores/message/in_memory';

export const askChatQuestion = async (
  question: string,
  chatHistory: string[][],
): Promise<string> => {
  'use server';

  const msgConstructor = {
    user: HumanMessage,
    ai: AIMessage,
  };

  const objectifiedChatHistory = chatHistory.reduce((acc, msg) => {
    const role = msg[0] as 'user' | 'ai';

    const msgObj = new msgConstructor[role](msg[1]);
    acc.addMessage(msgObj);
    return acc;
  }, new ChatMessageHistory());

  const langChainService = await getLangChainService();

  return await langChainService.chat(question, objectifiedChatHistory);
};
