import * as readline from 'readline';
import { getLangChainService } from '../services/langchain/langchain.service';
import { configDotenv } from 'dotenv';
import path from 'node:path';
import { ChatMessageHistory } from 'langchain/stores/message/in_memory';
import { addMemory } from './vectorStore';
import chalk from 'chalk';

configDotenv({ path: path.join(__dirname, '..', '.env.local') });

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const history = new ChatMessageHistory();
r.on('SIGINT', async () => {
  console.log('Saving memories ...');

  const userDeclarations = (await history.getMessages())
    .filter((message) => message._getType() === 'human')
    .map((message) => message.content);

  if (userDeclarations.length) {
    const stringDeclarations = userDeclarations.join(', ');
    try {
      await addMemory(stringDeclarations);
    } catch (e) {
      console.error('Error occurred while saving memories', e);
      process.exit(1);
    }
  }

  console.log('Memories successfully saved');
  process.exit(0);
});

const prompt = async (question: string) =>
  new Promise((resolve) => {
    r.question(question, (answer: string) => {
      resolve(answer);
    });
  });

const program = async () => {
  const ai = await getLangChainService();

  while (true) {
    const question = (await prompt('> ')) as string;
    if (!question.length) {
      continue;
    }
    const responseStream = await ai.streamChat(
      question,
      await history.getMessages(),
    );
    console.log('\n');

    const chunks = [];
    for await (const responseChunk of responseStream) {
      process.stdout.write(chalk.green(responseChunk));
      chunks.push(responseChunk);
    }

    const wholeResponseText = chunks.join('');
    console.log('\n');

    await history.addUserMessage(question);
    await history.addAIMessage(wholeResponseText);
  }
};
program().catch((e) => console.error(e));
