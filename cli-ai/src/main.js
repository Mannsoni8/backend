import initGraph from "./ai/graph/graph.js";
import { getApiKey, getSettingFile, saveApiKey } from "./utils/file.utils.js";
import rl from "./utils/readline.js";

async function main() {
  const settings = await getSettingFile();

  if (!settings.apiKey) {
    const apiKey = await rl.question("Please enter your API key: ");
    await saveApiKeyF(apiKey);
  }

  const response = await getApiKey();

  if (response.error) {
    console.error("Invalid OR Expired API key");

    const apiKey = await rl.question("Please enter your API key: ");
    await saveApiKey(apiKey);
    return main();
  }

  await initGraph();

  rl.close();
}

export default main;
