import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase.config";

async function fetchImageUrl(imageName) {
  try {
    const result = await getDownloadURL(ref(storage, `${imageName}.png`));
    return result;
  } catch (error) {
    console.error("Error fetching image from Firebase Storage:", error);
  }
}

export default fetchImageUrl;
