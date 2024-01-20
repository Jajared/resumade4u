import { JobCard } from "@/components/JobCard/JobCard";
import fetchFirebaseJobs from "@/functions/firebase/fetchFirebaseJobs";
import { useEffect, useState } from "react";
import { JobData } from "@/data/types";
import { Pagination } from "@mantine/core";

const SearchPage = () => {
  const [jobData, setJobData] = useState<JobData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    fetchJobData();
  }, [currentPage]);

  const fetchJobData = async () => {
    const jobs = (await fetchFirebaseJobs()) as JobData[];
    setJobData(jobs);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-10 p-4">
        {jobData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((job) => (
          <div key={job.title}>
            <JobCard data={job} />
          </div>
        ))}
      </div>
      <Pagination total={jobData.length / ITEMS_PER_PAGE} value={currentPage} onChange={setCurrentPage} />
    </div>
  );
};

export default SearchPage;
