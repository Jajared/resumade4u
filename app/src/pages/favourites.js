import JobCard from "@/components/JobCard/JobCard";
import React, { useEffect, useState } from "react";

const FavouritesPage = () => {
  const [favouriteJobs, setFavouriteJobs] = useState([]);

  useEffect(() => {
    getFavouriteJobs();
  }, []);

  const getFavouriteJobs = () => {
    try {
      const storedData = sessionStorage.getItem("job");
      console.log(storedData);
      const result = storedData ? JSON.parse(storedData) : [];
      setFavouriteJobs(result);
    } catch (error) {
      console.error("Error parsing favourite jobs from sessionStorage:", error);
      // Handle the error appropriately
      setFavouriteJobs([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl text-slate-50 font-bold">Favourites</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 p-4">
        {favouriteJobs.map((job) => (
          <div key={job["Website URL"]}>
            <JobCard data={job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritesPage;
