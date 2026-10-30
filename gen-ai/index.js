import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import rl from "readline/promises";
import { tool, createAgent, context } from "langchain";
import * as z from "zod";
import { START, StateGraph } from "@langchain/langgraph";
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

// const agent = createAgent({
//   model,
//   tools: [createEventTool, getEventsTool],
// });

// while (true) {
//   const userInput = await readLine.question("Enter your input: ");

//   const stream = await agent.stream(
//     {
//       messages: [
//         {
//           role: "human",
//           content: userInput,
//         },
//       ],
//     },
//     {
//       streamMode: "messages",
//     },
//   );

//   for await (const [chunk] of stream) {
//     process.stdout.write(chunk.content);
//   }
//   process.stdout.write("/n");
// }

// const userInput = await readLine.question("Enter your input: ");

// const response = await agent.invoke({
//   messages: [
//     {
//       role: "human",
//       content: userInput,
//     },
//   ],
// });

// console.log(response);

//---------LLM langgraph-------------//
async function LLMNode(state) {
  console.log("LLMNode state: ", state);
  return {
    messages: [
      ...state.messages,
      {
        role: "assistent",
        content: "Hello, user!",
      },
    ],
  };
}

const graph = new StateGraph(
  z.object({
    messages: z.array,
  }),
)
  .addNode("LLMNode", LLMNode)
  .addEdge(START, "LLMNode")
  .addEdge("LLMNode", END)
  .compile();

const graphResult = await graph.invoke({
  messages: [
    {
      role: "human",
      content: "Hello",
    },
  ],
});

console.log("graph res: ", graphResult);
