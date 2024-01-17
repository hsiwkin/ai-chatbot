import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

class LangChainService {
  private chatModel: ChatOpenAI;

  constructor() {
    this.chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  async testRun(question: string) {
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are a world class technical documentation writer.'],
      ['user', '{input}'],
    ]);

    const outputParser = new StringOutputParser();

    const chain = prompt.pipe(this.chatModel).pipe(outputParser);

    const response = await chain.invoke({
      input: question,
    });

    return response;
  }
}

export const langChainService = new LangChainService();
