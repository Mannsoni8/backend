import fs from "fs/promises";
import { CONFIG_DIR } from "./constant.js";
import path from "path";
import axios from "axios";

/**
 * Return the content of the settings file (create if it doesn't exist)
 */
export async function getSettingFile() {
  // Ensure the config directory exists
  try {
    await fs.access(CONFIG_DIR);
  } catch {
    await fs.mkdir(CONFIG_DIR, { recursive: true });
  }

  const settingsFilePath = path.join(CONFIG_DIR, "settings.json");

  try {
    await fs.access(settingsFilePath);
  } catch {
    await fs.writeFile(settingsFilePath, JSON.stringify({}, null, 2));
    return {};
  }

  const content = await fs.readFile(settingsFilePath, "utf-8");
  try {
    return JSON.parse(content);
  } catch (error) {
    throw new Error(
      `Failed to parse settings file at ${settingsFilePath}: ${error.message}`,
    );
  }
}

/**
 * Save API key to the settings file
 */
export async function saveApiKey(apiKey) {
  const settingsContent = await getSettingFile();
  const settingsFilePath = path.join(CONFIG_DIR, "settings.json");

  await fs.writeFile(
    settingsFilePath,
    JSON.stringify(
      {
        ...settingsContent,
        apiKey,
      },
      null,
      2,
    ),
  );
}

/**
 * Read the stored API key from the settings file without network validation
 */
export async function getStoredApiKey() {
  const settings = await getSettingFile();
  return settings.apiKey || null;
}

/**
 * Get and validate API key from the settings file
 */
export async function getApiKey() {
  const apiKey = await getStoredApiKey();

  if (!apiKey) {
    return {
      error: "API key not found in settings file",
      isAuthError: true,
    };
  }

  try {
    await axios.get("https://api.groq.com/openai/v1/models", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      timeout: 10000,
    });
    return {
      apiKey,
    };
  } catch (error) {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      return {
        error: "Invalid or expired API key",
        isAuthError: true,
      };
    }

    return {
      error: `Unable to verify API key: ${error.message}`,
      isAuthError: false,
    };
  }
}
