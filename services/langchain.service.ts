import { ChatOpenAI } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever';
import { ChatMessageHistory } from 'langchain/stores/message/in_memory';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

class LangChainService {
  private chatModel: ChatOpenAI;
  private vectorStore?: MemoryVectorStore;

  constructor() {
    this.chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.9,
    });
  }

  async chat(
    question: string,
    conversation: ChatMessageHistory,
  ): Promise<string> {
    const chatPromptWithHistory = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder('chat_history'),
      ['user', '{input}'],
    ]);

    return await chatPromptWithHistory
      .pipe(this.chatModel)
      .pipe(new StringOutputParser())
      .invoke({
        input: question,
        chat_history: conversation,
      });
  }

  // async llmPrompt(question: string): Promise<string> {}
}

let langChainService: LangChainService | undefined;
export const getLangChainService = async (): Promise<LangChainService> => {
  if (langChainService) {
    return langChainService;
  }

  langChainService = new LangChainService();
  return langChainService;
};
