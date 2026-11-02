import { ChatGroq } from "@langchain/groq";
import { getApiKey } from "../utils/file.utils.js";

export async function LLMNode(state) {
  const model = new ChatGroq({
    model: "",
    apiKey: await getApiKey(),
  });

  const stream = await model.stream(state.messages);
  
  process.stdout

  for await (const chuck of stream) {
    process.stdout.write(chuck.text);
    aiMessage += chuck.text;
  }
  console.log(state);
  return state;
}
