import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { BaseMessage, SystemMessage } from '@langchain/core/messages';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { memories } from '@/memories/memories';

class LangchainService {
  private chatModel: ChatOpenAI;

  constructor() {
    this.chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
      modelName: 'gpt-4-1106-preview',
    });
  }

  async chat(question: string, conversation: BaseMessage[]): Promise<string> {
    const questionRelatedMemory = await this.loadSimilarMemories(question);
    console.log(questionRelatedMemory);
    const prompt = ChatPromptTemplate.fromMessages([
      new SystemMessage('Roleplay as David Goggins - be angry'),
      new SystemMessage('Speak in 5 sentences max'),
      new SystemMessage(
        `Take into account the data passed in array which you already know: ${JSON.stringify(
          questionRelatedMemory,
        )}`,
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
    const embeddings = new OpenAIEmbeddings();
    const vectorStore = await MemoryVectorStore.fromTexts(
      memories,
      [],
      embeddings,
    );

    const memoriesRetriever = vectorStore.asRetriever();

    return await memoriesRetriever.getRelevantDocuments(memory);
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
