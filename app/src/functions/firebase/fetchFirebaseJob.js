import { firestore } from "../../../firebase.config";
import { doc, getDoc } from "firebase/firestore";

const fetchFirebaseJob = async (jobId) => {
  const jobRef = doc(firestore, "Jobs", jobId);
  const snapshot = await getDoc(jobRef);
  const job = snapshot.data();
  return job;
};

export default fetchFirebaseJob;
