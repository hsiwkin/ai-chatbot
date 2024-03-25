import { ChatOpenAI } from '@langchain/openai';
import { config } from './config';

const model = new ChatOpenAI({
  openAIApiKey: config.openAi.key,
});

const test = async () => {
  const stream = await model.stream('Hello! Tell me about yourself.');
  for await (const chunk of stream) {
    process.stdout.write(chunk.content as string);
  }
};

test().catch((e) => console.error(e));
