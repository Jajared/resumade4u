import FileDrop from "@/components/FileDrop/FileDrop";
import { Transition } from "@headlessui/react";
import { Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { Pagination } from "@mantine/core";
import { JobCard } from "@/components/JobCard/JobCard";
import { ActionIcon } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

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
  }, [apiResponse]);

  const fetchData = async ({ jobTitles }) => {
    try {
      const fetchPromise = fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobTitles }),
      });
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), 15000));
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.error("Failed to fetch:", error);
      setDisplayError(true);
    }
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return jobData.slice(startIndex, endIndex);
  };

  const FileDropContainer = () => {
    return (
      <div className="flex flex-col justify-between p-24">
        <div className="flex flex-col justify-start items-start space-y-4 mb-10">
          <h1 className="text-4xl text-slate-50 font-bold">Unlock your career potential by uploading your resume</h1>
          <h2 className="text-2xl text-slate-200 font-semibold">We'll find the best jobs for you</h2>
        </div>

        <FileDrop setApiResponse={setApiResponse} loading={loading} setLoading={setLoading} />
      </div>
    );
  };

  const StartButton = ({ children, ...props }) => (
    <button className="rounded-md text-2xl font-semibold bg-violet-400 px-10 py-5 text-white shadow-md hover:shadow-xl hover:bg-violet-600" {...props}>
      {children}
    </button>
  );

  if (loading) {
    return (
      <div className="flex mt-20 flex-col items-center justify-center space-y-5">
        <Loader size="xl" color="grape" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">Generating your dream job...</h1>
      </div>
    );
  }

  if (displayError) {
    return (
      <div className="flex mt-20 flex-col items-center justify-center space-y-5">
        <div className="text-9xl text-yellow-400">⚠️</div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">Sorry, something went wrong. Please try again later.</h1>
        <button
          onClick={() => {
            setDisplayError(false);
            setJobData(null);
            setApiResponse(null);
          }}
          className="rounded-md text-xl font-semibold bg-violet-400 px-10 py-5 text-white shadow-md hover:shadow-xl hover:bg-violet-600"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Transition className="w-full my-16 space-y-4 " show={!isVisible} enter="transition-all ease-in-out duration-10000 delay-[400ms]" enterFrom="opacity-0 translate-y-6" enterTo="opacity-100 translate-y-0" leave="transition-all ease-in-out duration-10000" leaveFrom="opacity-100" leaveTo="opacity-0">
        <div className="flex-col items-center flex justify-center">
          <div className="mb-10 space-y-8">
            <h2 className="text-6xl font-bold text-slate-200">Your Dream Job</h2>
            <h1 className="text-9xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">Made 4 U</h1>
          </div>
          <StartButton onClick={() => setIsVisible(true)}>☁️ Unlock your dream 🚀</StartButton>
        </div>
      </Transition>

      {/* Content Div */}
      <Transition className="w-1/2 my-16 space-y-4" show={isVisible && !apiResponse} enter="transition-all ease-in-out duration-10000 delay-[400ms]" enterFrom="opacity-0 translate-y-6" enterTo="opacity-100 translate-y-0" leave="transition-all ease-in-out duration-10000" leaveFrom="opacity-100" leaveTo="opacity-0">
        <FileDropContainer />
      </Transition>

      {/* Response Div */}
      {jobData && (
        <Transition className="space-y-4" show={jobData != null} enter="transition-all ease-in-out duration-10000 delay-[400ms]" enterFrom="opacity-0 translate-y-6" enterTo="opacity-100 translate-y-0" leave="transition-all ease-in-out duration-10000" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="flex flex-col items-center justify-center">
            <a href="/favourites">
              <ActionIcon variant="default" radius="md" size={36}>
                <IconHeart className="bg-red-400" stroke={1.5} />
              </ActionIcon>
            </a>
            <h1 className="text-4xl text-slate-50 font-bold">These jobs are most suitable for you</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 p-4">
              {getCurrentPageData().map((job) => (
                <div key={job["Website URL"]}>
                  <JobCard data={job} />
                </div>
              ))}
            </div>
            <Pagination total={Math.ceil(jobData.length / ITEMS_PER_PAGE)} value={currentPage} onChange={setCurrentPage} color="white" />
          </div>
        </Transition>
      )}
    </div>
  );
}
