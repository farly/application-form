"use client"

import dynamic from "next/dynamic"

const NoSSRApplicants = dynamic(() => import('./components/Applicants'), {ssr: false}) 
const NoSSRArchived = dynamic(() => import('./components/ArchivedApplicants'), {ssr: false}) 
const NoSSRApplicationForm = dynamic(() => import('./components/Form/Applicant'), {ssr: false}) 

export default function Home() {
  return (
    <div className="flex flex-col gap-8 justify-center mx-6 my-4">
      <span className="capitalize text-lg font-semibold w-full flex justify-center">
        Applicant details
      </span>
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <NoSSRApplicants />
        <NoSSRArchived />
        <NoSSRApplicationForm />
      </div>
    </div>
  );
}
