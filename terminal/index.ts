import * as readline from 'readline';
import { getLangChainService } from '../services/langchain/langchain.service';
import { configDotenv } from 'dotenv';
import path from 'node:path';
import { ChatMessageHistory } from 'langchain/stores/message/in_memory';

configDotenv({ path: path.join(__dirname, '..', '.env.local') });

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = async (question: string) =>
  new Promise((resolve) => {
    r.question(question, (answer: string) => {
      resolve(answer);
    });
  });

const program = async () => {
  const ai = await getLangChainService();
  const history = new ChatMessageHistory();
  while (true) {
    const question = (await prompt('> ')) as string;
    const response = await ai.chat(question, []);
    console.log(response);

    await history.addUserMessage(question);
    await history.addAIMessage(response);
  }
};
program().catch((e) => console.error(e));
