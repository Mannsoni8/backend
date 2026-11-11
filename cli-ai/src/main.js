import initGraph from "./ai/graph/graph.js";
import { getApiKey, getSettingFile, saveApiKey } from "./utils/file.utils.js";
import rl from "./utils/readline.js";

const MAX_KEY_ATTEMPTS = 3;

async function promptForApiKey() {
  while (true) {
    const apiKey = (await rl.question("Please enter your API key: ")).trim();
    if (apiKey) {
      return apiKey;
    }
    console.error("API key cannot be empty.");
  }
}

async function ensureValidApiKey() {
  const settings = await getSettingFile();

  if (!settings.apiKey) {
    const apiKey = await promptForApiKey();
    await saveApiKey(apiKey);
  }

  for (let attempt = 1; attempt <= MAX_KEY_ATTEMPTS; attempt++) {
    const response = await getApiKey();

    if (!response.error) {
      return true;
    }

    if (!response.isAuthError) {
      console.error(response.error);
      return false;
    }

    console.error("Invalid OR Expired API key");
    if (attempt === MAX_KEY_ATTEMPTS) {
      console.error("Maximum API key attempts reached. Exiting.");
      return false;
    }

    const apiKey = await promptForApiKey();
    await saveApiKey(apiKey);
  }

  return false;
}

async function main() {
  try {
    const ready = await ensureValidApiKey();
    if (!ready) {
      return;
    }

    await initGraph();
  } finally {
    rl.close();
  }
}

export default main;
