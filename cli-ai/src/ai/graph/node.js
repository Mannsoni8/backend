import { ChatGroq } from "@langchain/groq";
import { AIMessage } from "langchain";
import { getStoredApiKey } from "../../utils/file.utils.js";
import { createFilesTool } from "../tools/files.tool.js";

export async function LLMNode(state) {
  const apiKey = await getStoredApiKey();
  if (!apiKey) {
    throw new Error("API key is missing from settings.");
  }

  const model = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    apiKey,
  });

  const modelWithTool = model.bindTools([createFilesTool]);

  try {
    const stream = await modelWithTool.stream(state.messages);

    let fullMessage = null;
    let printedPrefix = false;

    for await (const chunk of stream) {
      fullMessage = fullMessage ? fullMessage.concat(chunk) : chunk;

      if (chunk.text) {
        if (!printedPrefix) {
          process.stdout.write("[AI]: ");
          printedPrefix = true;
        }
        process.stdout.write(chunk.text);
      }
    }

    if (printedPrefix) {
      process.stdout.write("\n");
    }

    return {
      messages: [fullMessage ?? new AIMessage("")],
    };
  } catch (error) {
    console.error(`\n[AI Error]: ${error.message}`);
    return {
      messages: [new AIMessage("Sorry, I encountered an error processing that request.")],
    };
  }
}
