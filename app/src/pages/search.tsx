import { JobCard } from "@/components/JobCard/JobCard";
import { useEffect, useState } from "react";
import { JobData } from "@/data/types";
import { Pagination } from "@mantine/core";

const SearchPage = () => {
  const [jobData, setJobData] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    setLoading(true);
    fetchData({ jobTitles: ["Software"] }).then((data) => {
      setJobData(data);
      setLoading(false);
    });
  }, [currentPage]);

  const fetchData = async ({ jobTitles }: { jobTitles: string[] }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobTitles }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-10 p-4">
        {jobData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((job) => (
          <div key={job["Website URL"]}>
            <JobCard data={job} />
          </div>
        ))}
      </div>
      <Pagination total={jobData.length / ITEMS_PER_PAGE} value={currentPage} onChange={setCurrentPage} />
    </div>
  );
};

export default SearchPage;
