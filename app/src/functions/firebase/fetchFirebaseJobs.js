import { firestore } from "../../../firebase.config";
import { collection, getDocs } from "firebase/firestore";

const fetchFirebaseJobs = async () => {
  const jobsRef = collection(firestore, "Jobs");
  const snapshot = await getDocs(jobsRef);
  const jobs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return jobs;
};

export default fetchFirebaseJobs;
