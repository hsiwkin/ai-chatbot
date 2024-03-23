import { DataSourceOptions } from 'typeorm';
import { OpenAIEmbeddings } from '@langchain/openai';
import { TypeORMVectorStore } from '@langchain/community/vectorstores/typeorm';
import { config } from './config';

export const run = async () => {
  const args = {
    postgresConnectionOptions: {
      type: 'postgres',
      host: config.db.host,
      port: config.db.port,
      username: config.db.username,
      password: config.db.password,
      database: config.db.database,
    } as DataSourceOptions,
  };

  const typeormVectorStore = await TypeORMVectorStore.fromDataSource(
    new OpenAIEmbeddings(),
    args,
  );

  await typeormVectorStore.ensureTableInDatabase();

  await typeormVectorStore.addDocuments([
    { pageContent: "what's this", metadata: { a: 2 } },
    { pageContent: 'Cat drinks milk', metadata: { a: 1 } },
  ]);

  const results = await typeormVectorStore.similaritySearch('hello', 2);

  console.log(results);
};

run().catch((e) => console.error(e));
