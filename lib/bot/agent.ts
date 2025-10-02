import { generateChatCompletion } from '@/lib/openai/client';
import { Task } from '@/types';

/**
 * Sample bot logic for processing tasks autonomously
 * This is a basic implementation that uses OpenAI to process task descriptions
 */
export class AutonomousAgent {
  private model: string;

  constructor(model: string = 'gpt-3.5-turbo') {
    this.model = model;
  }

  /**
   * Process a task using AI
   */
  async processTask(task: Task): Promise<{ success: boolean; result: string; error?: string }> {
    try {
      const prompt = this.buildPrompt(task);
      const response = await generateChatCompletion(prompt, this.model);

      if (response.success) {
        return {
          success: true,
          result: response.result,
        };
      } else {
        return {
          success: false,
          result: '',
          error: response.error || 'Unknown error occurred',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        result: '',
        error: error.message,
      };
    }
  }

  /**
   * Build a prompt for the AI based on the task
   */
  private buildPrompt(task: Task): string {
    return `
Task Title: ${task.title}
Task Description: ${task.description}
Priority: ${task.priority}

Please process this task and provide a detailed response or solution. 
Consider the priority level and provide actionable insights or results.
    `.trim();
  }

  /**
   * Analyze task complexity and estimate processing time
   */
  async analyzeTask(task: Task): Promise<{ complexity: string; estimatedTime: string }> {
    const prompt = `Analyze the complexity of this task and estimate processing time:
Title: ${task.title}
Description: ${task.description}

Provide: 1) Complexity level (low/medium/high), 2) Estimated time (in minutes)
Format your response as JSON: {"complexity": "...", "estimatedTime": "..."}`;

    const response = await generateChatCompletion(prompt, this.model);
    
    try {
      const result = JSON.parse(response.result);
      return result;
    } catch {
      return { complexity: 'medium', estimatedTime: '5 minutes' };
    }
  }
}

export const defaultAgent = new AutonomousAgent();
