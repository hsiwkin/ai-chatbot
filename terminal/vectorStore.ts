import { DataSourceOptions } from 'typeorm';
import { OpenAIEmbeddings } from '@langchain/openai';
import { TypeORMVectorStore } from '@langchain/community/vectorstores/typeorm';
import { Document } from '@langchain/core/documents';

import { config } from './config';

const getVectorDb = async () => {
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

  return typeormVectorStore;
};

type MemoryMetadata = Record<string, string>;

export const addMemory = async (memory: string, metadata?: MemoryMetadata) => {
  const vectorDb = await getVectorDb();

  const document = {
    pageContent: memory,
    metadata,
  } as Document;

  await vectorDb.addDocuments([document]);
};

export const retrieveMemories = async (query: string) => {
  const vectorDb = await getVectorDb();
  return vectorDb.similaritySearch(query);
};
