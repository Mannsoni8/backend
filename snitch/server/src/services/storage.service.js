import ImageKit, { toFile } from "@imagekit/nodejs";
import { config } from "../config/config.js";

const client = new ImageKit({
  privateKet: config.IMAGEKIT_PRIVATE_KEY,
});

export async function uploadFile({ buffer, filename }) {
  const response = await client.files.upload({
    file: await toFile(buffer),
    fileName: filename,
  });
  return response;
}
