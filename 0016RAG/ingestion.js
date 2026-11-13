import { PDFParse } from "pdf-parse";
import fs from "fs/promises";

const parse = new PDFParse({
  data: await fs.readFile("./story.pdf"),
});

//__________________Extract all the text from pdf file_____________________//
const text = await parse.getText();

console.log(text);
