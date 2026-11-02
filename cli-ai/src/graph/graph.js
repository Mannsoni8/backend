import { StateGraph, START, END } from "@langchain/langgraph";
import * as z from "zod";
import {HumanMessage} from "langchain"
import rl from "readline";
import { LLMNode } from "./node";

const stateFormate = z.object({
  messages: z.array(z.any()),
});

const graph = new StateGraph(stateFormate)
  .addNode("LLMNode", LLMNode)
  .addEdge(START, "LLMNode")
  .addEdge("LLMNode", END)
  .compile();

export default async function initGraph() {
  while (true) {
    const userInput = rl.question("[User]: ");
    const response = await graph.invoke({
      messages: [new HumanMessage(userInput)],
    });
    console.log("[AI]:", response);
  }
}