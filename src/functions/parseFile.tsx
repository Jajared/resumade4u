import { createWorker } from "tesseract.js";

export default async function parseFile(file: any) {
  const worker = await createWorker("eng");
  const ret = await worker.recognize(file[0]);
  await worker.terminate();
  return ret.data.text;
}
