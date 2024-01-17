import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { createRetrievalChain } from 'langchain/chains/retrieval';

class LangChainService {
  private chatModel: ChatOpenAI;
  private vectorStore?: MemoryVectorStore;

  constructor() {
    this.chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  async loadLearningData() {
    const loader = new CheerioWebBaseLoader(
      'https://docs.smith.langchain.com/overview',
    );

    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter();

    const splitDocs = await splitter.splitDocuments(docs);
    const embeddings = new OpenAIEmbeddings();

    this.vectorStore = await MemoryVectorStore.fromDocuments(
      splitDocs,
      embeddings,
    );
  }

  async testRun(question: string) {
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are a world class technical documentation writer.'],
      ['user', '{input}'],
    ]);

    const outputParser = new StringOutputParser();

    const documentChain = prompt.pipe(this.chatModel).pipe(outputParser);

    if (!this.vectorStore) {
      throw new Error('Vector store not loaded');
    }

    const retriever = this.vectorStore.asRetriever();

    const retrievalChain = await createRetrievalChain({
      combineDocsChain: documentChain,
      retriever,
    });

    const response = await retrievalChain.invoke({
      input: question,
    });

    return response.answer;
  }
}

let langChainService: LangChainService | undefined;
export const getLangChainService = async (): Promise<LangChainService> => {
  if (langChainService) {
    return langChainService;
  }

  langChainService = new LangChainService();
  await langChainService.loadLearningData();
  return langChainService;
};
