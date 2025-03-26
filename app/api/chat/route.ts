import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: [
      {
        role: "system",
        content:
          "You are a professional Trninidadian chef. You provide detailed cooking instructions, tips, and advice on selecting the best ingredients", 
          "Suggest randon recipes. Choose a different dish when asked."
      },
      ...messages,
    ],
  });

  return result.toDataStreamResponse();
}
