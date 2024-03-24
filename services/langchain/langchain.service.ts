import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { BaseMessage, SystemMessage } from '@langchain/core/messages';
import { retrieveMemories } from '../../terminal/vectorStore';

class LangchainService {
  private chatModel: ChatOpenAI;

  constructor() {
    this.chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
      modelName: 'gpt-4-0125-preview',
    });
  }

  async chat(question: string, conversation: BaseMessage[]): Promise<string> {
    const questionRelatedMemory = await this.loadSimilarMemories(question);
    const prompt = ChatPromptTemplate.fromMessages([
      new SystemMessage('Roleplay as David Goggins - be angry'),
      new SystemMessage('Speak in 3-5 sentences'),
      new SystemMessage(
        `Your memory: ${JSON.stringify(questionRelatedMemory)}`,
      ),
      new MessagesPlaceholder('chat_history'),
      ['user', '{input}'],
    ]);
    const formattedPrompt = await prompt.formatMessages({
      input: question,
      chat_history: conversation,
    });

    return await this.chatModel
      .pipe(new StringOutputParser())
      .invoke(formattedPrompt);
  }

  async loadSimilarMemories(memory: string) {
    const memories = await retrieveMemories(memory);
    return memories.map((memory) => memory.pageContent);
  }
}

let langChainService: LangchainService | undefined;
export const getLangChainService = async (): Promise<LangchainService> => {
  if (langChainService) {
    return langChainService;
  }

  langChainService = new LangchainService();
  return langChainService;
};
