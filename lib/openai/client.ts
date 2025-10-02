import OpenAI from 'openai';

// Initialize OpenAI client (server-side only)
export const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

export const generateChatCompletion = async (prompt: string, model: string = 'gpt-3.5-turbo') => {
  const openai = getOpenAIClient();
  
  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant that processes tasks autonomously.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return {
      success: true,
      result: completion.choices[0]?.message?.content || '',
      usage: completion.usage,
    };
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return {
      success: false,
      result: '',
      error: error.message,
    };
  }
};
