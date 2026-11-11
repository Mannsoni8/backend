import { ChatGroq } from "@langchain/groq";
import { getApiKey } from "../../utils/file.utils.js";
import { AIMessage } from "langchain";

export async function LLMNode(state) {
  const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: (await getApiKey()).apiKey,
  });

  const modelWithTool = model.bindTools([upsertFileTools]);

  const stream = await model.stream(state.messages);

  process.stdout.write("[AI]: ");

  let aiMessage = "";
  for await (const chuck of stream) {
    process.stdout.write(chuck.text);
    aiMessage += chuck.text;
  }
  // console.log(state);
  // return state;

  return {
    messages: [...state.messages, new AIMessage(aiMessage)],
  };
}
