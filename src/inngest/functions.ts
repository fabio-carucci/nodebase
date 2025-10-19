import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { inngest } from "./client";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const executeAi = inngest.createFunction(
  { id: "execute-ai", retries: 3 },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistant.",
        prompt: "Write a vegetarian lasagna recipe for 4 people.",
      },
    );
    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-4o"),
        system: "You are a helpful assistant.",
        prompt: "Write a vegetarian lasagna recipe for 4 people.",
      },
    );
    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-3-5-sonnet"),
        system: "You are a helpful assistant.",
        prompt: "Write a vegetarian lasagna recipe for 4 people.",
      },
    );

    return {
      geminiSteps,
      openaiSteps,
      anthropicSteps,
    };
  },
);
