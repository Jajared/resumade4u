"use client";
import FileDrop from "@/components/FileDrop/FileDrop";
import { useState } from "react";

export default function Home() {
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  return (
    <div className="flex flex-col justify-between p-24">
      <h1 className="items-start font-bold">Upload your resume</h1>
      <FileDrop setApiResponse={setApiResponse} />
    </div>
  );
}
