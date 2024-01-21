import React from "react";
import { useRouter } from "next/router";
import { JobData } from "@/data/types";
import { useState, useEffect } from "react";
import fetchFirebaseJob from "@/functions/firebase/fetchfirebaseJob";
import fetchImageUrl from "@/functions/firebase/fetchImageUrl";

export async function getServerSideProps({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const companyLogo = await fetchImageUrl(slug);
  const jobData: JobData = (await fetchFirebaseJob(slug)) as JobData;
  return {
    props: {
      jobData,
      companyLogo,
    },
  };
}

const JobPosting = ({ jobData, companyLogo }: { jobData: JobData; companyLogo: string }) => {
  const { company, description, location, tags, title } = jobData;
  if (!jobData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <img className="w-40 h-40 rounded-full object-contain" src={companyLogo} alt={company} />
        <div className="ml-4">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-gray-500">{company}</p>
          <p className="text-gray-500">📍{location}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex items-center mb-2">
        {tags.map((tag) => (
          <span className="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-600 mr-2">{tag}</span>
        ))}
      </div>
      <div className="inline-block px-5 py-3 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">Apply Now</div>
    </div>
  );
};

export default JobPosting;
