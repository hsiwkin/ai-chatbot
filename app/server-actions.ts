'use server';
import { getLangChainService } from '@/services/langchain.service';

export const askQuestion = async (question: string): Promise<string> => {
  'use server';

  const langChainService = await getLangChainService();

  return await langChainService.testRun(question);
};
