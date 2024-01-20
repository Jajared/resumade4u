import FileDrop from "@/components/FileDrop/FileDrop";
import { Transition } from "@headlessui/react";
import { Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { Pagination } from "@mantine/core";
import { JobCard } from "@/components/JobCard/JobCard";

export default function Home() {
  const [jobData, setJobData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
  const [isVisible, setIsVisible] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    if (!apiResponse) return;
    setLoading(true);
    console.log(apiResponse);
    try {
      fetchData({ jobTitles: [apiResponse] }).then((data) => {
        setJobData(data);
        setLoading(false);
      });
    } catch (error) {
      setDisplayError(true);
    }
  }, [apiResponse, currentPage]);

  const fetchData = async ({ jobTitles }) => {
    try {
      const fetchPromise = fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobTitles }),
      });
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), 20000));
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  const FileDropContainer = () => {
    return (
      <div className="flex flex-col justify-between p-24">
        <FileDrop setApiResponse={setApiResponse} loading={loading} setLoading={setLoading} />
      </div>
    );
  };

  const StartButton = ({ children, ...props }) => (
    <button className="rounded-md text-2xl bg-violet-400 px-10 py-5 text-white hover:bg-violet-600" {...props}>
      {children}
    </button>
  );

  if (loading) {
    return (
      <div className="flex mt-20 flex-col items-center justify-center">
        <Loader size="xl" color="grape" />
      </div>
    );
  }

  if (displayError) {
    return (
      <div className="flex mt-20 flex-col items-center justify-center">
        <h1 className="text-4xl text-center">Sorry, something went wrong. Please try again later.</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Transition className="mx-auto my-16 max-w-md space-y-4" show={!isVisible} enter="transition-all ease-in-out duration-10000 delay-[400ms]" enterFrom="opacity-0 translate-y-6" enterTo="opacity-100 translate-y-0" leave="transition-all ease-in-out duration-10000" leaveFrom="opacity-100" leaveTo="opacity-0">
        <div className="mx-auto my-16 flex max-w-md justify-center">
          <StartButton onClick={() => setIsVisible(true)}>Start your dream 🚀</StartButton>
        </div>
      </Transition>

      {/* Content Div */}
      <Transition className="mx-auto my-16 max-w-md space-y-4" show={isVisible && !apiResponse} enter="transition-all ease-in-out duration-10000 delay-[400ms]" enterFrom="opacity-0 translate-y-6" enterTo="opacity-100 translate-y-0" leave="transition-all ease-in-out duration-10000" leaveFrom="opacity-100" leaveTo="opacity-0">
        <FileDropContainer />
      </Transition>

      {/* Response Div */}
      <Transition className="space-y-4" show={jobData != null} enter="transition-all ease-in-out duration-10000 delay-[400ms]" enterFrom="opacity-0 translate-y-6" enterTo="opacity-100 translate-y-0" leave="transition-all ease-in-out duration-10000" leaveFrom="opacity-100" leaveTo="opacity-0">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl text-center">Here are your dream jobs!</h1>
          <div className="grid grid-cols-3 gap-10 p-4">
            {jobData &&
              jobData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((job) => (
                <div key={job["Website URL"]}>
                  <JobCard data={job} />
                </div>
              ))}
          </div>
          <Pagination total={jobData.length / ITEMS_PER_PAGE} value={currentPage} onChange={setCurrentPage} />
        </div>
      </Transition>
    </div>
  );
}
