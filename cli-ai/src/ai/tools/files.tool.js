import { tool } from "langchain";
import * as z from "zod";
import fs from "fs/promises";
import path from "path";

function resolveWorkspacePath(filePath) {
  const workspaceRoot = path.resolve(process.cwd());
  const resolved = path.resolve(workspaceRoot, filePath);
  const relative = path.relative(workspaceRoot, resolved);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Refusing to write outside workspace: ${filePath}`);
  }

  return resolved;
}

export const createFilesTool = tool(
  async function ({ files }) {
    const results = await Promise.all(
      files.map(async (file) => {
        try {
          const targetPath = resolveWorkspacePath(file.path);
          await fs.mkdir(path.dirname(targetPath), { recursive: true });
          await fs.writeFile(targetPath, file.content, "utf-8");
          return `Wrote ${targetPath}`;
        } catch (error) {
          return `Failed ${file.path}: ${error.message}`;
        }
      }),
    );
    return results.join("\n");
  },
  {
    name: "upsertFiles",
    description:
      "Create/Update multiple files at once (create one if not existed)",
    schema: z.object({
      files: z.array(
        z.object({
          path: z
            .string()
            .describe("path of the file to be created/updated inside workspace"),
          content: z
            .string()
            .describe("content of the file to be created/updated"),
        }),
      ),
    }),
  },
);
