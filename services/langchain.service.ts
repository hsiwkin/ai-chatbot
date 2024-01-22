import { ChatOpenAI } from '@langchain/openai';
import { ChatMessageHistory } from 'langchain/stores/message/in_memory';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { BaseMessage } from '@langchain/core/messages';

class LangchainService {
  private chatModel: ChatOpenAI;

  constructor() {
    this.chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.9,
    });
  }

  async chat(question: string, conversation: BaseMessage[]): Promise<string> {
    const prompt = ChatPromptTemplate.fromMessages([
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
}

let langChainService: LangchainService | undefined;
export const getLangChainService = async (): Promise<LangchainService> => {
  if (langChainService) {
    return langChainService;
  }

  langChainService = new LangchainService();
  return langChainService;
};
