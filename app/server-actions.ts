'use server';
import { langChainService } from '@/services/langchain.service';

export const askQuestion = async (question: string): Promise<string> => {
  'use server';

  return await langChainService.testRun(question);
};
