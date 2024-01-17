import OpenAI from 'openai';
class OpenaiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  async testRun() {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
      model: 'gpt-3.5-turbo',
    });

    console.log(completion.choices[0]);
  }
}

export const openaiService = new OpenaiService();
