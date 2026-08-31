import { ImageKit } from "@imagekit/nodejs/client.js";

const storageInstance = new ImageKit({
  urlEndpoint: process.env.IK_URL,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

export const sendFiles = async (File, fileName) => {
  const obj = {
    file,
    fileName,
    folder: "cohort-3",
  };

  return await storageInstance.upload(obj);
};
