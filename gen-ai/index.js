import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import rl from "readline/promises";
import { tool, createAgent } from "langchain";
import * as z from "zod";
dotenv.config();

const events = [];

const createEventTool = tool(
  async ({ date, title, description }) => {
    console.log("Creating event:", { date, title, description });

    events.push({
      date,
      title,
      description,
    });

    return "Event created";
  },
  {
    name: "createEvent",
    description: "Create a new event with a date,title,and desccription",
    schema: z.object({
      date: z.string(),
      title: z.string(),
      description: z.string(),
    }),
  },
);

const getEventsTool = tool(
  async ({}) => {
    console.log("Retrieving events:", events);
    return events;
  },
  {
    name: "getEvents",
    description: "Retrieves all events",
    schema: z.object({}),
  },
);

const readLine = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
});

const agent = createAgent({
  model,
  tools: [createEventTool, getEventsTool],
});

while (true) {
  const userInput = await readLine.question("Enter your input: ");

  const stream = await agent.stream(
    {
      messages: [
        {
          role: "human",
          content: userInput,
        },
      ],
    },
    {
      streamMode: "messages",
    },
  );

  for await (const [chunk] of stream) {
    process.stdout.write(chunk.content);
  }
  process.stdout.write("/n");
}
